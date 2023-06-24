const { transactionService } = require('../services')

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { userId, amount, description } = req.body
    const newTransaction = await transactionService.createTransaction(
      userId,
      amount,
      description,
    )
    res.status(201).json(newTransaction)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all transactions for a user
exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params
    const transactions = await transactionService.getUserTransactions(userId)
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
