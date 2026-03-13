'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback data if API fails
      setServices([
        {
          _id: '1',
          name: 'Nursing Care',
          slug: 'nursing',
          description: 'Professional medical care provided by certified nurses, including medication management, vital signs monitoring, and wound care.',
          category: 'nursing',
          duration: 'hourly',
          basePrice: 500,
          priceUnit: 'hour',
          features: ['24/7 Care', 'Medication Management', 'Vital Signs Monitoring', 'Wound Care'],
        },
        {
          _id: '2',
          name: 'Elderly Attendant',
          slug: 'attendant',
          description: 'Trained attendants to help with daily activities like bathing, dressing, feeding, and mobility assistance.',
          category: 'attendant',
          duration: 'daily',
          basePrice: 2500,
          priceUnit: 'day',
          features: ['Daily Living Assistance', 'Meal Preparation', 'Mobility Support', 'Companionship'],
        },
        {
          _id: '3',
          name: 'Physiotherapy',
          slug: 'physiotherapy',
          description: 'Expert physiotherapists to help with rehabilitation, pain management, and improving mobility for elderly patients.',
          category: 'physiotherapy',
          duration: 'hourly',
          basePrice: 800,
          priceUnit: 'hour',
          features: ['Rehabilitation', 'Pain Management', 'Mobility Exercises', 'Post-surgery Recovery'],
        },
        {
          _id: '4',
          name: 'Post-Hospital Care',
          slug: 'post-hospital',
          description: 'Specialized care for patients recovering from surgery or hospitalization, ensuring proper recovery and follow-up care.',
          category: 'post-hospital',
          duration: 'daily',
          basePrice: 3500,
          priceUnit: 'day',
          features: ['Post-Surgery Care', 'Recovery Monitoring', 'Medication Adherence', 'Therapy Support'],
        },
        {
          _id: '5',
          name: 'Dementia Care',
          slug: 'dementia',
          description: 'Specialized care for patients with dementia, including memory care, cognitive stimulation, and safety monitoring.',
          category: 'nursing',
          duration: 'daily',
          basePrice: 4000,
          priceUnit: 'day',
          features: ['Memory Care', 'Cognitive Stimulation', 'Safety Monitoring', 'Behavioral Support'],
        },
        {
          _id: '6',
          name: 'Palliative Care',
          slug: 'palliative',
          description: 'Compassionate care focused on providing relief from symptoms and improving quality of life for patients with serious illnesses.',
          category: 'nursing',
          duration: 'daily',
          basePrice: 5000,
          priceUnit: 'day',
          features: ['Pain Management', 'Emotional Support', 'Family Counseling', 'Symptom Relief'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'nursing', label: 'Nursing Care' },
    { value: 'attendant', label: 'Elderly Attendant' },
    { value: 'physiotherapy', label: 'Physiotherapy' },
    { value: 'post-hospital', label: 'Post-Hospital Care' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const icons = {
      nursing: '🏥',
      attendant: '👴',
      physiotherapy: '💪',
      'post-hospital': '🏨',
    };
    return icons[category] || '🏥';
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Care Services</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Comprehensive elderly care solutions tailored to meet the unique needs of your loved ones.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div key={service._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{getCategoryIcon(service.category)}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-sm text-gray-500 capitalize">{service.category}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="text-xs text-gray-500 py-1">
                              +{service.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-primary-600">
                          {service.basePrice ? `₹${service.basePrice}` : 'Custom'}
                        </span>
                        {service.priceUnit && (
                          <span className="text-gray-500 text-sm">/{service.priceUnit}</span>
                        )}
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredServices.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Custom Care?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your specific requirements and we'll help you find the perfect care solution.
          </p>
          <Link href="/contact" className="btn-primary px-8 py-3">
            Contact Us
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

