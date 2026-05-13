const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    consultationType: {
      type: String,
      enum: ['telemedicine', 'in_clinic', 'home_visit', 'nearby_hub'],
      required: true,
    },
    consultationLabel: {
      type: String,
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      default: '',
    },
    medicalCertificateRequested: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

appointmentSchema.index(
  {
    doctor: 1,
    appointmentDate: 1,
    appointmentTime: 1,
    status: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: 'confirmed',
    },
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
