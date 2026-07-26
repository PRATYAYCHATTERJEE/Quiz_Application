const mongoose = require("mongoose");

const quizHistorySchema = new mongoose.Schema({

    quizTitle: {
        type: String,
        required: true
    },

    totalQuestions: {
        type: Number,
        default: 0
    },

    totalParticipants: {
        type: Number,
        default: 0
    },

    completedParticipants: {
        type: Number,
        default: 0
    },

    averageScore: {
        type: Number,
        default: 0
    },

    winner: {
        type: String,
        default: "-"
    },

    startedAt: {
        type: Date
    },

    endedAt: {
        type: Date
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("QuizHistory", quizHistorySchema);