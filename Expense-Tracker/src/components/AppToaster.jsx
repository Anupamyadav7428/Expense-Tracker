import { Toaster } from "react-hot-toast"

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--bg)",
          color: "var(--text-h)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        },
        success: {
          duration: 3000,
          iconTheme: { primary: "#22c55e", secondary: "var(--bg)" },
        },
        error: {
          duration: 4000,
          iconTheme: { primary: "#ef4444", secondary: "var(--bg)" },
        },
        loading: {
          iconTheme: { primary: "var(--accent)", secondary: "var(--bg)" },
        },
      }}
    />
  )
}
