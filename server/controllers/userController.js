const { userService } = require('../services')

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { id, name, email } = req.body
    const newUser = await userService.createUser(id, name, email)
    res.status(201).json(newUser)
  } catch (error) {
    console.log(`createUser Controller Error: ${error.message}`)
    res.status(400).json({ message: error.message })
  }
}

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userService.getUserById(id)
    res.json(user)
  } catch (error) {
    console.log(`getUserById Controller Error: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

// Earn points for a user
exports.earnPoints = async (req, res) => {
  try {
    const { id, points, source, transactionId, expiryDate } = req.body
    const user = await userService.earnPoints(
      id,
      points,
      source,
      transactionId,
      expiryDate,
    )
    res.json(user)
  } catch (error) {
    console.log(`earnPoints Controller Error: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

// Redeem points for a user
exports.redeemPoints = async (req, res) => {
  try {
    const { id, points, source, transactionId } = req.body
    const user = await userService.redeemPoints(
      id,
      points,
      source,
      transactionId,
    )
    res.json(user)
  } catch (error) {
    console.log(`redeemPoints Controller Error: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}
