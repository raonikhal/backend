const Consoles = require("../../models/consoles_model");
const { message } = require("../../validation/loginValidation");

const getConsoles = async (req, res) =>{
  try{
   const consoleData = await Consoles.find({});

   if(!consoleData){
    return res.status(400).json({message : "No Consoles found"});
   }

   res.status(200).json({message : "Consoles Fetched Successfully", consoles : consoleData});
  }catch(err){
   res.status(500).json({message : "Server Error", error : err});
  }
};

module.exports = getConsoles;