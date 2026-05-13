const Appointment = require('../models/appointment.model');

async function createAppointment(appointment) {
  return Appointment.create(appointment);
}

async function findAppointmentsByDoctor(doctorId) {
  return Appointment.find({ doctor: doctorId })
    .populate('patient')
    .populate('doctor')
    .sort({ appointmentDate: 1, appointmentTime: 1 });
}

async function findAppointmentsByPatient(patientId) {
  return Appointment.find({ patient: patientId })
    .populate('patient')
    .populate('doctor')
    .sort({ appointmentDate: 1, appointmentTime: 1 });
}

async function findAppointmentById(appointmentId) {
  return Appointment.findById(appointmentId).populate('patient').populate('doctor');
}

async function updateAppointmentStatus(appointmentId, status) {
  return Appointment.findByIdAndUpdate(
    appointmentId,
    { status },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  )
    .populate('patient')
    .populate('doctor');
}

module.exports = {
  createAppointment,
  findAppointmentById,
  findAppointmentsByDoctor,
  findAppointmentsByPatient,
  updateAppointmentStatus,
};
