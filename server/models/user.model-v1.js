const mongoose = require('mongoose')

const rewardPointSchema = new mongoose.Schema({
  transaction_id: { type: String }, // transaction id
  points: { type: Number, required: true }, // points acquired
  acquired_date: { type: Date, required: true }, // date acquired
  expiry_date: { type: Date, required: true }, // date of expiry
  is_redeemed: { type: Boolean, default: false }, // are the points redeemed?
  redeemed_date: { type: Date }, // date redeemed
  source_platform: { type: String, required: true }, // source of points
})

const userSchema = new mongoose.Schema({
  id: { type: String, required: true }, // user id
  name: { type: String, required: true }, // user name
  email: { type: String, required: true, unique: true }, // user email
  points_balance: { type: Number, default: 0 }, // points balance
  reward_points: [rewardPointSchema], // points acquired
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
