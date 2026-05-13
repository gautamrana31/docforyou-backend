const profileService = require('../services/profile.service');

async function getProfile(req, res, next) {
  try {
    const profile = await profileService.getProfile(req.user.sub);

    res.json({
      success: true,
      message: 'Profile fetched successfully',
      data: {
        user: profile,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const profile = await profileService.updateProfile(req.user.sub, req.body);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: profile,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
