const Consoles = require("../../models/consoles_model");
const Games = require("../../models/games_model");
const Purchases = require("../../models/purchases_model");
const remotes = require("../../models/remote_model");

const buyGame = async (req, res) => {
  try {
    const userID = req.user.id;
    const productID = req.params.id;

    const game = await Games.findById(productID);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const purchase = await Purchases.create({
      userID,
      productID: game._id,
      productName: game.name,
      productImage: game.img,
      purchasePrice: game.price,
    });

    res.status(201).json({ message: "Game purchased successfully", purchase: purchase });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const buyConsole = async (req, res) => {
  try {
    const userID = req.user.id;
    const productID = req.params.id;

    const consoleData = await Consoles.findById(productID);
    if (!consoleData) {
      return res.status(404).json({ message: "Console not found" });
    }

    const purchase = await Purchases.create({
      userID,
      productID: consoleData._id,
      productName: consoleData.Console,
      productImage: consoleData.img,
      purchasePrice: consoleData.price,
    });

    res.status(201).json({ message: "Console purchased successfully", purchase: purchase });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const buyRemote = async (req, res) => {
  try {
    const userID = req.user.id;
    const productID = req.params.id;

    const remote = await remotes.findById(productID);
    if (!remote) {
      return res.status(404).json({ message: "Remote not found" });
    }

    const purchase = await Purchases.create({
      userID,
      productID: remote._id,
      productName: remote.remoteName,
      productImage: remote.img,
      purchasePrice: remote.price,
    });

    res.status(201).json({ message: "Remote purchased successfully", purchase: purchase });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getMyPurchases = async (req, res) => {
  try {
    const userID = req.user.id;  

    const userpurchases = await Purchases.find({ userID });

    res.status(200).json({ message: "Purchased Items :", totalItems: userpurchases.length, purchases: userpurchases });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = { buyGame, buyConsole, buyRemote, getMyPurchases };