const remotes = require("../../models/remote_model");

const updateRemote = async (req, res) => {
  try{
    const {remoteID} = req.params;
    const {remoteName, description, price} = req.body;
    const {adminID} = req.admin;

    const remoteData = await remotes.findById(remoteID);

    if(!remoteData)
    {
      return res.status(400).json({message : "couldn't find the data 😐"});
    }

    let remoteImage = remoteData.img;
    let remoteVideo = remoteData.video;

    if(req.files.img){
       remoteImage = req.files.img[0].path;
    }

    if(req.files.video){
       remoteVideo = req.files.video[0].path;
    }

    const updatedData = {
        remoteName,
        description,
        price,
        img : remoteImage,
        video : remoteVideo,
        creatorID : adminID
    };

    const updatedRemote = await remotes.findByIdAndUpdate({_id : remoteID, creatorID : adminID}, updatedData, {new : true});

    res.status(200).json({message : "Remote Data Updated successfully", remotes : updatedRemote});

  }catch(err){
    res.status(500).json({ message: "Server Error! Couldn't update the Consoles" });
  }
};

module.exports = updateRemote;