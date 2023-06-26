const UserService = require('../../server/services/userService')
const User = require('../../server/models/User')

describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        userId: '123',
        name: 'John Doe',
        points: 1000,
      }

      User.prototype.save = jest.fn().mockResolvedValue(userData)

      const createdUser = await UserService.createUser(userData)

      expect(createdUser.userId).toBe('123')
      expect(createdUser.name).toBe('John Doe')
      expect(createdUser.points).toBe(1000)
    })

    it('should handle errors when creating a user', async () => {
      const userData = {
        userId: '123',
        name: 'John Doe',
        points: 1000,
      }

      User.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      let error
      try {
        await UserService.createUser(userData)
      } catch (err) {
        error = err
      }

      expect(error).toBeDefined()
      expect(error.message).toBe('Database error')
    })
  })

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const userId = '123'
      const userData = {
        userId: '123',
        name: 'John Doe',
        points: 1000,
      }

      User.findOne = jest.fn().mockResolvedValue(userData)

      const user = await UserService.getUserById(userId)

      expect(user.userId).toBe('123')
      expect(user.name).toBe('John Doe')
      expect(user.points).toBe(1000)
    })

    it('should handle errors when getting a user by ID', async () => {
      const userId = '123'

      User.findOne = jest.fn().mockRejectedValue(new Error('Database error'))

      let error
      try {
        await UserService.getUserById(userId)
      } catch (err) {
        error = err
      }

      expect(error).toBeDefined()
      expect(error.message).toBe('Database error')
    })

    it('should handle user not found when getting a user by ID', async () => {
      const userId = '123'

      User.findOne = jest.fn().mockResolvedValue(null)

      const user = await UserService.getUserById(userId)

      expect(user).toBeNull()
    })
  })
})
