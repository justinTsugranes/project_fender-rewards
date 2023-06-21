const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Create User
router.post('/', async (req, res) => {
  try {
    const user = new User({
      id: req.body.id,
      name: req.body.name,
      points_balance: req.body.points_balance,
    })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

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
router.put('/:id', async (req, res) => {
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
