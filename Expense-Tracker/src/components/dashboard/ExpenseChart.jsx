import React, { useMemo } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { useExpense } from "../../context/ExpenseContext"

const COLORS = {
  Food: "#f59e0b",
  Transport: "#3b82f6",
  Bills: "#f43f5e",
  Entertainment: "#a855f7",
  Other: "#6b7280",
}

export default function ExpenseChart() {
  const { expenses, summary } = useExpense()

  // 1. Process category distribution for Donut Chart
  const categoryData = useMemo(() => {
    if (!summary || !summary.categoryTotals) return []
    const { categoryTotals } = summary
    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0)
  }, [summary])

  // 2. Process daily totals for the Bar Chart (Last 7 days of spending)
  const dailyData = useMemo(() => {
    if (!expenses || expenses.length === 0) return []

    // Group expenses by date (UTC date parsed to YYYY-MM-DD for consistency)
    const dailyMap = {}
    expenses.forEach((item) => {
      const dateObj = new Date(item.date)
      const dateStr = dateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      })

      dailyMap[dateStr] = (dailyMap[dateStr] || 0) + item.amount
    })

    // Convert map to sorted array (reversing back from sorted expenses which are descending)
    const result = Object.entries(dailyMap)
      .map(([date, amount]) => ({ date, amount }))
      .slice(0, 7) // Take top 7 active days
      .reverse() // Sort chronologically

    return result
  }, [expenses])

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm min-h-[300px] flex flex-col items-center justify-center">
        <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-500 rounded-2xl mb-3">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          No chart data available
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-650 mt-1">
          Add some transactions to see visual trends
        </p>
      </div>
    )
  }

  // Custom tooltips matching system aesthetics
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1f2028]/95 dark:bg-[#16171d]/95 backdrop-blur-md border border-gray-700/50 text-white rounded-xl p-3 shadow-lg text-left text-xs font-semibold">
          <p className="text-gray-400 font-medium mb-1">{payload[0].payload.name || payload[0].payload.date}</p>
          <p className="text-sm font-extrabold text-purple-400">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            }).format(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Category Donut Chart */}
      <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm flex flex-col">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Category Share
        </h4>
        <div className="h-64 relative flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name] || COLORS.Other}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
          {/* Inner legend detail */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold tracking-wider uppercase">
              Total Share
            </span>
            <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              {categoryData.length} Categories
            </span>
          </div>
        </div>
      </div>

      {/* Spending Trend Bar Chart */}
      <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm flex flex-col">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Daily Spending Trend
        </h4>
        <div className="h-64 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyData}
              margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text)", fontSize: 10, fontWeight: 500 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text)", fontSize: 10, fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(170, 59, 255, 0.05)", radius: 8 }} />
              <Bar dataKey="amount" fill="url(#colorAmount)" radius={[8, 8, 0, 0]}>
                {dailyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="var(--accent)" />
                ))}
              </Bar>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
