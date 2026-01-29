const Consoles = require("../../models/consoles_model");

const updateConsole = async (req, res) => {
  try{
    const {consoleID} = req.params;

    const {Console, description, price} = req.body;

    const {adminID} = req.admin;

    const consoleData = await Consoles.findById(consoleID);

    if(!consoleData)
    {
      return res.status(400).json({message : "couldn't find the data 😐"});
    }

    let ConsoleImage = consoleData.img;
    let ConsoleVideo = consoleData.video;

    if(req.files.img){
       ConsoleImage = req.files.img[0].path;
    }

    if(req.files.video){
       ConsoleVideo = req.files.video[0].path;
    }

    const updatedData = {
        Console,
        description,
        price,
        img : ConsoleImage,
        video : ConsoleVideo,
        creatorID : adminID
    };

    const updatedConsole = await Consoles.findByIdAndUpdate({_id : consoleID, creatorID : adminID}, updatedData, {new : true});

    res.status(200).json({message : "Console Data Updated successfully", console : updatedConsole});

  }catch(err){
    res.status(500).json({ message: "Server Error! Couldn't update the Consoles" });
  }
};

module.exports = updateConsole;