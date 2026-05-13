const { resolveProfileImage } = require('./profile-image');

function createPublicUser(user) {
  return {
    id: user.id,
    userType: user.userType,
    fullName: user.fullName,
    email: user.email,
    mobileNumber: user.mobileNumber,
    profileImage: resolveProfileImage(user),
    status: user.status,
    profile: user.profile,
    lastLoginLocation: user.lastLoginLocation,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

module.exports = { createPublicUser };
