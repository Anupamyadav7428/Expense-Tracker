import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Food",
        "Transport",
        "Bills",
        "Entertainment",
        "Other",
      ],
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Expense = mongoose.model("Expense", expenseSchema)

export default Expense