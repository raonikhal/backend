const Rent = require("../../models/gameHostRent_model");

// CREATE ITEM FOR RENT
const Rentitem = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { name, description, price, item } = req.body;

    if (!name || !description || !price || !item) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = req.files.img[0].path;
    const video = req.files.video[0].path;

    const newItem = await Rent.create({
      name,
      description,
      price,
      img: image,
      video,
      item,
      creatorID: userID
    });

    res.status(201).json({ message: "Item added for rent successfully", item: newItem });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const deleteRentedItem = async (req, res) => {
  try {
    const { ItemId } = req.params;
    const userId = req.user.userId;

    const itemData = await Rent.findOneAndDelete({
      _id: ItemId,
      creatorID: userId,
    });

    if (!itemData) {
      return res.status(400).json({ message: "Item Not Found" });
    }

    res.status(200).json({ message: "Item Deleted", item: itemData });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};




// USER TAKES ITEM ON RENT
const itemTolet = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;

    const item = await Rent.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.Rent) {
      return res.status(400).json({ message: "Item already rented" });
    }

    item.Rent = true;
    item.rentedBy = userId;

    await item.save();

    res.status(200).json({ message: "Item rented successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// MY LISTED ITEMS
const getMyListedItems = async (req, res) => {         //jo user ne rent par dala hua hai vo items....... !
  const userId = req.user.userId;
  const items = await Rent.find({ creatorID: userId });
  res.json({ Items: items });
};


const getAllListedItems = async (req, res) => {     
  const items = await Rent.find({});
  res.json({ Items: items });
};


// MY RENTED ITEMS
const getMyTakenOnRent = async (req, res) => {      //jo user ne rent liya hua hai...... !!!!
  const userId = req.user.userId;
  const items = await Rent.find({ rentedBy: userId, Rent: true });
  res.json({ Items: items });
};







module.exports = { Rentitem, itemTolet, getMyListedItems, getMyTakenOnRent, getAllListedItems,deleteRentedItem };
