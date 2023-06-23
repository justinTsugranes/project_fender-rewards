const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

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
