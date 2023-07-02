const { UserModel } = require('../models')

async function createIndexes() {
  try {
    await UserModel.createIndexes()
    console.log('Indexes created successfully')
  } catch (error) {
    console.error('Error creating indexes:', error)
  }
}

// Call the createIndexes function to create the indexes
createIndexes()
