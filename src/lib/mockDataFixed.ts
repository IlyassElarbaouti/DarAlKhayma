// Enhanced mock data for properties

import { Property } from "@/types";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Riad in Marrakech Medina",
    slug: "luxury-riad-marrakech-medina",
    description: "Experience authentic Moroccan hospitality in this beautifully restored riad featuring traditional architecture, intricate zellige tiles, and a serene courtyard garden.",
    shortDescription: "Authentic riad with traditional architecture in the heart of Medina",
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Riad courtyard with fountain",
        order: 1
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Traditional Moroccan bedroom",
        order: 2
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Rooftop terrace view",
        order: 3
      }
    ],
    location: {
      id: "1",
      city: "Marrakech",
      region: "Marrakech-Safi",
      country: "Morocco",
      coordinates: { lat: 31.6295, lng: -7.9811 },
      neighborhood: "Medina"
    },
    price: {
      amount: 1200,
      currency: "MAD",
      period: "night" as const
    },
    specifications: {
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      area: 200
    },
    amenities: [
      { id: "wifi", name: "WiFi", icon: "📶", category: "basics" },
      { id: "pool", name: "Swimming Pool", icon: "🏊", category: "features" },
      { id: "spa", name: "Spa", icon: "🧖", category: "features" },
      { id: "terrace", name: "Terrace", icon: "🌿", category: "features" },
      { id: "hammam", name: "Hammam", icon: "🛁", category: "features" },
      { id: "concierge", name: "Concierge", icon: "🛎️", category: "basics" }
    ],
    bookingLinks: [
      { platform: "airbnb", url: "https://airbnb.com/rooms/123", label: "Book on Airbnb" },
      { platform: "booking", url: "https://booking.com/hotel/ma/luxury-riad.html", label: "Book on Booking.com" }
    ],
    featured: true,
    category: "riad",
    rating: {
      average: 4.8,
      count: 127
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-20")
  },
  {
    id: "2", 
    title: "Modern Villa with Atlas Mountains View",
    slug: "modern-villa-atlas-mountains",
    description: "Stunning contemporary villa overlooking the Atlas Mountains with infinity pool, modern amenities, and traditional Moroccan design elements.",
    shortDescription: "Contemporary villa with mountain views and infinity pool",
    images: [
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Modern villa exterior",
        order: 1
      },
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Villa living room",
        order: 2
      }
    ],
    location: {
      id: "2",
      city: "Marrakech",
      region: "Marrakech-Safi", 
      country: "Morocco",
      coordinates: { lat: 31.6204, lng: -7.9951 },
      neighborhood: "Palmeraie"
    },
    price: {
      amount: 2500,
      currency: "MAD",
      period: "night" as const
    },
    specifications: {
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      area: 350
    },
    amenities: [
      { id: "wifi", name: "WiFi", icon: "📶", category: "basics" },
      { id: "pool", name: "Swimming Pool", icon: "🏊", category: "features" },
      { id: "parking", name: "Parking", icon: "🚗", category: "basics" },
      { id: "gym", name: "Fitness Center", icon: "💪", category: "features" },
      { id: "ac", name: "Air Conditioning", icon: "❄️", category: "basics" },
      { id: "kitchen", name: "Kitchen", icon: "🍳", category: "basics" }
    ],
    bookingLinks: [
      { platform: "airbnb", url: "https://airbnb.com/rooms/456", label: "Book on Airbnb" },
      { platform: "booking", url: "https://booking.com/hotel/ma/modern-villa.html", label: "Book on Booking.com" }
    ],
    featured: false,
    category: "villa",
    rating: {
      average: 4.9,
      count: 89
    },
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-03-15")
  },
  {
    id: "3",
    title: "Boutique Hotel Suite in Casablanca",
    slug: "boutique-hotel-suite-casablanca",
    description: "Elegant suite in a boutique hotel featuring Art Deco design, panoramic city views, and premium amenities in the heart of Casablanca.",
    shortDescription: "Art Deco suite with city views in downtown Casablanca",
    images: [
      {
        id: "6",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Hotel suite interior",
        order: 1
      }
    ],
    location: {
      id: "3",
      city: "Casablanca",
      region: "Casablanca-Settat",
      country: "Morocco", 
      coordinates: { lat: 33.5731, lng: -7.5898 },
      neighborhood: "Centre Ville"
    },
    price: {
      amount: 800,
      currency: "MAD",
      period: "night" as const
    },
    specifications: {
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      area: 45
    },
    amenities: [
      { id: "wifi", name: "WiFi", icon: "📶", category: "basics" },
      { id: "restaurant", name: "Restaurant", icon: "🍽️", category: "features" },
      { id: "concierge", name: "Concierge", icon: "🛎️", category: "basics" },
      { id: "ac", name: "Air Conditioning", icon: "❄️", category: "basics" }
    ],
    bookingLinks: [
      { platform: "booking", url: "https://booking.com/hotel/ma/boutique-casa.html", label: "Book on Booking.com" }
    ],
    featured: false,
    category: "hotel",
    rating: {
      average: 4.6,
      count: 203
    },
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-03-10")
  },
  {
    id: "4",
    title: "Traditional Riad in Fez Medina",
    slug: "traditional-riad-fez-medina",
    description: "Authentic 18th-century riad lovingly restored with original architectural details, traditional furnishings, and modern comforts in the UNESCO World Heritage Fez Medina.",
    shortDescription: "18th-century riad with authentic architecture in Fez Medina",
    images: [
      {
        id: "7",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Traditional riad courtyard",
        order: 1
      }
    ],
    location: {
      id: "4",
      city: "Fez",
      region: "Fès-Meknès",
      country: "Morocco",
      coordinates: { lat: 34.0181, lng: -5.0078 },
      neighborhood: "Fes el-Bali"
    },
    price: {
      amount: 950,
      currency: "MAD", 
      period: "night" as const
    },
    specifications: {
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      area: 180
    },
    amenities: [
      { id: "wifi", name: "WiFi", icon: "📶", category: "basics" },
      { id: "hammam", name: "Hammam", icon: "🛁", category: "features" },
      { id: "terrace", name: "Terrace", icon: "🌿", category: "features" },
      { id: "fireplace", name: "Fireplace", icon: "🔥", category: "features" }
    ],
    bookingLinks: [
      { platform: "airbnb", url: "https://airbnb.com/rooms/789", label: "Book on Airbnb" }
    ],
    featured: true,
    category: "riad",
    rating: {
      average: 4.7,
      count: 156
    },
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-03-18")
  },
  {
    id: "5",
    title: "Oceanfront Apartment in Essaouira",
    slug: "oceanfront-apartment-essaouira",
    description: "Charming apartment with stunning ocean views, traditional Portuguese-influenced architecture, and walking distance to the historic medina and beach.",
    shortDescription: "Ocean view apartment near medina and beaches",
    images: [
      {
        id: "8",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Apartment with ocean view",
        order: 1
      }
    ],
    location: {
      id: "5",
      city: "Essaouira", 
      region: "Marrakech-Safi",
      country: "Morocco",
      coordinates: { lat: 31.5084, lng: -9.7595 },
      neighborhood: "Medina"
    },
    price: {
      amount: 650,
      currency: "MAD",
      period: "night" as const
    },
    specifications: {
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      area: 85
    },
    amenities: [
      { id: "wifi", name: "WiFi", icon: "📶", category: "basics" },
      { id: "kitchen", name: "Kitchen", icon: "🍳", category: "basics" },
      { id: "terrace", name: "Terrace", icon: "🌿", category: "features" }
    ],
    bookingLinks: [
      { platform: "airbnb", url: "https://airbnb.com/rooms/101", label: "Book on Airbnb" },
      { platform: "booking", url: "https://booking.com/hotel/ma/essaouira-apt.html", label: "Book on Booking.com" }
    ],
    featured: false,
    category: "apartment",
    rating: {
      average: 4.5,
      count: 92
    },
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-12")
  },
  {
    id: "6",
    title: "Blue Pearl Villa in Chefchaouen",
    slug: "blue-pearl-villa-chefchaouen", 
    description: "Charming villa in the famous blue city with mountain views, traditional Berber hospitality, and easy access to hiking trails in the Rif Mountains.",
    shortDescription: "Traditional villa in the blue city with mountain views",
    images: [
      {
        id: "9",
        url: "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Blue painted building exterior",
        order: 1
      }
    ],
    location: {
      id: "6",
      city: "Chefchaouen",
      region: "Tanger-Tetouan-Al Hoceima",
      country: "Morocco",
      coordinates: { lat: 35.1689, lng: -5.2636 },
      neighborhood: "Medina"
    },
    price: {
      amount: 400,
      currency: "MAD",
      period: "night" as const
    },
    specifications: {
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      area: 65
    },
    amenities: [
      { id: "wifi", name: "WiFi", icon: "📶", category: "basics" },
      { id: "terrace", name: "Terrace", icon: "🌿", category: "features" },
      { id: "fireplace", name: "Fireplace", icon: "🔥", category: "features" }
    ],
    bookingLinks: [
      { platform: "airbnb", url: "https://airbnb.com/rooms/112", label: "Book on Airbnb" }
    ],
    featured: false,
    category: "villa",
    rating: {
      average: 4.8,
      count: 74
    },
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-08")
  }
];
