import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/lib/models';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { slug } = params;
    
    const service = await Service.findOne({ slug, isActive: true });
    
    if (!service) {
      const defaultServices = {
        "nursing": {
          _id: "1",
          name: "Nursing Care",
          slug: "nursing",
          description: "Professional medical care provided by certified nurses, including medication management, vital signs monitoring, and wound care.",
          category: "nursing",
          duration: "hourly",
          basePrice: 500,
          priceUnit: "hour",
          features: ["24/7 Care", "Medication Management", "Vital Signs Monitoring", "Wound Care"],
          icon: "🏥",
          faqs: [
            { q: "What does nursing care include?", a: "Medication management, vital signs monitoring, wound care, and daily health assessments." },
            { q: "Are nurses certified?", a: "Yes, all nurses are certified and have relevant experience in elderly care." },
            { q: "What is the minimum booking duration?", a: "Flexible booking starting from 2 hours." }
          ]
        },
        "attendant": {
          _id: "2",
          name: "Elderly Attendant",
          slug: "attendant",
          description: "Trained attendants to help with daily activities like bathing, dressing, feeding, and mobility assistance.",
          category: "attendant",
          duration: "daily",
          basePrice: 2500,
          priceUnit: "day",
          features: ["Daily Living Assistance", "Meal Preparation", "Mobility Support", "Companionship"],
          icon: "👴",
          faqs: [
            { q: "What daily activities are covered?", a: "Bathing, dressing, feeding, toileting, mobility assistance, and light housekeeping." },
            { q: "Do attendants cook meals?", a: "Yes, they can prepare simple, nutritious meals based on dietary preferences." }
          ]
        },
        "physiotherapy": {
          _id: "3",
          name: "Physiotherapy",
          slug: "physiotherapy",
          description: "Expert physiotherapists to help with rehabilitation, pain management, and improving mobility for elderly patients.",
          category: "physiotherapy",
          duration: "hourly",
          basePrice: 800,
          priceUnit: "hour",
          features: ["Rehabilitation", "Pain Management", "Mobility Exercises", "Post-surgery Recovery"],
          icon: "💪",
          faqs: [
            { q: "What conditions do you treat?", a: "Arthritis, post-stroke recovery, osteoporosis, balance issues, and general mobility improvement." },
            { q: "Do you have home visit facilities?", a: "Yes, all physiotherapy sessions are conducted at the patient's home." }
          ]
        },
        "post-hospital": {
          _id: "4",
          name: "Post-Hospital Care",
          slug: "post-hospital",
          description: "Specialized care for patients recovering from surgery or hospitalization, ensuring proper recovery and follow-up care.",
          category: "post-hospital",
          duration: "daily",
          basePrice: 3500,
          priceUnit: "day",
          features: ["Post-Surgery Care", "Recovery Monitoring", "Medication Adherence", "Therapy Support"],
          icon: "🏨",
          faqs: [
            { q: "When is post-hospital care needed?", a: "After surgery, hospital discharge, injury recovery, or any medical procedure requiring follow-up care." },
            { q: "How long does post-hospital care last?", a: "Typically 1-4 weeks, customized based on recovery progress and doctor recommendations." }
          ]
        }
      };

      const fallbackService = defaultServices[slug];
      if (!fallbackService) {
        return NextResponse.json({ message: 'Service not found' }, { status: 404 });
      }

      return NextResponse.json({ service: fallbackService });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { message: 'Error fetching service', error: error.message },
      { status: 500 }
    );
  }
}
