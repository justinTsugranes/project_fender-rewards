const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Redemption:
 *       type: object
 *       properties:
 *         redemption_id:
 *           type: string
 *           description: Redemption id
 *           example: 5f8f9c7d6857596d12ff4487
 *         redeemed_points:
 *           type: number
 *           description: Points redeemed
 *           example: 100
 *         redemption_date:
 *           type: string
 *           format: date
 *           description: Date of redemption
 *           example: '2023-07-01'
 *
 *     Points:
 *       type: object
 *       properties:
 *         transaction_id:
 *           type: string
 *           description: Transaction id
 *           example: 5f8f9c7d6857596d12ff4487
 *         original_points:
 *           type: number
 *           description: Original points assigned in this transaction
 *           example: 200
 *         remaining_points:
 *           type: number
 *           description: Remaining points after redemptions
 *           example: 150
 *         assignment_date:
 *           type: string
 *           format: date
 *           description: Date points were assigned
 *           example: '2023-06-28'
 *         expiry_date:
 *           type: string
 *           format: date
 *           description: Date of expiry
 *           example: '2024-06-28'
 *         source_platform:
 *           type: string
 *           description: Source of points
 *           example: website
 *         redemptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Redemption'
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *           example: 5f8f9c7d6857596d12ff4487
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: John Doe
 *         email:
 *           type: string
 *           description: Email of the user
 *           example: john.doe@example.com
 *         points_balance:
 *           type: number
 *           description: Balance points of the user
 *           example: 100
 *         reward_points:
 *           type: object
 *           description: Reward points of the user
 *           properties:
 *             points:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Points'
 */

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/create', UserController.createUser)

/**
 * @swagger
 * /api/users/{id}/earn-points:
 *   post:
 *     summary: Earn points for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Points'
 *     responses:
 *       200:
 *         description: Points were successfully added to the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/:id/earn-points', UserController.earnPoints)

/**
 * @swagger
 * /api/users/{id}/redeem-points:
 *   post:
 *     summary: Redeem points for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Redemption'
 *     responses:
 *       200:
 *         description: Points were successfully redeemed for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/:id/redeem-points', UserController.redeemPoints)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', UserController.getUserById)

module.exports = router
