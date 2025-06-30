import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get filter parameters
    const location = searchParams.get('location');
    const propertyType = searchParams.getAll('propertyType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const amenities = searchParams.getAll('amenities');
    const rating = searchParams.get('rating');
    const guests = searchParams.get('guests');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Build Sanity query
    let query = `*[_type == "property"`;
    const filters = [];
    const params: any = {};

    // Location filter
    if (location) {
      filters.push(`destination->city match $location || destination->region match $location`);
      params.location = `*${location}*`;
    }

    // Property type filter
    if (propertyType.length > 0) {
      filters.push(`propertyType in $propertyTypes`);
      params.propertyTypes = propertyType;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      if (minPrice && maxPrice) {
        filters.push(`pricing.basePrice >= $minPrice && pricing.basePrice <= $maxPrice`);
        params.minPrice = parseInt(minPrice);
        params.maxPrice = parseInt(maxPrice);
      } else if (minPrice) {
        filters.push(`pricing.basePrice >= $minPrice`);
        params.minPrice = parseInt(minPrice);
      } else if (maxPrice) {
        filters.push(`pricing.basePrice <= $maxPrice`);
        params.maxPrice = parseInt(maxPrice);
      }
    }

    // Bedrooms filter
    if (bedrooms) {
      filters.push(`bedrooms >= $bedrooms`);
      params.bedrooms = parseInt(bedrooms);
    }

    // Bathrooms filter
    if (bathrooms) {
      filters.push(`bathrooms >= $bathrooms`);
      params.bathrooms = parseInt(bathrooms);
    }

    // Guests filter
    if (guests) {
      filters.push(`maxGuests >= $guests`);
      params.guests = parseInt(guests);
    }

    // Rating filter
    if (rating) {
      filters.push(`rating >= $rating`);
      params.rating = parseFloat(rating);
    }

    // Amenities filter
    if (amenities.length > 0) {
      const amenityFilters = amenities.map((_, index) => `$amenity${index} in amenities[]->name`);
      filters.push(`(${amenityFilters.join(' && ')})`);
      amenities.forEach((amenity, index) => {
        params[`amenity${index}`] = amenity;
      });
    }

    // Complete the query
    if (filters.length > 0) {
      query += ` && (${filters.join(' && ')})`;
    }
    query += `] | order(_createdAt desc)`;

    // Add pagination
    const offset = (page - 1) * limit;
    const paginatedQuery = `${query}[${offset}...${offset + limit}]`;    // Fetch properties with full details
    const properties = await client.fetch(
      `${paginatedQuery} {
        _id,
        title,
        slug,
        propertyType,
        bedrooms,
        bathrooms,
        maxGuests,
        pricing {
          basePrice,
          currency
        },
        images[] {
          asset->{
            _id,
            url
          },
          alt
        },
        destination-> {
          _id,
          city,
          region,
          coordinates {
            lat,
            lng
          }
        },
        amenities[]-> {
          _id,
          name,
          icon
        },
        rating,
        reviewCount,
        description,
        highlights[],
        _createdAt
      }`,
      params
    );

    // Get total count for pagination
    const totalQuery = `count(${query.replace('| order(_createdAt desc)', '')})`;
    const total = await client.fetch(totalQuery, params);

    // Transform data for frontend
    const transformedProperties = properties.map((property: any) => ({
      id: property._id,
      title: property.title,
      slug: property.slug?.current,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      maxGuests: property.maxGuests,
      price: {
        amount: property.pricing?.basePrice || 0,
        currency: property.pricing?.currency || 'MAD'
      },
      images: property.images?.map((img: any) => ({
        url: img.asset?.url,
        alt: img.alt || property.title
      })) || [],
      location: {
        city: property.destination?.city,
        region: property.destination?.region,
      },
      coordinates: property.destination?.coordinates || { lat: 0, lng: 0 },
      amenities: property.amenities?.map((amenity: any) => ({
        id: amenity._id,
        name: amenity.name,
        icon: amenity.icon
      })) || [],
      rating: property.rating || 0,
      reviewCount: property.reviewCount || 0,
      description: property.description,
      highlights: property.highlights || [],
      createdAt: property._createdAt
    }));

    return NextResponse.json({
      success: true,
      data: {
        properties: transformedProperties,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          limit,
          count: properties.length,
          totalItems: total
        },
        filters: {
          location,
          propertyType,
          priceRange: [minPrice, maxPrice],
          bedrooms,
          bathrooms,
          amenities,
          rating,
          guests
        }
      }
    });

  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch properties',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
