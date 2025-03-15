const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true, // Ensure task is not empty
      trim: true, // Remove extra spaces
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo; // ✅ Correct export syntax
