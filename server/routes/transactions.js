const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')
const User = require('../models/User')

// Create Transaction
router.post('/', async (req, res) => {
  const user = await User.findOne({ id: req.body.user_id })
  if (!user) return res.status(404).json({ message: 'User not found' })

  const points = req.body.points
  if (user.points_balance + points <= 0) {
    return res.status(400).json({ message: 'Insufficient points' })
  }

  const transaction = new Transaction({
    user_id: req.body.user_id,
    payer: req.body.payer,
    points: req.body.points,
  })
  const newTransaction = await transaction.save()

  // Also update user's points_balance
  user.points_balance += req.body.points
  await user.save()

  res.status(201).json(newTransaction)
})

// Spend points
router.post('/spend', async (req, res) => {
  // Get user from database
  const user = await User.findOne({ id: req.body.user_id })

  // Check if user exists
  if (!user) return res.status(404).json({ message: 'User not found' })

  // Get the points to be spent from the request body
  let pointsToSpend = req.body.points

  // Check if the user has enough points
  if (user.points_balance < pointsToSpend) {
    return res.status(400).json({ message: 'Insufficient points' })
  }

  // Get the user's transactions, sorted by timestamp
  const transactions = await Transaction.find({
    user_id: req.body.user_id,
  }).sort('timestamp')

  // Array to hold the points deducted from each payer
  let pointsDeducted = []

  // Iterate over the transactions
  for (let transaction of transactions) {
    // If the transaction points are less or equal to the points to spend
    if (transaction.points <= pointsToSpend) {
      // Deduct the points of the transaction from the points to spend
      pointsToSpend -= transaction.points

      // Add the deducted points to the corresponding payer
      pointsDeducted.push({
        payer: transaction.payer,
        points: -transaction.points,
      })

      // Mark the transaction points as zero
      transaction.points = 0
    } else {
      // Deduct the points to spend from the transaction points
      transaction.points -= pointsToSpend

      // Add the deducted points to the corresponding payer
      pointsDeducted.push({ payer: transaction.payer, points: -pointsToSpend })

      // The points to spend are zero now
      pointsToSpend = 0
    }

    // Save the transaction
    await transaction.save()

    // If the points to spend are zero, break the loop
    if (pointsToSpend === 0) break
  }

  // Update the user's points balance
  user.points_balance -= req.body.points
  await user.save()

  res.json(pointsDeducted)
})

module.exports = router