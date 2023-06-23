// Reference needed DOM elements
const userIdInput = document.getElementById('user-id')
const fetchUserBtn = document.getElementById('get-user-btn')
const currentPoints = document.getElementById('current-points')
const earnPointsInput = document.getElementById('earn-points')
const earnPointsBtn = document.getElementById('earn-points-btn')
const redeemPointsInput = document.getElementById('redeem-points')
const redeemPointsBtn = document.getElementById('redeem-points-btn')
const errorMessage = document.getElementById('error-message')

// Helper function to display error messages
function showError(message) {
  errorMessage.textContent = `Error: ${message}`
  errorMessage.style.display = 'block'
}

// Helper function to clear error messages
function clearError() {
  errorMessage.style.display = 'none'
  errorMessage.textContent = ''
}

// Fetch a single user's data based on their ID
async function fetchUser(id) {
  if (!id) {
    showError('User ID cannot be empty')
    return
  }

  try {
    const response = await fetch(`/users/${id}`)
    const user = await response.json()

    if (response.ok) {
      console.log(user)
      currentPoints.textContent = user.points // Update points
      clearError() // Clear any previous error messages
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    showError(error.message)
  }
}

// Function to earn points
async function earnPoints(id, points) {
  if (!id || !points) {
    showError('User ID and points cannot be empty')
    return
  }

  try {
    const response = await fetch(`/users/${id}/earnPoints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points: Number(points) }),
    })

    const result = await response.json()

    if (response.ok) {
      console.log(result)
      currentPoints.textContent = result.points // Update points
      clearError() // Clear any previous error messages
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    showError(error.message)
  }
}

// Redeem user's points
async function redeemPoints(id, pointsToRedeem) {
  if (!id || !pointsToRedeem) {
    showError('User ID and points to redeem cannot be empty')
    return
  }

  try {
    const response = await fetch(`/users/${id}/redeemPoints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points: Number(pointsToRedeem) }),
    })

    const result = await response.json()

    if (response.ok) {
      console.log(result)
      currentPoints.textContent = result.points // Update points
      clearError() // Clear any previous error messages
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    showError(error.message)
  }
}

// Add event listeners
fetchUserBtn.addEventListener('click', () =>
  fetchUser(userIdInput.value.trim()),
)
earnPointsBtn.addEventListener('click', () =>
  earnPoints(userIdInput.value.trim(), earnPointsInput.value.trim()),
)
redeemPointsBtn.addEventListener('click', () =>
  redeemPoints(userIdInput.value.trim(), redeemPointsInput.value.trim()),
)
