const Question = require("../models/Question");

// Create a new question
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

    // Create question
    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      category,
      difficulty,
      marks,
      image,
    });

    // Save to MongoDB
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

module.exports = {
  createQuestion,
};