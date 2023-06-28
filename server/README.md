# Notes

## user.model.js

## user.service.js

### earnPoints()

Async function. It takes two parameters: id (the user's ID) and pointsData (an object containing information about the points to be added).

Start a try block to catch any potential errors that may occur during the function execution.

Log the received user ID and points data to the console for debugging purposes.

Fetch the user from the database using the provided ID. Use mongoose's findOne method to retrieve the user.

If the user does not exist in the database (i.e., user is null), log the message to the console and return null. This terminates the function execution here.

If the user does exist, proceed to create a new points object.

This newPoints object is constructed with data from the pointsData argument. It also includes an empty array for redemptions.

The new points object is then pushed into the user's reward_points.points array

This array holds all the points transactions for the user.

The user's points balance is updated by adding the remaining points from the pointsData to the current balance.

Before saving the changes to the database, log the user object to the console.

Save the updated user to the database using mongoose's save method. This operation is asynchronous, so we await its completion. The save method returns the saved user object, so we update our user variable with it.

After saving, log the updated user object and the earned points to the console.

Return the updated user object. This concludes the normal execution of the function.

If there's any error during execution, it's caught by the catch block. Log the error message and then throw a new Error with the same message

This allows the function caller to handle or display the error message as appropriate.

### redeemPoints()

Receive a user ID and a data object detailing points to be redeemed.

Fetch the user associated with the given ID from the database.

If the user does not exist, return an error.

Calculate the total available points by summing up the remaining points from the user's reward points.

If the points to be redeemed exceed the total available points or if there are no available points, return an error.

Define a helper function to create a point redemption which:

- Creates a redemption object.
- Adds the redemption to the point's redemptions.
- Subtracts the redeemed points from the remaining points of the point object.
- If all the points have been redeemed, mark the point as redeemed.

Initialize a variable to track remaining points to be redeemed.

Iterate over the user's points. For each point, if there are remaining points to be redeemed:

- Calculate the points to be redeemed from the point (whichever is smaller - remaining points to be redeemed or the point's remaining points).
- Subtract the redeemed points from the remaining points to be redeemed.
- Call the helper function to create a point redemption.

Subtract the points redeemed from the user's points balance.

Save the updated user to the database.

Return the updated user data

### expirePoints()

Fetch all users from the database.

Get the current date.

Iterate over each user:

- For each point in the user's reward points, if the point's status is active and its expiry date is on or before the current date:
  - Mark the point as expired.
  - Subtract the point's value from the user's points balance.
- Save the user's updated data to the database.

Log a message indicating that the points have expired.

If an error occurs at any point, log the error message and throw an error.

### cron job

Schedule a cron job to run every day at midnight.

When the job is triggered:

- Log that the point expiration task is running.
- Run the expirePoints function.
- Log that the point expiration task has completed.
- If an error occurs at any point, log the error message
