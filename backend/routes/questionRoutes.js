const express = require("express");
const router = express.Router();

const {
    createQuestion,
    getQuestions,
    deleteQuestion
} = require("../controllers/questionController");

// Create Question
router.post("/", createQuestion);

// Get All Questions
router.get("/", getQuestions);

// Delete Question
router.delete("/:id", deleteQuestion);

module.exports = router;