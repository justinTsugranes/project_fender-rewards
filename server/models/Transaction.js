const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  payer: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Transaction', TransactionSchema)
