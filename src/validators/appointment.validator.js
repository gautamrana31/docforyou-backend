const { BadRequestError } = require('../utils/api-error');

const allowedConsultationTypes = ['telemedicine', 'in_clinic', 'home_visit', 'nearby_hub'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateCreateAppointment(req, res, next) {
  const {
    appointmentDate,
    appointmentTime,
    consultationType,
    doctorId,
    medicalCertificateRequested,
  } = req.body;

  if (!isNonEmptyString(doctorId)) {
    return next(new BadRequestError('Doctor id is required'));
  }

  if (!allowedConsultationTypes.includes(consultationType)) {
    return next(new BadRequestError('Consultation type is required'));
  }

  if (!isNonEmptyString(appointmentDate)) {
    return next(new BadRequestError('Appointment date is required'));
  }

  if (!isNonEmptyString(appointmentTime)) {
    return next(new BadRequestError('Appointment time is required'));
  }

  if (
    medicalCertificateRequested !== undefined &&
    typeof medicalCertificateRequested !== 'boolean'
  ) {
    return next(new BadRequestError('Medical certificate requested must be true or false'));
  }

  return next();
}

function validateUpdateAppointmentStatus(req, res, next) {
  const allowedStatuses = ['pending', 'accepted', 'declined', 'cancelled', 'completed'];

  if (!allowedStatuses.includes(req.body.status)) {
    return next(
      new BadRequestError('Status must be pending, accepted, declined, cancelled, or completed')
    );
  }

  return next();
}

module.exports = {
  validateCreateAppointment,
  validateUpdateAppointmentStatus,
};
