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

        const existingParticipant = await Participant.findOne({ phone });

if (existingParticipant) {
    return res.status(400).json({
        success: false,
        message: "Phone number already registered."
    });
}

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


// ==========================
// Save Answer
// ==========================
const saveAnswer = async (req, res) => {

    try {

        const {
            participantId,
            questionId,
            selectedOption
        } = req.body;

        const participant = await Participant.findById(participantId);

        if (!participant) {

            return res.status(404).json({
                success: false,
                message: "Participant not found"
            });

        }

        const existingAnswer = participant.answers.find(
            answer => answer.questionId.toString() === questionId
        );

        if (existingAnswer) {

            existingAnswer.selectedOption = selectedOption;

        } else {

            participant.answers.push({

                questionId,
                selectedOption

            });

        }

        await participant.save();

        res.json({

            success: true,
            message: "Answer Saved"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


module.exports = {

    registerParticipant,
    saveAnswer
};