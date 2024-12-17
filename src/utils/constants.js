const Constants = {
  DB: {
    MONGODB_URI: process.env.DB_URL, 
    RECONNECT_INTERVAL: 5000,
    MAX_RETRIES: 5,
  },
  SERVER: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
  },
  ROUTES: {
    PUBLIC_ROUTES: ['login', 'signup']
  },
  SECRETS: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  ROLES: {
    ADMIN: "admin",
    EDITOR: "editor",
    VIEWER: "viewer"
  },
  PERMISSION:{
    READ: ['viewer', 'admin', 'editor'],
    WRITE: ['admin', 'editor']
  }
};

module.exports = Constants;
