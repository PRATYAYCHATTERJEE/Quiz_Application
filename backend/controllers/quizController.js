const QuizStatus = require("../models/QuizStatus");

// Publish Quiz
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

module.exports = {
    publishQuiz
};