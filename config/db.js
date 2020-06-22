const mongoose = require("mongoose");
const config = require("config");
const db=config.get('mongoURI');
const connectdb = async() =>{
try {
    mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useFindAndUpdate: true
    });
    console.log("mongodb connected");
    
} catch (err) {
    console.log(err.message);
    process.exit(1);
}
}
module.exports= connectdb;