const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const transactionRoutes = require('./transactionRoutes')
const pointsRoutes = require('./pointsRoutes')

router.use('/users', userRoutes)
router.use('/transactions', transactionRoutes)
router.use('/points', pointsRoutes)

module.exports = router
