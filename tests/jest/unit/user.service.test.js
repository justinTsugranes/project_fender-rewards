// Import the necessary modules and dependencies
const { createUser } = require('../../../server/services')
const { UserModel } = require('../../../server/models')
const { mockUser } = require('../../mocks/mockUsers')

// Mock the UserModel module
jest.mock('../../server/models', () => {
  const saveMock = jest.fn()
  const mockUserInstance = {
    ...mockUser,
    save: saveMock,
  }

  return {
    UserModel: jest.fn(() => mockUserInstance),
    saveMock,
  }
})

// Create a describe block to group the tests for the createUser function
describe('createUser', () => {
  // Create a test case for successful user creation
  it('should create a new user', async () => {
    // Call the createUser function with the mockUser data
    const newUser = await createUser(mockUser)

    // Expectations
    expect(UserModel).toHaveBeenCalledTimes(1)
    expect(UserModel).toHaveBeenCalledWith(mockUser)
    expect(UserModel.saveMock).toHaveBeenCalledTimes(1)
    expect(newUser).toEqual(UserModel.mock.instances[0])

    // Return the newUser object
    return newUser
  })

  // Create a test case for handling duplicate user creation
  it('should throw an error for duplicate user', async () => {
    // Mock the UserModel to throw an error
    UserModel.mockImplementationOnce(() => {
      const error = new Error()
      error.code = 11000 // Set the error code to simulate a duplicate user
      throw error
    })

    // Call the createUser function with the mockUser data and expect it to throw an error
    await expect(createUser(mockUser)).rejects.toThrowError(
      'User with the same ID or email already exists.',
    )

    // Expectations
    expect(UserModel).toHaveBeenCalledTimes(1)
    expect(UserModel).toHaveBeenCalledWith(mockUser)
    expect(UserModel.saveMock).not.toHaveBeenCalled()
  })

  // Add more test cases as needed
})
