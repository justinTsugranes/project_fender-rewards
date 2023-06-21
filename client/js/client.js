// Reference needed DOM elements
const userIdInput = document.getElementById('user-id');
const fetchUserBtn = document.getElementById('fetch-user-btn');
const pointsInput = document.getElementById('points');
const newPointsInput = document.getElementById('new-points');
const updatePointsBtn = document.getElementById('update-points-btn');

// Helper function to handle error message visibility
function setErrorMessageVisibility(show, message = '') {
  const errorElement = document.getElementById('error-message');

  if (show) {
    errorElement.textContent = `Error: ${message}`;
    errorElement.style.display = 'block';
  } else {
    errorElement.style.display = 'none';
    errorElement.textContent = ''; // Empty the error message
  }
}

// Fetch a single user's data based on their ID
async function fetchUser(id) {
  if (!id) {
    setErrorMessageVisibility(true, 'User ID cannot be empty');
    return;
  }

  try {
    const response = await fetch(`/users/${id}`);
    const user = await response.json();

    if (response.ok) {
      console.log(user);
      document.querySelector('#userId').textContent = id;
      pointsInput.textContent = user.points_balance;

      setErrorMessageVisibility(false); // Hide the error message
    } else {
      throw new Error(user.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    setErrorMessageVisibility(true, error.message); // Show the error message
  }
}

async function updateUserPoints(id, points) {
  if (!id || !points) {
    setErrorMessageVisibility(true, 'User ID and points cannot be empty');
    return;
  }

  try {
    const response = await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points }),
    });

    const user = await response.json();

    if (response.ok) {
      console.log(user);
      document.querySelector('#userId').textContent = id;
      pointsInput.textContent = user.points_balance;

      setErrorMessageVisibility(false); // Hide the error message
    } else {
      throw new Error(user.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    setErrorMessageVisibility(true, error.message); // Show the error message
  }
}

// Add event listeners
fetchUserBtn.addEventListener('click', () => fetchUser(userIdInput.value.trim()));
updatePointsBtn.addEventListener('click', () =>
  updateUserPoints(userIdInput.value.trim(), newPointsInput.value.trim()),
);
