const express = require('express');
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const {
  validateDoctorSignup,
  validateLogin,
  validatePatientSignup,
} = require('../validators/auth.validator');

const router = express.Router();

router.post('/signup/patient', validatePatientSignup, authController.signupPatient);
router.post('/signup/doctor', validateDoctorSignup, authController.signupDoctor);
router.post('/login', validateLogin, authController.login);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
