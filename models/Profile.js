const mongoose = require("mongoose");
const profileschema=new mongoose.Schema({
   user:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'user'
   },
    registerno:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    academicdetails:{
        sslc:{
            type:String,
            
        },
        sslcpassedyear:{
            type:String
        },
        sslcpercentage:{
            type:String
        },
        hsc:{
            type:String,
            
        },
        hscpassedyear:{
            type:String
        },
        hscpercentage:{
            type:String
        },
        degree:{
            type:String,
            
        },
        degreepassedyear:{
            type:String
        },
        degreepercentage:{
            type:String
        }
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String,
    },
    projects:{
        type:String
    }
});
module.exports=Profile=mongoose.model('userprofile',profileschema);