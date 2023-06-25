// User Details
const user = document.getElementById('user-id')
const userName = document.getElementById('user-name')
const currentPoints = document.getElementById('current-points')
// GET USER
const userIdInput = document.getElementById('user-id-input')
const getUserBtn = document.getElementById('get-user-btn')
const userMessage = document.getElementById('user-message')
// EARN POINTS
const earnPointsInput = document.getElementById('earn-points-input')
const earnPointsBtn = document.getElementById('earn-points-btn')
const earnPointsMessage = document.getElementById('earn-points-message')
// REDEEM POINTS
const redeemPointsInput = document.getElementById('redeem-points-input')
const redeemPointsBtn = document.getElementById('redeem-points-btn')
const redeemPointsMessage = document.getElementById('redeem-points-message')
// ERROR MESSAGE
const errorMessage = document.getElementById('error-message')

// URL
const baseUrl = 'http://localhost:5000'

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
async function getUser(id) {
  id = id.trim()
  if (!id || !/^\d+$/.test(id)) {
    showError('Invalid user ID')
    return
  }

  try {
    const response = await fetch(`${baseUrl}/users/${id}`)
    const user = await response.json()

    if (response.ok) {
      clearError() // Clear any previous error messages
      console.log(user)
      userName.textContent = user.name // Update name
      currentPoints.textContent = user.points_balance // Update points
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('getUser Error:', error)
    showError(error.message)
  }
}

// Function to earn points
async function earnPoints(id, points) {
  id = id.trim()
  points = points.trim()
  if (!id || !points || !/^\d+$/.test(id) || !/^\d+$/.test(points)) {
    showError('Invalid user ID or points')
    return
  }

  try {
    const response = await fetch(`${baseUrl}/users/${id}/earn-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points: Number(points) }),
    })

    const result = await response.json()

    if (response.ok) {
      clearError() // Clear any previous error messages
      console.log(result)
      currentPoints.textContent = result.points_balance // Update points
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('earnPoints Error:', error)
    showError(error.message)
  }
}

// Redeem user's points
async function redeemPoints(id, points) {
  id = id.trim()
  points = points.trim()
  if (!id || !points || !/^\d+$/.test(id) || !/^\d+$/.test(points)) {
    showError('Invalid user ID or points to redeem')
    return
  }

  try {
    const response = await fetch(`${baseUrl}/users/${id}/redeem-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points: Number(points) }),
    })

    const result = await response.json()

    if (response.ok) {
      clearError() // Clear any previous error messages
      console.log(result)
      currentPoints.textContent = result.points_balance // Update points
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('redeemPoints Error:', error)
    showError(error.message)
  }
}

// Add event listeners
getUserBtn.addEventListener('click', () => getUser(userIdInput.value))
earnPointsBtn.addEventListener('click', () =>
  earnPoints(userIdInput.value, earnPointsInput.value),
)
redeemPointsBtn.addEventListener('click', () =>
  redeemPoints(userIdInput.value, redeemPointsInput.value),
)
