// Reference needed DOM elements
const userIdInput = document.getElementById('user-id')
const fetchUserBtn = document.getElementById('fetch-user-btn')
const selectedUserElement = document.getElementById('selected-user')
const newPointsInput = document.getElementById('new-points')
const updatePointsBtn = document.getElementById('update-points-btn')

// Fetch a single user's data based on their ID
async function fetchUser(id) {
  try {
    const response = await fetch(`/users/${id}`)
    const user = await response.json()

    if (response.ok) {
      console.log(user)
      document.querySelector(
        '#selected-user',
      ).textContent = `${user.name} has ${user.points_balance} points.`
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

async function updateUserPoints(id, points) {
  try {
    const response = await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points }),
    })
    const user = await response.json()

    if (response.ok) {
      console.log(user)
      document.querySelector(
        '#selected-user',
      ).textContent = `${user.name} now has ${user.points_balance} points.`
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

// Add event listeners
fetchUserBtn.addEventListener('click', () => fetchUser(userIdInput.value))
updatePointsBtn.addEventListener('click', () =>
  updateUserPoints(userIdInput.value, newPointsInput.value),
)
