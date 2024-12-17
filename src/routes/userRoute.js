const express = require('express');
const {
  getUsers,
  addUser,
  deleteUser,
  updatePassword
} = require('../controllers/userController');

const userRouter = express.Router();

// User Routes

// Route to get users
userRouter.get('/users', getUsers); // Handles 200, 400, 401

// Route to add a new user
userRouter.post('/users/add-user', addUser); // Handles 201, 400, 401, 403, 409

// Route to delete a user by ID
userRouter.delete('/users/:id', deleteUser); // Handles 200, 400, 401, 403, 404

// Route to update the password
userRouter.put('/users/update-password', updatePassword); // Handles 204, 400, 401, 403, 404

module.exports = userRouter;
