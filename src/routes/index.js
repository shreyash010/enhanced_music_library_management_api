const express = require('express');
const { login, signup } = require('../controllers/authControllers');

// const authRouter = require('./authRoute');
const userRouter = require('./userRoute');
const artistRouter = require('./artistRoute');
const albumRouter = require('./albumRoute');
const trackRouter = require('./trackRoute');
const favoriteRouter = require('./favoriteRoute');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

// User and Artist Routes
router.use('/', userRouter);
router.use('/', artistRouter);
router.use('/', albumRouter);
router.use('/', trackRouter);
router.use('/', favoriteRouter);

module.exports = router;