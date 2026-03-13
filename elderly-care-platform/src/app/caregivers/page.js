'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function CaregiversPage() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    specialization: 'all',
    minRating: 0,
    maxPrice: 10000,
  });

  useEffect(() => {
    fetchCaregivers();
  }, [filters]);

  const fetchCaregivers = async () => {
    try {
      const response = await fetch('/api/caregivers');
      const data = await response.json();
      setCaregivers(data.caregivers || []);
    } catch (error) {
      console.error('Error fetching caregivers:', error);
      // Fallback data
      setCaregivers([
        {
          _id: '1',
          user: { name: 'Sarah Johnson', avatar: '' },
          bio: 'Experienced geriatric care specialist with 10+ years in elderly care.',
          specializations: ['elderly care', 'dementia care'],
          experience: 10,
          rating: 4.9,
          totalRatings: 45,
          hourlyRate: 500,
          isAvailable: true,
        },
        {
          _id: '2',
          user: { name: 'Michael Chen', avatar: '' },
          bio: 'Certified nursing assistant with expertise in post-hospital care and rehabilitation.',
          specializations: ['post-hospital care', 'physiotherapy'],
          experience: 7,
          rating: 4.8,
          totalRatings: 32,
          hourlyRate: 450,
          isAvailable: true,
        },
        {
          _id: '3',
          user: { name: 'Emily Davis', avatar: '' },
          bio: 'Compassionate caregiver specializing in dementia and palliative care.',
          specializations: ['dementia care', 'palliative care'],
          experience: 5,
          rating: 4.7,
          totalRatings: 28,
          hourlyRate: 400,
          isAvailable: true,
        },
        {
          _id: '4',
          user: { name: 'Robert Wilson', avatar: '' },
          bio: 'Professional caregiver with background in physiotherapy and rehabilitation.',
          specializations: ['elderly care', 'physiotherapy'],
          experience: 8,
          rating: 4.9,
          totalRatings: 52,
          hourlyRate: 550,
          isAvailable: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCaregivers = caregivers.filter((cg) => {
    if (filters.specialization !== 'all' && !cg.specializations?.includes(filters.specialization)) {
      return false;
    }
    if (cg.rating < filters.minRating) {
      return false;
    }
    if (cg.hourlyRate > filters.maxPrice) {
      return false;
    }
    return true;
  });

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getSpecializationColor = (spec) => {
    const colors = {
      'elderly care': 'bg-blue-100 text-blue-700',
      'dementia care': 'bg-purple-100 text-purple-700',
      'post-hospital care': 'bg-green-100 text-green-700',
      'physiotherapy': 'bg-orange-100 text-orange-700',
      'palliative care': 'bg-red-100 text-red-700',
      'disability care': 'bg-teal-100 text-teal-700',
    };
    return colors[spec] || 'bg-gray-100 text-gray-700';
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Find a Caregiver</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Connect with verified and compassionate caregivers who match your care needs.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <select
                value={filters.specialization}
                onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                className="input-field"
              >
                <option value="all">All Specializations</option>
                <option value="elderly care">Elderly Care</option>
                <option value="dementia care">Dementia Care</option>
                <option value="post-hospital care">Post-Hospital Care</option>
                <option value="physiotherapy">Physiotherapy</option>
                <option value="palliative care">Palliative Care</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                className="input-field"
              >
                <option value="0">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Hourly Rate (₹)
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="input-field"
              >
                <option value="10000">Any Price</option>
                <option value="300">Under ₹300</option>
                <option value="400">Under ₹400</option>
                <option value="500">Under ₹500</option>
                <option value="600">Under ₹600</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Caregivers Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading caregivers...</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">
                Showing {filteredCaregivers.length} caregiver{filteredCaregivers.length !== 1 ? 's' : ''}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCaregivers.map((caregiver) => (
                  <div key={caregiver._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl">
                          {caregiver.user?.avatar ? (
                            <img src={caregiver.user.avatar} alt={caregiver.user.name} className="w-16 h-16 rounded-full object-cover" />
                          ) : (
                            getInitials(caregiver.user?.name || 'CG')
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {caregiver.user?.name || 'Caregiver'}
                          </h3>
                          <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(caregiver.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {caregiver.rating?.toFixed(1) || '0.0'} ({caregiver.totalRatings || 0} reviews)
                            </span>
                          </div>
                        </div>
                        {caregiver.isAvailable && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Available
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {caregiver.bio || 'No bio available'}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {caregiver.specializations?.slice(0, 3).map((spec, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full ${getSpecializationColor(spec)}`}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold text-primary-600">
                            ₹{caregiver.hourlyRate || 0}
                          </span>
                          <span className="text-gray-500 text-sm">/hour</span>
                        </div>
                        <Link
                          href={`/caregivers/${caregiver._id}`}
                          className="btn-primary"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCaregivers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No caregivers found matching your criteria.</p>
                  <button
                    onClick={() => setFilters({ specialization: 'all', minRating: 0, maxPrice: 10000 })}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Are You a Caregiver?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of verified caregivers and start helping families in need.
          </p>
          <Link href="/register?role=caregiver" className="btn-primary px-8 py-3">
            Join as Caregiver
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

