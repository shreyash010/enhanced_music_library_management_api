require('dotenv').config();
require('module-alias/register'); // This is crucial to activate the module-alias

const { connectWithRetry } = require('@/utils/database');
const Constants = require('@/utils/constants');

const PORT = Constants.SERVER.PORT;

const startServer = async () => {
  try {
    await connectWithRetry();

    const app = require('@/app');  // Ensure that app.js is in the src folder

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
