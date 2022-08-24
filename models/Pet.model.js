const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: String,
    size: { type: Number, required: true },
    castrated: { type: Boolean, required: true, default: false },
    vaccinated: { type: Boolean, required: true, default: false },
    petAvatar: String,
    temperament: [],
    owner: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pet", petSchema);
