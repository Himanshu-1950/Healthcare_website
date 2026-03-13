'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { useSearchParams } from 'next/navigation';

export default function ServiceDetails({ params }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchService();
  }, [params.slug]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${params.slug}`);
      const data = await response.json();
      
      if (data.service) {
        setService(data.service);
      }
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!service) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <p className="text-gray-600 mb-8">The service you are looking for doesn't exist.</p>
            <Link href="/services" className="btn-primary">
              Browse All Services
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 mb-4">
                <span className="text-2xl mr-2">{service.icon}</span>
                {service.category?.toUpperCase()}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {service.name}
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-xl">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4 items-center text-lg">
                <div className="bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm">
                  <span className="text-3xl font-bold">₹{service.basePrice}</span>
                  <span className="ml-2">/{service.priceUnit}</span>
                </div>
                <Link 
                  href={`/bookings/new?service=${service.slug}`} 
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/api/placeholder/600/400"
                alt={service.name}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive care tailored to your loved one's specific needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors mb-4">
                  <span className="text-xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our {service.name.toLowerCase()}
              </p>
            </div>
            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span>{faq.q}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      activeFaq === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-700">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-8 block">{service.icon}</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Book {service.name}?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Professional caregivers are available immediately. Book now and ensure the best care for your loved one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/bookings/new?service=${service.slug}`} 
              className="bg-white text-primary-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Book Service Now
            </Link>
            <Link 
              href="/caregivers" 
              className="border-2 border-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              View Available Caregivers
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
