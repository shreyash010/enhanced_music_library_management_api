const mongoose = require('mongoose');
const Constants = require('./constants');

const RECONNECT_INTERVAL = Constants.DB.RECONNECT_INTERVAL;
const MAX_RETRIES = Constants.DB.MAX_RETRIES;

// In your database connection utility
const connectWithRetry = async () => {
  try {
    await mongoose.connect(Constants.DB.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10, // Limit connections for serverless
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    if (retries < MAX_RETRIES) {
      console.log(`Retrying in ${RECONNECT_INTERVAL / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RECONNECT_INTERVAL));
      return connectWithRetry(retries + 1);
    } else {
      console.error('Max reconnection attempts reached. Giving up.');
      throw error;
    }
  }
};

module.exports = { connectWithRetry };