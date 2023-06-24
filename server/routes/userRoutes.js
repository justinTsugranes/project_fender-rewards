const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *     responses:
 *       201:
 *         description: The user was created successfully.
 *       400:
 *         description: The request was invalid or could not be understood by the server.
 *       500:
 *         description: An error occurred on the server.
 */
router.post('/', userController.createUser)

/**
 * @swagger
 * /earn-points:
 *   post:
 *     summary: Earn points for a user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *               points:
 *                 type: number
 *                 description: The points to be earned.
 *               source:
 *                 type: string
 *                 description: The source of the points.
 *               transactionId:
 *                 type: string
 *                 description: The ID of the transaction.
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 description: The expiry date of the points.
 *     responses:
 *       200:
 *         description: Points were earned successfully.
 *       500:
 *         description: An error occurred on the server.
 */
router.post('/earn-points', userController.earnPoints)

/**
 * @swagger
 * /redeem-points:
 *   post:
 *     summary: Redeem points for a user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *               points:
 *                 type: number
 *                 description: The points to be redeemed.
 *               source:
 *                 type: string
 *                 description: The source of the redemption.
 *               transactionId:
 *                 type: string
 *                 description: The ID of the transaction.
 *     responses:
 *       200:
 *         description: Points were redeemed successfully.
 *       500:
 *         description: An error occurred on the server.
 */
router.post('/redeem-points', userController.redeemPoints)

/**
 * @swagger
 * /points-balance/{userId}:
 *   get:
 *     summary: Get the points balance for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve the points balance
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The points balance was retrieved successfully.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/points-balance/:userId', userController.getPointsBalance)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user was retrieved successfully.
 *       404:
 *         description: The user was not found.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/:id', userController.getUserById)

module.exports = router
