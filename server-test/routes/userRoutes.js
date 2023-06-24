const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')

router.get('/:userId', userController.getUserById)
router.post('/:userId', userController.updateUserPoints)

module.exports = router
