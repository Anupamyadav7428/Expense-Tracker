import React from "react"

export default function Loader({ size = "medium", className = "" }) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  }

  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <div
        className={`${sizeClasses[size] || sizeClasses.medium} border-t-purple-650 border-gray-250 dark:border-gray-800 rounded-full animate-spin`}
      />
    </div>
  )
}
