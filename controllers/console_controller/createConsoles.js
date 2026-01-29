const Consoles = require("../../models/consoles_model");

const createConsoles = async (req, res) => {
  try {
    const consoleData = req.body;

    const {adminID} = req.admin;

    const { Console, description, price } = consoleData;

    const image = req.files.img[0].path;
    const Video = req.files.video[0].path;

    if (!Console || !description || !price) {
      return res.status(400).json({ message: "All Fields are Required " });
    }

    if (!req.files || !req.files.img || !req.files.video) {
      return res.status(400).json({ message: "Image and Video are required" });
    }

    const newConsole = new Consoles({
      Console,
      description,
      price,
      img: image,
      video: Video,
      creatorID : adminID
    });

    await newConsole.save();

    res.status(200).json({ message: "Console Added Successfully ✅", console: newConsole });
  } catch (err) {
    res.status(500).json({ message: "Server Error ", error: err });
  }
};

module.exports = createConsoles; 
