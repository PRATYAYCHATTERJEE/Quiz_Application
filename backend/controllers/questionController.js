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
      image,
    } = req.body;

    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      category,
      difficulty,
      marks,
      image,
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: savedQuestion,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

module.exports = {
  createQuestion,
  getQuestions
};