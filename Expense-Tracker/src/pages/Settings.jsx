import React, { useState } from "react"
import { useExpense } from "../context/ExpenseContext"

export default function Settings() {
  const { resetFilters } = useExpense()
  const [currency, setCurrency] = useState("USD")
  const [theme, setTheme] = useState("system")

  const handleClearPreferences = () => {
    resetFilters()
    alert("Preferences reset completed successfully!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your dashboard profile, currency, and preference rules.
        </p>
      </div>

      <div className="flex flex-col gap-6 bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-6 shadow-sm">
        {/* Profile Details */}
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
            User Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                Full Name
              </span>
              <input
                type="text"
                disabled
                value="John Doe"
                className="bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3.5 py-2.5 text-sm text-gray-950 dark:text-gray-100 font-semibold cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                Email Address
              </span>
              <input
                type="email"
                disabled
                value="john@example.com"
                className="bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3.5 py-2.5 text-sm text-gray-950 dark:text-gray-100 font-semibold cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Application Preferences */}
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
            Preferences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Currency Choice */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                Default Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3.5 py-2.5 text-sm text-gray-950 dark:text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500"
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            {/* Appearance Theme */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                Theme Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3.5 py-2.5 text-sm text-gray-950 dark:text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500"
              >
                <option value="system">System Default</option>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clear Data Preference */}
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
            Danger Zone
          </h3>
          <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-red-50 dark:bg-rose-950/10 border border-red-200/50 dark:border-rose-900/20 rounded-2xl">
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-red-800 dark:text-rose-400">
                Reset App Preferences
              </span>
              <span className="text-xs text-red-650 dark:text-rose-300/80 mt-0.5">
                Clears all active category and date-range filters.
              </span>
            </div>
            <button
              onClick={handleClearPreferences}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl transition-all duration-150"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
