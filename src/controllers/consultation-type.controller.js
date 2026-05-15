const consultationTypeService = require('../services/consultation-type.service');

function getConsultationTypes(req, res) {
  res.json({
    success: true,
    message: 'Consultation types fetched successfully',
    data: {
      consultationTypes: consultationTypeService.getConsultationTypes(),
    },
  });
}

module.exports = { getConsultationTypes };
