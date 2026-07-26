const Participant = require("../models/Participant");
const Question = require("../models/Question");

exports.getDashboardStats = async (req, res) => {

    try {

        // Total Participants
        const totalParticipants = await Participant.countDocuments();

        // Total Questions
        const totalQuestions = await Question.countDocuments();

        // Completed Participants
        const completedParticipants = await Participant.countDocuments({
            completed: true
        });

        // Get participant scores
        const participants = await Participant.find({}, "score");

        let averageScore = 0;

        if (participants.length > 0) {

            const totalScore = participants.reduce((sum, participant) => {

                return sum + participant.score;

            }, 0);

            averageScore = Math.round(totalScore / participants.length);

        }

        res.json({

            success: true,

            data: {

                participants: totalParticipants,

                questions: totalQuestions,

                completed: completedParticipants,

                averageScore

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};