const express = require("express");
const router = express.Router();

const { publishQuiz } = require("../controllers/quizController");

// Publish Quiz
router.post("/publish", publishQuiz);

module.exports = router;