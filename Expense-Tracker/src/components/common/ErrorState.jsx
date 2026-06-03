import React from "react"

export default function ErrorState({
  title = "Something went wrong",
  message = "Please check your network connection and try again.",
  onRetry,
}) {
  return (
    <div className="bg-red-50 dark:bg-rose-950/10 border border-red-200/60 dark:border-rose-900/20 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[250px] transition-colors duration-300">
      <div className="p-3 bg-red-100 dark:bg-rose-950/40 text-red-600 dark:text-rose-400 rounded-full mb-3 shrink-0">
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h4 className="text-base font-bold text-red-800 dark:text-rose-350 mb-1">
        {title}
      </h4>
      <p className="text-sm text-red-650 dark:text-rose-400/80 max-w-sm mb-4">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 active:scale-95 transition-all duration-150"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
