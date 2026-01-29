const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const ConnectDB = async() => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URL);
       console.log("MongoDB connected Sucressfully ✅");
    }catch(err){
       console.log("Error in Connecting MongoDB", err);
    }
}

module.exports = ConnectDB;