const express = require('express');
const consultationTypeController = require('../controllers/consultation-type.controller');

const router = express.Router();

router.get('/', consultationTypeController.getConsultationTypes);

module.exports = router;
