const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: {type: String, maxlength: 400},
    size: { type: Number, required: true },
    castrated: { type: Boolean, required: true, default: false },
    vaccinated: { type: Boolean, required: true, default: false },
    petAvatar: String,
    temperament: String,
    owner: {type:Schema.Types.ObjectId, ref:'User'},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pet", petSchema);
