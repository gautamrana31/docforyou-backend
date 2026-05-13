const appointmentRepository = require('../repositories/appointment.repository');
const userRepository = require('../repositories/user.repository');
const { resolveProfileImage } = require('../utils/profile-image');
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/api-error');

const consultationTypes = {
  telemedicine: {
    label: 'Telemedicine',
    fee: 45,
  },
  in_clinic: {
    label: 'In Clinic',
    fee: 60,
  },
  home_visit: {
    label: 'Home Visit',
    fee: 120,
  },
  nearby_hub: {
    label: 'Nearby Hub',
    fee: 0,
    disabled: true,
  },
};

function createDoctorSummary(doctor) {
  return {
    id: doctor.id,
    fullName: doctor.fullName,
    email: doctor.email,
    mobileNumber: doctor.mobileNumber,
    profileImage: resolveProfileImage(doctor),
    specialization: doctor.profile.registration.specialization,
    qualification: doctor.profile.registration.qualification,
    yearsOfExperience: doctor.profile.registration.yearsOfExperience,
    clinicName: doctor.profile.clinic.clinicName,
    cityState: doctor.profile.clinic.cityState,
    consultationFees: doctor.profile.clinic.consultationFees,
    availableTimings: doctor.profile.clinic.availableTimings,
    practiceAddress: doctor.profile.clinic.practiceAddress,
    bio: doctor.profile.bio,
    languagesSpoken: doctor.profile.languagesSpoken,
  };
}

function createPatientSummary(patient) {
  return {
    id: patient.id,
    fullName: patient.fullName,
    profileImage: patient.profileImage,
    email: patient.email,
    mobileNumber: patient.mobileNumber,
    healthDetails: patient.profile.healthDetails,
  };
}

function createAppointmentResponse(appointment) {
  const doctor = createDoctorSummary(appointment.doctor);
  const patient = createPatientSummary(appointment.patient);

  return {
    id: appointment.id,
    status: appointment.status,
    consultationType: appointment.consultationType,
    consultationLabel: appointment.consultationLabel,
    consultationFee: appointment.consultationFee,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    timezone: appointment.timezone,
    medicalCertificateRequested: appointment.medicalCertificateRequested,
    notes: appointment.notes,
    doctor,
    patient,
    display: {
      title: doctor.fullName,
      subtitle: `${doctor.specialization} - ${doctor.clinicName}`,
      location: doctor.practiceAddress || doctor.cityState,
      date: appointment.appointmentDate,
      time: appointment.timezone
        ? `${appointment.appointmentTime} (${appointment.timezone})`
        : appointment.appointmentTime,
      type: appointment.consultationLabel,
      fee: appointment.consultationFee,
    },
    createdAt: appointment.createdAt,
    updatedAt: appointment.updatedAt,
  };
}

async function createAppointment(patientId, payload) {
  const patient = await userRepository.findUserById(patientId);

  if (!patient || patient.userType !== 'patient') {
    throw new BadRequestError('Only patients can book appointments');
  }

  const doctor = await userRepository.findDoctorById(payload.doctorId);

  if (!doctor) {
    throw new NotFoundError('Doctor not found');
  }

  const consultation = consultationTypes[payload.consultationType];

  if (!consultation || consultation.disabled) {
    throw new BadRequestError('Consultation type is not available');
  }

  try {
    const appointment = await appointmentRepository.createAppointment({
      patient: patient.id,
      doctor: doctor.id,
      consultationType: payload.consultationType,
      consultationLabel: consultation.label,
      consultationFee: payload.consultationFee ?? consultation.fee,
      appointmentDate: payload.appointmentDate,
      appointmentTime: payload.appointmentTime,
      timezone: payload.timezone || '',
      medicalCertificateRequested: payload.medicalCertificateRequested || false,
      notes: payload.notes || '',
    });

    appointment.patient = patient;
    appointment.doctor = doctor;

    return createAppointmentResponse(appointment);
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError('This doctor is already booked for the selected time slot');
    }

    throw error;
  }
}

async function getAppointments(userId) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const appointments =
    user.userType === 'doctor'
      ? await appointmentRepository.findAppointmentsByDoctor(user.id)
      : await appointmentRepository.findAppointmentsByPatient(user.id);

  return appointments.map(createAppointmentResponse);
}

async function getDoctorReceivedAppointments(userId) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.userType !== 'doctor') {
    throw new ForbiddenError('Only doctors can view received appointments');
  }

  const appointments = await appointmentRepository.findAppointmentsByDoctor(user.id);
  return appointments.map(createAppointmentResponse);
}

async function updateAppointmentStatus(userId, appointmentId, status) {
  const appointment = await appointmentRepository.findAppointmentById(appointmentId);

  if (!appointment) {
    throw new NotFoundError('Appointment not found');
  }

  const isPatient = appointment.patient.id === userId;
  const isDoctor = appointment.doctor.id === userId;

  if (!isPatient && !isDoctor) {
    throw new ForbiddenError('You are not allowed to update this appointment');
  }

  if (appointment.status === 'completed' && status !== 'completed') {
    throw new BadRequestError('Completed appointments cannot be changed');
  }

  const updatedAppointment = await appointmentRepository.updateAppointmentStatus(
    appointment.id,
    status
  );

  return createAppointmentResponse(updatedAppointment);
}

module.exports = {
  createAppointment,
  getDoctorReceivedAppointments,
  getAppointments,
  updateAppointmentStatus,
};
