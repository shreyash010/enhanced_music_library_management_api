const express = require('express');
const {
  getUsers,
  addUser,
  deleteUser,
  updatePassword
} = require('../controllers/userController');

const userRouter = express.Router();

// Route to get users
userRouter.get('/users', getUsers); 

// Route to add a new user
userRouter.post('/users/add-user', addUser); 

// Route to delete a user by ID
userRouter.delete('/users/:id', deleteUser); 

// Route to update the password
userRouter.put('/users/update-password', updatePassword); 

module.exports = userRouter;
