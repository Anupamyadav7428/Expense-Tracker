import React, { useState, useEffect } from "react"
import { useExpense } from "../../context/ExpenseContext"

export default function ExpenseForm({ editingExpense, onClearEditing }) {
  const { addExpense, editExpense, categories } = useExpense()

  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getTodayString = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount)
      setCategory(editingExpense.category)
      const formattedDate = new Date(editingExpense.date)
        .toISOString()
        .split("T")[0]
      setDate(formattedDate)
      setNote(editingExpense.note || "")
    } else {
      resetForm()
    }
  }, [editingExpense])

  const resetForm = () => {
    setAmount("")
    setCategory("Food")
    setDate(getTodayString())
    setNote("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!amount || !category || !date) {
      return
    }

    if (new Date(date) > new Date()) {
      alert("Future dates are not allowed")
      return
    }

    setIsSubmitting(true)
    const expenseData = {
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim(),
    }

    try {
      if (editingExpense) {
        await editExpense(editingExpense._id, expenseData)
        if (onClearEditing) onClearEditing()
      } else {
        await addExpense(expenseData)
        resetForm()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const todayStr = getTodayString()

  return (
    <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
        </span>
        {editingExpense ? "Edit Transaction" : "Add Transaction"}
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left">
            Amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-semibold text-sm">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl pl-8 pr-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left">
            Date
          </label>
          <input
            type="date"
            required
            max={todayStr}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200"
          />
        </div>

        {/* Description / Note */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left">
            Description
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What was this expense for?"
            rows="3"
            maxLength="120"
            className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-2">
          {editingExpense && (
            <button
              type="button"
              onClick={onClearEditing}
              className="flex-1 border border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 font-semibold text-sm py-2.5 px-4 rounded-xl text-white shadow-sm transition-all duration-200 ${
              isSubmitting
                ? "bg-purple-400 dark:bg-purple-500/50 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-purple-500/10 hover:shadow-md"
            }`}
          >
            {isSubmitting
              ? "Saving..."
              : editingExpense
              ? "Update Expense"
              : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  )
}
