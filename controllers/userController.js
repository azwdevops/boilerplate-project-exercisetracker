const mongoose = require("mongoose");

const UserModel = require("../models/userModel");

// handler to create User using POST at /api/users

exports.createUser = async (req, res) => {
  // Extract the username from the request body
  const { username } = req.body;

  try {
    // Create a new user instance with the provided username
    const user = new UserModel({ username });
    // Save the user to the database
    await user.save();

    // Send back the created user with the username and _id

    return res.status(201).json(user);
  } catch (error) {
    // If there's an error, send back a 500 status with the error message
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/users: Get all users
exports.getUsers = async (req, res) => {
  try {
    // Retrieve all users from the database

    const users = await UserModel.find();
    // Send back the users list as the response
    return res.status(200).json(users);
  } catch (error) {
    // If there's an error, send back a 500 status with the error message
    return res.status(500).json({ error: error.message });
  }
};

// GET /api/users/:_id/logs: Get exercise logs for a specific user

exports.getUserLogs = async (req, res) => {
  // Extract the user ID from the request parameters
  const { _id } = req.params;

  // Check if the user ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid user ID format. Must be a valid ObjectId." });
  }

  // Extract query parameters (from, to, limit)
  const { from, to, limit } = req.query;

  try {
    // Find the user by ID in the database
    const user = await UserModel.findById(_id);

    // If the user doesn't exist, return a 404 error
    if (!user) return res.status(404).json({ error: "User not found" });

    let logs = user.exercises; // we get the user exercises

    // filter the logs by from and to date if provided
    if (from) {
      logs = logs.filter((log) => log.date >= from);
    }

    if (to) {
      logs = logs.filter((log) => log.date <= to);
    }

    // Apply the 'limit' query parameter to limit the number of logs returned
    if (limit) {
      logs = logs.slice(parseInt(limit)); // limit the logs to the specified number
    }

    const userLogs = logs.map((logItem) => ({
      description: logItem.description,
      duration: logItem.duration,
      date: logItem.date.toDateString(),
    }));

    // send the user data with count and the filtered logs

    return res.status(200).json({ _id: user._id, username: user.username, count: userLogs.length, logs: userLogs });
  } catch (error) {
    // If there's an error, send back a 500 status with the error message
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
