const { UserService } = require('../services')

// Create a user
exports.createUser = async (req, res) => {
  try {
    // Extract user data from request body
    const userData = req.body

    // Call the createUser function from UserService with the user data
    const newUser = await UserService.createUser(userData)

    // If user creation is successful, return the new user with a status of 201
    res.status(201).json(newUser)
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
}

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    // Extract the user ID from request parameters
    const { id } = req.params

    // Call the getUserById function from UserService with the user ID
    const user = await UserService.getUserById(id)

    // If the user does not exist, return a 404 status with an error message
    if (!user) {
      console.log('User not found')
      res.status(404).json({ error: 'User not found' })
      return
    }

    // If the user exists, return the user
    res.json(user)
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error('Error retrieving user:', error)
    res.status(500).json({ error: 'Failed to retrieve user' })
  }
}

// Earn points
exports.earnPoints = async (req, res) => {
  try {
    // Extract the user ID and points data from request parameters and body
    const { id } = req.params
    const pointsData = req.body

    // Call the earnPoints function from UserService with the user ID and points data
    const user = await UserService.earnPoints(id, pointsData)

    // If the user does not exist, return a 404 status with an error message
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // If the operation is successful, return the updated user
    res.json(user)
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error('Error earning points:', error)
    res.status(500).json({ error: 'Failed to earn points' })
  }
}

// Redeem points
exports.redeemPoints = async (req, res) => {
  try {
    // Extract the user ID and points data from request parameters and body
    const { id } = req.params
    const pointsData = req.body

    // Call the redeemPoints function from UserService with the user ID and points data
    const user = await UserService.redeemPoints(id, pointsData)

    // If the user does not exist, return a 404 status with an error message
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // If the operation is successful, return the updated user
    res.json(user)
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error('Error redeeming points:', error)
    res.status(500).json({ error: 'Failed to redeem points' })
  }
}

// manually trigger the expiration of points

// exports.expirePoints = async (req, res) => {
//   try {
//     // Call the expirePoints function from UserService
//     await UserService.expirePoints()

//     // If the operation is successful, return a success message
//     res.status(200).json({ message: 'Points expired successfully' })
//   } catch (error) {
//     // If an error occurs, log it and return a 500 status with an error message
//     console.error('Error expiring points:', error)
//     res.status(500).json({ error: 'Failed to expire points' })
//   }
// }
