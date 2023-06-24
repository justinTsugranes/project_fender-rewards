const { transactionModel } = require('../models')

// Create a new transaction
exports.createTransaction = async (userId, amount, description) => {
  try {
    const transaction = new transactionModel({ userId, amount, description })
    const newTransaction = await transaction.save()
    return newTransaction
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get all transactions for a user
exports.getUserTransactions = async (userId) => {
  try {
    const transactions = await transactionModel.find({ userId })
    return transactions
  } catch (error) {
    throw new Error(error.message)
  }
}
