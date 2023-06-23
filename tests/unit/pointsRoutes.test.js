const request = require('supertest')
const app = require('../../server/index')
const Points = require('../../server/models/Points')

describe('Points routes', () => {
  describe('PUT /points/:userId', () => {
    it('should update user points', async () => {
      const userId = '123'
      const initialPoints = 1000
      const updatedPoints = 500

      // Create a test points record in the database
      const points = new Points({
        userId,
        totalPoints: initialPoints,
      })
      await points.save()

      // Send a PUT request to update the user points
      const res = await request(app)
        .put(`/points/${userId}`)
        .send({ points: updatedPoints })

      // Assert the response status and updated points value
      expect(res.status).toBe(200)
      expect(res.body.userId).toBe(userId)
      expect(res.body.totalPoints).toBe(updatedPoints)

      // Fetch the points record from the database
      const updatedPointsRecord = await Points.findOne({ userId })

      // Assert that the points record in the database has been updated
      expect(updatedPointsRecord.totalPoints).toBe(updatedPoints)
    })

    it('should handle errors when updating user points', async () => {
      const userId = '123'
      const updatedPoints = 500

      // Send a PUT request to update the user points
      const res = await request(app)
        .put(`/points/${userId}`)
        .send({ points: updatedPoints })

      // Assert the response status and error message
      expect(res.status).toBe(500)
      expect(res.body.message).toBe('Database error')
    })

    it('should handle user not found when updating points', async () => {
      const userId = '123'
      const updatedPoints = 500

      // Send a PUT request to update the user points
      const res = await request(app)
        .put(`/points/${userId}`)
        .send({ points: updatedPoints })

      // Assert the response status and error message
      expect(res.status).toBe(404)
      expect(res.body.message).toBe('User not found')
    })
  })
})
