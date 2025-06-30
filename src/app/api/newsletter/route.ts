import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { z } from 'zod';

// Newsletter subscription validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  preferences: z.array(z.string()).optional(), // e.g., ['properties', 'destinations', 'offers']
  source: z.string().optional() // Where they subscribed from
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = newsletterSchema.parse(body);
    const { email, name, preferences, source } = validatedData;

    // Check if email already exists
    const existingSubscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    );

    if (existingSubscriber) {
      // Update existing subscriber
      const updated = await client
        .patch(existingSubscriber._id)
        .set({
          name: name || existingSubscriber.name,
          preferences: preferences || existingSubscriber.preferences,
          updatedAt: new Date().toISOString(),
          status: 'active' // Reactivate if they were unsubscribed
        })
        .commit();

      return NextResponse.json({
        success: true,
        message: 'Your subscription has been updated successfully!',
        data: {
          id: updated._id,
          email: updated.email,
          isNew: false
        }
      });
    }

    // Create new subscription
    const subscriptionDoc = {
      _type: 'newsletter',
      email,
      name: name || '',
      preferences: preferences || ['properties', 'destinations'],
      subscribedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      source: source || 'website',
      
      // Additional metadata
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    };

    const result = await client.create(subscriptionDoc);

    // Send welcome email (implement email service here)
    await sendWelcomeEmail({ email, name });

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: {
        id: result._id,
        email: result.email,
        isNew: true
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email address',
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
        error: 'Failed to subscribe. Please try again.',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);    const email = searchParams.get('email');
    // Optional: implement token-based unsubscribe for security

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find and update subscriber status
    const subscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    );

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Email not found in our records' },
        { status: 404 }
      );
    }

    // Update status to unsubscribed
    await client
      .patch(subscriber._id)
      .set({
        status: 'unsubscribed',
        unsubscribedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .commit();

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to unsubscribe. Please try again.',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Welcome email function (implement with your email service)
async function sendWelcomeEmail(data: { email: string; name?: string }): Promise<void> {
  try {
    // TODO: Implement with SendGrid, Resend, or other email service
    console.log('Welcome email would be sent:', {
      to: data.email,
      subject: 'Welcome to Dar Al Khayma Newsletter!',
      name: data.name || 'Valued Subscriber',
      template: 'newsletter-welcome'
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}
