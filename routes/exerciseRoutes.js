const express = require("express");
const { addExercise } = require("../controllers/exerciseController");

const router = express.Router();

// Route to add an exercise for a specific user
router.post("/api/users/:_id/exercises", addExercise);

module.exports = router;
