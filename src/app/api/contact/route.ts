import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, inquiryType } = body;
    
    if (!name || !email || !inquiryType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Additional validation for property applications
    if (inquiryType === 'property-application') {
      const { propertyType, location, bedrooms, propertyDescription } = body;
      if (!propertyType || !location || !bedrooms || !propertyDescription) {
        return NextResponse.json(
          { error: 'Missing required property application fields' },
          { status: 400 }
        );
      }
    }

    // Create the contact document in Sanity
    const contactDoc = {
      _type: 'contact',
      name,
      email,
      phone: body.phone || '',
      inquiryType,
      subject: body.subject || '',
      message: body.message || '',
      submittedAt: new Date().toISOString(),
      status: 'new',
      // Property application specific fields
      ...(inquiryType === 'property-application' && {
        propertyType: body.propertyType || '',
        location: body.location || '',
        bedrooms: body.bedrooms || '',
        propertyDescription: body.propertyDescription || '',
        propertySize: body.propertySize || '',
        currentlyRenting: body.currentlyRenting || '',
        expectedRevenue: body.expectedRevenue || '',
        amenities: body.amenities || [],
      }),
    };

    const result = await client.create(contactDoc);

    return NextResponse.json(
      { 
        success: true, 
        message: inquiryType === 'property-application' 
          ? 'Property application submitted successfully' 
          : 'Contact form submitted successfully',
        id: result._id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
