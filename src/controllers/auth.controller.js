const authService = require('../services/auth.service');

async function signupPatient(req, res, next) {
  try {
    const result = await authService.signupPatient(req.body);

    res.status(201).json({
      success: true,
      message: 'Patient account created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function signupDoctor(req, res, next) {
  try {
    const result = await authService.signupDoctor(req.body);

    res.status(201).json({
      success: true,
      message: 'Doctor registration submitted for approval',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const result = await authService.logout(req.user.sub);

    res.json({
      success: true,
      message: 'Logout successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout,
  signupDoctor,
  signupPatient,
};
