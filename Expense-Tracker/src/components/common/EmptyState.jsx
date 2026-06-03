import React from "react"

export default function EmptyState({
  title = "No data found",
  description = "Get started by adding items or adjusting your active filters.",
  icon,
  action,
}) {
  return (
    <div className="bg-white dark:bg-[#1f2028] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-full mb-4 shrink-0">
        {icon || (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        )}
      </div>
      <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
        {title}
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  )
}
