'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 150,
    totalCaregivers: 45,
    totalBookings: 320,
    pendingVerifications: 5,
    activeBookings: 28,
    completedBookings: 265,
  });
  const [recentBookings, setRecentBookings] = useState([
    {
      _id: '1',
      user: { name: 'John Doe' },
      service: { name: 'Nursing Care' },
      caregiver: { user: { name: 'Sarah Johnson' } },
      status: 'pending',
      totalAmount: 2500,
      createdAt: new Date(),
    },
    {
      _id: '2',
      user: { name: 'Jane Smith' },
      service: { name: 'Elderly Attendant' },
      caregiver: { user: { name: 'Michael Chen' } },
      status: 'in_progress',
      totalAmount: 5000,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]);
  const [pendingCaregivers, setPendingCaregivers] = useState([
    {
      _id: '1',
      user: { name: 'Emily Davis', email: 'emily@example.com' },
      experience: 5,
      specializations: ['elderly care', 'dementia care'],
      verificationStatus: 'pending',
    },
    {
      _id: '2',
      user: { name: 'Robert Wilson', email: 'robert@example.com' },
      experience: 8,
      specializations: ['post-hospital care'],
      verificationStatus: 'pending',
    },
  ]);

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
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">View Site</Link>
              <Link href="/logout" className="text-primary-600 hover:text-primary-700">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCaregivers}</p>
                <p className="text-sm text-gray-500">Verified Caregivers</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                <p className="text-sm text-gray-500">Total Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</p>
                <p className="text-sm text-gray-500">Pending Verifications</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-primary-600 hover:text-primary-700 text-sm">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Caregiver</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{booking.user.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{booking.service.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {booking.caregiver?.user?.name || 'Not assigned'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{booking.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Pending Verifications</h2>
              <Link href="/admin/caregivers/pending" className="text-primary-600 hover:text-primary-700 text-sm">
                View All
              </Link>
            </div>
            {pendingCaregivers.length > 0 ? (
              <div className="space-y-4">
                {pendingCaregivers.map((caregiver) => (
                  <div key={caregiver._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{caregiver.user.name}</h3>
                        <p className="text-sm text-gray-500">{caregiver.user.email}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {caregiver.experience} years experience • {caregiver.specializations.join(', ')}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-green-600 text-white py-1 px-2 rounded text-sm hover:bg-green-700">
                        Approve
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-1 px-2 rounded text-sm hover:bg-red-700">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No pending verifications</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/users" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
            <svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="font-medium text-gray-900">Manage Users</p>
          </Link>
          <Link href="/admin/services" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
            <svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="font-medium text-gray-900">Manage Services</p>
          </Link>
          <Link href="/admin/reports" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
            <svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="font-medium text-gray-900">View Reports</p>
          </Link>
          <Link href="/admin/settings" className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
<svg className="w-8 h-8 mx-auto text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="font-medium text-gray-900">Settings</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

