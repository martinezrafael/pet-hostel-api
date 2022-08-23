const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: {type: String, unique: true, required: true},
  email: {type: String, unique: true, match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, lowercase: true},
  tel: String,
  about: String,
  adress: [
    {
      street: String,
      number: Number,
      complement: String,
      zipcode: String,
      district: String,
      city: String,
      principal: {type: Boolean, default: false}
    }
  ],
  spaces: [],
  password: String,
  score: Number,
  reviews: [],
  host: Boolean,
  guest: Boolean,
  preferences: [],
  typeOfHouse: String,
  price: Number,
  userAvatar: String,
  pets: []
});

module.exports = mongoose.model('User', userSchema);