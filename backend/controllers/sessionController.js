const QuizSession = require("../models/QuizSession");

exports.startQuiz = async (req, res) => {

    try {

        const { quizTitle, totalQuestions } = req.body;

        // Remove any previous active session
        await QuizSession.updateMany(
            { isActive: true },
            { isActive: false }
        );

        const session = await QuizSession.create({

            quizTitle,
            totalQuestions,

            isActive: true,

            startedAt: new Date()

        });

        res.status(201).json({

            success: true,

            data: session

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getSessionStatus = async (req, res) => {

    try {

        const session = await QuizSession.findOne({ isActive: true });

        res.json({

            success: true,

            data: session

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.endQuiz = async (req, res) => {

    try {

        const session = await QuizSession.findOne({ isActive: true });

        if (!session) {

            return res.status(404).json({

                success: false,

                message: "No active quiz found"

            });

        }

        session.isActive = false;

        session.endedAt = new Date();

        await session.save();

        res.json({

            success: true,

            message: "Quiz ended successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};