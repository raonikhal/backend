const Games = require("../../Models/games_model");

const updateGame = async (req, res) => {
    try {
        const { name, description, price, genre } = req.body;
        const { gameID } = req.params;
        const {adminID} = req.admin;

        if (!name || !description || !price || !genre) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const gameData = await Games.findById(gameID);

        if (!gameData) {
            return res.status(400).json({ message: "Game Not Found" });
        }

        let gameImage = gameData.img;

        if (req.files.img) {
            gameImage = req.files.img[0].path;
        }

        let gameVideo = gameData.video;

        if (req.files.video) {
            gameVideo = req.files.video[0].path;
        }

        const updatedData = {
            name,
            description,
            price,
            img: gameImage,
            video: gameVideo,
            genre,
            creatorID : adminID
        }

        const updatedGame = await Games.findOneAndUpdate({ _id: gameID, creatorID : adminID}, updatedData, { new: true });

        res.status(200).json({ message: "Game Data Updated Succefully ✅", data: updatedGame })

    } catch (err) {
        res.status(500).json({ message: "Server Error! Couldn't update the Game" });
    }
};

module.exports = updateGame;