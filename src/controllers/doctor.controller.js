const doctorService = require('../services/doctor.service');

async function getDoctors(req, res, next) {
  try {
    const doctors = await doctorService.getDoctors();

    res.json({
      success: true,
      message: 'Doctors fetched successfully',
      data: {
        doctors,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getDoctorById(req, res, next) {
  try {
    const doctor = await doctorService.getDoctorById(req.params.doctorId);

    res.json({
      success: true,
      message: 'Doctor details fetched successfully',
      data: {
        doctor,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDoctorById,
  getDoctors,
};
