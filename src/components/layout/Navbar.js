import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              ElderCare
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600 font-medium">
              Services
            </Link>
            <Link href="/caregivers" className="text-gray-700 hover:text-primary-600 font-medium">
              Caregivers
            </Link>
            <Link href="/bookings" className="text-gray-700 hover:text-primary-600 font-medium">
              Bookings
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
            <Link href="/login" className="btn-primary ml-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
