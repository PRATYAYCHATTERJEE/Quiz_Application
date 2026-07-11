const express = require("express");
const router = express.Router();

const {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} = require("../controllers/questionController");

// Create & Get All
router.route("/")
    .post(createQuestion)
    .get(getAllQuestions);

// Get One, Update & Delete
router.route("/:id")
    .get(getQuestionById)
    .put(updateQuestion)
    .delete(deleteQuestion);

module.exports = router;