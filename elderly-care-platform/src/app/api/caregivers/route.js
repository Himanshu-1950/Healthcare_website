import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Caregiver } from '@/lib/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');
    const rating = searchParams.get('rating');
    const available = searchParams.get('available');
    
    let query = { verificationStatus: 'verified' };
    
    if (specialization && specialization !== 'all') {
      query.specializations = specialization;
    }
    
    if (available === 'true') {
      query.isAvailable = true;
    }

    const caregivers = await Caregiver.find(query)
      .populate('user', 'name email phone avatar')
      .sort({ rating: -1, completedJobs: -1 });
    
    // If no caregivers in database, return empty array (frontend has fallback data)
    return NextResponse.json({ caregivers });
  } catch (error) {
    console.error('Error fetching caregivers:', error);
    return NextResponse.json(
      { message: 'Error fetching caregivers', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    const caregiver = await Caregiver.create({
      ...data,
      verificationStatus: 'pending',
    });

    return NextResponse.json(
      { message: 'Caregiver profile created successfully', caregiver },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating caregiver profile:', error);
    return NextResponse.json(
      { message: 'Error creating caregiver profile', error: error.message },
      { status: 500 }
    );
  }
}

