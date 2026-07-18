const express = require("express");
const router = express.Router();

const {
    registerParticipant
} = require("../controllers/participantController");

// Register Participant
router.post("/register", registerParticipant);

module.exports = router;