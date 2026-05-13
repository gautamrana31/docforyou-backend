const userRepository = require('../repositories/user.repository');
const { verifyToken } = require('../utils/token');
const { UnauthorizedError } = require('../utils/api-error');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new UnauthorizedError('Authorization token is required'));
  }

  try {
    const payload = verifyToken(token);
    const user = await userRepository.findUserById(payload.sub);

    if (!user) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }

    if (
      user.tokenInvalidBefore &&
      payload.iat * 1000 < user.tokenInvalidBefore.getTime()
    ) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }

    req.user = payload;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
}

module.exports = { requireAuth };
