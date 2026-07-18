const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");
const participantRoutes = require("./routes/participantRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/participants", participantRoutes);


app.get("/", (req, res) => {
    res.send("🚀 QuizVerse Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});