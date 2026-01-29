const remotes = require("../../models/remote_model");

const createRemote = async (req, res) => {
  try {
    const { remoteName, description, price} = req.body;
    const {adminID} = req.admin;

    if (!remoteName || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log(req.files);

    if (!req.files || !req.files.img || !req.files.video) {
      return res.status(400).json({ message: "Image and Video are required" });
    }

    const imgPath = req.files.img[0].path;
    const videoPath = req.files.video[0].path;

    const newRemote = new remotes({
      remoteName,
      description,
      price,
      img: imgPath,
      video: videoPath,
      creatorID : adminID
    });

    await newRemote.save();

    res.status(201).json({ message: "Remote Controller Added Successfully ✅", remote : newRemote });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = createRemote;
