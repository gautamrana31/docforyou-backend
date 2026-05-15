const express = require('express');
const cors = require('cors');
const path = require('path');

const appointmentRoutes = require('./routes/appointment.routes');
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');
const consultationTypeRoutes = require('./routes/consultation-type.routes');
const doctorRoutes = require('./routes/doctor.routes');
const healthRoutes = require('./routes/health.routes');
const profileRoutes = require('./routes/profile.routes');
const specializationRoutes = require('./routes/specialization.routes');
const { env } = require('./config/env');
const { notFoundHandler } = require('./middleware/not-found.middleware');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(
  cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(','),
    credentials: true,
  })
);
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/consultation-types', consultationTypeRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/specializations', specializationRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Docforyou backend running',
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
