const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')

// Create a new user
router.post('/create', UserController.createUser)

// Earn points
router.post('/:id/earn-points', UserController.earnPoints)

// Redeem points
router.post('/:id/redeem-points', UserController.redeemPoints)

// Get a user by ID
router.get('/:id', UserController.getUserById)

module.exports = router
