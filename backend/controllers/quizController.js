const QuizStatus = require("../models/QuizStatus");
const QuizSession = require("../models/QuizSession");
const Question = require("../models/Question");


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

        // Close any previous live session
        await QuizSession.updateMany(
            { isActive: true },
            { isActive: false }
        );

        // Count questions
        const totalQuestions = await Question.countDocuments();

        // Create new live session
        const session = await QuizSession.create({

            quizTitle: "C Programming Quiz", // we'll improve this later

            totalQuestions,

            isActive: true,

            startedAt: new Date()

        });

        res.status(200).json({

            success: true,

            message: "Quiz Published Successfully",

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