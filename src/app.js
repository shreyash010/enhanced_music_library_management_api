const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const middleware = require('./middlewares/middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Music Library Management API is running',
  })
})

app.use(middleware);

app.use('/api/v1', routes);
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
