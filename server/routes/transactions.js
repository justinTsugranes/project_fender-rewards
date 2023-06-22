const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Create Transaction
router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const points = req.body.points;
    if (user.points < points) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    const transaction = new Transaction({
      user_id: req.body.userId,
      payer: req.body.payer,
      points: req.body.points,
    });
    const newTransaction = await transaction.save();

    // Deduct points from user's balance
    user.points -= req.body.points;
    await user.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Spend points
router.post('/spend', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const pointsToSpend = req.body.points;
    if (user.points < pointsToSpend) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    const transactions = await Transaction.find({ user_id: req.body.userId }).sort('timestamp');
    const pointsDeducted = [];

    let remainingPointsToSpend = pointsToSpend;

    for (let transaction of transactions) {
      if (transaction.points <= remainingPointsToSpend) {
        const deductedPoints = -transaction.points;
        pointsDeducted.push({ payer: transaction.payer, points: deductedPoints });

        transaction.points = 0;
        await transaction.save();

        remainingPointsToSpend -= transaction.points;
      } else {
        const deductedPoints = -remainingPointsToSpend;
        pointsDeducted.push({ payer: transaction.payer, points: deductedPoints });

        transaction.points -= remainingPointsToSpend;
        await transaction.save();

        remainingPointsToSpend = 0;
      }

      if (remainingPointsToSpend === 0) break;
    }

    user.points -= pointsToSpend;
    await user.save();

    res.json(pointsDeducted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
