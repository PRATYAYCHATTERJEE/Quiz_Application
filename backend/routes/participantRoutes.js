const express = require("express");
const router = express.Router();

const {
    registerParticipant,
    saveAnswer,
    finishQuiz
} = require("../controllers/participantController");

// Register Participant
router.post("/register", registerParticipant);
router.post("/save-answer", saveAnswer);
router.post("/finish", finishQuiz);
module.exports = router;