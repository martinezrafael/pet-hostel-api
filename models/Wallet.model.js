const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  value: Number,
});

module.exports = mongoose.model('Wallet', walletSchema);