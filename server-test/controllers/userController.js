const { userService } = require('../services')

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  res.send(user)
}

const updateUserPoints = async (req, res) => {
  const updatedUser = await userService.updateUserPoints(
    req.params.userId,
    req.body.points_balance,
  )
  res.send(updatedUser)
}

module.exports = {
  getUserById,
  updateUserPoints,
}
