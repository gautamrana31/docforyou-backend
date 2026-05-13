const userRepository = require('../repositories/user.repository');
const { ConflictError, NotFoundError } = require('../utils/api-error');
const { createPublicUser } = require('../utils/user-presenter');

async function getCurrentUser(userId) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new NotFoundError('User profile not found');
  }

  return user;
}

async function getProfile(userId) {
  return createPublicUser(await getCurrentUser(userId));
}

async function applyCommonUpdates(user, payload) {
  const updates = {};

  if (payload.fullName !== undefined) {
    updates.fullName = payload.fullName;
  }

  if (payload.profileImage !== undefined) {
    updates.profileImage = payload.profileImage;
  }

  if (payload.email !== undefined && payload.email !== user.email) {
    const existingUser = await userRepository.findUserByEmail(payload.email);

    if (existingUser && existingUser.id !== user.id) {
      throw new ConflictError('Email is already registered');
    }

    updates.email = payload.email;
  }

  return updates;
}

function applyPatientUpdates(user, payload) {
  const healthDetails = {
    ...user.profile.healthDetails,
    ...payload.healthDetails,
  };

  return {
    profile: {
      ...user.profile,
      healthDetails,
    },
  };
}

async function applyDoctorUpdates(user, payload) {
  const profile = {
    ...user.profile,
    registration: {
      ...user.profile.registration,
      ...payload.registration,
    },
    clinic: {
      ...user.profile.clinic,
      ...payload.clinic,
    },
    documents: {
      ...user.profile.documents,
      ...payload.documents,
    },
  };

  if (payload.mobileNumber !== undefined && payload.mobileNumber !== user.mobileNumber) {
    const existingUser = await userRepository.findUserByMobileNumber(payload.mobileNumber);

    if (existingUser && existingUser.id !== user.id) {
      throw new ConflictError('Mobile number is already registered');
    }
  }

  if (payload.bio !== undefined) {
    profile.bio = payload.bio;
  }

  if (payload.languagesSpoken !== undefined) {
    profile.languagesSpoken = payload.languagesSpoken;
  }

  return {
    mobileNumber: payload.mobileNumber ?? user.mobileNumber,
    profile,
  };
}

async function updateProfile(userId, payload) {
  const user = await getCurrentUser(userId);
  let updates = await applyCommonUpdates(user, payload);

  if (user.userType === 'patient') {
    updates = {
      ...updates,
      ...applyPatientUpdates(user, payload),
    };
  }

  if (user.userType === 'doctor') {
    updates = {
      ...updates,
      ...(await applyDoctorUpdates(user, payload)),
    };
  }

  const updatedUser = await userRepository.updateUser(user.id, updates);
  return createPublicUser(updatedUser);
}

module.exports = {
  getProfile,
  updateProfile,
};
