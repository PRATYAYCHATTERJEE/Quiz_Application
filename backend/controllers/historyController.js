const QuizHistory = require("../models/QuizHistory");
const QuizSession = require("../models/QuizSession");
const Participant = require("../models/Participant");

exports.saveQuizHistory = async (req, res) => {

    try {

        // Active Quiz
        const session = await QuizSession.findOne({ isActive: true });

        if (!session) {

            return res.status(404).json({

                success: false,
                message: "No active quiz found"

            });

        }

        // Participants
        const participants = await Participant.find();

        const totalParticipants = participants.length;

        const completedParticipants =
            participants.filter(p => p.completed).length;

        // Average Score
        let averageScore = 0;

        if (totalParticipants > 0) {

            const totalScore = participants.reduce(

                (sum, p) => sum + p.score,

                0

            );

            averageScore = Math.round(totalScore / totalParticipants);

        }

        // Winner
        let winner = "-";

        if (participants.length > 0) {

            participants.sort((a, b) => b.score - a.score);

            winner = participants[0].name;

        }

        // Save History
        const history = await QuizHistory.create({

            quizTitle: session.quizTitle,

            totalQuestions: session.totalQuestions,

            totalParticipants,

            completedParticipants,

            averageScore,

            winner,

            startedAt: session.startedAt,

            endedAt: new Date()

        });

        res.status(201).json({

            success: true,

            data: history

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


exports.getQuizHistory = async (req, res) => {

    try {

        const history = await QuizHistory
            .find()
            .sort({ endedAt: -1 });

        res.json({

            success: true,

            data: history

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};