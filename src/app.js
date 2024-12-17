const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const middleware = require('./middlewares/middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middleware);

// Routes (to be added later)
app.use('/api/v1', routes);
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
  });
});

module.exports = app;
