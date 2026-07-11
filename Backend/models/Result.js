const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
{
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Participant",
        required:true
    },

    score:{
        type:Number,
        default:0
    },

    correct:{
        type:Number,
        default:0
    },

    wrong:{
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
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Result",resultSchema);