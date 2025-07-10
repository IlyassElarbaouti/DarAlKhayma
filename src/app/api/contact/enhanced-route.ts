import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { z } from 'zod';

// Enhanced contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  inquiryType: z.enum(['general', 'property-application', 'property-inquiry', 'booking', 'support']),
  subject: z.string().min(5, 'Subject must be at least 5 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').optional(),
  
  // Property-specific fields
  property: z.string().optional(),
  propertyType: z.string().optional(),
  location: z.string().optional(),
  bedrooms: z.string().optional(),
  propertyDescription: z.string().optional(),
  
  // Booking-specific fields
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().optional(),
  
  // Additional fields
  preferredContact: z.enum(['email', 'phone', 'whatsapp']).optional(),
  budget: z.string().optional()
});

// Helper function to generate default subject based on inquiry type
function getDefaultSubject(inquiryType: string): string {
  const subjects = {
    'general': 'General Inquiry',
    'property-application': 'Property Application Submission',
    'property-inquiry': 'Property Information Request',
    'booking': 'Booking Inquiry',
    'support': 'Support Request'
  };
  return subjects[inquiryType as keyof typeof subjects] || 'Contact Form Submission';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input with enhanced schema
    const validatedData = contactSchema.parse(body);
    
    // Extract validated fields
    const { 
      name, 
      email, 
      phone, 
      inquiryType, 
      subject, 
      message,
      property,
      propertyType,
      location,
      bedrooms,
      propertyDescription,
      checkIn,
      checkOut,
      guests,
      preferredContact,
      budget
    } = validatedData;

    // Create the contact document in Sanity
    const contactDoc = {
      _type: 'contact',
      name,
      email,
      phone: phone || '',
      inquiryType,
      subject: subject || getDefaultSubject(inquiryType),
      message: message || '',
      submittedAt: new Date().toISOString(),
      status: 'new',
      
      // Property-specific fields
      ...(property && { propertyReference: { _type: 'reference', _ref: property } }),
      
      // Property application specific fields
      ...(inquiryType === 'property-application' && {
        propertyType: propertyType || '',
        location: location || '',
        bedrooms: bedrooms || '',
        propertyDescription: propertyDescription || '',
        budget: budget || ''
      }),
      
      // Booking specific fields
      ...(inquiryType === 'booking' && {
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestCount: guests,
        preferredContactMethod: preferredContact || 'email'
      }),
      
      // Additional metadata
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      source: 'website'
    };

    // Save to Sanity
    const result = await client.create(contactDoc);

    // Send email notifications (implement email service here)
    await Promise.allSettled([
      sendAdminNotification(validatedData),
      sendAutoReply(validatedData)
    ]);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: {
        id: result._id,
        submittedAt: contactDoc.submittedAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message. Please try again.',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Email notification functions (implement with your email service)
async function sendAdminNotification(data: any): Promise<void> {
  try {
    // TODO: Implement with SendGrid, Resend, or other email service
    console.log('Admin notification would be sent:', {
      to: process.env.ADMIN_EMAIL || 'hello@daralkhayma.com',
      subject: `New Contact: ${data.subject || getDefaultSubject(data.inquiryType)}`,
      from: data.email,
      type: data.inquiryType,
      name: data.name
    });
  } catch (error) {
    console.error('Failed to send admin notification:', error);
  }
}

async function sendAutoReply(data: any): Promise<void> {
  try {
    // TODO: Implement with SendGrid, Resend, or other email service
    console.log('Auto-reply would be sent:', {
      to: data.email,
      subject: 'Thank you for contacting Dar Al Khayma',
      name: data.name,
      inquiryType: data.inquiryType
    });
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
  }
}
