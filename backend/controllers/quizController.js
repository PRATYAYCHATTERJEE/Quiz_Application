const QuizStatus = require("../models/QuizStatus");

// =========================
// Publish Quiz
// =========================
const publishQuiz = async (req, res) => {

    try {

        let quiz = await QuizStatus.findOne();

        if (!quiz) {

            quiz = new QuizStatus();

        }

        quiz.isPublished = true;
        quiz.publishedAt = new Date();

        await quiz.save();

        res.status(200).json({

            success: true,
            message: "Quiz Published Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =========================
// Get Quiz Status
// =========================
const getQuizStatus = async (req, res) => {

    try {

        const quiz = await QuizStatus.findOne();

        res.status(200).json({

            success: true,
            isPublished: quiz ? quiz.isPublished : false

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =========================
// Export Controllers
// =========================
module.exports = {

    publishQuiz,
    getQuizStatus

};