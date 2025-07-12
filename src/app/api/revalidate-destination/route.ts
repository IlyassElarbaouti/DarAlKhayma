import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { slug, secret } = await request.json();

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (slug) {
      // Revalidate specific destination page
      revalidatePath(`/destinations/${slug}`);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Destination ${slug} revalidated` 
      });
    } else {
      // Revalidate all destination pages
      revalidatePath('/destinations');
      revalidateTag('destinations');
      return NextResponse.json({ 
        revalidated: true, 
        message: 'All destinations revalidated' 
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
      revalidatePath(`/destinations/${slug}`);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Destination ${slug} revalidated` 
      });
    } else {
      revalidatePath('/destinations');
      revalidateTag('destinations');
      return NextResponse.json({ 
        revalidated: true, 
        message: 'All destinations revalidated' 
      });
    }
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 });
  }
}
