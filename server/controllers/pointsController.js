const { pointsService } = require('../services')

// Update points for a user
exports.updatePoints = async (req, res) => {
  try {
    const { userId } = req.params
    const { points } = req.body
    const userPoints = await pointsService.updatePoints(userId, points)
    res.json(userPoints)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
