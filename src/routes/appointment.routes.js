const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const {
  validateCreateAppointment,
  validateUpdateAppointmentStatus,
} = require('../validators/appointment.validator');

const router = express.Router();

router.post('/', requireAuth, validateCreateAppointment, appointmentController.createAppointment);
router.patch(
  '/:appointmentId/status',
  requireAuth,
  validateUpdateAppointmentStatus,
  appointmentController.updateAppointmentStatus
);
router.get('/my', requireAuth, appointmentController.getAppointments);
router.get('/', requireAuth, appointmentController.getAppointments);

module.exports = router;
