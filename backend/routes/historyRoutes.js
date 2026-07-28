const express = require("express");

const router = express.Router();

const {

    saveQuizHistory,

    getQuizHistory

} = require("../controllers/historyController");

router.post("/save", saveQuizHistory);

router.get("/", getQuizHistory);

module.exports = router;