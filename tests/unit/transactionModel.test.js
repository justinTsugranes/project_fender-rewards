const Transaction = require('../../server/models/Transaction')

describe('Transaction model', () => {
  describe('save', () => {
    it('should save transaction to the database', async () => {
      const transaction = new Transaction({
        userId: '123',
        amount: 50,
      })

      const savedTransaction = await transaction.save()

      expect(savedTransaction.userId).toBe('123')
      expect(savedTransaction.amount).toBe(50)
    })

    it('should enforce required fields', async () => {
      const transaction = new Transaction({})

      let error
      try {
        await transaction.save()
      } catch (err) {
        error = err
      }

      expect(error).toBeDefined()
      expect(error.name).toBe('ValidationError')
    })
  })
})
