const { pointsModel } = require('../models')

// Update points for a user
exports.updatePoints = async (userId, points) => {
  try {
    let userPoints = await pointsModel.findOne({ userId })
    if (!userPoints) {
      userPoints = new pointsModel({ userId, points })
    } else {
      userPoints.points = points
    }
    await userPoints.save()
    return userPoints
  } catch (error) {
    throw new Error(error.message)
  }
}
