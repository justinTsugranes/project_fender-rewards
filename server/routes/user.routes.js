const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')

router.post('/create', UserController.createUser)

router.post('/:id/earn-points', UserController.earnPoints)

router.post('/:id/redeem-points', UserController.redeemPoints)

router.get('/:id', UserController.getUserById)

module.exports = router
