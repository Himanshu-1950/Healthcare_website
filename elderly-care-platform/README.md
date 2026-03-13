# Elderly Care Services Platform

A comprehensive web-based platform connecting families with verified caregivers for elderly nursing and healthcare assistance services.

## Features

### For Families/Users
- Secure user registration and login
- Create patient profiles (age, medical needs)
- Browse available services:
  - Nursing care
  - Elderly attendant
  - Physiotherapy
  - Post-hospital care
- View caregiver profiles, qualifications, and ratings
- Book services (hourly/daily/long-term)
- Track service status
- View service history

### For Caregivers
- Caregiver registration & verification
- Manage availability and service areas
- Accept or reject service requests
- Update service status and care notes
- View earnings and work history

### For Admins
- Verify and onboard caregivers
- Manage users and service categories
- Monitor service quality and complaints
- Handle disputes and escalations
- View analytics and reports

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based authentication

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
cd elderly-care-platform
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file with:
```env
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/              # API routes
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── services/         # Services listing
│   ├── caregivers/       # Caregivers listing
│   ├── bookings/         # Booking pages
│   ├── dashboard/        # User dashboard
│   ├── admin/           # Admin dashboard
│   ├── caregiver/       # Caregiver dashboard
│   ├── about/           # About page
│   └── contact/         # Contact page
├── components/           # React components
│   └── layout/          # Layout components
└── lib/                 # Utility functions
    ├── db.js            # MongoDB connection
    └── models/          # Mongoose models
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT

