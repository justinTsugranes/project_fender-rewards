const { userModel } = require('../models')

const getUserById = async (userId) => {
  const user = await userModel.getUserById(userId)
  return user
}

const updateUserPoints = async (userId, newPoints) => {
  const updatedUser = await userModel.updateUserPoints(userId, newPoints)
  return updatedUser
}

module.exports = {
  getUserById,
  updateUserPoints,
}
