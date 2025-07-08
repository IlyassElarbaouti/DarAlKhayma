import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

// ISR settings for this route
export const dynamic = 'force-dynamic';
export const revalidate = 30; // Revalidate every 30 seconds

export async function GET() {
  try {
    // Fetch all destinations with property counts
    const destinations = await client.fetch(`
      *[_type == "destination"] {
        _id,
        name,
        city,
        region,
        slug,
        coordinates {
          lat,
          lng
        },
        image {
          asset->{
            _id,
            url
          },
          alt
        },
        description,
        highlights[],
        "propertyCount": count(*[_type == "property" && references(^._id)])
      } | order(propertyCount desc)
    `);

    // Transform data for frontend
    const transformedDestinations = destinations.map((destination: any) => ({
      _id: destination._id,
      name: destination.name,
      city: destination.city,
      region: destination.region,
      slug: destination.slug,
      coordinates: destination.coordinates || { lat: 0, lng: 0 },
      image: {
        url: destination.image?.asset?.url,
        alt: destination.image?.alt || destination.name
      },
      description: destination.description,
      highlights: destination.highlights || [],
      propertyCount: destination.propertyCount || 0
    }));

    return NextResponse.json({
      success: true,
      data: transformedDestinations
    });

  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch destinations',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
