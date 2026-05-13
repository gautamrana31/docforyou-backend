const express = require('express');
const contentController = require('../controllers/content.controller');

const router = express.Router();

router.get('/contact-us', contentController.getContactUs);
router.get('/terms-and-conditions', contentController.getTermsAndConditions);
router.get('/privacy-policy', contentController.getPrivacyPolicy);

module.exports = router;
