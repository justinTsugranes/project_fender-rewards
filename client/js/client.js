// User Details
const user = document.getElementById('user')
const currentPoints = document.getElementById('current-points')
const redeemedPoints = document.getElementById('redeemed-points')
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
      currentPoints.textContent = user.totalPoints // Update points
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
  id = id.trim()
  points = points.trim()
  if (!id || !points || !/^\d+$/.test(id) || !/^\d+$/.test(points)) {
    showError('Invalid user ID or points')
    return
  }

  try {
    const response = await fetch(`${baseUrl}/users/${id}/earnPoints`, {
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
      currentPoints.textContent = result.totalPoints // Update points
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
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
    const response = await fetch(`${baseUrl}/users/${id}/redeemPoints`, {
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
      currentPoints.textContent = result.totalPoints // Update points
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
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
