const { env } = require('../config/env');

const defaultProfileImages = {
  patient: `${env.appBaseUrl}/assets/default-patient.svg`,
  doctor: `${env.appBaseUrl}/assets/default-doctor.svg`,
};

module.exports = { defaultProfileImages };
