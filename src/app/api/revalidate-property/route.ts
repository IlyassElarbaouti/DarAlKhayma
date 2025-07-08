import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { slug, secret } = await request.json();

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (slug) {
      // Revalidate specific property page
      revalidatePath(`/properties/${slug}`);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Property ${slug} revalidated` 
      });
    } else {
      // Revalidate all properties pages
      revalidatePath('/properties');
      return NextResponse.json({ 
        revalidated: true, 
        message: 'All properties revalidated' 
      });
    }
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 });
  }
}

// Also handle GET requests for manual testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    if (slug) {
      revalidatePath(`/properties/${slug}`);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Property ${slug} revalidated` 
      });
    } else {
      revalidatePath('/properties');
      return NextResponse.json({ 
        revalidated: true, 
        message: 'All properties revalidated' 
      });
    }
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 });
  }
}
