// User Details
const userId = document.getElementById('user-id')
const userName = document.getElementById('user-name')
const currentPoints = document.getElementById('current-points')
// GET USER
const userIdInput = document.getElementById('user-id-input')
const getUserBtn = document.getElementById('get-user-btn')
// EARN POINTS
const earnPointsInput = document.getElementById('earn-points-input')
const earnPointsBtn = document.getElementById('earn-points-btn')
// REDEEM POINTS
const redeemPointsInput = document.getElementById('redeem-points-input')
const redeemPointsBtn = document.getElementById('redeem-points-btn')
// ERROR MESSAGE
const errorMessage = document.getElementById('error-message')

// URL of the server
// const baseUrl = 'http://localhost:5000'
const baseUrl = 'https://fender-rewards.netlify.app'
// const baseUrl = 'https://fender-rewards-ad6260c69224.herokuapp.com'

// Variable to store the current User ID
let currentUserId = null

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

// Generate a timestamp-based transaction ID
function generateTransactionId() {
  return Date.now().toString()
}

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
      console.log(user) // Log the user object to the console
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

  id = id.trim() // Remove leading and trailing whitespace from id - isn't completely necessary given we store the id in a variable
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
      body: JSON.stringify({
        transaction_id: generateTransactionId(), // Use the generated transaction ID
        original_points: Number(points), // Use original_points instead of points
        remaining_points: Number(points), // Use remaining_points instead of points
        assignment_date: new Date().toISOString(), // Use the current date as the assignment_date
        expiry_date: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000,
        ).toISOString(), // Set expiry_date to one year from now
        status: 'Active', // Set the status to 'Active'
        source_platform: 'Web', // Set the source_platform to 'Web' - this is currently hardcoded, but wouldn normally be determined by the source of the request
      }),
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

  id = id.trim() // Remove leading and trailing whitespace from id - isn't completely necessary given we store the id in a variable
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
      body: JSON.stringify({
        redemption_id: generateTransactionId(), // Use the generated transaction ID
        redeemed_points: Number(points), // Use redeemed_points instead of points
        redemption_date: new Date().toISOString(), // Use the current date as the redemption_date
      }),
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
    console.log('Error Message:', error.message) // Log the error message to the console

    if (error.message.includes('Not enough points to redeem')) {
      showError('Insufficient points to redeem') // Display a more user-friendly error message
    } else {
      showError(error.message) // Display the original error message to the user
    }

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
