const { userService } = require('../services')

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body
    const newUser = await userService.createUser(name, email)
    res.status(201).json(newUser)
  } catch (error) {
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
    res.status(500).json({ message: error.message })
  }
}

// Earn points for a user
exports.earnPoints = async (req, res) => {
  try {
    const { userId, points, source, transactionId, expiryDate } = req.body
    const user = await userService.earnPoints(
      userId,
      points,
      source,
      transactionId,
      expiryDate,
    )
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Redeem points for a user
exports.redeemPoints = async (req, res) => {
  try {
    const { userId, points, source, transactionId } = req.body
    const user = await userService.redeemPoints(
      userId,
      points,
      source,
      transactionId,
    )
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get the points balance for a user
exports.getPointsBalance = async (req, res) => {
  try {
    const { userId } = req.params
    const pointsBalance = await userService.getPointsBalance(userId)
    res.json(pointsBalance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new user
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body
//     const newUser = await userService.createUser(name, email)
//     res.status(201).json(newUser)
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// }

// Get a single user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params
//     const user = await userService.getUserById(id)
//     res.json(user)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }
