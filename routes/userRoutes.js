const express = require("express");

const { createUser, getUsers, getUserLogs } = require("../controllers/userController");

const router = express.Router();

// Route to create a user
router.post("/api/users", createUser);

// Route to get all users

router.get("/api/users", getUsers);

// Route to get exercise logs for a specific user
router.get("/api/users/:_id/logs", getUserLogs);

module.exports = router;
