const Constants = {
  DB: {
    MONGODB_URI: process.env.DB_URL, 
    RECONNECT_INTERVAL: 5000,
    MAX_RETRIES: 5,
  },
  SERVER: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
  } 
};

module.exports = Constants;
