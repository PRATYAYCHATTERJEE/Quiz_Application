const mongoose = require("mongoose");

const quizSessionSchema = new mongoose.Schema(
{
    quizTitle: {
        type: String,
        required: true
    },

    totalQuestions: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: false
    },

    startedAt: {
        type: Date
    },

    endedAt: {
        type: Date
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("QuizSession", quizSessionSchema);