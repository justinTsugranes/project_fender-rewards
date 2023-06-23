const User = require('../models/User')

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body
    const user = new User({ name, email })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
