import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-24',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for fetching data
export const queries = {  // Get all properties
  allProperties: `*[_type == "property"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    shortDescription,
    images[] {
      _key,
      alt,
      caption,
      "url": asset.asset->url
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
  }`,

  // Get properties by city
  propertiesByCity: `*[_type == "property" && location->city == $city] | order(_createdAt desc) {
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
  }`,
  // Get featured properties
  featuredProperties: `*[_type == "property" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    shortDescription,
    images[] {
      _key,
      alt,
      caption,
      "url": asset.asset->url
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
  }`,

  // Get property by slug
  propertyBySlug: `*[_type == "property" && slug.current == $slug][0] {
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
  }`,  // Get all destinations
  allDestinations: `*[_type == "destination"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    shortDescription,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    region,
    coordinates,
    featured,
    highlights[],
    attractions[] {
      name,
      type,
      description
    },
    activities[],
    transportation {
      airport,
      trainStation,
      carRental
    },
    weather {
      bestTimeToVisit,
      averageTemp,
      rainyMonths[]
    },
    "propertyCount": count(*[_type == "property" && location->city == ^.name]),
    "minPrice": math::min(*[_type == "property" && location->city == ^.name].price.amount),
    "maxPrice": math::max(*[_type == "property" && location->city == ^.name].price.amount)
  }`,

  // Get featured destinations
  featuredDestinations: `*[_type == "destination" && featured == true] | order(name asc) {
    _id,
    name,
    slug,
    description,
    shortDescription,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    region,
    coordinates,
    featured,
    highlights[],
    activities[],
    "propertyCount": count(*[_type == "property" && location->city == ^.name]),
    "minPrice": math::min(*[_type == "property" && location->city == ^.name].price.amount),
    "maxPrice": math::max(*[_type == "property" && location->city == ^.name].price.amount)
  }`,

  // Get destination by slug
  destinationBySlug: `*[_type == "destination" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    region,
    coordinates,
    featured,
    highlights[],
    attractions[] {
      name,
      type,
      description
    },
    activities[],
    transportation {
      airport,
      trainStation,
      carRental
    },
    weather {
      bestTimeToVisit,
      averageTemp,
      rainyMonths[]
    },
    "propertyCount": count(*[_type == "property" && location->city == ^.name])
  }`,

  // Get all amenities
  allAmenities: `*[_type == "amenity"] | order(category asc, name asc) {
    _id,
    name,
    icon,
    category
  }`,

  // Get all locations
  allLocations: `*[_type == "location"] | order(city asc) {
    _id,
    city,
    region,
    country,
    coordinates,
    neighborhood
  }`
}
