const Transaction = require('../models/Transaction')

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { userId, amount, description } = req.body
    const transaction = new Transaction({ userId, amount, description })
    const newTransaction = await transaction.save()
    res.status(201).json(newTransaction)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all transactions for a user
exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params
    const transactions = await Transaction.find({ userId })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
