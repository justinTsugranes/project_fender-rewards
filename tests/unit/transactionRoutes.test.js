const request = require('supertest')
const app = require('../../server/index')
const Transaction = require('../../server/models/Transaction')

describe('Transaction routes', () => {
  describe('POST /transactions', () => {
    it('should create a new transaction', async () => {
      const reqBody = {
        userId: '123',
        amount: 50,
      }

      const res = await request(app).post('/transactions').send(reqBody)

      expect(res.status).toBe(201)
      expect(res.body.userId).toBe('123')
      expect(res.body.amount).toBe(50)

      const createdTransaction = await Transaction.findOne({ userId: '123' })

      expect(createdTransaction).toBeTruthy()
      expect(createdTransaction.amount).toBe(50)
    })

    it('should handle errors when creating a transaction', async () => {
      const reqBody = {
        userId: '123',
        amount: 50,
      }

      Transaction.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      const res = await request(app).post('/transactions').send(reqBody)

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Database error')
    })
  })

  describe('GET /transactions/:userId', () => {
    it('should get transactions by user ID', async () => {
      const userId = '123'

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

      const res = await request(app).get(`/transactions/${userId}`)

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(res.body[0].userId).toBe('123')
      expect(res.body[0].amount).toBe(50)
      expect(res.body[1].userId).toBe('123')
      expect(res.body[1].amount).toBe(100)
    })

    it('should handle errors when getting transactions by user ID', async () => {
      const userId = '123'

      Transaction.find = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      const res = await request(app).get(`/transactions/${userId}`)

      expect(res.status).toBe(500)
      expect(res.body.message).toBe('Database error')
    })
  })
})
