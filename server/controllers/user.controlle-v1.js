const { UserService } = require('../services')

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { id, name, email } = req.body // Extract the id, name, and email from the request body
    const newUser = await UserService.createUser(id, name, email) // Call the createUser function from the UserService with the provided id, name, and email

    res.status(201).json(newUser) // Send a successful response with status code 201 and the newly created user object in JSON format
  } catch (error) {
    console.log(`createUser Controller Error: ${error.message}`) // Log the error to the console
    res.status(400).json({ message: error.message }) // Send an error response with status code 400 and an error message in JSON format
  }
}

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params // Extract the id from the request parameters
    const user = await UserService.getUserById(id) // Call the getUserById function from the UserService with the extracted id

    res.json(user) // Send a response with the user object in JSON format
  } catch (error) {
    console.log(`getUserById Controller Error: ${error.message}`) // Log the error to the console
    res.status(500).json({ message: error.message }) // Send an error response with status code 500 (Internal Server Error) and an error message in JSON format
  }
}

// Earn points for a user
exports.earnPoints = async (req, res) => {
  try {
    const { id, points, source_platform, transaction_id, expiry_date } =
      req.body // Extract the id, points, source_platform, transaction_id, and expiry_date from the request body

    const user = await UserService.earnPoints(
      id,
      points,
      source_platform,
      transaction_id,
      expiry_date,
    ) // Call the earnPoints function from the UserService with the extracted parameters

    res.json(user) // Send a response with the user object in JSON format
  } catch (error) {
    console.log(`earnPoints Controller Error: ${error.message}`) // Log the error to the console
    res.status(500).json({ message: error.message }) // Send an error response with status code 500 (Internal Server Error) and an error message in JSON format
  }
}

// Redeem points for a user
exports.redeemPoints = async (req, res) => {
  try {
    const { id, points, source_platform, transaction_id } = req.body // Extract the id, points, source_platform, and transaction_id from the request body

    const user = await UserService.redeemPoints(
      id,
      points,
      source_platform,
      transaction_id,
    ) // Call the redeemPoints function from the UserService with the extracted parameters

    res.json(user) // Send a response with the user object in JSON format
  } catch (error) {
    console.log(`redeemPoints Controller Error: ${error.message}`) // Log the error to the console
    res.status(500).json({ message: error.message }) // Send an error response with status code 500 (Internal Server Error) and an error message in JSON format
  }
}
