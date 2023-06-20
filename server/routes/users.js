const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Get User
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Update User Points Balance
router.post('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id })
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.points_balance = req.body.points_balance
    const updatedUser = await user.save()

    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
