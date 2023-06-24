const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  points: [
    {
      points: { type: Number, required: true },
      dateAcquired: { type: Date, required: true },
      dateRedeemed: { type: Date },
      redeemed: { type: Boolean, required: true },
      expiryDate: { type: Date, required: true },
      source: { type: String, required: true },
      transactionId: { type: String, required: true },
    },
  ],
  pointsRedemptionHistory: [
    {
      points: { type: Number, required: true },
      dateRedeemed: { type: Date, required: true },
      source: { type: String, required: true },
      transactionId: { type: String, required: true },
    },
  ],
})

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel

// Version 3

// const UserSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   points: [PointSchema],
// });

// Version 2

// const userSchema = new mongoose.Schema({
//   userId: { type: Number, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   points: [
//     {
//       points: { type: Number, required: true },
//       dateAcquired: { type: Date, required: true },
//       dateRedeemed: { type: Date },
//       redeemed: { type: Boolean, required: true },
//       expiryDate: { type: Date, required: true },
//       source: { type: String, required: true },
//       transactionId: { type: String, required: true },
//     },
//   ],
//   totalPointsEarned: { type: Number, required: true },
//   pointsRedemptionHistory: [
//     {
//       points: { type: Number, required: true },
//       dateRedeemed: { type: Date, required: true },
//       source: { type: String, required: true },
//       transactionId: { type: String, required: true },
//     },
//   ],
// })

// Version 1

// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   points: { type: Number, default: 0 },
// })

// module.exports = mongoose.model('userModel', userSchema)