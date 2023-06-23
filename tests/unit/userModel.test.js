const User = require('../../server/models/User')

describe('User model', () => {
  describe('save', () => {
    it('should save user to the database', async () => {
      const user = new User({
        userId: '123',
        name: 'John Doe',
        points: 1000,
      })

      const savedUser = await user.save()

      expect(savedUser.userId).toBe('123')
      expect(savedUser.name).toBe('John Doe')
      expect(savedUser.points).toBe(1000)
    })

    it('should enforce required fields', async () => {
      const user = new User({})

      let error
      try {
        await user.save()
      } catch (err) {
        error = err
      }

      expect(error).toBeDefined()
      expect(error.name).toBe('ValidationError')
    })
  })
})
