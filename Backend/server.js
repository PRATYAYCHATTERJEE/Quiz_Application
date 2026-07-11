const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import Routes
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("QuizVerse Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});