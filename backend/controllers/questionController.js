const Question = require("../models/Question");

// ===============================
// Create Question
// ===============================
const createQuestion = async (req, res) => {

    try {

        const {
            question,
            options,
            correctAnswer,
            category,
            difficulty,
            marks,
            image
        } = req.body;

        const newQuestion = new Question({
            question,
            options,
            correctAnswer,
            category,
            difficulty,
            marks,
            image
        });

        const savedQuestion = await newQuestion.save();

        res.status(201).json({
            success: true,
            message: "Question created successfully",
            data: savedQuestion
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Get All Questions
// ===============================
const getQuestions = async (req, res) => {

    try {

        const questions = await Question.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Delete Question
// ===============================
const deleteQuestion = async (req, res) => {

    try {

        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

        if (!deletedQuestion) {

            return res.status(404).json({
                success: false,
                message: "Question not found."
            });

        }

        res.status(200).json({
            success: true,
            message: "Question deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Export Controllers
// ===============================
module.exports = {
    createQuestion,
    getQuestions,
    deleteQuestion
};