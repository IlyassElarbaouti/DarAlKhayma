import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

// Types for webhook payload
interface WebhookPayload {
  _type: string;
  _id: string;
  slug?: {
    current: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse the Sanity webhook payload
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      process.env.SANITY_WEBHOOK_SECRET
    );

    // Verify the webhook signature (if secret is provided)
    if (process.env.SANITY_WEBHOOK_SECRET && !isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    if (!body) {
      return NextResponse.json({ message: 'No body provided' }, { status: 400 });
    }

    console.log('Webhook received for:', body._type, body._id);

    // Handle different document types
    switch (body._type) {
      case 'property':
        // Revalidate specific property page if slug exists
        if (body.slug?.current) {
          const propertyPath = `/properties/${body.slug.current}`;
          revalidatePath(propertyPath);
          console.log(`✅ Revalidated property: ${propertyPath}`);
        }
        
        // Always revalidate the properties listing page
        revalidatePath('/properties');
        revalidateTag('properties');
        console.log('✅ Revalidated properties listing');
        break;

      case 'destination':
        // Revalidate specific destination page if slug exists
        if (body.slug?.current) {
          const destinationPath = `/destinations/${body.slug.current}`;
          revalidatePath(destinationPath);
          console.log(`✅ Revalidated destination: ${destinationPath}`);
        }
        
        // Revalidate destinations listing
        revalidatePath('/destinations');
        revalidateTag('destinations');
        console.log('✅ Revalidated destinations listing');
        break;

      case 'teamMember':
        // Revalidate about page
        revalidatePath('/about');
        revalidateTag('team');
        console.log('✅ Revalidated team/about pages');
        break;

      case 'review':
        // Revalidate pages that show reviews
        revalidatePath('/');
        revalidateTag('reviews');
        console.log('✅ Revalidated review content');
        break;

      default:
        // For any other content type, revalidate homepage
        revalidatePath('/');
        console.log(`✅ Revalidated homepage for ${body._type}`);
    }

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: true,
      timestamp: new Date().toISOString(),
      documentType: body._type,
      documentId: body._id
    });

  } catch (error) {
    console.error('Webhook error:', error);
    
    return NextResponse.json(
      { 
        message: 'Webhook processing failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
