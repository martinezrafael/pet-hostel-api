const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {type: String, required: true, maxlength: 300},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);