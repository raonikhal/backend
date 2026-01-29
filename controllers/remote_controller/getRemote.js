const remotes = require("../../models/remote_model");

const getRemotes = async (req, res) =>{
  try{
   const remoteData = await remotes.find({});

   if(!remoteData){
    return res.status(400).json({message : "No Remotes found"});
   }

   res.status(200).json({message : "Remotes Fetched Successfully", remotes : remoteData});
  }catch(err){
   res.status(500).json({message : "Server Error", error : err});
  }
};

module.exports = getRemotes;