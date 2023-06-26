const { UserModel } = require('../models')

// Create a new user
exports.createUser = async (id, name, email) => {
  try {
    const user = new UserModel({
      id,
      name,
      email,
      points_balance: 0,
      reward_points: [],
    }) // Create a new user object with the provided id, name, email, and initial points balance and reward points

    const newUser = await user.save() // Save the user object to the database and await the result

    return newUser // Return the newly created user object
  } catch (error) {
    console.log(`createUser Service Error: ${error.message}`) // Log the error to the console
    throw new Error(error.message) // Throw an error with the message from the caught error
  }
}

// Get a single user by ID
exports.getUserById = async (id) => {
  try {
    const user = await UserModel.findOne({ id: id }) // Find a user in the database with the provided id

    if (!user) {
      throw new Error('User not found') // Throw an error if no user is found with the provided id
    }

    return user // Return the found user object
  } catch (error) {
    console.log(`getUserById Service Error: ${error.message}`) // Log the error to the console
    throw new Error(error.message) // Throw an error with the message from the caught error
  }
}

// Earn points for a user
exports.earnPoints = async (
  id,
  points,
  source_platform,
  transaction_id,
  expiry_date,
) => {
  try {
    let user = await UserModel.findOne({ id }) // Find the user in the database with the provided id

    if (!user) {
      throw new Error('User not found')
    }

    const currentDate = new Date() // Get the current date and time

    // Add new points to the user's reward_points array
    user.reward_points.push({
      points,
      acquired_date: currentDate,
      is_redeemed: false,
      expiry_date,
      source_platform,
      transaction_id,
    })

    // Update the points_balance field by adding the earned points
    user.points_balance += points

    // Save the updated user data
    user = await user.save()

    return user // Return the updated user object
  } catch (error) {
    console.log(`earnPoints Service Error: ${error.message}`) // Log the error to the console
    throw new Error(error.message) // Throw an error with the message from the caught error
  }
}

// Redeem points for a user
exports.redeemPoints = async (id, points, source_platform, transaction_id) => {
  try {
    const user = await UserModel.findOne({ id }) // Find the user in the database with the provided id
    const currentDate = new Date() // Get the current date and time

    // Determine the remaining points to be redeemed (limited by the user's points_balance)
    const remainingPoints =
      points < user.points_balance ? points : user.points_balance

    // Look for the point to redeem and update its details
    for (let i = 0; i < user.reward_points.length; i++) {
      if (
        !user.reward_points[i].is_redeemed &&
        user.reward_points[i].points <= remainingPoints
      ) {
        user.reward_points[i].is_redeemed = true
        user.reward_points[i].redeemed_date = currentDate
        remainingPoints -= user.reward_points[i].points
      }
    }

    // Save the updated user data
    await user.save()

    return user // Return the updated user object
  } catch (error) {
    console.log(`redeemPoints Service Error: ${error.message}`) // Log the error to the console
    throw new Error(error.message) // Throw an error with the message from the caught error
  }
}
