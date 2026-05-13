function checkHealth(req, res) {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
}

module.exports = { checkHealth };
