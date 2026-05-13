const express = require('express');
const specializationController = require('../controllers/specialization.controller');

const router = express.Router();

router.get('/', specializationController.getSpecializations);

module.exports = router;
