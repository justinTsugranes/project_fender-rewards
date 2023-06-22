// routes/points.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Earn points
router.post('/earn', async (req, res) => {
  try {
    const { userId, pointsEarned } = req.body;

    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the earned points to the user's balance
    user.points_balance += pointsEarned;

    // Save the updated user in the database
    await user.save();

    // Create a transaction record for the earned points
    const transaction = new Transaction({
      userId,
      points: pointsEarned,
    });
    await transaction.save();

    res.json({ updatedPoints: user.points_balance });
  } catch (error) {
    console.error('An error occurred during points earning:', error);
    res.status(500).json({ message: 'Points earning failed' });
  }
});

// Redeem points
router.post('/redeem', async (req, res) => {
  try {
    const { userId, pointsToRedeem } = req.body;

    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has enough points to redeem
    if (user.points_balance < pointsToRedeem) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    // Deduct the redeemed points from the user's balance
    user.points_balance -= pointsToRedeem;

    // Save the updated user in the database
    await user.save();

    // Create a transaction record for the redemption
    const transaction = new Transaction({
      userId,
      points: -pointsToRedeem, // Negative value indicates redemption
    });
    await transaction.save();

    res.json({ updatedPoints: user.points_balance });
  } catch (error) {
    console.error('An error occurred during points redemption:', error);
    res.status(500).json({ message: 'Points redemption failed' });
  }
});

// Check points balance
router.get('/balance/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ pointsBalance: user.points_balance });
  } catch (error) {
    console.error('An error occurred while checking points balance:', error);
    res.status(500).json({ message: 'Failed to check points balance' });
  }
});

module.exports = router;