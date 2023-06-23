// Reference needed DOM elements
const userIdInput = document.getElementById('user-id')
const fetchUserBtn = document.getElementById('fetch-user-btn')
const currentPoints = document.getElementById('current-points')
const earnPointsInput = document.getElementById('earn-points')
const earnPointsBtn = document.getElementById('earn-points-btn')
const redeemPointsInput = document.getElementById('points-to-redeem')
const redeemPointsBtn = document.getElementById('redeem-points-btn')

// Helper function to handle error message visibility
function setErrorMessageVisibility(show, message = '') {
  const errorElement = document.getElementById('error-message')

  if (show) {
    errorElement.textContent = `Error: ${message}`
    errorElement.style.display = 'block'
  } else {
    errorElement.style.display = 'none'
    errorElement.textContent = '' // Empty the error message
  }
}

// Fetch a single user's data based on their ID
async function fetchUser(id) {
  if (!id) {
    setErrorMessageVisibility(true, 'User ID cannot be empty')
    return
  }

  try {
    const response = await fetch(`/users/${id}`)
    const user = await response.json()

    if (response.ok) {
      console.log(user)
      currentPoints.textContent = user.points // Update points
      setErrorMessageVisibility(false) // Hide the error message
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    setErrorMessageVisibility(true, error.message) // Show the error message
  }
}

// Function to earn points
async function earnPoints(id, points) {
  if (!id || !points) {
    setErrorMessageVisibility(true, 'User ID and points cannot be empty')
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
      setErrorMessageVisibility(false) // Hide the error message
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    setErrorMessageVisibility(true, error.message) // Show the error message
  }
}

// Redeem user's points
async function redeemPoints(id, pointsToRedeem) {
  if (!id || !pointsToRedeem) {
    setErrorMessageVisibility(
      true,
      'User ID and points to redeem cannot be empty',
    )
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
      setErrorMessageVisibility(false) // Hide the error message
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    setErrorMessageVisibility(true, error.message) // Show the error message
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
