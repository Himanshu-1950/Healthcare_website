import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide service name'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide service description'],
  },
  category: {
    type: String,
    enum: ['nursing', 'attendant', 'physiotherapy', 'post-hospital', 'companion'],
    required: true,
  },
  image: {
    type: String,
  },
  duration: {
    type: String,
    enum: ['hourly', 'daily', 'weekly', 'monthly', 'custom'],
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  priceUnit: {
    type: String,
    enum: ['hour', 'day', 'week', 'month'],
    default: 'hour',
  },
  requiredQualifications: [{
    type: String,
  }],
  features: [{
    type: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
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

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);

