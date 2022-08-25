const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 300 },
    type: String,
    adress: [
      {
        street: String,
        number: Number,
        complement: String,
        district: String,
        city: String,
        zipcode: String,
        principal: { type: Boolean, default: false },
      },
    ],
    details: [],
    spaceImages: [],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Space", spaceSchema);
