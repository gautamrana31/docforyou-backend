const { BadRequestError } = require('../utils/api-error');
const {
  allowedConsultationTypeIds,
  normalizeConsultationType,
} = require('../constants/consultation-types');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function requireField(body, fieldName, label) {
  if (!isNonEmptyString(body[fieldName])) {
    throw new BadRequestError(`${label} is required`);
  }
}

function validatePasswordPair(password, confirmPassword) {
  if (!isNonEmptyString(password)) {
    throw new BadRequestError('Password is required');
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    throw new BadRequestError('Password and confirm password do not match');
  }
}

function validateTermsAccepted(termsAccepted) {
  if (termsAccepted !== true) {
    throw new BadRequestError('Terms and privacy policy must be accepted');
  }
}

function validateLogin(req, res, next) {
  try {
    const { email, lat, lng, password } = req.body;

    if (!isNonEmptyString(email)) {
      throw new BadRequestError('Email is required');
    }

    if (!isValidEmail(email)) {
      throw new BadRequestError('Email must be valid');
    }

    if (!isNonEmptyString(password)) {
      throw new BadRequestError('Password is required');
    }

    if (lat === undefined || Number.isNaN(Number(lat))) {
      throw new BadRequestError('Latitude is required');
    }

    if (lng === undefined || Number.isNaN(Number(lng))) {
      throw new BadRequestError('Longitude is required');
    }

    if (Number(lat) < -90 || Number(lat) > 90) {
      throw new BadRequestError('Latitude must be between -90 and 90');
    }

    if (Number(lng) < -180 || Number(lng) > 180) {
      throw new BadRequestError('Longitude must be between -180 and 180');
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

function validatePatientSignup(req, res, next) {
  try {
    const { email, password, termsAccepted } = req.body;

    requireField(req.body, 'fullName', 'Full name');
    requireField(req.body, 'email', 'Email');

    if (!isValidEmail(email)) {
      throw new BadRequestError('Email must be valid');
    }

    validatePasswordPair(password);
    validateTermsAccepted(termsAccepted);

    return next();
  } catch (error) {
    return next(error);
  }
}

function validateDoctorSignup(req, res, next) {
  try {
    const { email, password, confirmPassword, termsAccepted } = req.body;

    requireField(req.body, 'fullName', 'Full name');
    requireField(req.body, 'email', 'Email');
    requireField(req.body, 'mobileNumber', 'Mobile number');
    requireField(req.body, 'medicalRegistrationNumber', 'Medical registration number');
    requireField(req.body, 'medicalCouncil', 'Medical council or authority');
    requireField(req.body, 'qualification', 'Qualification');
    requireField(req.body, 'specialization', 'Specialization');
    requireField(req.body, 'clinicName', 'Clinic or hospital name');
    requireField(req.body, 'cityState', 'City and state');
    requireField(req.body, 'availableTimings', 'Available timings');
    requireField(req.body, 'practiceAddress', 'Practice address');
    requireField(req.body, 'medicalLicenseCertificate', 'Medical license certificate');

    if (!Array.isArray(req.body.availableConsultationTypes)) {
      throw new BadRequestError('Available consultation types are required');
    }

    if (req.body.availableConsultationTypes.length === 0) {
      throw new BadRequestError('At least one consultation type is required');
    }

    const selectedTypes = new Set();

    req.body.availableConsultationTypes.forEach((consultationType) => {
      const type = normalizeConsultationType(consultationType.type);

      if (!allowedConsultationTypeIds.includes(type)) {
        throw new BadRequestError('Consultation type must be telemedicine, in_clinic, or home_visit');
      }

      if (selectedTypes.has(type)) {
        throw new BadRequestError('Consultation type cannot be duplicated');
      }

      selectedTypes.add(type);

      if (consultationType.fee === undefined || Number.isNaN(Number(consultationType.fee))) {
        throw new BadRequestError(`${type} fee is required`);
      }

      if (Number(consultationType.fee) < 0) {
        throw new BadRequestError(`${type} fee cannot be negative`);
      }
    });

    if (!isValidEmail(email)) {
      throw new BadRequestError('Email must be valid');
    }

    if (
      req.body.yearsOfExperience === undefined ||
      Number.isNaN(Number(req.body.yearsOfExperience))
    ) {
      throw new BadRequestError('Years of experience must be a number');
    }

    validatePasswordPair(password, confirmPassword);
    validateTermsAccepted(termsAccepted);

    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  validateDoctorSignup,
  validateLogin,
  validatePatientSignup,
};
