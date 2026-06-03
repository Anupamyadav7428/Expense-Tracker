import React, { useEffect } from "react"
import { useExpense } from "../context/ExpenseContext"
import Summary from "../components/dashboard/Summary"
import ExpenseChart from "../components/dashboard/ExpenseChart"

export default function Analytics() {
  const { fetchExpenses, fetchSummary, rawExpenses } = useExpense()

  useEffect(() => {
    fetchExpenses()
    fetchSummary()
  }, [])

  // Calculate some fun advanced analytics
  const totalCount = rawExpenses.length
  const averageSpend = totalCount > 0 
    ? rawExpenses.reduce((acc, item) => acc + item.amount, 0) / totalCount 
    : 0

  const formatCurrency = (val) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(val)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Analytics
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Gain deeper insights into your spending habits and category ratios.
        </p>
      </div>

      {/* Primary KPI summary cards */}
      <Summary />

      {/* Advanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stat 1: Total Transactions */}
        <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            Total Transactions
          </span>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
            {totalCount}
          </h3>
          <p className="text-xs text-gray-405 dark:text-gray-550 mt-1">
            Transactions recorded in your ledger
          </p>
        </div>

        {/* Stat 2: Average Spend */}
        <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            Average Spend per Transaction
          </span>
          <h3 className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
            {formatCurrency(averageSpend)}
          </h3>
          <p className="text-xs text-gray-405 dark:text-gray-550 mt-1">
            Calculated across all transactions
          </p>
        </div>
      </div>

      {/* Recharts Analytics Panel */}
      <ExpenseChart />
    </div>
  )
}
