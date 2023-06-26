const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')

/**
 * @swagger
 * definitions:
 *  RedeemedPoints:
 *    type: object
 *    properties:
 *      transaction_id:
 *        type: string
 *      points:
 *        type: integer
 *      redeemed_date:
 *        type: string
 *        format: date-time
 *      source_platform:
 *        type: string
 *  ExpiredPoints:
 *    type: object
 *    properties:
 *      transaction_id:
 *        type: string
 *      points:
 *        type: integer
 *      expired_date:
 *        type: string
 *        format: date-time
 *      source_platform:
 *        type: string
 *  ActivePoints:
 *    type: object
 *    properties:
 *      transaction_id:
 *        type: string
 *      points:
 *        type: integer
 *      acquired_date:
 *        type: string
 *        format: date-time
 *      expiry_date:
 *        type: string
 *        format: date-time
 *      source_platform:
 *        type: string
 *  RewardPoints:
 *    type: object
 *    properties:
 *      active_points:
 *        type: array
 *        items:
 *          $ref: '#/definitions/ActivePoints'
 *      redeemed_points:
 *        type: array
 *        items:
 *          $ref: '#/definitions/RedeemedPoints'
 *      expired_points:
 *        type: array
 *        items:
 *          $ref: '#/definitions/ExpiredPoints'
 *  User:
 *    type: object
 *    required:
 *      - id
 *      - name
 *      - email
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      points_balance:
 *        type: integer
 *      reward_points:
 *        $ref: '#/definitions/RewardPoints'
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User created successfully
 */

router.post('/create', UserController.createUser)

/**
 * @swagger
 * /users/{id}/earn-points:
 *   post:
 *     summary: Earn points
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: body
 *         name: points
 *         description: The points to earn.
 *         schema:
 *           $ref: '#/definitions/ActivePoints'
 *     responses:
 *       200:
 *         description: Points added successfully
 */

router.post('/:id/earn-points', UserController.earnPoints)

/**
 * @swagger
 * /users/{id}/redeem-points:
 *   post:
 *     summary: Redeem points
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: body
 *         name: points
 *         description: The points to redeem.
 *         schema:
 *           $ref: '#/definitions/RedeemedPoints'
 *     responses:
 *       200:
 *         description: Points redeemed successfully
 */

router.post('/:id/redeem-points', UserController.redeemPoints)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         schema:
 *           $ref: '#/definitions/User'
 */

router.get('/:id', UserController.getUserById)
