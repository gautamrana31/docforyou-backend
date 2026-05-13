const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const {
  validateCreateAppointment,
  validateUpdateAppointmentStatus,
} = require('../validators/appointment.validator');

const router = express.Router();

router.post('/', requireAuth, validateCreateAppointment, appointmentController.createAppointment);
router.get(
  '/doctor/received',
  requireAuth,
  appointmentController.getDoctorReceivedAppointments
);
router.get('/my', requireAuth, appointmentController.getAppointments);
router.patch('/:appointmentId/accept', requireAuth, appointmentController.acceptAppointment);
router.patch('/:appointmentId/decline', requireAuth, appointmentController.declineAppointment);
router.patch(
  '/:appointmentId/status',
  requireAuth,
  validateUpdateAppointmentStatus,
  appointmentController.updateAppointmentStatus
);
router.get('/:appointmentId', requireAuth, appointmentController.getAppointmentById);
router.get('/', requireAuth, appointmentController.getAppointments);

module.exports = router;
