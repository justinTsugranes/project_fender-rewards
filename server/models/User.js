const mongoose = require('mongoose');
const PointSchema = require('./Point');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  points: [PointSchema],
});

module.exports = mongoose.model('User', UserSchema);
