import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json();

    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (path) {
      // Revalidate specific path
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    } else {
      // Revalidate all property pages
      revalidatePath('/properties');
      revalidateTag('properties');
      console.log('Revalidated all property pages');
    }

    return NextResponse.json({ 
      revalidated: true, 
      path: path || 'all properties',
      now: Date.now() 
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle GET requests with query parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const secret = searchParams.get('secret');

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    } else {
      revalidatePath('/properties');
      revalidateTag('properties');
      console.log('Revalidated all property pages');
    }

    return NextResponse.json({ 
      revalidated: true, 
      path: path || 'all properties',
      now: Date.now() 
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}
