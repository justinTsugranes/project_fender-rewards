// Import the UserModel from the models directory.
const { UserModel } = require('../models')
// Import cron for running expirePoints.
const cron = require('node-cron')

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
    if (error.code === 11000) {
      // If the error code is 11000, log the message and throw a new error.
      throw new Error('User with the same ID or email already exists.')
    } else {
      // If an error occurs, log it and rethrow the error.
      console.log(`Error creating user: ${error.message}`)
      // Throw an error with the message from the caught error
      throw new Error(error.message)
    }
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

// Export the function 'earnPoints'
exports.earnPoints = async (id, pointsData) => {
  try {
    // Log the inputs for debugging
    console.log('Received userId:', id, 'and pointsData:', pointsData)

    // Fetch user data from the database using the given id
    let user = await UserModel.findOne({ id })

    // Check if a user is found, if not, return null
    if (!user) {
      console.log('User not found')
      return null
    }

    // Create a new points object with the provided points data
    const newPoints = {
      transaction_id: pointsData.transaction_id,
      original_points: pointsData.original_points,
      remaining_points: pointsData.remaining_points,
      assignment_date: pointsData.assignment_date,
      expiry_date: pointsData.expiry_date,
      status: pointsData.status,
      source_platform: pointsData.source_platform,
      redemptions: [], // Initialize an empty array for redemptions
    }

    // Add the new points object to the user's points array
    user.reward_points.points.push(newPoints)

    // Update the user's total points balance with the new points
    user.points_balance += pointsData.remaining_points

    // Log the user data before saving
    console.log('User before save:', user)

    // Save the updated user data in the database
    user = await user.save()

    // Log the user data after saving
    console.log('User after save:', user)

    // Log the earned points
    console.log('Points earned:', pointsData)

    // Return the updated user data
    return user
  } catch (error) {
    // Catch any error that occurs during the function execution
    // Log the error message
    console.log(`Error earning points: ${error.message}`)

    // Throw the error to be handled by the function caller
    throw new Error(error.message)
  }
}

// Export the function 'redeemPoints'
exports.redeemPoints = async (id, pointsToRedeem) => {
  try {
    // Log the inputs for debugging
    console.log('Received userId:', id, 'and pointsToRedeem:', pointsToRedeem)

    // Fetch user data from the database using the given id
    const user = await UserModel.findOne({ id })

    // If no user found, return an error
    if (!user) {
      console.log('User not found')
      throw new Error('User not found')
    }

    // Initialize a counter for total available points
    let totalAvailablePoints = 0

    // Sum up the remaining points from the user's reward points
    for (let point of user.reward_points.points) {
      totalAvailablePoints += point.remaining_points
    }

    // If points to be redeemed exceeds total available points or if no points available, return an error
    if (
      pointsToRedeem.redeemed_points > totalAvailablePoints ||
      totalAvailablePoints === 0
    ) {
      console.log('Not enough points to redeem')
      console.log('Available points balance:', totalAvailablePoints)
      throw new Error('Not enough points to redeem')
    }

    // Define a helper function to create a point redemption
    const createPointRedemption = (point, redeemedPoints) => {
      // Create a redemption object
      const redemption = {
        redemption_id: pointsToRedeem.redemption_id,
        redeemed_points: redeemedPoints,
        redemption_date: pointsToRedeem.redemption_date,
      }

      // Add redemption to point's redemptions array
      point.redemptions.push(redemption)

      // Subtract redeemed points from the point's remaining points
      point.remaining_points -= redeemedPoints

      // If all points redeemed, mark point as redeemed
      if (point.remaining_points === 0) {
        point.status = 'redeemed'
      }
    }

    // Initialize a variable to track remaining points to be redeemed
    let remainingPointsToRedeem = pointsToRedeem.redeemed_points

    // For each of the user's points
    for (let point of user.reward_points.points) {
      // If no remaining points to be redeemed, break the loop
      if (remainingPointsToRedeem <= 0) break

      // If point has no remaining points, continue to next point
      if (point.remaining_points <= 0) continue

      // Calculate points to be redeemed from point
      let redeemedPoints = Math.min(
        remainingPointsToRedeem,
        point.remaining_points,
      )
      // Subtract redeemed points from remaining points to be redeemed
      remainingPointsToRedeem -= redeemedPoints

      // Call helper function to create a point redemption
      createPointRedemption(point, redeemedPoints)
    }

    // Subtract redeemed points from user's points balance
    user.points_balance -=
      pointsToRedeem.redeemed_points - remainingPointsToRedeem

    // Log the user data before saving
    console.log('User before save:', user)

    // Save the updated user data in the database
    await user.save()

    // Log the user data after saving
    console.log('User after save:', user)

    // Log the redeemed points
    console.log(
      'Points redeemed:',
      pointsToRedeem.redeemed_points - remainingPointsToRedeem,
    )

    // Return the updated user data
    return user
  } catch (error) {
    // Catch any error that occurs during the function execution
    // Log the error message
    console.log(`Error redeeming points: ${error.message}`)

    // Throw the error to be handled by the function caller
    throw new Error(error.message)
  }
}

// Define an asynchronous function 'expirePoints'
exports.expirePoints = async () => {
  try {
    // Fetch all user data from the database
    const users = await UserModel.find()

    // Get the current date
    const currentDate = new Date()

    // For each user
    for (const user of users) {
      // Get the points array from the user's reward points
      const { points } = user.reward_points

      // For each point
      for (const point of points) {
        // If the point's status is 'active' and the point's expiry date is on or before the current date
        if (point.status === 'active' && point.expiry_date <= currentDate) {
          // Mark the point as 'expired'
          point.status = 'expired'

          // Subtract the point's value from the user's points balance
          user.points_balance -= point.points
        }
      }

      // Save the updated user data in the database
      await user.save()
    }

    // Log a message indicating that the points have expired
    console.log('Points expired')
  } catch (error) {
    // Catch any error that occurs during the function execution
    // Log the error message
    console.log(`Error expiring points: ${error.message}`)

    // Throw the error to be handled by the function caller
    throw new Error(error.message)
  }
}

// Schedule the 'expirePoints' function to run every day at midnight, using a cron job.
cron.schedule(
  // The cron time string '0 0 * * *' represents every day at midnight
  '0 0 * * *',
  // Define an asynchronous callback function that will run at the scheduled time
  async () => {
    try {
      // Log that the point expiration task is starting
      console.log('Running point expiration task...')

      // Run the 'expirePoints' function
      await expirePoints()

      // Log that the point expiration task has completed
      console.log('Point expiration task completed.')
    } catch (error) {
      // Catch any error that occurs during the function execution
      // Log the error message
      console.log(`Error running point expiration task: ${error.message}`)
    }
  },
  // No callback for on complete
  null,
  // Start the job right now
  true,
  // Timezone, 'America/Los_Angeles' is the timezone in which the job will run
  'America/Los_Angeles',
)
