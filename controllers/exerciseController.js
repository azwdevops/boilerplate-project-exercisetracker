const mongoose = require("mongoose");

const UserModel = require("../models/userModel");

// POST /api/users/:_id/exercises: Add an exercise to a specific user
exports.addExercise = async (req, res) => {
  const { _id } = req.params; // Extract the user ID from the URL parameters

  // Check if the user ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid user ID format. Must be a valid ObjectId." });
  }

  const { description, duration, date } = req.body; // Extract exercise details from the request body

  // if no date if provided, use the current date
  const exerciseDate = new Date(date) || new Date();

  try {
    //   Find the user by ID in the database
    const user = await UserModel.findById(_id);

    // If the user doesn't exist, return a 404 error
    if (!user) return res.status(404).json({ error: "User not found" });

    // Create a new exercise object
    const newExercise = {
      description,
      duration,
      date: exerciseDate,
    };

    // Add the new exercise to the user's exercises array
    user.exercises.push(newExercise);

    // Save the updated user back to the database
    await user.save();

    // Send back the user object with created exercise
    const data = {
      username: user.username,
      description: user.exercises[0].description,
      duration: user.exercises[0].duration,
      date: user.exercises[0].date,
      _id: user._id,
    };
    return res.status(200).json(user);
  } catch (error) {
    // If there's an error, send back a 500 status with the error message
    return res.status(500).json({ error: error.message });
  }
};
