const crypto = require('crypto');
const { env } = require('../config/env');

function hashPassword(password) {
  return crypto
    .createHmac('sha256', env.jwtSecret)
    .update(password)
    .digest('hex');
}

function comparePassword(password, passwordHash) {
  return hashPassword(password) === passwordHash;
}

module.exports = {
  comparePassword,
  hashPassword,
};
