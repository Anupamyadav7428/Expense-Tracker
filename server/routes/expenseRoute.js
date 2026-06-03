import express from "express"

import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSummary,
} from "../controllers/expenseController.js"
import errorHandler from "../middleware/errorHandler.js"

const router = express.Router()

router.route("/")
  .post(errorHandler(createExpense))
  .get(errorHandler(getExpenses))

router.get("/summary", errorHandler(getSummary))

router.route("/:id")
  .put(errorHandler(updateExpense))
  .delete(errorHandler(deleteExpense))

export default router
