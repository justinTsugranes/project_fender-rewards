const Points = require('../../server/models/Points')

describe('Points model', () => {
  describe('save', () => {
    it('should save points to the database', async () => {
      const points = new Points({
        userId: '123',
        totalPoints: 1000,
      })

      const savedPoints = await points.save()

      expect(savedPoints.userId).toBe('123')
      expect(savedPoints.totalPoints).toBe(1000)
    })

    it('should enforce required fields', async () => {
      const points = new Points({})

      let error
      try {
        await points.save()
      } catch (err) {
        error = err
      }

      expect(error).toBeDefined()
      expect(error.name).toBe('ValidationError')
    })
  })
})
