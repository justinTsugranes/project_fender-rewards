const users = [
  {
    id: '1',
    name: 'jimi hendrix',
    points_balance: 500,
  },
  {
    id: '2',
    name: 'eric clapton',
    points_balance: 1200,
  },
  {
    id: '3',
    name: 'david gilmour',
    points_balance: 500,
  },
  {
    id: '4',
    name: 'stevie ray vaughan',
    points_balance: 950,
  },
  {
    id: '5',
    name: 'jeff beck',
    points_balance: 500,
  },
]

const getUserById = (userId) => users.find((user) => user.id === userId)

const updateUserPoints = (userId, newPoints) => {
  const user = getUserById(userId)
  user.points_balance = newPoints
  return user
}

module.exports = {
  getUserById,
  updateUserPoints,
}
