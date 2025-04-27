const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

// middlewares
app.use(cors());
app.use(express.static("public"));

// Middleware to parse incoming requests with URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// api routes
// Routes related to users (creating users, fetching users, etc.)
app.use(userRoutes);
// Routes related to exercises (adding exercises, viewing logs, etc.)
app.use(exerciseRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("Unable to connect", error));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
