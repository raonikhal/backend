const mongoose = require("mongoose");

const remoteSchema = new mongoose.Schema({
    remoteName: { type: String, required: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    img: { type: String, required: true, },
    video: { type: String, required: true, },
    creatorID: { type: String }
});

const remotes = mongoose.model("remotes", remoteSchema);

module.exports = remotes;