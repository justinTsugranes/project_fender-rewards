const { userModel } = require('../models')

// Create a new user
exports.createUser = async (name, email) => {
  try {
    const user = new userModel({ name, email })
    const newUser = await user.save()
    return newUser
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get a single user by ID
exports.getUserById = async (id) => {
  try {
    const user = await userModel.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

// Earn points for a user
exports.earnPoints = async (
  userId,
  points,
  source,
  transactionId,
  expiryDate,
) => {
  try {
    const user = await userModel.findById(userId)
    const currentDate = new Date()

    // Add new points to the user's points array
    user.points.push({
      points,
      dateAcquired: currentDate,
      redeemed: false,
      expiryDate,
      source,
      transactionId,
    })

    // Update the totalPoints field by adding the earned points
    user.totalPoints += points

    // Save the updated user data
    await user.save()
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

// Redeem points for a user
exports.redeemPoints = async (userId, points, source, transactionId) => {
  try {
    const user = await userModel.findById(userId)
    const currentDate = new Date()

    // Determine the remaining points to be redeemed (limited by the user's totalPoints)
    const remainingPoints =
      points < user.totalPoints ? points : user.totalPoints

    // Add redemption details to the pointsRedemptionHistory array
    user.pointsRedemptionHistory.push({
      points: remainingPoints,
      dateRedeemed: currentDate,
      source,
      transactionId,
    })

    // Update the totalPoints field by deducting the redeemed points
    user.totalPoints -= remainingPoints

    // Save the updated user data
    await user.save()
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get the points balance for a user
exports.getPointsBalance = async (userId) => {
  try {
    const user = await userModel.findById(userId)
    return user.totalPoints
  } catch (error) {
    throw new Error(error.message)
  }
}

// Create a new user
// exports.createUser = async (name, email) => {
//   try {
//     const user = new userModel({ name, email })
//     const newUser = await user.save()
//     return newUser
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

// Get a single user by ID
// exports.getUserById = async (id) => {
//   try {
//     const user = await userModel.findById(id)
//     if (!user) {
//       throw new Error('User not found')
//     }
//     return user
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }
