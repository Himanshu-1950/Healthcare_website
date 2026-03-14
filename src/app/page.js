import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  const services = [
    {
      name: 'Nursing Care',
      description: 'Professional medical care provided by certified nurses, including medication management, vital signs monitoring, and wound care.',
      icon: '🏥',
      slug: 'nursing',
    },
    {
      name: 'Elderly Attendant',
      description: 'Trained attendants to help with daily activities like bathing, dressing, feeding, and mobility assistance.',
      icon: '👴',
      slug: 'attendant',
    },
    {
      name: 'Physiotherapy',
      description: 'Expert physiotherapists to help with rehabilitation, pain management, and improving mobility for elderly patients.',
      icon: '💪',
      slug: 'physiotherapy',
    },
    {
      name: 'Post-Hospital Care',
      description: 'Specialized care for patients recovering from surgery or hospitalization, ensuring proper recovery and follow-up care.',
      icon: '🏨',
      slug: 'post-hospital',
    },
  ];

  const features = [
    {
      title: 'Verified Caregivers',
      description: 'All caregivers undergo thorough background checks and verification process.',
      icon: '✅',
    },
    {
      title: 'Easy Booking',
      description: 'Book services online with just a few clicks. Schedule according to your convenience.',
      icon: '📅',
    },
    {
      title: 'Real-time Tracking',
      description: 'Track service status and get real-time updates on care delivery.',
      icon: '📍',
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you with any queries.',
      icon: '🕐',
    },
  ];

  const stats = [
    { value: '500+', label: 'Verified Caregivers' },
    { value: '10,000+', label: 'Happy Families' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '50+', label: 'Cities Covered' },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Quality Care for Your{' '}
                <span className="text-primary-600">Loved Ones</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Connect with verified and compassionate caregivers who provide exceptional elderly care services. From nursing to post-hospital care, we ensure your family receives the best support.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="btn-primary text-lg px-8 py-3 text-center">
                  Find a Caregiver
                </Link>
                <Link href="/services" className="btn-outline text-lg px-8 py-3 text-center">
                  View Services
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-sm font-medium"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">500+</span> families trust us
                </p>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">👵</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-primary-600">98%</p>
                    <p className="text-sm text-gray-600">Satisfaction Rate</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-primary-600">24/7</p>
                    <p className="text-sm text-gray-600">Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-primary-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Care Services
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive elderly care solutions tailored to meet the unique needs of your loved ones.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
                <Link
                key={index}
                href={`/services/${service.slug}`}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="mt-4 text-primary-600 font-medium flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose ElderCare?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a trusted platform for finding quality elderly care services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started with ElderCare is simple and hassle-free.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Create an Account
                </h3>
                <p className="text-gray-600">
                  Sign up and create a profile for your loved one with their care requirements.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Choose a Service
                </h3>
                <p className="text-gray-600">
                  Browse our services and select the one that best fits your needs.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Get Care
                </h3>
                <p className="text-gray-600">
                  A verified caregiver will be assigned to provide quality care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
            Join thousands of families who trust ElderCare for their elderly care needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Create Account
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
