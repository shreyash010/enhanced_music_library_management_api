const User = require('../models/User');
const Organization = require('../models/Organization');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Constants = require('../utils/constants');
const _ = require('lodash');

const signup = async (req, res) => {
  try {
    let { email, password,  } = req.body;

    const missingFields = [];
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');

    if(!_.isEmpty(missingFields)){
      return res.status(400).json({
        status: 400,
        data: null,
        message: `Bad Request, Reason: Missing required fields: ${missingFields.join(', ')}`,
        error: null,
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: 'Email already exists.',
        error: null,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    /**
     * Note: Will have only 1 organization.
     * Can create multiple if passed in params by the user
     */
    let organizationName =  "org1";

    // Check if the organization already exists
    let organization = await Organization.findOne({ name: organizationName });
    let role = Constants.ROLES.VIEWER; // Default role for subsequent users

    if (!organization) {
      // Create a new organization and assign the first user as Admin
      organization = new Organization({
        name: organizationName,
      });
      // First user in the organization becomes Admin
      role = Constants.ROLES.ADMIN; 
    }

    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      user_role: role,
      organization: organization._id,
    });

    // Save the user and organization
    await newUser.save();

    if (role === Constants.ROLES.ADMIN) {
      organization.admin = newUser._id;
      await organization.save();
    }

    // Send response
    res.status(201).json({
      status: 201,
      data: null,
      message: 'User created successfully.', 
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const missingFields = [];

    if(!email) missingFields.push('email');
    if(!password) missingFields.push('password');

    if(!_.isEmpty(missingFields)){
      return res.status(400).json({
        status: 400,
        data: null,
        message: `Bad Request, Reason: Missing required fields: ${missingFields.join(', ')}`,
        error: null,
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'User not found.',
        error: null,
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: 'Invalid email or password.',
        error: null,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.user_role, org: user.organization },
      Constants.SECRETS.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response
    res.status(200).json({
      status: 200,
      data: { token },
      message: 'Login successful.',
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { signup, login };
