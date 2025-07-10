// Sanity-based types for the application
export interface SanityImage {
  _key?: string;
  url?: string;
  alt: string;
  caption?: string;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
}

export interface SanityProperty {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  shortDescription?: string;
  images: SanityImage[] | null;
  location: SanityLocation;
  price: {
    amount: number;
    currency: string;
    period: "night" | "week" | "month";
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    guests: number;
    area?: number;
  };  amenities: SanityAmenity[] | null;
  bookingLinks: BookingLink[] | null;
  featured: boolean;
  tags?: string[] | null;
  category: PropertyCategory;
  availability?: {
    available: boolean;
    nextAvailable?: string;
  };
  rating?: {
    average: number;
    count: number;
  };
  _createdAt: string;
  _updatedAt: string;
}

export interface SanityLocation {
  _id: string;
  city: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
  description?: string;
}

export interface SanityAmenity {
  _id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
  description?: string;
}

export interface SanityDestination {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: string;
  shortDescription?: string;
  image: SanityImage;
  videoUrl?: string;
  region: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  featured: boolean;
  highlights?: string[];
  attractions?: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  activities?: string[];
  transportation?: {
    airport?: string;
    trainStation?: string;
    carRental?: string;
  };
  weather?: {
    bestTimeToVisit?: string;
    averageTemp?: string;
    rainyMonths?: string[];
  };
  propertyCount?: number;
  minPrice?: number;
  maxPrice?: number;
}

// Keep existing types for compatibility
export type AmenityCategory = 
  | "basics" 
  | "features" 
  | "location" 
  | "safety" 
  | "entertainment";

export interface BookingLink {
  platform: "airbnb" | "booking" | "vrbo" | "direct";
  url: string;
  label: string;
}

export type PropertyCategory = 
  | "riad" 
  | "villa" 
  | "apartment" 
  | "house" 
  | "resort" 
  | "hotel";

// Transform functions to convert Sanity data to app format
export function transformSanityProperty(sanityProperty: SanityProperty): Property {
  return {
    id: sanityProperty._id,
    title: sanityProperty.title,
    slug: sanityProperty.slug.current,
    description: sanityProperty.description,
    shortDescription: sanityProperty.shortDescription,    images: sanityProperty.images?.map((img, index) => ({
      id: img._key || `img-${index}`,
      url: img.url || img.asset?.url || '',
      alt: img.alt || sanityProperty.title || '',
      caption: img.caption || '',
      order: index + 1
    })).filter(img => img.url) || [],
    location: {
      id: sanityProperty.location._id,
      city: sanityProperty.location.city,
      region: sanityProperty.location.region,
      country: sanityProperty.location.country,
      coordinates: sanityProperty.location.coordinates,
      neighborhood: sanityProperty.location.neighborhood || ''
    },
    price: sanityProperty.price,
    specifications: sanityProperty.specifications,    amenities: sanityProperty.amenities?.map(amenity => ({
      id: amenity._id,
      name: amenity.name,
      icon: amenity.icon,
      category: amenity.category
    })) || [],
    bookingLinks: sanityProperty.bookingLinks || [],
    featured: sanityProperty.featured,
    tags: sanityProperty.tags || [],
    category: sanityProperty.category,
    availability: sanityProperty.availability ? {
      available: sanityProperty.availability.available,
      nextAvailable: sanityProperty.availability.nextAvailable ? new Date(sanityProperty.availability.nextAvailable) : undefined
    } : undefined,
    rating: sanityProperty.rating,
    createdAt: new Date(sanityProperty._createdAt),
    updatedAt: new Date(sanityProperty._updatedAt)
  };
}

export function transformSanityDestination(sanityDestination: SanityDestination): Destination {
  return {
    id: sanityDestination._id,
    name: sanityDestination.name,
    slug: sanityDestination.slug.current,
    description: sanityDestination.description,
    image: sanityDestination.image.url || sanityDestination.image.asset?.url || '',
    propertyCount: sanityDestination.propertyCount || 0,
    featured: sanityDestination.featured,
    region: sanityDestination.region,
    coordinates: sanityDestination.coordinates || { lat: 0, lng: 0 }
  };
}

// Keep existing interfaces for backward compatibility
export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: PropertyImage[];
  location: Location;
  price: {
    amount: number;
    currency: string;
    period: "night" | "week" | "month";
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    guests: number;
    area?: number;
  };
  amenities: Amenity[];
  bookingLinks: BookingLink[];
  featured: boolean;
  tags?: string[];
  category: PropertyCategory;
  availability?: {
    available: boolean;
    nextAvailable?: Date;
  };
  rating?: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

export interface Location {
  id: string;
  city: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhood: string;
  featuredImage?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
}

export interface SearchFilters {
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  guests?: number;
  bedrooms?: number;
  category?: PropertyCategory[];
  amenities?: string[];
  availability?: {
    checkIn: Date;
    checkOut: Date;
  };
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  propertyCount: number;
  featured: boolean;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Review/Testimonial types
export interface SanityReview {
  _id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  property: string;
  source: string;
  reviewType: 'guest' | 'corporate' | 'property-owner';
  companyName?: string;
  jobTitle?: string;
  propertyOwned?: string;
  ownershipDuration?: string;
  featured: boolean;
  verified: boolean;
  _createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  property: string;
  source: string;
  reviewType: 'guest' | 'corporate' | 'property-owner';
  companyName?: string;
  jobTitle?: string;
  propertyOwned?: string;
  ownershipDuration?: string;
  featured?: boolean;
  verified?: boolean;
  createdAt?: string;
}

// Team Member types
export interface SanityTeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  tip?: string;
  destination?: string;
  items?: string[];
  itemsDescription?: string;
  email?: string;
  phone?: string;
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  featured: boolean;
  _createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  tip?: string;
  destination?: string;
  items?: string[];
  itemsDescription?: string;
  email?: string;
  phone?: string;
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  featured?: boolean;
  createdAt?: string;
}

// Transform functions for new types
export function transformSanityReview(sanityReview: SanityReview): Review {
  return {
    id: sanityReview._id,
    name: sanityReview.name,
    location: sanityReview.location,
    avatar: sanityReview.avatar,
    rating: sanityReview.rating,
    text: sanityReview.text,
    property: sanityReview.property,
    source: sanityReview.source,
    reviewType: sanityReview.reviewType,
    companyName: sanityReview.companyName,
    jobTitle: sanityReview.jobTitle,
    propertyOwned: sanityReview.propertyOwned,
    ownershipDuration: sanityReview.ownershipDuration,
    featured: sanityReview.featured,
    verified: sanityReview.verified,
    createdAt: sanityReview._createdAt
  };
}

export function transformSanityTeamMember(sanityTeamMember: SanityTeamMember): TeamMember {
  return {
    id: sanityTeamMember._id,
    name: sanityTeamMember.name,
    role: sanityTeamMember.role,
    image: sanityTeamMember.image,
    bio: sanityTeamMember.bio,
    tip: sanityTeamMember.tip,
    destination: sanityTeamMember.destination,
    items: sanityTeamMember.items,
    itemsDescription: sanityTeamMember.itemsDescription,
    email: sanityTeamMember.email,
    phone: sanityTeamMember.phone,
    socialMedia: sanityTeamMember.socialMedia,
    featured: sanityTeamMember.featured,
    createdAt: sanityTeamMember._createdAt
  };
}
