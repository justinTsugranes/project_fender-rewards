const { userModel } = require('../models')

// Create a new user
exports.createUser = async (id, name, email) => {
  try {
    const user = new userModel({ id, name, email, totalPoints: 0 })
    const newUser = await user.save()
    return newUser
  } catch (error) {
    console.log(`createUser Service Error: ${error.message}`)
    throw new Error(error.message)
  }
}

// Get a single user by ID
exports.getUserById = async (id) => {
  try {
    const user = await userModel.findOne({ id: id })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    console.log(`getUserById Service Error: ${error.message}`)
    throw new Error(error.message)
  }
}

// Earn points for a user
exports.earnPoints = async (id, points, source, transactionId, expiryDate) => {
  try {
    const user = await userModel.findOne({ id })
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
    console.log(`earnPoints Service Error: ${error.message}`)
    throw new Error(error.message)
  }
}

// Redeem points for a user
exports.redeemPoints = async (id, points, source, transactionId) => {
  try {
    const user = await userModel.findOne({ id })
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
    console.log(`redeemPoints Service Error: ${error.message}`)
    throw new Error(error.message)
  }
}
