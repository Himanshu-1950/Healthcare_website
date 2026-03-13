import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide patient name'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Please provide patient age'],
    min: [0, 'Age cannot be negative'],
    max: [150, 'Age cannot exceed 150'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  medicalConditions: [{
    type: String,
  }],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
  }],
  allergies: [{
    type: String,
  }],
  mobilityStatus: {
    type: String,
    enum: ['independent', 'needs assistance', 'wheelchair bound', 'bedridden'],
    default: 'independent',
  },
  specialNeeds: {
    type: String,
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },
  notes: {
    type: String,
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

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);

