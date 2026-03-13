'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CaregiverDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 45,
    completedJobs: 38,
    rating: 4.9,
    totalEarnings: 125000,
  });
  const [requests, setRequests] = useState([
    {
      _id: '1',
      user: { name: 'John Doe' },
      patient: { name: 'Mary Doe', age: 78 },
      service: { name: 'Nursing Care' },
      scheduledDate: new Date(),
      totalAmount: 2500,
      status: 'pending',
    },
    {
      _id: '2',
      user: { name: 'Jane Smith' },
      patient: { name: 'Robert Smith', age: 82 },
      service: { name: 'Elderly Attendant' },
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      totalAmount: 4000,
      status: 'accepted',
    },
  ]);
  const [activeJob, setActiveJob] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Caregiver Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link href="/caregiver/profile" className="text-gray-600 hover:text-gray-900">My Profile</Link>
              <Link href="/logout" className="text-primary-600 hover:text-primary-700">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
            <p className="text-sm text-gray-500">Total Jobs</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-2xl font-bold text-green-600">{stats.completedJobs}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
              <span className="text-yellow-400 ml-1">★</span>
            </div>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-2xl font-bold text-primary-600">₹{stats.totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Earnings</p>
          </div>
        </div>

        {/* Active Job */}
        {activeJob && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Job</h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{activeJob.service.name}</h3>
                <p className="text-gray-600">Patient: {activeJob.patient.name}</p>
                <p className="text-sm text-gray-500">Started: {new Date(activeJob.startedAt).toLocaleString()}</p>
              </div>
              <button className="btn-primary">
                Update Status
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Requests */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Requests</h2>
            {requests.filter(r => r.status === 'pending').length > 0 ? (
              <div className="space-y-4">
                {requests.filter(r => r.status === 'pending').map((request) => (
                  <div key={request._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.service.name}</h3>
                        <p className="text-sm text-gray-600">For: {request.patient.name} ({request.patient.age} years)</p>
                        <p className="text-sm text-gray-500">
                          {new Date(request.scheduledDate).toLocaleDateString()} • ₹{request.totalAmount}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-green-600 text-white py-1 px-2 rounded text-sm hover:bg-green-700">
                        Accept
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-1 px-2 rounded text-sm hover:bg-red-700">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No pending requests</p>
            )}
          </div>

          {/* Upcoming Jobs */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Jobs</h2>
            {requests.filter(r => r.status === 'accepted').length > 0 ? (
              <div className="space-y-4">
                {requests.filter(r => r.status === 'accepted').map((job) => (
                  <div key={job._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.service.name}</h3>
                        <p className="text-sm text-gray-600">For: {job.patient.name} ({job.patient.age} years)</p>
                        <p className="text-sm text-gray-500">
                          {new Date(job.scheduledDate).toLocaleDateString()} • ₹{job.totalAmount}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <button className="w-full btn-primary text-sm">
                        Start Job
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming jobs</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/caregiver/availability" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
            <svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-medium text-gray-900">Availability</p>
          </Link>
          <Link href="/caregiver/earnings" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
            <svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium text-gray-900">Earnings</p>
          </Link>
          <Link href="/caregiver/care-notes" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
            <svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium text-gray-900">Care Notes</p>
          </Link>
          <Link href="/caregiver/profile" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
            <svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="font-medium text-gray-900">My Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

