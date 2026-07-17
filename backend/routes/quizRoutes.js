const express = require("express");
const router = express.Router();

const {
    publishQuiz,
    getQuizStatus
} = require("../controllers/quizController");

// Publish Quiz
router.post("/publish", publishQuiz);

// Get Quiz Status
router.get("/status", getQuizStatus);

module.exports = router;