const express = require("express");
const router = express.Router();

const {
    registerParticipant,
    saveAnswer
} = require("../controllers/participantController");

// Register Participant
router.post("/register", registerParticipant);
router.post("/save-answer", saveAnswer);
module.exports = router;