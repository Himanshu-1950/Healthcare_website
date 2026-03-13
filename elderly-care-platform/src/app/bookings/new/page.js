'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    service: '',
    patient: '',
    caregiver: '',
    bookingType: 'hourly',
    scheduledDate: '',
    startTime: '',
    duration: 1,
    durationUnit: 'hours',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    specialInstructions: '',
  });

  const [services, setServices] = useState([
    { _id: '1', name: 'Nursing Care', basePrice: 500, priceUnit: 'hour' },
    { _id: '2', name: 'Elderly Attendant', basePrice: 2500, priceUnit: 'day' },
    { _id: '3', name: 'Physiotherapy', basePrice: 800, priceUnit: 'hour' },
    { _id: '4', name: 'Post-Hospital Care', basePrice: 3500, priceUnit: 'day' },
  ]);

  const [patients, setPatients] = useState([
    { _id: '1', name: 'Mary Doe', age: 78 },
  ]);

  const [caregivers, setCaregivers] = useState([
    { _id: '1', user: { name: 'Sarah Johnson' }, hourlyRate: 500, dailyRate: 4000, rating: 4.9 },
    { _id: '2', user: { name: 'Michael Chen' }, hourlyRate: 450, dailyRate: 3500, rating: 4.8 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculateTotal = () => {
    const selectedService = services.find(s => s._id === formData.service);
    const selectedCaregiver = caregivers.find(c => c._id === formData.caregiver);
    
    if (!selectedService || !selectedCaregiver) return 0;

    let rate = 0;
    if (formData.bookingType === 'hourly') {
      rate = selectedCaregiver.hourlyRate || selectedService.basePrice;
    } else if (formData.bookingType === 'daily') {
      rate = selectedCaregiver.dailyRate || selectedService.basePrice * 8;
    } else if (formData.bookingType === 'monthly') {
      rate = (selectedCaregiver.dailyRate || selectedService.basePrice * 8) * 25;
    }

    let multiplier = formData.duration;
    if (formData.durationUnit === 'days') multiplier = formData.duration;
    if (formData.durationUnit === 'weeks') multiplier = formData.duration * 7;
    if (formData.durationUnit === 'months') multiplier = formData.duration * 30;

    return rate * multiplier;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, you would call the API here
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      router.push('/dashboard?booked=true');
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find(s => s._id === formData.service);
  const selectedCaregiver = caregivers.find(c => c._id === formData.caregiver);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 flex items-center mb-4">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Book a Service</h1>
          <p className="text-gray-600 mt-2">Fill in the details to book a care service</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Service', 'Patient & Schedule', 'Address', 'Confirm'].map((label, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step > index + 1 ? 'bg-primary-600 text-white' :
                  step === index + 1 ? 'bg-primary-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-20 h-1 mx-2 ${step > index + 1 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {['Service', 'Patient & Schedule', 'Address', 'Confirm'].map((label, index) => (
              <span key={index} className={`text-sm ${step === index + 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Select a Service</h2>
              <div className="grid gap-4">
                {services.map((service) => (
                  <label
                    key={service._id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.service === service._id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service._id}
                      checked={formData.service === service._id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">Starting from ₹{service.basePrice}/{service.priceUnit}</p>
                      </div>
                      {formData.service === service._id && (
                        <span className="text-primary-600">✓</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.service}
                  className="btn-primary disabled:opacity-50"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Patient & Schedule */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Patient & Schedule</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                <select
                  name="patient"
                  value={formData.patient}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name} ({patient.age} years)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Caregiver (Optional)</label>
                <select
                  name="caregiver"
                  value={formData.caregiver}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Any available caregiver</option>
                  {caregivers.map((caregiver) => (
                    <option key={caregiver._id} value={caregiver._id}>
                      {caregiver.user.name} - ₹{caregiver.hourlyRate}/hr (★{caregiver.rating})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Booking Type</label>
                  <select
                    name="bookingType"
                    value={formData.bookingType}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration ({formData.durationUnit})</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="btn-outline">
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.patient || !formData.scheduledDate || !formData.startTime}
                  className="btn-primary disabled:opacity-50"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Service Address</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="123 Main Street, Apt 4B"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  className="input-field"
                  rows="3"
                  placeholder="Any specific requirements or instructions for the caregiver..."
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="btn-outline">
                  Back
                </button>
                <button type="button" onClick={() => setStep(4)} className="btn-primary">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Confirm Booking</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium text-gray-900">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-medium text-gray-900">
                    {patients.find(p => p._id === formData.patient)?.name}
                  </span>
                </div>
                {selectedCaregiver && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Caregiver:</span>
                    <span className="font-medium text-gray-900">{selectedCaregiver.user.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium text-gray-900">
                    {formData.scheduledDate} at {formData.startTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-900">
                    {formData.duration} {formData.durationUnit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-gray-900">
                    {formData.address.street}, {formData.address.city}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-primary-600">₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(3)} className="btn-outline">
                  Back
                </button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

