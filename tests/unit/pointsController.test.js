const pointsController = require('../../server/controllers/pointsController')
const User = require('../../server/models/User')

describe('pointsController', () => {
  describe('updatePoints', () => {
    it('should update user points', async () => {
      const req = {
        params: {
          userId: '123',
        },
        body: {
          points: 500,
        },
      }
      const res = {
        json: jest.fn(),
      }

      User.findOneAndUpdate = jest.fn().mockResolvedValue({
        userId: '123',
        name: 'John Doe',
        points: 1000,
      })

      await pointsController.updatePoints(req, res)

      expect(res.json).toHaveBeenCalledWith({
        userId: '123',
        name: 'John Doe',
        points: 500,
      })
    })

    it('should handle errors when updating user points', async () => {
      const req = {
        params: {
          userId: '123',
        },
        body: {
          points: 500,
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      User.findOneAndUpdate = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      await pointsController.updatePoints(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
    })

    it('should handle user not found when updating points', async () => {
      const req = {
        params: {
          userId: '123',
        },
        body: {
          points: 500,
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      User.findOneAndUpdate = jest.fn().mockResolvedValue(null)

      await pointsController.updatePoints(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' })
    })
  })
})
