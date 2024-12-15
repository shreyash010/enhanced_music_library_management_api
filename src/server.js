const app = require('./app');
const Constants = require('./utils/constants');
const { connectWithRetry } = require('./utils/database');
require('dotenv').config();

const PORT = Constants.SERVER.PORT;

const startServer = async () => {
  try {
    await connectWithRetry();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${Constants.SERVER.NODE_ENV}`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully');
      server.close(async () => {
        console.log('HTTP server closed');
        await mongoose.connection.close(false);
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    });

    return server;
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer().catch(console.error);

module.exports = startServer;