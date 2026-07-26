const express = require("express");

const router = express.Router();

const {
    saveQuizHistory
} = require("../controllers/historyController");

router.post("/save", saveQuizHistory);

module.exports = router;