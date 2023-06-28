const { UserModel } = require('../models')

async function createIndexes() {
  try {
    await UserModel.createIndexes([
      { id: 1 },
      { points_balance: 1 },
      { 'reward_points.points.expiry_date': 1 }, // Index on the expiry_date field of reward_points.points
      // Add more indexes for other relevant fields as needed
    ])

    console.log('Indexes created successfully')
  } catch (error) {
    console.error('Error creating indexes:', error)
  }
}

// Call the createIndexes function to create the indexes
createIndexes()
