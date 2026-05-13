function errorHandler(error, req, res, next) {
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'field';

    return res.status(409).json({
      success: false,
      message: `${field} is already registered`,
    });
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
  });
}

module.exports = { errorHandler };
