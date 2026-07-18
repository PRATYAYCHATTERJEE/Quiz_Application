const Participant = require("../models/Participant");

// ==========================
// Register Participant
// ==========================
const registerParticipant = async (req, res) => {

    try {

        const {

            name,
            department,
            year,
            phone

        } = req.body;

        const participant = new Participant({

            name,
            department,
            year,
            phone

        });

        const savedParticipant = await participant.save();

        res.status(201).json({

            success: true,
            message: "Participant Registered Successfully",
            data: savedParticipant

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    registerParticipant

};