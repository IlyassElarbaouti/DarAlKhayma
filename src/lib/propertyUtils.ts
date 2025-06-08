// Property search and filtering utilities

import { Property } from "@/types";

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  propertyTypes?: string[];
  amenities?: string[];
  bedrooms?: number;
  bathrooms?: number;
  minRating?: number;
}

export interface SortOption {
  value: string;
  label: string;
  compare: (a: Property, b: Property) => number;
}

export const sortOptions: SortOption[] = [
  {
    value: "newest",
    label: "Newest",
    compare: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  },
  {
    value: "price-low",
    label: "Price: Low to High",
    compare: (a, b) => a.price.amount - b.price.amount
  },
  {
    value: "price-high",
    label: "Price: High to Low",
    compare: (a, b) => b.price.amount - a.price.amount
  },
  {
    value: "rating",
    label: "Highest Rated",
    compare: (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
  },
  {
    value: "guests",
    label: "Most Guests",
    compare: (a, b) => b.specifications.guests - a.specifications.guests
  }
];

// Filter properties based on search criteria
export function filterProperties(properties: Property[], filters: SearchFilters): Property[] {
  return properties.filter(property => {
    // Location filter
    if (filters.location && filters.location.trim()) {
      const locationMatch = 
        property.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.region.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.neighborhood?.toLowerCase().includes(filters.location.toLowerCase());
      if (!locationMatch) return false;
    }

    // Guests filter
    if (filters.guests && property.specifications.guests < filters.guests) {
      return false;
    }    // Price range filter
    if (filters.priceRange) {
      const { min: minPrice, max: maxPrice } = filters.priceRange;
      if (property.price.amount < minPrice || property.price.amount > maxPrice) {
        return false;
      }
    }

    // Property types filter
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      if (!filters.propertyTypes.includes(property.category)) {
        return false;
      }
    }

    // Bedrooms filter
    if (filters.bedrooms && property.specifications.bedrooms < filters.bedrooms) {
      return false;
    }

    // Bathrooms filter
    if (filters.bathrooms && property.specifications.bathrooms < filters.bathrooms) {
      return false;
    }

    // Rating filter
    if (filters.minRating && (!property.rating || property.rating.average < filters.minRating)) {
      return false;
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      const propertyAmenityIds = property.amenities.map(a => a.id);
      const hasAllAmenities = filters.amenities.every(amenityId => 
        propertyAmenityIds.includes(amenityId)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });
}

// Sort properties by given criteria
export function sortProperties(properties: Property[], sortBy: string): Property[] {
  const sortOption = sortOptions.find(option => option.value === sortBy);
  if (!sortOption) return properties;

  return [...properties].sort(sortOption.compare);
}

// Generate price ranges for filtering
export function generatePriceRanges(properties: Property[]): Array<{ label: string; value: { min: number; max: number } }> {
  const prices = properties.map(p => p.price.amount).sort((a, b) => a - b);
  const min = prices[0] || 0;
  const max = prices[prices.length - 1] || 5000;
  
  const ranges = [
    { label: "Any price", value: { min: 0, max: Infinity } },
    { label: "Under 500 MAD", value: { min: 0, max: 500 } },
    { label: "500 - 1000 MAD", value: { min: 500, max: 1000 } },
    { label: "1000 - 2000 MAD", value: { min: 1000, max: 2000 } },
    { label: "2000 - 3000 MAD", value: { min: 2000, max: 3000 } },
    { label: "3000+ MAD", value: { min: 3000, max: Infinity } }
  ];

  return ranges.filter(range => 
    range.value.min <= max && (range.value.max === Infinity || range.value.max >= min)
  );
}

// Generate popular destinations for quick filtering
export const popularDestinations = [
  { id: "marrakech", name: "Marrakech", count: 45 },
  { id: "casablanca", name: "Casablanca", count: 32 },
  { id: "fez", name: "Fez", count: 28 },
  { id: "essaouira", name: "Essaouira", count: 18 },
  { id: "chefchaouen", name: "Chefchaouen", count: 12 },
  { id: "agadir", name: "Agadir", count: 35 },
  { id: "tangier", name: "Tangier", count: 22 },
  { id: "meknes", name: "Meknes", count: 15 }
];

// Generate property type options
export const propertyTypes = [
  { id: "riad", name: "Riad", icon: "🏛️" },
  { id: "villa", name: "Villa", icon: "🏡" },
  { id: "apartment", name: "Apartment", icon: "🏢" },
  { id: "hotel", name: "Hotel", icon: "🏨" },
  { id: "guesthouse", name: "Guesthouse", icon: "🏠" },
  { id: "resort", name: "Resort", icon: "🏖️" },
  { id: "camp", name: "Desert Camp", icon: "⛺" },
  { id: "castle", name: "Castle", icon: "🏰" }
];

// Common amenities for filtering
export const commonAmenities = [
  { id: "wifi", name: "WiFi", icon: "📶" },
  { id: "pool", name: "Swimming Pool", icon: "🏊" },
  { id: "spa", name: "Spa", icon: "🧖" },
  { id: "parking", name: "Parking", icon: "🚗" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️" },
  { id: "gym", name: "Fitness Center", icon: "💪" },
  { id: "ac", name: "Air Conditioning", icon: "❄️" },
  { id: "terrace", name: "Terrace", icon: "🌿" },
  { id: "hammam", name: "Hammam", icon: "🛁" },
  { id: "concierge", name: "Concierge", icon: "🛎️" },
  { id: "kitchen", name: "Kitchen", icon: "🍳" },
  { id: "fireplace", name: "Fireplace", icon: "🔥" }
];

// Search suggestions for autocomplete
export function generateSearchSuggestions(query: string, properties: Property[]): string[] {
  if (!query || query.length < 2) return [];
  
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();
  
  properties.forEach(property => {
    // Add city suggestions
    if (property.location.city.toLowerCase().includes(queryLower)) {
      suggestions.add(property.location.city);
    }
    
    // Add region suggestions
    if (property.location.region.toLowerCase().includes(queryLower)) {
      suggestions.add(property.location.region);
    }
    
    // Add neighborhood suggestions
    if (property.location.neighborhood?.toLowerCase().includes(queryLower)) {
      suggestions.add(property.location.neighborhood);
    }
  });
  
  return Array.from(suggestions).slice(0, 8);
}
