require('dotenv').config();

const app = require('./src/app');
const { env } = require('./src/config/env');
const { connectDatabase } = require('./src/config/database');

async function startServer() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
