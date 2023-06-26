// User Details
const userId = document.getElementById('user-id')
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

// Variable to store the current User ID
let currentUserId = null

// Fetch a single user's data based on their ID
async function getUser(id) {
  id = id.trim()
  if (!id || !/^\d+$/.test(id)) {
    showError('Invalid user ID')
    return
  }

  try {
    const response = await fetch(`${baseUrl}/api/users/${id}`)
    const user = await response.json()

    if (response.ok) {
      clearError() // Clear any previous error messages
      console.log(user)
      currentUserId = user.id // Store user ID
      userId.textContent = user.id // Update user ID
      userName.textContent = user.name // Update name
      currentPoints.textContent = user.points_balance // Update points
      userIdInput.value = '' // Clear input field
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('getUser Error:', error)
    showError(error.message)
    userIdInput.value = '' // Clear input field
  }
}

// Function to earn points
async function earnPoints(id, points) {
  // check if user id is provided
  if (!id) {
    showError('Please get user data first') // Display an error message if id is not provided
    return
  }

  id = id.trim() // Remove leading and trailing whitespace from id
  points = points.trim() // Remove leading and trailing whitespace from points

  // check if points is provided and is a positive integer
  if (!points || !/^\d+$/.test(points)) {
    showError('Invalid points') // Display an error message if points is not provided or not a positive integer
    return
  }

  try {
    // Send a POST request to the server with the user ID and points to earn
    const response = await fetch(`${baseUrl}/api/users/${id}/earn-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points: Number(points) }), // Convert points to a number and send it as JSON in the request body
    })

    const result = await response.json() // Parse the response body as JSON

    // Check if the response is OK
    if (response.ok) {
      clearError() // Clear any previous error messages
      console.log(result) // Log the result object to the console
      currentPoints.textContent = result.points_balance // Update the points display with the new points balance
      earnPointsInput.value = '' // Clear the input field
    } else {
      throw new Error(result.message) // Throw an error with the message from the result object
    }
  } catch (error) {
    console.error('earnPoints Error:', error) // Log the error to the console
    showError(error.message) // Display the error message to the user
    earnPointsInput.value = '' // Clear the input field
  }
}

// Redeem user's points
async function redeemPoints(id, points) {
  // check if user id is provided
  if (!id) {
    showError('Please get user data first') // Display an error message if id is not provided
    return
  }

  id = id.trim() // Remove leading and trailing whitespace from id
  points = points.trim() // Remove leading and trailing whitespace from points

  // check if points is provided and is a positive integer
  if (!points || !/^\d+$/.test(points)) {
    showError('Invalid points to redeem') // Display an error message if points is not provided or not a positive integer
    return
  }

  try {
    // Send a POST request to the server with the user ID and points to redeem
    const response = await fetch(`${baseUrl}/api/users/${id}/redeem-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points: Number(points) }), // Convert points to a number and send it as JSON in the request body
    })

    const result = await response.json() // Parse the response body as JSON

    // Check if the response is OK
    if (response.ok) {
      clearError() // Clear any previous error messages
      console.log(result) // Log the result object to the console
      currentPoints.textContent = result.points_balance // Update the points display with the new points balance
      redeemPointsInput.value = '' // Clear the input field
    } else {
      throw new Error(result.message) // Throw an error with the message from the result object
    }
  } catch (error) {
    console.error('redeemPoints Error:', error) // Log the error to the console
    showError(error.message) // Display the error message to the user
    redeemPointsInput.value = '' // Clear the input field
  }
}

// Add event listeners
getUserBtn.addEventListener('click', () => getUser(userIdInput.value)) // Use user ID input value
earnPointsBtn.addEventListener(
  'click',
  () => earnPoints(currentUserId, earnPointsInput.value), // Use stored User ID
)
redeemPointsBtn.addEventListener(
  'click',
  () => redeemPoints(currentUserId, redeemPointsInput.value), // Use stored User ID
)
