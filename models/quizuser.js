const mongoose = require("mongoose");
const quizuser=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    quizuser:{
        quiz:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'quiz'
        },
        question:{
            qno:{
                type:String
            },
            ans:{
                type:String
            },
            points:{
                type:String
            }
        }
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=Quizuser=mongoose.model('userquiz','userquiz');