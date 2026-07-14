const express = require("express");
const router = express.Router();

const { createQuestion } = require("../controllers/questionController");

// Create Question
router.post("/", createQuestion);

module.exports = router;