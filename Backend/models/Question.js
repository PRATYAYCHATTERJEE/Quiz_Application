const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
{
    question:{
        type:String,
        required:true
    },

    options:{
        type:[String],
        required:true,

        validate:{
            validator:function(value){
                return value.length===4;
            },
            message:"Question must have exactly 4 options."
        }
    },

    correctAnswer:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        default:"General"
    },

    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        default:"Easy"
    },

    marks:{
        type:Number,
        default:1
    },

    image:{
        type:String,
        default:""
    }

},
{
    timestamps:true
}
);

module.exports=mongoose.model("Question",questionSchema);