import React from "react"
import { useExpense } from "../../context/ExpenseContext"

const categoryColors = {
  Food: "bg-amber-500",
  Transport: "bg-blue-500",
  Bills: "bg-rose-500",
  Entertainment: "bg-purple-500",
  Other: "bg-gray-500",
}

export default function Summary() {
  const { summary, categories } = useExpense()

  if (!summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
        <div className="h-28 bg-gray-100 dark:bg-gray-800 rounded-2xl"></div>
        <div className="h-28 bg-gray-100 dark:bg-gray-800 rounded-2xl"></div>
      </div>
    )
  }

  const { totalSpent = 0, highestExpense = 0, categoryTotals = {} } = summary

  const formatCurrency = (val) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(val)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Total Spent */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-5 shadow-sm shadow-purple-500/10 transition-transform duration-300 hover:scale-[1.01] hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded-lg shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-200">
              Total Expenses
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {formatCurrency(totalSpent)}
          </span>
        </div>

        {/* Card 2: Highest Expense */}
        <div className="relative overflow-hidden bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm transition-transform duration-300 hover:scale-[1.01] hover:shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500">
              Highest Single Transaction
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            {formatCurrency(highestExpense)}
          </span>
        </div>
      </div>

      {/* Category Breakdown Progress Bars */}
      <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Category Spending
        </h4>

        {totalSpent === 0 ? (
          <div className="text-center py-6 text-sm text-gray-400 dark:text-gray-600 italic">
            Add transactions to view category share
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {categories.map((cat) => {
              const amount = categoryTotals[cat] || 0
              const percentage = totalSpent > 0 ? (amount / totalSpent) * 100 : 0
              const barColor = categoryColors[cat] || "bg-purple-500"

              return (
                <div key={cat} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-900 dark:text-gray-100">
                        {formatCurrency(amount)}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500 font-normal">
                        ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                  {/* Progress bar container */}
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
