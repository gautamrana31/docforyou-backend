const express = require('express');
const profileController = require('../controllers/profile.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { validateProfileUpdate } = require('../validators/profile.validator');

const router = express.Router();

router.get('/', requireAuth, profileController.getProfile);
router.patch('/', requireAuth, validateProfileUpdate, profileController.updateProfile);

module.exports = router;
