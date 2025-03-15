const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./module/todo.module.js"); // Ensure correct file path
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
const port = 8000;
// const mongo_url = "mongodb://localhost:27017/todo";
const mongo_url ="mongodb+srv://balsangram1:756100@cluster0.ec1tvw7.mongodb.net/todo?retryWrites=true&w=majority"


// Middleware
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); 

// MongoDB Connection
mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Home Route
app.get("/", (req, res) => {
  res.send("ToDo server working");
});

// ✅ Add a Todo
app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required" });
    console.log("tasl");
// console.log(task);
console.log(Todo,"todo");

    const newTodo = new Todo({ task });
    console.log(newTodo, "2");

    await newTodo.save();
    console.log("3");

    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get All Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update a Todo
app.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );

    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete a Todo
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 ToDo server running on port ${port}`);
});
