const request = require('supertest')
const app = require('../../server/index')
const User = require('../../server/models/User')

describe('User routes', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const reqBody = {
        userId: '123',
        name: 'John Doe',
        points: 1000,
      }

      const res = await request(app).post('/users').send(reqBody)

      expect(res.status).toBe(201)
      expect(res.body.userId).toBe('123')
      expect(res.body.name).toBe('John Doe')
      expect(res.body.points).toBe(1000)

      const createdUser = await User.findOne({ userId: '123' })

      expect(createdUser).toBeTruthy()
      expect(createdUser.name).toBe('John Doe')
    })

    it('should handle errors when creating a user', async () => {
      const reqBody = {
        userId: '123',
        name: 'John Doe',
        points: 1000,
      }

      User.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      const res = await request(app).post('/users').send(reqBody)

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Database error')
    })
  })

  describe('GET /users/:userId', () => {
    it('should get a user by ID', async () => {
      const userId = '123'

      User.findOne = jest.fn().mockResolvedValue({
        userId: '123',
        name: 'John Doe',
        points: 1000,
      })

      const res = await request(app).get(`/users/${userId}`)

      expect(res.status).toBe(200)
      expect(res.body.userId).toBe('123')
      expect(res.body.name).toBe('John Doe')
      expect(res.body.points).toBe(1000)
    })

    it('should handle errors when getting a user by ID', async () => {
      const userId = '123'

      User.findOne = jest.fn().mockRejectedValue(new Error('Database error'))

      const res = await request(app).get(`/users/${userId}`)

      expect(res.status).toBe(500)
      expect(res.body.message).toBe('Database error')
    })

    it('should handle user not found when getting a user by ID', async () => {
      const userId = '123'

      User.findOne = jest.fn().mockResolvedValue(null)

      const res = await request(app).get(`/users/${userId}`)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe('User not found')
    })
  })
})
