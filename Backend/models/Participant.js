const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        default:"",
        trim:true,
        lowercase:true
    },

    score:{
        type:Number,
        default:0
    },

    correctAnswers:{
        type:Number,
        default:0
    },

    wrongAnswers:{
        type:Number,
        default:0
    },

    totalQuestions:{
        type:Number,
        default:0
    },

    percentage:{
        type:Number,
        default:0
    },

    timeTaken:{
        type:Number,
        default:0
    },

    submitted:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Participant", participantSchema);