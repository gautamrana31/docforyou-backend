const { defaultProfileImages } = require('../constants/defaults');

function resolveProfileImage(user) {
  if (user.userType === 'doctor' && user.profile?.documents?.professionalProfilePhoto) {
    return user.profile.documents.professionalProfilePhoto;
  }

  if (!user.profileImage || user.profileImage.includes('ui-avatars.com/api')) {
    return defaultProfileImages[user.userType];
  }

  return user.profileImage;
}

module.exports = { resolveProfileImage };
