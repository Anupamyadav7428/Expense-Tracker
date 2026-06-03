import toast from "react-hot-toast"

const baseStyle = {
  background: "var(--bg)",
  color: "var(--text-h)",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow)",
}

const options = {
  duration: 3000,
  style: baseStyle,
}

export const showSuccess = (message) =>
  toast.success(message, {
    ...options,
    iconTheme: { primary: "#22c55e", secondary: "var(--bg)" },
  })

export const showError = (message) =>
  toast.error(message, {
    ...options,
    duration: 4000,
    iconTheme: { primary: "#ef4444", secondary: "var(--bg)" },
  })

export const showLoading = (message) =>
  toast.loading(message, options)

export const dismissToast = (toastId) => toast.dismiss(toastId)

export const runWithToast = (promise, messages) =>
  toast.promise(promise, messages, options)

export { toast }
