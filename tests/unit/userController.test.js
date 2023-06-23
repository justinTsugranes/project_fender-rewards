const userController = require('../../server/controllers/userController')
const User = require('../../server/models/User')

describe('userController', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          userId: '123',
          name: 'John Doe',
          points: 1000,
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await userController.createUser(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        userId: '123',
        name: 'John Doe',
        points: 1000,
      })
    })

    it('should handle errors when creating a user', async () => {
      const req = {
        body: {
          userId: '123',
          name: 'John Doe',
          points: 1000,
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      // Force an error by setting an invalid property name
      User.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Invalid property'))

      await userController.createUser(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid property' })
    })
  })

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const req = {
        params: {
          id: '123',
        },
      }
      const res = {
        json: jest.fn(),
      }

      User.findOne = jest.fn().mockResolvedValue({
        userId: '123',
        name: 'John Doe',
        points: 1000,
      })

      await userController.getUserById(req, res)

      expect(res.json).toHaveBeenCalledWith({
        userId: '123',
        name: 'John Doe',
        points: 1000,
      })
    })

    it('should handle errors when getting a user by ID', async () => {
      const req = {
        params: {
          id: '123',
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      User.findOne = jest.fn().mockRejectedValue(new Error('Database error'))

      await userController.getUserById(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
    })

    it('should handle user not found', async () => {
      const req = {
        params: {
          id: '123',
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      User.findOne = jest.fn().mockResolvedValue(null)

      await userController.getUserById(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' })
    })
  })
})
