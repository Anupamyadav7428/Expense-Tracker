import React, { useState, useEffect } from "react"
import { useExpense } from "../context/ExpenseContext"
import Filters from "../components/expense/Filters"
import ExpenseList from "../components/expense/ExpenseList"
import ExpenseForm from "../components/expense/ExpenseForm"

export default function Transactions() {
  const { filters, fetchExpenses } = useExpense()
  const [editingExpense, setEditingExpense] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch expenses when filters change
  useEffect(() => {
    fetchExpenses()
  }, [filters])

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }

  const handleClearEditing = () => {
    setEditingExpense(null)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Transactions
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View, search, and manage your full list of transactions.
        </p>
      </div>

      <Filters />

      <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm">
        <ExpenseList onEdit={handleEditExpense} />
      </div>

      {/* Edit Expense Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1f2028] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-850 p-1">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleClearEditing}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ExpenseForm
              editingExpense={editingExpense}
              onClearEditing={handleClearEditing}
            />
          </div>
        </div>
      )}
    </div>
  )
}
