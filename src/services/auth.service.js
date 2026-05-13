const { defaultProfileImages } = require('../constants/defaults');
const userRepository = require('../repositories/user.repository');
const { ConflictError, UnauthorizedError } = require('../utils/api-error');
const { comparePassword, hashPassword } = require('../utils/password');
const { signToken } = require('../utils/token');
const { createPublicUser } = require('../utils/user-presenter');

function createAuthResponse(user) {
  const publicUser = createPublicUser(user);

  return {
    user: publicUser,
    userType: publicUser.userType,
    token: signToken(publicUser),
  };
}

async function ensureUniqueEmail(email) {
  if (await userRepository.findUserByEmail(email)) {
    throw new ConflictError('Email is already registered');
  }
}

async function signupPatient(payload) {
  await ensureUniqueEmail(payload.email);

  const user = await userRepository.createUser({
    userType: 'patient',
    fullName: payload.fullName,
    email: payload.email,
    profileImage: defaultProfileImages.patient,
    passwordHash: hashPassword(payload.password),
    status: 'active',
    profile: {
      healthDetails: {
        medicalConditions: payload.healthDetails?.medicalConditions || '',
        allergies: payload.healthDetails?.allergies || '',
        currentMedications: payload.healthDetails?.currentMedications || '',
      },
      termsAccepted: payload.termsAccepted,
    },
  });

  return createAuthResponse(user);
}

async function signupDoctor(payload) {
  await ensureUniqueEmail(payload.email);

  if (await userRepository.findUserByMobileNumber(payload.mobileNumber)) {
    throw new ConflictError('Mobile number is already registered');
  }

  const user = await userRepository.createUser({
    userType: 'doctor',
    fullName: payload.fullName,
    email: payload.email,
    mobileNumber: payload.mobileNumber,
    profileImage: defaultProfileImages.doctor,
    passwordHash: hashPassword(payload.password),
    status: 'pending_approval',
    profile: {
      registration: {
        medicalRegistrationNumber: payload.medicalRegistrationNumber,
        medicalCouncil: payload.medicalCouncil,
        qualification: payload.qualification,
        specialization: payload.specialization,
        yearsOfExperience: payload.yearsOfExperience,
      },
      clinic: {
        clinicName: payload.clinicName,
        cityState: payload.cityState,
        consultationFees: payload.consultationFees || '',
        availableTimings: payload.availableTimings,
        practiceAddress: payload.practiceAddress,
      },
      documents: {
        medicalLicenseCertificate: payload.medicalLicenseCertificate,
        idProof: payload.idProof || '',
        professionalProfilePhoto: payload.professionalProfilePhoto || '',
      },
      bio: payload.bio || '',
      languagesSpoken: payload.languagesSpoken || [],
      termsAccepted: payload.termsAccepted,
    },
  });

  return createAuthResponse(user);
}

async function login({ email, lat, lng, password }) {
  const user = await userRepository.findUserByEmail(email, {
    includePassword: true,
  });

  if (!user || !comparePassword(password, user.passwordHash)) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const updatedUser = await userRepository.updateUser(user.id, {
    lastLoginLocation: {
      lat: Number(lat),
      lng: Number(lng),
      updatedAt: new Date(),
    },
  });

  return createAuthResponse(updatedUser);
}

async function logout(userId) {
  await userRepository.updateUser(userId, {
    tokenInvalidBefore: new Date(),
    lastLogoutAt: new Date(),
  });

  return {
    loggedOut: true,
  };
}

module.exports = {
  login,
  logout,
  signupDoctor,
  signupPatient,
};
