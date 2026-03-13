'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const mockUser = {
      name: 'John Doe',
      email: 'user@demo.com',
      phone: '+1 (555) 123-4567',
    };
    setUser(mockUser);

    // Mock bookings
    setBookings([
      {
        _id: '1',
        service: { name: 'Nursing Care' },
        status: 'in_progress',
        scheduledDate: new Date(),
        totalAmount: 2500,
      },
      {
        _id: '2',
        service: { name: 'Elderly Attendant' },
        status: 'completed',
        scheduledDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        totalAmount: 5000,
      },
    ]);

    // Mock patients
    setPatients([
      {
        _id: '1',
        name: 'Mary Doe',
        age: 78,
        medicalConditions: ['Diabetes', 'Hypertension'],
        mobilityStatus: 'needs assistance',
      },
    ]);
    setLoading(false);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      accepted: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-purple-100 text-purple-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <Link href="/logout" className="text-primary-600 hover:text-primary-700">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link href="/bookings/new" className="bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <div>
                <p className="font-semibold">Book Service</p>
                <p className="text-sm text-primary-100">Schedule new care</p>
              </div>
            </div>
          </Link>
          <Link href="/patients/new" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Add Patient</p>
                <p className="text-sm text-gray-500">Create patient profile</p>
              </div>
            </div>
          </Link>
          <Link href="/caregivers" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Find Caregivers</p>
                <p className="text-sm text-gray-500">Browse available</p>
              </div>
            </div>
          </Link>
          <Link href="/services" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">View Services</p>
                <p className="text-sm text-gray-500">Our care options</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Bookings</h2>
              {bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length > 0 ? (
                <div className="space-y-4">
                  {bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').map((booking) => (
                    <div key={booking._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.service.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link href={`/bookings/${booking._id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No active bookings</p>
              )}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.service.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">₹{booking.totalAmount}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No bookings yet</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Patient Profiles */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">My Patients</h2>
                <Link href="/patients/new" className="text-primary-600 hover:text-primary-700 text-sm">
                  + Add
                </Link>
              </div>
              {patients.length > 0 ? (
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient._id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.age} years • {patient.gender}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {patient.medicalConditions?.map((condition, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No patients added</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold text-gray-900">{bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {bookings.filter(b => b.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-primary-600">
                    {bookings.filter(b => b.status === 'in_progress').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patients</span>
                  <span className="font-semibold text-gray-900">{patients.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

