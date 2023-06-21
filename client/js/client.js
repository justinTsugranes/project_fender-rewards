// Reference needed DOM elements
const userIdInput = document.getElementById("user-id");
const fetchUserBtn = document.getElementById("fetch-user-btn");
const userIdDisplay = document.getElementById("userId");
const pointsDisplay = document.getElementById("points");
const newPointsInput = document.getElementById("new-points");
const updatePointsBtn = document.getElementById("update-points-btn");
const errorMessageDisplay = document.getElementById("error-message"); // New

// Fetch a single user's data based on their ID
// Fetch a single user's data based on their ID
async function fetchUser(id) {
  try {
    const response = await fetch(`/users/${id}`)
    const user = await response.json()

    if (response.ok) {
      console.log(user)
      document.querySelector('#user-name').textContent = user.name;
      document.querySelector('#points').textContent = user.points_balance;

      setErrorMessageVisibility(false); // Hide the error message
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    setErrorMessageVisibility(true, error.message); // Show the error message
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
      document.querySelector('#user-name').textContent = user.name;
      document.querySelector('#points').textContent = user.points_balance;

      setErrorMessageVisibility(false); // Hide the error message
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    setErrorMessageVisibility(true, error.message); // Show the error message
  }
}

// helper function
function setErrorMessageVisibility(show, message = '') {
  const errorElement = document.getElementById('error-message');

  if (show) {
    errorElement.textContent = `Error: ${message}`;
    errorElement.style.display = 'block';
  } else {
    errorElement.style.display = 'none';
  }
}

// Add event listeners
fetchUserBtn.addEventListener("click", () => fetchUser(userIdInput.value));
updatePointsBtn.addEventListener("click", () =>
  updateUserPoints(userIdInput.value, newPointsInput.value)
);
