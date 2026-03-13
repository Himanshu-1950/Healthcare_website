import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ElderCare - Quality Elderly Care Services',
  description: 'Connect with verified caregivers for your loved ones. Professional elderly care, nursing, physiotherapy, and post-hospital care services.',
  keywords: 'elderly care, caregiver, nursing, elderly attendant, physiotherapy, post-hospital care',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}

