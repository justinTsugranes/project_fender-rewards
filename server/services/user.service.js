// Import the cron library for running scheduled tasks.
const cron = require('node-cron')
// Import the UserModel from the models directory.
const { UserModel } = require('../models')

// Exports createUser function. Create a new user with the provided user data.
exports.createUser = async (userData) => {
  try {
    // Log the received userData.
    console.log('Received userData:', userData)

    // Create a new instance of the UserModel with the provided user data.
    const user = new UserModel(userData)

    // Save the user instance to the database and wait for the operation to complete.
    const newUser = await user.save()

    // Log the newly created user and return it.
    console.log('User created:', newUser)
    // Return the newly created user object
    return newUser
  } catch (error) {
    // If an error occurs, log it and rethrow the error.
    console.log(`Error creating user: ${error.message}`)
    // Throw an error with the message from the caught error
    throw new Error(error.message)
  }
}

// Exports getUserById function. Get a single user by their ID.
exports.getUserById = async (id) => {
  try {
    // Log the received user ID.
    console.log('Received userId:', id)

    // Find a user with the provided ID and wait for the operation to complete.
    const user = await UserModel.findOne({ id })

    // If the user is not found, log the message and return null.
    if (!user) {
      console.log(`User not found`)
      // Throw an error if no user is found with the provided id
      // throw new Error('User not found')
      return null
    }

    // If the user is found, log the user and return it.
    console.log('User found:', user)
    // Return the found user object
    return user
  } catch (error) {
    // If an error occurs, log it and rethrow the error.
    console.log(`Error retrieving user: ${error.message}`)
    // Throw an error with the message from the caught error
    throw new Error(error.message)
  }
}

// Exports earnPoints function. Add points to a user's account.
exports.earnPoints = async (id, pointsData) => {
  try {
    // Log the received user ID and points data.
    console.log('Received userId:', id, 'and pointsData:', pointsData)

    // Find the user with the provided ID.
    let user = await UserModel.findOne({ id })

    // If the user is not found, log the message and return null.
    if (!user) {
      console.log('User not found')
      return null
    }

    // Initialize reward_points object if it does not exist. (if user was created before reward points feature was added)
    if (!user.reward_points) {
      user.reward_points = {
        active_points: [],
        redeemed_points: [],
        expired_points: [],
      }
    }

    // Initialize active_points array if it does not exist.
    if (!user.reward_points.active_points) {
      user.reward_points.active_points = []
    }

    // Add the points data to the active points array.
    user.reward_points.active_points.push(pointsData)

    // Increase the user's points balance by the number of points in the points data.
    user.points_balance += pointsData.points

    // Mark the reward_points field as modified - Mongoose does not detect changes in nested objects.
    user.markModified('reward_points')

    // Log the user before saving.
    console.log('User before save:', user)

    // Save the user to the database.
    user = await user.save()

    // Log the user after saving and return it.
    console.log('User after save:', user)
    console.log('Points earned:', pointsData)
    // Return the updated user object
    return user
  } catch (error) {
    // If an error occurs, log it and rethrow the error.
    console.log(`Error earning points: ${error.message}`)
    // Throw an error with the message from the caught error
    throw new Error(error.message)
  }
}

// Exports redeemPoints function. Redeem points from a user's account.
exports.redeemPoints = async (id, pointsData) => {
  try {
    // Log the received user ID and points data.
    console.log('Received userId:', id, 'and pointsData:', pointsData)

    // Find the user with the provided ID.
    const user = await UserModel.findOne({ id })

    // If the user is not found, log the message and return null.
    if (!user) {
      console.log('User not found')
      return null
    }

    // Destructure active_points and redeemed_points from the user's reward_points.
    const { active_points, redeemed_points } = user.reward_points

    // Find the index of the active point with the provided transaction ID.
    const index = active_points.findIndex(
      (point) => point.transaction_id === pointsData.transaction_id,
    )

    // If the transaction ID is not found in the active points, log the message and return null.
    if (index === -1) {
      console.log('Invalid transaction ID')
      return null
    }

    // Remove the point with the provided transaction ID from the active points.
    const redeemedPoint = active_points.splice(index, 1)[0]

    // Update the redeemed point with the redeemed date, points, and source platform from the points data.
    redeemedPoint.redeemed_date = new Date()
    redeemedPoint.points = pointsData.points
    redeemedPoint.source_platform = pointsData.source_platform

    // Add the redeemed point to the redeemed points.
    redeemed_points.push(redeemedPoint)

    // Decrease the user's points balance by the number of points in the points data.
    user.points_balance -= pointsData.points

    // Save the user data.
    await user.save()

    // Log the redeemed point and return the user.
    console.log('Points redeemed:', redeemedPoint)
    // Return the updated user object
    return user
  } catch (error) {
    // If an error occurs, log it and rethrow the error.
    console.log(`Error redeeming points: ${error.message}`)
    // Throw an error with the message from the caught error
    throw new Error(error.message)
  }
}

// Defines an expirePoints function that runs through all users and expires points that are past their expiry date.
const expirePoints = async () => {
  try {
    // Retrieve all users.
    const users = await UserModel.find()

    // Get the current date.
    const currentDate = new Date()

    // Iterate over all users.
    for (const user of users) {
      // Destructure active_points and expired_points from the user's reward_points.
      const { active_points, expired_points } = user.reward_points

      // Filter the active points to find any that are past their expiry date.
      const expired = active_points.filter(
        (point) => point.expiry_date <= currentDate,
      )

      // Update the user's active points to remove any that are past their expiry date.
      user.reward_points.active_points = active_points.filter(
        (point) => point.expiry_date > currentDate,
      )

      // Add the expired points to the user's expired points.
      user.reward_points.expired_points.push(...expired)

      // Save the user to the database.
      await user.save()
    }

    // Log that points have been expired.
    console.log('Points expired')
  } catch (error) {
    // If an error occurs, log it and rethrow the error.
    console.log(`Error expiring points: ${error.message}`)
    // Throw an error with the message from the caught error
    throw new Error(error.message)
  }
}

// Schedule the expirePoints function to run every day at midnight.
cron.schedule('0 0 * * *', async () => {
  try {
    // Log that the point expiration task is running.
    console.log('Running point expiration task...')

    // Run the expirePoints function.
    await expirePoints()

    // Log that the point expiration task has completed.
    console.log('Point expiration task completed.')
  } catch (error) {
    // If an error occurs, log it.
    console.log(`Error running point expiration task: ${error.message}`)
  }
})
