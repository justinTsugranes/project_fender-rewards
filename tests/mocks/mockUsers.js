// mockUsers.js

// Mock user data for testing createUser function
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'johndoe@example.com',
  points_balance: 0,
}

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    points_balance: 100,
    reward_points: {
      points: [
        {
          transaction_id: '1',
          original_points: 50,
          remaining_points: 50,
          assignment_date: new Date('2023-06-01'),
          expiry_date: new Date('2023-12-31'),
          status: 'active',
          source_platform: 'Platform A',
          redemptions: [],
        },
        {
          transaction_id: '2',
          original_points: 30,
          remaining_points: 30,
          assignment_date: new Date('2023-06-15'),
          expiry_date: new Date('2023-12-31'),
          status: 'active',
          source_platform: 'Platform B',
          redemptions: [],
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    points_balance: 200,
    reward_points: {
      points: [
        {
          transaction_id: '3',
          original_points: 100,
          remaining_points: 100,
          assignment_date: new Date('2023-05-01'),
          expiry_date: new Date('2023-11-30'),
          status: 'active',
          source_platform: 'Platform A',
          redemptions: [],
        },
      ],
    },
  },
  // Add more mock users as needed
]

module.exports = {
  mockUser,
  mockUsers,
}
