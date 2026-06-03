import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./config/db.js"

import expenseRoutes from "./routes/expenseRoute.js"



// Load Environment Variables FIRST
dotenv.config()



const app = express()



// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))

app.use(express.json())

app.use(express.urlencoded({
  extended: true,
}))



// Routes
app.use("/api/expenses", expenseRoutes)



// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Muneem API Running",
  })
})



// Connect DB + Start Server
const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {

  await connectDB()

  console.log(`Server is running on port ${PORT}`)
})