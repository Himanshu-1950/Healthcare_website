# Elderly Care Services Platform

A comprehensive web-based platform connecting families with verified
caregivers for elderly nursing and healthcare assistance services.

------------------------------------------------------------------------

## Features

### For Families / Users

-   Secure user registration and login
-   Create patient profiles (age, medical needs)
-   Browse available healthcare services
-   View caregiver profiles with ratings and qualifications
-   Book caregivers (hourly, daily, long-term)
-   Track service status
-   View booking history

### For Caregivers

-   Caregiver registration and verification
-   Manage availability and service location
-   Accept or reject service requests
-   Update service progress and notes
-   View earnings and completed work

### For Admin

-   Verify caregiver profiles
-   Manage users and services
-   Handle complaints and disputes
-   Monitor platform analytics

------------------------------------------------------------------------

## Tech Stack

Frontend - Next.js 14 - React - Tailwind CSS

Backend - Next.js API Routes - Node.js

Database - MongoDB with Mongoose

Authentication - JWT Authentication

------------------------------------------------------------------------

## Prerequisites

Before running the project, install:

-   Node.js (version 18 or higher)
-   MongoDB (local installation or MongoDB Atlas)

------------------------------------------------------------------------

## Installation & Running the Project

### 1. Clone the Repository

``` bash
git clone https://github.com/Himanshu-1950/Healthcare_website.git
cd Healthcare_website
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Environment Variables

Create a file named `.env.local` in the root folder.

Example:

    MONGODB_URI=your-mongodb-connection-string
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-secret-key
    JWT_SECRET=your-jwt-secret

### Environment Variable Explanation

MONGODB_URI\
Connection string used to connect the application with MongoDB.

NEXTAUTH_URL\
Base URL of the application.

NEXTAUTH_SECRET\
Secret key used to encrypt authentication sessions.

JWT_SECRET\
Secret key used to generate JSON Web Tokens.

------------------------------------------------------------------------

### 4. Run the Development Server

``` bash
npm run dev
```

Open in browser:

http://localhost:3000

------------------------------------------------------------------------

## User Registration Parameters

Required fields:

Name -- Full name of the user\
Email -- Used for login\
Phone -- Contact number\
Password -- Secure login password

Example:

``` json
{
  "name": "Rahul Sharma",
  "email": "rahul@email.com",
  "phone": "9876543210",
  "password": "password123"
}
```

------------------------------------------------------------------------

## Caregiver Registration Parameters

Required fields:

Name -- Caregiver full name\
Email -- Login email\
Phone -- Contact number\
Qualification -- Medical certification\
Experience -- Years of work experience\
ServiceType -- Example: Nursing, Physiotherapy

Example:

``` json
{
  "name": "Priya Patil",
  "email": "priya@email.com",
  "phone": "9123456780",
  "qualification": "BSc Nursing",
  "experience": "3 years",
  "serviceType": "Nursing Care"
}
```

------------------------------------------------------------------------

## Project Structure

    src
     ├── app
     │   ├── api
     │   ├── login
     │   ├── register
     │   ├── services
     │   ├── caregivers
     │   ├── bookings
     │   ├── dashboard
     │   ├── admin
     │   ├── caregiver
     │   ├── about
     │   └── contact
     │
     ├── components
     │   └── layout
     │
     └── lib
         ├── db.js
         └── models

------------------------------------------------------------------------

## Available Scripts

Start development server

    npm run dev

Build project

    npm run build

Start production server

    npm run start

Run ESLint

    npm run lint

------------------------------------------------------------------------

## License

MIT License
