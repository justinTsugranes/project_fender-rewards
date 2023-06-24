const express = require('express')
const router = express.Router()
const { pointsController } = require('../controllers')

/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     summary: Update user points
 *     tags: [Points]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               points:
 *                 type: number
 *                 description: The new points for the user.
 *     responses:
 *       200:
 *         description: The points were updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 points:
 *                   type: number
 *       400:
 *         description: The request was invalid or could not be understood by the server. The response body will contain more detailed information.
 *       500:
 *         description: An error occurred on the server.
 */

router.put('/user/:userId', pointsController.updatePoints)

module.exports = router
