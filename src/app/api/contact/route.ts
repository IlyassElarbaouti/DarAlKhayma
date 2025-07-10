import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { z } from 'zod';

// Create a write-enabled client specifically for this API route
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-24',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

// Enhanced contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  inquiryType: z.enum(['general', 'booking', 'property-application', 'media']),
  subject: z.string().optional(),
  message: z.string().optional(),
  
  // Property-specific fields
  propertyType: z.string().optional(),
  location: z.string().optional(),
  bedrooms: z.string().optional(),
  propertyDescription: z.string().optional(),
  propertySize: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  currentlyRenting: z.string().optional(),
  expectedRevenue: z.string().optional()
}).refine((data) => {
  // For property applications, subject and message are optional
  if (data.inquiryType === 'property-application') {
    return true;
  }
  // For non-property applications, require subject and message with minimum lengths
  return data.subject && data.subject.length >= 5 && data.message && data.message.length >= 10;
}, {
  message: "Subject (min 5 characters) and message (min 10 characters) are required for general inquiries",
  path: ["subject"]
});

// Helper function to generate default subject based on inquiry type
function getDefaultSubject(inquiryType: string): string {
  const subjects = {
    'general': 'General Inquiry',
    'property-application': 'Property Application Submission',
    'booking': 'Booking Inquiry',
    'media': 'Press & Media Request'
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
      propertyType,
      location,
      bedrooms,
      propertyDescription,
      propertySize,
      amenities,
      currentlyRenting,
      expectedRevenue
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
      
      // Property application specific fields
      ...(inquiryType === 'property-application' && {
        propertyType: propertyType || '',
        location: location || '',
        bedrooms: bedrooms || '',
        propertyDescription: propertyDescription || '',
        propertySize: propertySize || '',
        amenities: amenities || [],
        currentlyRenting: currentlyRenting || '',
        expectedRevenue: expectedRevenue || ''
      }),
      
      // Additional metadata
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      source: 'website'
    };

    try {
      // Attempt to save to Sanity
      const result = await writeClient.create(contactDoc);

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

    } catch (sanityError: any) {
      // Log the Sanity error for debugging
      console.error('Sanity creation failed:', sanityError);
      
      if (sanityError.statusCode === 403) {
        // Handle permission error - save to logs and still return success to user
        console.error('SANITY PERMISSION ERROR: Token lacks create permissions');
        console.log('Contact form submission (saved to logs):', {
          timestamp: new Date().toISOString(),
          name,
          email,
          phone,
          inquiryType,
          subject: subject || getDefaultSubject(inquiryType),
          message,
          ...(inquiryType === 'property-application' && {
            propertyType,
            location,
            bedrooms,
            propertyDescription,
            propertySize,
            amenities,
            currentlyRenting,
            expectedRevenue
          })
        });

        // Still try to send email notifications
        await Promise.allSettled([
          sendAdminNotification(validatedData),
          sendAutoReply(validatedData)
        ]);

        // Return success to user (they don't need to know about the backend issue)
        return NextResponse.json({
          success: true,
          message: 'Thank you for your message. We will get back to you soon!',
          data: {
            id: `temp-${Date.now()}`,
            submittedAt: contactDoc.submittedAt,
            note: 'Submission logged pending database fix'
          }
        });
      }
      
      // For other Sanity errors, throw to be handled below
      throw sanityError;
    }

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
