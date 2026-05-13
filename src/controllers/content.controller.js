const contentService = require('../services/content.service');

function getContactUs(req, res) {
  res.json({
    success: true,
    message: 'Contact us content fetched successfully',
    data: contentService.getContactUs(),
  });
}

function getTermsAndConditions(req, res) {
  res.json({
    success: true,
    message: 'Terms and conditions fetched successfully',
    data: contentService.getTermsAndConditions(),
  });
}

function getPrivacyPolicy(req, res) {
  res.json({
    success: true,
    message: 'Privacy policy fetched successfully',
    data: contentService.getPrivacyPolicy(),
  });
}

module.exports = {
  getContactUs,
  getPrivacyPolicy,
  getTermsAndConditions,
};
