// Assuming you have a user ID
const userId = 2

// Fetch user data
fetch(`http://localhost:3000/users/${userId}`)
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data
    console.log(data)
  })
  .catch((error) => {
    // Handle any errors
    console.error(error)
  })

// Update user points
const updatedPoints = 1000

fetch(`http://localhost:3000/users/${userId}/points`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    points_balance: updatedPoints,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data
    console.log(data)
  })
  .catch((error) => {
    // Handle any errors
    console.error(error)
  })
