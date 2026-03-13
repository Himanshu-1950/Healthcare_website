import MainLayout from '@/components/layout/MainLayout';

export default function AboutPage() {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director',
      bio: '20+ years experience in geriatric care',
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      bio: 'Healthcare technology entrepreneur',
    },
    {
      name: 'Emily Davis',
      role: 'Head of Operations',
      bio: 'Expert in healthcare service delivery',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About ElderCare</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            We are dedicated to providing quality elderly care services with compassion and professionalism.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to transform elderly care by connecting families with verified, compassionate, and professional caregivers. We believe that every elderly person deserves dignity, respect, and quality care in the comfort of their own home.
              </p>
              <p className="text-lg text-gray-600">
                Through technology and compassion, we make it easier for families to find trusted care solutions while ensuring the highest standards of care delivery.
              </p>
            </div>
            <div className="bg-primary-50 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600">500+</p>
                  <p className="text-gray-600">Verified Caregivers</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600">10,000+</p>
                  <p className="text-gray-600">Families Served</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600">4.9/5</p>
                  <p className="text-gray-600">Average Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600">50+</p>
                  <p className="text-gray-600">Cities Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600">
                We treat every individual with empathy, kindness, and respect, understanding the unique needs of each person.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                We build trust through rigorous verification, transparent processes, and consistent quality of care.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from caregiver training to service delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Leadership Team</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our team brings together decades of experience in healthcare, technology, and service delivery.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-primary-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Whether you're looking for care or want to become a caregiver, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get Started
            </a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

