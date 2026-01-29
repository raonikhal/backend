const mongoose = require("mongoose");

const purchasesSchema = new mongoose.Schema({

    userID: { type: String },
    productID: { type: String },
    productName: { type: String },
    productImage: { type: String },
    purchasePrice: { type: Number },
    purchasedAt: { type: Date, default: Date.now }
});

const Purchases = mongoose.model("Purchases", purchasesSchema);

module.exports = Purchases;
