const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    userAvatar: String,
    userName: { type: String, unique: true, required: true },
    about: {type: String, maxlength: 400},
    host: Boolean,
    guest: Boolean,
    score: Number,
    email: {type: String,unique: true,match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,lowercase: true},
    password: String,
    tel: {type: String,unique: true,match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/},
    pets: [{type: Schema.Types.ObjectId, ref: 'Pet'}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    preferences: [],
    price: Number,
    wallet: {type: Schema.Types.ObjectId, ref: 'Wallet'},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
