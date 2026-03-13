import mongoose from 'mongoose';

const careNoteSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  caregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caregiver',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  noteType: {
    type: String,
    enum: ['daily_update', 'medical', 'emergency', 'general', 'progress'],
    default: 'general',
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  vitalSigns: {
    bloodPressure: String,
    temperature: String,
    pulse: String,
    weight: String,
    oxygenLevel: String,
  },
  medicationsGiven: [{
    name: String,
    time: String,
    dosage: String,
  }],
  mealsProvided: [{
    time: String,
    description: String,
  }],
  activities: [{
    time: String,
    description: String,
  }],
  concerns: {
    type: String,
  },
  attachments: [{
    url: String,
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CareNote || mongoose.model('CareNote', careNoteSchema);

