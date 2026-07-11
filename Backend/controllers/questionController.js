const Question = require("../models/Question");

const createQuestion = async (req, res) => {

    try {

        const question = await Question.create(req.body);

        res.status(201).json({
            success: true,
            message: "Question Created Successfully",
            data: question
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createQuestion
};