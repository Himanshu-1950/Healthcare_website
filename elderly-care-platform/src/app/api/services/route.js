import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/lib/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }

    const services = await Service.find(query).sort({ createdAt: -1 });
    
    // If no services in database, return default services
    if (services.length === 0) {
      return NextResponse.json({
        services: [
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
        ],
      });
    }

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { message: 'Error fetching services', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    // Generate slug from name
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const service = await Service.create({
      ...data,
      slug,
    });

    return NextResponse.json(
      { message: 'Service created successfully', service },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { message: 'Error creating service', error: error.message },
      { status: 500 }
    );
  }
}

