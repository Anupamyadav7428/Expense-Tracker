import Expense from "../models/Expense.js"



/*
========================================
CREATE EXPENSE
POST /api/expenses
========================================
*/
export const createExpense = async (req, res) => {
  const { amount, category, note, date } = req.body

  if (!amount || !category || !date) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    })
  }

  if (new Date(date) > new Date()) {
    return res.status(400).json({
      success: false,
      message: "Future dates are not allowed",
    })
  }

  const expense = await Expense.create({
    amount,
    category,
    note,
    date,
  })

  res.status(201).json({
    success: true,
    data: expense,
  })
}



/*
========================================
GET ALL EXPENSES
GET /api/expenses
========================================
*/
export const getExpenses = async (req, res) => {
  const { category, startDate, endDate } = req.query

  let filter = {}

  if (category && category !== "All") {
    filter.category = category
  }

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    }
  }

  const expenses = await Expense.find(filter).sort({
    date: -1,
  })

  res.status(200).json({
    success: true,
    count: expenses.length,
    data: expenses,
  })
}



/*
========================================
UPDATE EXPENSE
PUT /api/expenses/:id
========================================
*/
export const updateExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!expense) {
    return res.status(404).json({
      success: false,
      message: "Expense not found",
    })
  }

  res.status(200).json({
    success: true,
    data: expense,
  })
}



/*
========================================
DELETE EXPENSE
DELETE /api/expenses/:id
========================================
*/
export const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    return res.status(404).json({
      success: false,
      message: "Expense not found",
    })
  }

  await expense.deleteOne()

  res.status(200).json({
    success: true,
    message: "Expense deleted successfully",
  })
}



/*
========================================
SUMMARY API
GET /api/expenses/summary
========================================
*/
export const getSummary = async (req, res) => {
  const expenses = await Expense.find()

  const totalSpent = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  )

  const highestExpense = Math.max(
    ...expenses.map((item) => item.amount),
    0
  )

  const categoryTotals = {}

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount
    } else {
      categoryTotals[expense.category] = expense.amount
    }
  })

  res.status(200).json({
    success: true,
    data: {
      totalSpent,
      highestExpense,
      categoryTotals,
    },
  })
}
