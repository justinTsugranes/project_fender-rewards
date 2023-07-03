// import the UserService
const { UserService } = require('../services')
// import the asyncHandler middleware
const asyncHandler = require('express-async-handler')

// @desc    Create a user
// @route   POST /api/users
// @access  Public
exports.createUser = asyncHandler(async (req, res) => {
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
    res.status(500).json({ error: `Failed to create user: ${error.message}` })
  }
})

// @desc    Get a user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = asyncHandler(async (req, res) => {
  try {
    // Extract the user ID from request parameters
    const { id } = req.params

    console.log('Fetching user with ID:', id)

    // Call the getUserById function from UserService with the user ID
    const user = await UserService.getUserById(id)

    // If the user does not exist, return a 404 status with an error message
    if (!user) {
      console.error(`User not found: ID ${id}`)
      res.status(404).json({ error: 'User not found' })
      return
    }

    console.log('User found:', user)
    // If the user exists, return the user
    res.json(user)
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error('Error retrieving user:', error)
    res.status(500).json({ error: `Failed to retrieve user: ${error.message}` })
  }
})

// @desc    Update user points
// @route   PUT /api/users/:id/points
// @access  Private
exports.updatePoints = asyncHandler(async (req, res) => {
  try {
    // Extract the user ID and points data from request parameters and body
    const { id } = req.params
    const { points, action } = req.body

    let user
    if (action === 'earn') {
      // Call the earnPoints function from UserService with the user ID and points
      user = await UserService.earnPoints(id, points)
    } else if (action === 'redeem') {
      // Call the redeemPoints function from UserService with the user ID and points
      user = await UserService.redeemPoints(id, points)
    } else {
      throw new Error('Invalid action')
    }

    // If the user does not exist, return a 404 status with an error message
    if (!user) {
      console.error(`User not found: ID ${id}`)
      res.status(404).json({ error: 'User not found' })
      return
    }

    // If the operation is successful, return the updated user
    res.json(user)
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error('Error updating points:', error)
    res.status(500).json({ error: `Failed to update points: ${error.message}` })
  }
})

// @desc    Manually trigger the expiration of points
// @route   POST /api/users/expire
// @access  Private
exports.expirePoints = asyncHandler(async (req, res) => {
  try {
    // Call the expirePoints function from UserService
    await UserService.expirePoints()

    // If the operation is successful, return a success message
    res.status(200).json({ message: 'Points expired successfully' })
  } catch (error) {
    // If an error occurs, log it and return a 500 status with an error message
    console.error('Error expiring points:', error)
    res.status(500).json({ error: `Failed to expire points: ${error.message}` })
  }
})
