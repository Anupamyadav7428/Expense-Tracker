import React from "react"
import logo from "../../assets/logo.png"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-[#16171d]/75 border-b border-gray-200/80 dark:border-gray-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#01205D] dark:text-white">
              Muneem
            </span>
          </div>

          {/* Right Side: Quick Action / Visual badge */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/30">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Live Sync Active
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
