import React from "react"
import { useExpense } from "../../context/ExpenseContext"
import ExpenseCard from "./ExpenseCard"
import Loader from "../common/Loader"

export default function ExpenseList({ onEdit }) {
  const { expenses, loading } = useExpense()

  if (loading && expenses.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <Loader size="large" />
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2">
          Loading transactions...
        </p>
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="p-4 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-full mb-4 shrink-0">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
          No transactions yet
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          Get started by adding your first expense or clear active filters.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-4 bg-purple-600 rounded-full" />
          History
        </h4>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {expenses.length} transaction{expenses.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}
