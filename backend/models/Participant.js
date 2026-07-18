const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    department: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "In Progress"
    },

    score: {
        type: Number,
        default: 0
    },

    answered: {
        type: Number,
        default: 0
    },

    correct: {
        type: Number,
        default: 0
    },

    wrong: {
        type: Number,
        default: 0
    },

    completed: {
        type: Boolean,
        default: false
    },

    startTime: {
        type: Date,
        default: Date.now
    },

    endTime: {
        type: Date,
        default: null
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Participant", participantSchema);