const transactionController = require('../../server/controllers/transactionController')
const Transaction = require('../../server/models/Transaction')

describe('transactionController', () => {
  describe('createTransaction', () => {
    it('should create a new transaction', async () => {
      const req = {
        body: {
          userId: '123',
          amount: 50,
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await transactionController.createTransaction(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        userId: '123',
        amount: 50,
      })
    })

    it('should handle errors when creating a transaction', async () => {
      const req = {
        body: {
          userId: '123',
          amount: 50,
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      // Force an error by setting an invalid property name
      Transaction.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Invalid property'))

      await transactionController.createTransaction(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid property' })
    })
  })

  describe('getTransactionsByUser', () => {
    it('should get transactions by user', async () => {
      const req = {
        params: {
          userId: '123',
        },
      }
      const res = {
        json: jest.fn(),
      }

      Transaction.find = jest.fn().mockResolvedValue([
        {
          userId: '123',
          amount: 50,
        },
        {
          userId: '123',
          amount: 100,
        },
      ])

      await transactionController.getTransactionsByUser(req, res)

      expect(res.json).toHaveBeenCalledWith([
        {
          userId: '123',
          amount: 50,
        },
        {
          userId: '123',
          amount: 100,
        },
      ])
    })

    it('should handle errors when getting transactions by user', async () => {
      const req = {
        params: {
          userId: '123',
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      Transaction.find = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      await transactionController.getTransactionsByUser(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
    })
  })
})
