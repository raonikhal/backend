// const mongoose = require("mongoose");

// const gamesRentHost = new mongoose.Schema({

//     title: { type: String, required: true },
//     days: {type: Number,required: true},
//     securityMoney: { type: Number, required: true },
//     Rent: { type: Boolean, default: false },
//     ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     totalPayableAmount: {
//         type: Number,
//         required: true,
//         default: 0
//     },

// }, { timestamps: true });

// const RentGame = mongoose.model("RentGame", gamesRentHost);

// module.exports = RentGame;


// const mongoose = require("mongoose");

// const RentItems = new mongoose.Schema({
//   name : {type : String, required : true},
//   description : {type : String, required : true},
//   price : {type : Number, required : true},
//   // securityAmount 
//   img : {type : String, required : true},
//   video : {type : String, required : true},
//   item : {type : String, required : true},
//   creatorID : {type : String}
// });
// const Rent = mongoose.model("Rent", RentItems);

// module.exports = Rent;



const mongoose = require("mongoose");

const RentItems = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  img: { type: String, required: true },
  video: { type: String, required: true },

  item: { type: String, required: true },

  creatorID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // 👇 rent related
  Rent: { type: Boolean, default: false },

  rentedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }

}, { timestamps: true });

module.exports = mongoose.model("Rent", RentItems);

