// Sanity data fetching services
import { client, queries } from './sanity';
import { 
  SanityProperty, 
  SanityDestination, 
  SanityAmenity, 
  SanityLocation,
  Property,
  Destination,
  transformSanityProperty,
  transformSanityDestination
} from '@/types/sanity';

// Property services
export async function getAllProperties(): Promise<Property[]> {
  try {
    // Add timeout and better error handling for build time
    const sanityProperties: SanityProperty[] = await Promise.race([
      client.fetch(queries.allProperties),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Sanity fetch timeout')), 10000)
      )
    ]);
    return sanityProperties.map(transformSanityProperty);
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Return empty array instead of throwing to prevent build failure
    return [];
  }
}

export async function getPropertiesByCity(city: string): Promise<Property[]> {
  try {
    const sanityProperties: SanityProperty[] = await client.fetch(
      queries.propertiesByCity, 
      { city }
    );
    return sanityProperties.map(transformSanityProperty);
  } catch (error) {
    console.error('Error fetching properties by city:', error);
    return [];
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const sanityProperties: SanityProperty[] = await client.fetch(queries.featuredProperties);
    return sanityProperties.map(transformSanityProperty);
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const sanityProperty: SanityProperty = await client.fetch(
      queries.propertyBySlug, 
      { slug }
    );
    
    if (!sanityProperty) return null;
    
    return transformSanityProperty(sanityProperty);
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return null;
  }
}

// Destination services
export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const sanityDestinations: SanityDestination[] = await client.fetch(queries.allDestinations);
    return sanityDestinations.map(transformSanityDestination);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

export async function getFeaturedDestinations(): Promise<SanityDestination[]> {
  try {
    const featuredDestinations: SanityDestination[] = await client.fetch(queries.featuredDestinations);
    return featuredDestinations;
  } catch (error) {
    console.error('Error fetching featured destinations:', error);
    return [];
  }
}

export async function getDestinationBySlug(slug: string): Promise<SanityDestination | null> {
  try {
    const destination: SanityDestination = await client.fetch(
      queries.destinationBySlug, 
      { slug }
    );
    return destination;
  } catch (error) {
    console.error('Error fetching destination by slug:', error);
    return null;
  }
}

// Utility services
export async function getAllAmenities(): Promise<SanityAmenity[]> {
  try {
    return await client.fetch(queries.allAmenities);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return [];
  }
}

export async function getAllLocations(): Promise<SanityLocation[]> {
  try {
    return await client.fetch(queries.allLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

// Search and filter functions
export async function searchProperties(searchParams: {
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  bedrooms?: number;
}): Promise<Property[]> {
  try {
    let query = `*[_type == "property"`;
    const params: Record<string, unknown> = {};

    // Add filters
    if (searchParams.location) {
      query += ` && location->city match $location`;
      params.location = `*${searchParams.location}*`;
    }

    if (searchParams.category) {
      query += ` && category == $category`;
      params.category = searchParams.category;
    }

    if (searchParams.minPrice) {
      query += ` && price.amount >= $minPrice`;
      params.minPrice = searchParams.minPrice;
    }

    if (searchParams.maxPrice) {
      query += ` && price.amount <= $maxPrice`;
      params.maxPrice = searchParams.maxPrice;
    }

    if (searchParams.guests) {
      query += ` && specifications.guests >= $guests`;
      params.guests = searchParams.guests;
    }

    if (searchParams.bedrooms) {
      query += ` && specifications.bedrooms >= $bedrooms`;
      params.bedrooms = searchParams.bedrooms;
    }

    query += `] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      shortDescription,
      images[] {
        _key,
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt,
        caption
      },
      location-> {
        _id,
        city,
        region,
        country,
        coordinates,
        neighborhood
      },
      price {
        amount,
        currency,
        period
      },
      specifications {
        bedrooms,
        bathrooms,
        guests,
        area
      },
      amenities[]-> {
        _id,
        name,
        icon,
        category
      },
      bookingLinks[] {
        platform,
        url,
        label
      },
      featured,
      category,
      rating {
        average,
        count
      },
      _createdAt,
      _updatedAt
    }`;

    const sanityProperties: SanityProperty[] = await client.fetch(query, params);
    return sanityProperties.map(transformSanityProperty);
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
}
