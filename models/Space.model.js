const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: String,
    adress: [
      {
        street: String,
        number: Number,
        complement: String,
        zipcode: String,
        district: String,
        city: String,
        principal: { type: Boolean, default: false },
      },
    ],
    details: [],
    spaceImages: [],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Space", spaceSchema);
