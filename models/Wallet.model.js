const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    balance: Number,
  },
  {timestamps: true,}
);

module.exports = mongoose.model("Wallet", walletSchema);
