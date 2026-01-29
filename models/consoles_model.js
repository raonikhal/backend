const mongoose = require("mongoose");

const ConsoleSchema = new mongoose.Schema({
    Console: { type: String, required: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    img: { type: String, required: true, },
    video: { type: String, required: true, },
    creatorID: { type: String }
});

const Consoles = mongoose.model("Consoles", ConsoleSchema);

module.exports = Consoles;