````markdown
# Exercise Log API

This is a Node.js microservice that allows users to track their exercises. The service supports creating users, logging exercises, and retrieving exercise logs. It is connected to MongoDB for data storage.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [POST /api/users](#post-apikey-users)
  - [GET /api/users](#get-apikey-users)
  - [POST /api/users/:\_id/exercises](#post-apikey-users_idexercises)
  - [GET /api/users/:\_id/logs](#get-apikey-users_idlogs)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- Mongoose
- MongoDB

## Installation

To get this project up and running locally, follow the steps below.

### 1. Clone the repository

```bash
git clone https://github.com/azwdevops/boilerplate-project-exercisetracker.git
```
````

### 2. Install dependencies

Navigate into the project directory and install the required dependencies:

```bash
cd boilerplate-project-exercisetracker
npm install
```

### 3. Configure MongoDB

Ensure you have MongoDB installed locally or use a MongoDB Atlas instance. Update the `MONGODB_URI` environment variable in a `.env` file with your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/exercise-tracker
```

If using MongoDB Atlas, the URI might look like:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/exercise-tracker
```

### 4. Start the server

Once everything is set up, you can start the server:

```bash
npm start
```

The API will be running at `http://localhost:3000`.

## Project Structure

```plaintext
exercise-log-api/
├── controllers/
│   └── userController.js          # Contains logic for handling user routes
│   └── exerciseController.js          # Contains logic for handling exercise routes
├── models/
│   └── userModel.js                    # Mongoose User schema
├── routes/
│   └── userRoutes.js              # User-related API routes
├── utils/
│   └── formatDate.js               # Utility function for formatting date
├── index.js                       # Main entry point for the application
└── package.json                    # Project dependencies and scripts
```

## API Endpoints

### POST /api/users

Create a new user.

#### Request

```http
POST /api/users
```

#### Body (form data)

```json
{
  "username": "JohnDoe"
}
```

#### Response

```json
{
  "_id": "60d7e2b0f4a3c81030aabbdd",
  "username": "JohnDoe"
}
```

### GET /api/users

Get a list of all users.

#### Request

```http
GET /api/users
```

#### Response

```json
[
  {
    "_id": "60d7e2b0f4a3c81030aabbdd",
    "username": "JohnDoe"
  },
  {
    "_id": "60d7e2b0f4a3c81030aabbde",
    "username": "JaneDoe"
  }
]
```

### POST /api/users/:\_id/exercises

Log a new exercise for a user.

#### Request

```http
POST /api/users/60d7e2b0f4a3c81030aabbdd/exercises
```

#### Body (form data)

```json
{
  "description": "Running",
  "duration": 30,
  "date": "2023-05-15T09:30:00Z"
}
```

#### Response

```json
{
  "_id": "60d7e2b0f4a3c81030aabbdd",
  "username": "JohnDoe",
  "exercises": [
    {
      "description": "Running",
      "duration": 30,
      "date": "2023-05-15T09:30:00Z"
    }
  ]
}
```

### GET /api/users/:\_id/logs

Get the exercise logs of a specific user.

#### Request

```http
GET /api/users/60d7e2b0f4a3c81030aabbdd/logs?from=2023-01-01&to=2023-12-31&limit=5
```

#### Response

```json
{
  "username": "JohnDoe",
  "count": 3,
  "log": [
    {
      "description": "Running",
      "duration": 30,
      "date": "2023-05-15T09:30:00Z"
    },
    {
      "description": "Cycling",
      "duration": 60,
      "date": "2023-06-10T10:00:00Z"
    }
  ]
}
```

### Query Parameters for `/api/users/:_id/logs`:

- `from` (optional): Start date in `yyyy-mm-dd` format.
- `to` (optional): End date in `yyyy-mm-dd` format.
- `limit` (optional): Limit the number of logs returned.

- **Exercise Date Validation**: The `date` field for exercises is optional. If not provided, the current date is used. The format should be `yyyy-mm-ddTHH:mm:ssZ` (ISO 8601).

## Error Handling

- **400 Bad Request**: Invalid `_id` or malformed request body.
- **404 Not Found**: User not found or no exercises match the query parameters.
- **500 Internal Server Error**: General server error.

## License

This project is licensed under the MIT License.

---
