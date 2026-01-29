const Games = require("../../Models/games_model");

const getGames = async (req, res) => {
   try {
      const GamesData = await Games.find({});

      if (!GamesData) {
         return res.status(400).json({ message: "No Games Found" });
      }

      res.status(200).json({ message: "Games Fetched Successfully ✅", Games: GamesData });
   } catch (err) {
      res.status(500).json({ message: "Server Error ❌", err });

   }
};

module.exports = getGames;