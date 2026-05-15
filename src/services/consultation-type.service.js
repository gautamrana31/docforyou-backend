const { consultationTypeMap } = require('../constants/consultation-types');

function getConsultationTypes() {
  return Object.entries(consultationTypeMap).map(([id, consultationType]) => ({
    id,
    name: consultationType.label,
    description: consultationType.description,
    defaultFee: consultationType.defaultFee,
    available: true,
  }));
}

module.exports = { getConsultationTypes };
