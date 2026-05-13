const appointmentService = require('../services/appointment.service');

async function createAppointment(req, res, next) {
  try {
    const appointment = await appointmentService.createAppointment(req.user.sub, req.body);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        appointment,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getAppointments(req, res, next) {
  try {
    const appointments = await appointmentService.getAppointments(req.user.sub);

    res.json({
      success: true,
      message: 'Appointments fetched successfully',
      data: {
        appointments,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getDoctorReceivedAppointments(req, res, next) {
  try {
    const appointments = await appointmentService.getDoctorReceivedAppointments(req.user.sub);

    res.json({
      success: true,
      message: 'Doctor appointments fetched successfully',
      data: {
        appointments,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getAppointmentById(req, res, next) {
  try {
    const appointment = await appointmentService.getAppointmentById(
      req.user.sub,
      req.params.appointmentId
    );

    res.json({
      success: true,
      message: 'Appointment details fetched successfully',
      data: {
        appointment,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateAppointmentStatus(req, res, next) {
  try {
    const appointment = await appointmentService.updateAppointmentStatus(
      req.user.sub,
      req.params.appointmentId,
      req.body.status
    );

    res.json({
      success: true,
      message: 'Appointment status updated successfully',
      data: {
        appointment,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function acceptAppointment(req, res, next) {
  try {
    const appointment = await appointmentService.respondToAppointment(
      req.user.sub,
      req.params.appointmentId,
      'accepted'
    );

    res.json({
      success: true,
      message: 'Appointment accepted successfully',
      data: {
        appointment,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function declineAppointment(req, res, next) {
  try {
    const appointment = await appointmentService.respondToAppointment(
      req.user.sub,
      req.params.appointmentId,
      'declined'
    );

    res.json({
      success: true,
      message: 'Appointment declined successfully',
      data: {
        appointment,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  acceptAppointment,
  createAppointment,
  declineAppointment,
  getAppointmentById,
  getDoctorReceivedAppointments,
  getAppointments,
  updateAppointmentStatus,
};
