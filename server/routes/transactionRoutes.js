const express = require('express')
const router = express.Router()
const { transactionController } = require('../controllers')

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *               amount:
 *                 type: number
 *                 description: The amount of the transaction.
 *               description:
 *                 type: string
 *                 description: The description of the transaction.
 *     responses:
 *       201:
 *         description: The transaction was created successfully.
 *       400:
 *         description: The request was invalid or could not be understood by the server.
 *       500:
 *         description: An error occurred on the server.
 */
router.post('/', transactionController.createTransaction)

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get all transactions for a user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve the transactions
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The transactions were retrieved successfully.
 *       500:
 *         description: An error occurred on the server.
 */
router.get('/user/:userId', transactionController.getUserTransactions)

module.exports = router
