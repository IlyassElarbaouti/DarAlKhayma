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
  address?: string;
  neighborhood?: string;
  description?: string;
  featuredImage?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
}

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
