const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    video: { type: String, required: true },
    genre: { type: String, required: true },
    creatorID: { type: String }
});


const Games = mongoose.models.Games || mongoose.model("Games", gamesSchema);

module.exports = Games;
