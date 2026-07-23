const express = require("express");
const router = express.Router();

const {
    registerParticipant,
    saveAnswer,
    finishQuiz,
    getParticipants,
    getLeaderboard
} = require("../controllers/participantController");

// Register Participant
router.post("/register", registerParticipant);
router.post("/save-answer", saveAnswer);
router.post("/finish", finishQuiz);
router.get("/", getParticipants);
router.get("/leaderboard", getLeaderboard);
module.exports = router;