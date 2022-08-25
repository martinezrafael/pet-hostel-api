const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {type: String, default:''},
    lastName: {type: String, default:''},
    userAvatar: {type: String, default:''},
    userName: { type: String, unique: true, required: true },
    email: {type: String, unique: true, lowercase: true, required: true, match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/},
    password: {type: String, required: true},
    about: {type: String, maxlength: 300, default:''},
    host:{type: Boolean, default: false},
    guest:{type: Boolean, default: false},
    score: {type: Number, default: 0},
    tel: {type: String, default:'00 000000000', match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/},
    pets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    preferences: [],
    price: {type: Number, default: 0},
    wallet: {type: mongoose.Schema.Types.ObjectId, ref: 'Wallet'},
  },
  { timestamps: true, }
);

module.exports = mongoose.model("User", userSchema);
