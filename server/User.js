const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  points_balance: { type: Number, required: true },
})

module.exports = mongoose.model('User', UserSchema)
