const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  points_balance: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
