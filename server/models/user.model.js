const mongoose = require('mongoose')

const redemptionSchema = new mongoose.Schema({
  redemption_id: { type: String, required: true }, // redemption id
  redeemed_points: { type: Number, required: true }, // points redeemed
  redemption_date: { type: Date, required: true }, // date of redemption
  // redemption_source: { type: String, required: true }, // source of redemption
})

const pointsSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true }, // transaction id
  original_points: { type: Number, required: true }, // original points assigned in this transaction
  remaining_points: { type: Number, required: true }, // remaining points after redemptions
  assignment_date: { type: Date, required: true }, // date points were assigned
  expiry_date: { type: Date, required: true }, // date of expiry
  status: { type: String, required: true }, // status of points - could potentially be boolean, but string is more flexible given we're also using it for redemption status
  source_platform: { type: String, required: true }, // source of points - currently hardcoded to 'Web', but would normally be determined by the source of the request
  redemptions: { type: [redemptionSchema], default: [] }, // redemptions of points
})

const rewardPointSchema = new mongoose.Schema({
  points: { type: [pointsSchema], default: [] }, // points records
})

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // user id (unique)
  name: { type: String, required: true }, // user name
  email: { type: String, required: true, unique: true }, // user email (unique)
  points_balance: { type: Number, default: 0, required: false }, // points balance
  reward_points: {
    type: rewardPointSchema,
    default: { points: [] },
  },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = {
  UserModel,
}
