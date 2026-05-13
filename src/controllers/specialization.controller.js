const specializationService = require('../services/specialization.service');

function getSpecializations(req, res) {
  res.json({
    success: true,
    message: 'Specializations fetched successfully',
    data: {
      specializations: specializationService.getSpecializations(),
    },
  });
}

module.exports = { getSpecializations };
