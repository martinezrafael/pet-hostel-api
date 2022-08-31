const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    balance: {type:Number, default: 0},
  },
  {timestamps: true,}
);

module.exports = mongoose.model("Wallet", walletSchema);
