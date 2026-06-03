import React from "react"
import { useExpense } from "../../context/ExpenseContext"

export default function Filters() {
  const { filters, updateFilters, resetFilters, categories } = useExpense()

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value })
  }

  const handleCategoryChange = (e) => {
    updateFilters({ category: e.target.value })
  }

  const handleStartDateChange = (e) => {
    updateFilters({ startDate: e.target.value })
  }

  const handleEndDateChange = (e) => {
    updateFilters({ endDate: e.target.value })
  }

  return (
    <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter Transactions
        </h3>
        {(filters.category !== "All" || filters.startDate || filters.endDate || filters.search) && (
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-150 flex items-center gap-1"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by note or description..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left">
            Category
          </label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-850 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left">
            From Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={handleStartDateChange}
            className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-850 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-left">
            To Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={handleEndDateChange}
            className="w-full bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-855 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  )
}
