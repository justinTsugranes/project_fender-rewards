const Points = require('../models/Points')

// Update points for a user
exports.updatePoints = async (req, res) => {
  try {
    const { userId } = req.params
    const { points } = req.body
    let userPoints = await Points.findOne({ userId })
    if (!userPoints) {
      userPoints = new Points({ userId, points })
    } else {
      userPoints.points = points
    }
    await userPoints.save()
    res.json(userPoints)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
