const User = require('../models/User');
const Constants = require('../utils/constants');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    let role = req.query?.role || null;
    role = role ? role.toLowerCase() : "";

    const userRole = req.user?.role;
    const org = req.user?.org;

    if (userRole !== Constants.ROLES.ADMIN) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: 'Unauthorized Access',
        error: null,
      });
    }

    const filter = {};
    filter.user_role = role;
    filter.organization = org;

    // Fetch users from the database
    let users = await User.find(
      filter,
      { _id: 1, email: 1, user_role: 1, createdAt: 1 }
    )
    .skip(offset)
    .limit(limit);

    users = users.map((user) => user?._doc);

    res.status(200).json({
      status: 200,
      data: users,
      message: 'Users retrieved successfully.',
      error: null,
    });
  } catch (error) {
    console.error('Error ', error);
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    // Ensure the user is an Admin
    const userRole = req.user?.role;
    const org = req.user?.org;

    if (userRole !== Constants.ROLES.ADMIN) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: 'Unauthorized Access',
        error: null,
      });
    }

    let { email, password, role } = req.body;
    role ? role.toLowerCase() : "";
    if (!email || !password || !role) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Bad Request',
        error: 'Email, password, and role are required.',
      });
    }

    // Ensure role is either 'editor' or 'viewer'
    if (role === Constants.ROLES.ADMIN) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: 'Forbidden Access/Operation not allowed.',
        error: 'Cannot assign admin role.',
      });
    }
    if (!['editor', 'viewer'].includes(role)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Bad Request',
        error: 'Invalid role specified',
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: "Email already exists.",
        error: null,
      });
    }

    // Create the new user
    const newUser = new User({ email, password, user_role: role, organization: org });
    await newUser.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'User created successfully.',
      error: null,
    });
  } catch (error) {
    console.error('Error ', error);
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Ensure the user is an Admin
    const userRole = req.user?.role || '';
    if (userRole !== Constants.ROLES.ADMIN) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: 'Unauthorized Access',
        error: null,
      });
    }

    const { id } = req.params;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'User not found.',
        error: null,
      });
    }

    // Delete the user
    await User.deleteOne({ _id: id });

    res.status(200).json({
      status: 200,
      data: null,
      message: 'User deleted successfully.',
      error: null,
    });
  } catch (error) {
    console.error('Error ', error);
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};


const updatePassword = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming `req.user` has been set in auth middleware
    const { old_password, new_password } = req.body;

    // Check if request body contains required fields
    if (!old_password || !new_password) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Bad Request',
        error: 'Both old_password and new_password are required.',
      });
    }

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'User not found.',
        error: null,
      });
    }

    // Compare the old password with the hashed password
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: 'Forbidden Access',
        error: 'Old password is incorrect.',
      });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(204).send();
  } catch (error) {
    console.error('Error ', error);
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};


module.exports = { getUsers, addUser, deleteUser, updatePassword };
