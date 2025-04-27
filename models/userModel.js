const mongoose = require("mongoose");

// We define the User schema with a 'username' and an array of 'exercises'

const userSchema = new mongoose.Schema({
  // Username is required and unique
  username: { type: String, required: true, unique: true },
  exercises: [{ description: String, duration: Number, date: String }],
});

// we create the User model using the schema

const UserModel = mongoose.model("User", userSchema);

// we export the model for use in controllers

module.exports = UserModel;
