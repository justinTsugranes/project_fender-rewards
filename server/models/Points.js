const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: true,
  },
  dateAcquired: {
    type: Date,
    required: true,
  },
  dateRedeemed: {
    type: Date,
    default: null,
  },
  redeemed: {
    type: Boolean,
    required: true,
  },
});

module.exports = PointSchema;
