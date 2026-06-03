import { createContext, useContext, useState, useMemo } from "react"
import axios from "axios"
import { showError, showSuccess } from "../utils/toast.js"

const ExpenseContext = createContext(null)

const server = import.meta.env.VITE_API_URL
console.log(server)

export const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Other",
]

const defaultFilters = {
  category: "All",
  startDate: "",
  endDate: "",
  search: "",
}

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState(defaultFilters)

  function buildQuery(overrides = {}) {
    const merged = { ...filters, ...overrides }
    const query = {}

    if (merged.category && merged.category !== "All") {
      query.category = merged.category
    }
    if (merged.startDate && merged.endDate) {
      query.startDate = merged.startDate
      query.endDate = merged.endDate
    }

    return query
  }

  async function fetchExpenses(overrides = {}) {
    setLoading(true)
    try {
      const { data } = await axios.get(`${server}/api/expenses`, {
        params: buildQuery(overrides),
      })
      setExpenses(data.data)
    } catch (err) {
      console.log(err.response?.data?.message || err.message)
      showError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchSummary() {
    setLoading(true)
    try {
      const { data } = await axios.get(`${server}/api/expenses/summary`)
      setSummary(data.data)
    } catch (err) {
      console.log(err.response?.data?.message || err.message)
      showError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  async function addExpense(expense) {
    setLoading(true)
    try {
      const { data } = await axios.post(`${server}/api/expenses`, expense)
      setExpenses((prev) => [data.data, ...prev])
      showSuccess("Expense added successfully")
      await fetchSummary()
      return data
    } catch (err) {
      console.log(err.response?.data?.message || err.message)
      showError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  async function editExpense(id, expense) {
    setLoading(true)
    try {
      const { data } = await axios.put(`${server}/api/expenses/${id}`, expense)
      setExpenses((prev) =>
        prev.map((item) => (item._id === id ? data.data : item))
      )
      showSuccess("Expense updated successfully")
      await fetchSummary()
      return data
    } catch (err) {
      console.log(err.response?.data?.message || err.message)
      showError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  async function removeExpense(id) {
    setLoading(true)
    try {
      await axios.delete(`${server}/api/expenses/${id}`)
      setExpenses((prev) => prev.filter((item) => item._id !== id))
      showSuccess("Expense deleted successfully")
      await fetchSummary()
    } catch (err) {
      console.log(err.response?.data?.message || err.message)
      showError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  function updateFilters(next) {
    setFilters((prev) => ({ ...prev, ...next }))
  }

  function resetFilters() {
    setFilters(defaultFilters)
    showSuccess("Filters cleared")
  }

  // Client-side search filtration
  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      if (!filters.search) return true
      const query = filters.search.toLowerCase()
      const noteMatch = item.note && item.note.toLowerCase().includes(query)
      const categoryMatch = item.category && item.category.toLowerCase().includes(query)
      return noteMatch || categoryMatch
    })
  }, [expenses, filters.search])

  const value = {
    expenses: filteredExpenses,
    rawExpenses: expenses,
    summary,
    loading,
    filters,
    categories: CATEGORIES,
    fetchExpenses,
    fetchSummary,
    addExpense,
    editExpense,
    removeExpense,
    updateFilters,
    resetFilters,
    setFilters,
  }

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  )
}

export function useExpense() {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error("useExpense must be used within ExpenseProvider")
  }
  return context
}
