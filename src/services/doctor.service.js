const userRepository = require('../repositories/user.repository');
const { NotFoundError } = require('../utils/api-error');
const { resolveProfileImage } = require('../utils/profile-image');

function createDoctorListItem(doctor) {
  return {
    id: doctor.id,
    fullName: doctor.fullName,
    email: doctor.email,
    mobileNumber: doctor.mobileNumber,
    profileImage: resolveProfileImage(doctor),
    status: doctor.status,
    specialization: doctor.profile.registration.specialization,
    qualification: doctor.profile.registration.qualification,
    yearsOfExperience: doctor.profile.registration.yearsOfExperience,
    clinicName: doctor.profile.clinic.clinicName,
    cityState: doctor.profile.clinic.cityState,
    consultationFees: doctor.profile.clinic.consultationFees,
    availableTimings: doctor.profile.clinic.availableTimings,
    bio: doctor.profile.bio,
    languagesSpoken: doctor.profile.languagesSpoken,
  };
}

function createDoctorDetail(doctor) {
  const registration = doctor.profile.registration;
  const clinic = doctor.profile.clinic;
  const documents = doctor.profile.documents;

  return {
    id: doctor.id,
    fullName: doctor.fullName,
    email: doctor.email,
    mobileNumber: doctor.mobileNumber,
    profileImage: resolveProfileImage(doctor),
    status: doctor.status,
    title: `${registration.specialization} - ${clinic.clinicName}`,
    specialization: registration.specialization,
    qualification: registration.qualification,
    yearsOfExperience: registration.yearsOfExperience,
    medicalRegistrationNumber: registration.medicalRegistrationNumber,
    medicalCouncil: registration.medicalCouncil,
    clinic: {
      clinicName: clinic.clinicName,
      cityState: clinic.cityState,
      consultationFees: clinic.consultationFees,
      availableTimings: clinic.availableTimings,
      practiceAddress: clinic.practiceAddress,
    },
    contactOptions: {
      video: true,
      call: Boolean(doctor.mobileNumber),
      sms: Boolean(doctor.mobileNumber),
    },
    about:
      doctor.profile.bio ||
      `${doctor.fullName} is an experienced ${registration.specialization}.`,
    availability: {
      days: 'Mon - Friday',
      timings: clinic.availableTimings,
    },
    documents: {
      medicalLicenseCertificate: documents.medicalLicenseCertificate,
      idProof: documents.idProof,
      professionalProfilePhoto: documents.professionalProfilePhoto,
    },
    languagesSpoken: doctor.profile.languagesSpoken,
    createdAt: doctor.createdAt,
    updatedAt: doctor.updatedAt,
  };
}

async function getDoctors() {
  const doctors = await userRepository.findDoctors();
  return doctors.map(createDoctorListItem);
}

async function getDoctorById(doctorId) {
  const doctor = await userRepository.findDoctorById(doctorId);

  if (!doctor) {
    throw new NotFoundError('Doctor not found');
  }

  return createDoctorDetail(doctor);
}

module.exports = {
  getDoctorById,
  getDoctors,
};
