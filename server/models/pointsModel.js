const mongoose = require('mongoose')

// Version 2

const pointsSchema = new mongoose.Schema({
  points: { type: Number, required: true },
  dateAcquired: { type: Date, required: true },
  dateRedeemed: { type: Date },
  redeemed: { type: Boolean, required: true },
  expiryDate: { type: Date, required: true },
  source: { type: String, required: true },
  transactionId: { type: String, required: true },
})

module.exports = mongoose.model('Points', pointsSchema)


// Version 1

// const pointsSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   points: { type: Number, required: true },
// })