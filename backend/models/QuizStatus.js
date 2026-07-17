const mongoose = require("mongoose");

const quizStatusSchema = new mongoose.Schema({

    isPublished: {
        type: Boolean,
        default: false
    },

    publishedAt: {
        type: Date,
        default: null
    }

});

module.exports = mongoose.model("QuizStatus", quizStatusSchema);