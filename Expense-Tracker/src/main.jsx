import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppToaster from './components/AppToaster.jsx'
import { ExpenseProvider } from './context/ExpenseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExpenseProvider>
      <App />
      <AppToaster />
    </ExpenseProvider>
  </StrictMode>,
)
