const crypto = require('crypto');
const { env } = require('../config/env');

const TOKEN_TTL_SECONDS = 60 * 60 * 24;

function base64UrlEncode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function base64UrlDecode(value) {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
}

function createSignature(unsignedToken) {
  return crypto
    .createHmac('sha256', env.jwtSecret)
    .update(unsignedToken)
    .digest('base64url');
}

function signToken(user) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.id,
    email: user.email,
    userType: user.userType,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  };

  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}`;
  const signature = createSignature(unsignedToken);

  return `${unsignedToken}.${signature}`;
}

function verifyToken(token) {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error('Malformed token');
  }

  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = createSignature(unsignedToken);

  if (signature !== expectedSignature) {
    throw new Error('Invalid token signature');
  }

  const payload = base64UrlDecode(encodedPayload);

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Expired token');
  }

  return payload;
}

module.exports = {
  signToken,
  verifyToken,
};
