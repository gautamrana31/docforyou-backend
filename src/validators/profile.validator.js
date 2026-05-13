const { BadRequestError } = require('../utils/api-error');

function validateProfileUpdate(req, res, next) {
  const { email, languagesSpoken, registration } = req.body;

  if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return next(new BadRequestError('Email must be valid'));
  }

  if (languagesSpoken !== undefined && !Array.isArray(languagesSpoken)) {
    return next(new BadRequestError('Languages spoken must be an array'));
  }

  if (
    registration?.yearsOfExperience !== undefined &&
    Number.isNaN(Number(registration.yearsOfExperience))
  ) {
    return next(new BadRequestError('Years of experience must be a number'));
  }

  return next();
}

module.exports = { validateProfileUpdate };
