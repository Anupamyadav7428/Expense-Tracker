import React, { useState, useEffect } from "react"
import { useExpense } from "../context/ExpenseContext"
import Summary from "../components/dashboard/Summary"
import ExpenseForm from "../components/expense/ExpenseForm"
import Filters from "../components/expense/Filters"
import ExpenseList from "../components/expense/ExpenseList"
import ExpenseChart from "../components/dashboard/ExpenseChart"

export default function Home() {
  const { filters, fetchExpenses, fetchSummary } = useExpense()
  const [editingExpense, setEditingExpense] = useState(null)

  // Fetch expenses when filters change
  useEffect(() => {
    fetchExpenses()
  }, [filters])

  // Fetch summary once on mount
  useEffect(() => {
    fetchSummary()
  }, [])

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
    // Scroll to form smoothly on mobile
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleClearEditing = () => {
    setEditingExpense(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 text-left">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track, analyze, and optimize your personal spending.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Add/Edit Form & Filters (Stays sticky on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
          <ExpenseForm
            editingExpense={editingExpense}
            onClearEditing={handleClearEditing}
          />
          <Filters />
        </div>

        {/* Right Side: Summary Cards, Recharts, and Transaction List */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <Summary />
          <ExpenseChart />
          <ExpenseList onEdit={handleEditExpense} />
        </div>
      </div>
    </div>
  )
}
