const Games = require("../../Models/games_model");

const deleteGame = async (req, res) => {
  try {
    const { gameID } = req.params;
    const {adminID} = req.admin;

    const gameData = await Games.findOneAndDelete({ _id: gameID, creatorID : adminID }, { new: true });

    if (!gameData) {
      return res.status(400).json({ message: "Oho ! Game Not Found 😐" });
    }

    res.status(200).json({ message: "Game Deleted Successfully ☺️", game: gameData });

  } catch (err) {
    res.status(500).json({ message: "Server Error ", err });
  }
};

module.exports = deleteGame;