const Games = require("../../Models/games_model");

const createGames = async (req, res) => {
  try {
    const { name, description, price, genre } = req.body;

    const {adminID} = req.admin;

    if (!name || !description || !price || !genre) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || !req.files.img || !req.files.video) {
      return res.status(400).json({ message: "Image and Video are required" });
    }

    const imgPath = req.files.img[0].path;
    const videoPath = req.files.video[0].path;

    const newGame = new Games({
      name,
      description,
      price,
      genre,
      img: imgPath,
      video: videoPath,
      creatorID : adminID
    });

    await newGame.save();

    res.status(201).json({ message: "Game Added Successfully ✅", game: newGame });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = createGames;
