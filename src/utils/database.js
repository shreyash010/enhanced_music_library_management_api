const mongoose = require('mongoose');
const Constants = require('./constants');

const RECONNECT_INTERVAL = Constants.DB.RECONNECT_INTERVAL;
const MAX_RETRIES = Constants.DB.MAX_RETRIES;

const connectWithRetry = async (retries = 0) => {
  try {
    await mongoose.connect(Constants.DB.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error(`MongoDB connection attempt ${retries + 1} failed:`, error.message);
    
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