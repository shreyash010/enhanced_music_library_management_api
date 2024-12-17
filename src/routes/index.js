const express = require('express');
const { login, signup } = require('../controllers/authControllers');

// const authRouter = require('./authRoute');
const userRouter = require('./userRoute');
const artistRouter = require('./artistRoute');
// const albumRouter = require('./albumRouter');
// const trackRouter = require('./trackRouter');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

// User and Artist Routes
router.use('/', userRouter);
router.use('/', artistRouter);

// router.use('/auth', authRouter);
// router.use('/user', userRouter);
// router.use('/artists', artistRouter);
// router.use('/albums', albumRouter);
// router.use('/tracks', trackRouter);

module.exports = router;