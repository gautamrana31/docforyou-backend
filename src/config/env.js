const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  host: process.env.HOST || '0.0.0.0',
  appBaseUrl: process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/docforyou',
  jwtSecret: process.env.JWT_SECRET || 'change-this-secret-in-env',
};

module.exports = { env };
