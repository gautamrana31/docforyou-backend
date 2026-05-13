const express = require('express');
const doctorController = require('../controllers/doctor.controller');

const router = express.Router();

router.get('/', doctorController.getDoctors);
router.get('/:doctorId', doctorController.getDoctorById);

module.exports = router;
