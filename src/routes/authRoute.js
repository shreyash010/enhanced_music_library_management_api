const express = require('express');
const { login, signup } = require('../controllers/authController');
const router = express.Router();


router.use('/login', login);
router.use('/signup', signup);

module.exports = router;