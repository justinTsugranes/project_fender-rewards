const request = require('supertest')
const app = require('../../server/server')
const User = require('../../server/models/UserModel')

describe('User routes', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const reqBody = {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      }

      const res = await request(app).post('/users').send(reqBody)

      expect(res.status).toBe(201)
      expect(res.body.id).toBe('123')
      expect(res.body.name).toBe('John Doe')
      expect(res.body.email).toBe('john.doe@example.com')

      const createdUser = await User.findOne({ id: '123' })

      expect(createdUser).toBeTruthy()
      expect(createdUser.name).toBe('John Doe')
    })

    it('should handle errors when creating a user', async () => {
      const reqBody = {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      }

      User.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      const res = await request(app).post('/users').send(reqBody)

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Database error')
    })
  })

  describe('GET /users/:id', () => {
    it('should get a user by ID', async () => {
      const id = '123'

      User.findOne = jest.fn().mockResolvedValue({
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      })

      const res = await request(app).get(`/users/${id}`)

      expect(res.status).toBe(200)
      expect(res.body.id).toBe('123')
      expect(res.body.name).toBe('John Doe')
      expect(res.body.email).toBe('john.doe@example.com')
    })

    it('should handle errors when getting a user by ID', async () => {
      const id = '123'

      User.findOne = jest.fn().mockRejectedValue(new Error('Database error'))

      const res = await request(app).get(`/users/${id}`)

      expect(res.status).toBe(500)
      expect(res.body.message).toBe('Database error')
    })

    it('should handle user not found when getting a user by ID', async () => {
      const id = '123'

      User.findOne = jest.fn().mockResolvedValue(null)

      const res = await request(app).get(`/users/${id}`)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe('User not found')
    })
  })
})
