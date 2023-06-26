const mongoose = require('mongoose')

const redeemedPointsSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true }, // transaction id
  points: { type: Number, required: true }, // points redeemed
  redeemed_date: { type: Date, required: true }, // date redeemed
  source_platform: { type: String, required: true }, // source of points
})

const expiredPointsSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true }, // transaction id
  points: { type: Number, required: true }, // points expired
  expired_date: { type: Date, required: true }, // date expired
  source_platform: { type: String, required: true }, // source of points
})

const activePointsSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true }, // transaction id
  points: { type: Number, required: true }, // points acquired
  acquired_date: { type: Date, required: true }, // date acquired
  expiry_date: { type: Date, required: true }, // date expired
  source_platform: { type: String, required: true }, // source of points
})

const rewardPointSchema = new mongoose.Schema({
  active_points: { type: [activePointsSchema], default: [] }, // active points records
  redeemed_points: { type: [redeemedPointsSchema], default: [] }, // redeemed points records
  expired_points: { type: [expiredPointsSchema], default: [] }, // expired points records
})

const userSchema = new mongoose.Schema({
  id: { type: String, required: true }, // user id
  name: { type: String, required: true }, // user name
  email: { type: String, required: true, unique: true }, // user email
  points_balance: { type: Number, default: 0, required: false }, // points balance
  reward_points: {
    type: rewardPointSchema,
    default: { active_points: [], redeemed_points: [], expired_points: [] },
  },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = {
  UserModel,
}
