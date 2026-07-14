const express = require("express");
const router = express.Router();

const {
    createQuestion,
    getQuestions
} = require("../controllers/questionController");

// Create Question
router.post("/", createQuestion);

// Get All Questions
router.get("/", getQuestions);

module.exports = router;