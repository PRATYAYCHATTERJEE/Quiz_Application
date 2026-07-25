const express = require("express");

const router = express.Router();

const {

    startQuiz,
    getSessionStatus,
    endQuiz

} = require("../controllers/sessionController");

router.post("/start", startQuiz);
router.get("/status", getSessionStatus);
router.post("/end", endQuiz);
module.exports = router;