const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ['patient', 'doctor'],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    status: {
      type: String,
      enum: ['active', 'pending_approval', 'blocked'],
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    lastLoginLocation: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
      updatedAt: {
        type: Date,
      },
    },
    tokenInvalidBefore: {
      type: Date,
    },
    lastLogoutAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

userSchema.index(
  { mobileNumber: 1 },
  {
    unique: true,
    sparse: true,
  }
);

module.exports = mongoose.model('User', userSchema);
