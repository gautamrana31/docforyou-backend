const mongoose = require('mongoose');
const { env } = require('./env');

async function connectDatabase() {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is required. Add it in Railway service Variables.');
  }

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB connected');
}

module.exports = { connectDatabase };
