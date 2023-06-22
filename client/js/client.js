// Reference needed DOM elements
const userIdInput = document.getElementById('user-id');
const fetchUserBtn = document.getElementById('fetch-user-btn');
const pointsInput = document.getElementById('points');
const newPointsInput = document.getElementById('new-points');
const updatePointsBtn = document.getElementById('update-points-btn');
const redeemPointsInput = document.getElementById('points-to-redeem');
const redeemPointsBtn = document.getElementById('redeem-points-btn');

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
      document.querySelector('#userId').textContent = user.userId;
      pointsInput.textContent = user.points;
      setErrorMessageVisibility(false); // Hide the error message
    } else {
      throw new Error(user.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    setErrorMessageVisibility(true, error.message); // Show the error message
  }
}

// Update user's points
async function updatePoints(id, points) {
  if (!id || !points) {
    setErrorMessageVisibility(true, 'User ID and points cannot be empty');
    return;
  }

  try {
    const response = await fetch(`/users/${id}/points`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(result);
      document.querySelector('#userId').textContent = result.userId;
      pointsInput.textContent = result.points;
      setErrorMessageVisibility(false); // Hide the error message
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    setErrorMessageVisibility(true, error.message); // Show the error message
  }
}

// Redeem user's points
async function redeemPoints(id, pointsToRedeem) {
  if (!id || !pointsToRedeem) {
    setErrorMessageVisibility(true, 'User ID and points to redeem cannot be empty');
    return;
  }

  try {
    const response = await fetch(`/users/${id}/redeem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pointsToRedeem }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(result);
      document.querySelector('#userId').textContent = result.userId;
      pointsInput.textContent = result.points;
      setErrorMessageVisibility(false); // Hide the error message
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    setErrorMessageVisibility(true, error.message); // Show the error message
  }
}

// Add event listeners
fetchUserBtn.addEventListener('click', () => fetchUser(userIdInput.value.trim()));
updatePointsBtn.addEventListener('click', () =>
  updatePoints(userIdInput.value.trim(), newPointsInput.value.trim())
);
redeemPointsBtn.addEventListener('click', () =>
  redeemPoints(userIdInput.value.trim(), redeemPointsInput.value.trim())
);
