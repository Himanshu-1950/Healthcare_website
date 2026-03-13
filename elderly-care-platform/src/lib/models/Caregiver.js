import mongoose from 'mongoose';

const caregiverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  qualifications: [{
    name: String,
    institution: String,
    year: Number,
    certificateUrl: String,
  }],
  experience: {
    type: Number,
    default: 0,
    min: 0,
  },
  specializations: [{
    type: String,
    enum: ['elderly care', 'post-hospital care', 'physiotherapy', 'dementia care', 'palliative care', 'disability care'],
  }],
  skills: [{
    type: String,
  }],
  languages: [{
    type: String,
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  verificationDocuments: [{
    type: String,
  }],
  verifiedAt: Date,
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0,
  },
  dailyRate: {
    type: Number,
    required: true,
    min: 0,
  },
  monthlyRate: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    monday: { available: Boolean, shifts: [String] },
    tuesday: { available: Boolean, shifts: [String] },
    wednesday: { available: Boolean, shifts: [String] },
    thursday: { available: Boolean, shifts: [String] },
    friday: { available: Boolean, shifts: [String] },
    saturday: { available: Boolean, shifts: [String] },
    sunday: { available: Boolean, shifts: [String] },
  },
  serviceAreas: [{
    city: String,
    state: String,
    radius: Number,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  totalJobs: {
    type: Number,
    default: 0,
  },
  completedJobs: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isOnJob: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Caregiver || mongoose.model('Caregiver', caregiverSchema);

