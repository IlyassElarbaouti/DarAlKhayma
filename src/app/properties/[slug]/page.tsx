"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Waves, 
  ChefHat,
  Star,
  Heart,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

// Mock property data - in a real app, this would be fetched based on the slug
const mockProperty = {
  id: "1",
  title: "Luxury Riad in Marrakech Medina",
  slug: "luxury-riad-marrakech-medina",
  description: `Experience authentic Moroccan hospitality in this beautifully restored riad in the heart of Marrakech's historic medina. This stunning property combines traditional Moroccan architecture with modern luxury amenities.

  The riad features intricate tilework, carved cedar ceilings, and a beautiful central courtyard with a fountain. Each room is uniquely decorated with handcrafted furniture and authentic Moroccan textiles.

  Located just minutes from the famous Jemaa el-Fnaa square, you'll be in the center of all the action while enjoying peaceful tranquility behind the riad's traditional walls.`,
  images: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Riad courtyard with traditional tiles",
      category: "exterior"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
      alt: "Traditional Moroccan bedroom",
      category: "interior"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Rooftop terrace view",
      category: "views"
    }
  ],
  location: {
    city: "Marrakech",
    region: "Marrakech-Safi", 
    country: "Morocco",
    neighborhood: "Medina",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    address: "Derb El Ferrane, Medina, Marrakech"
  },
  price: {
    amount: 1200,
    currency: "MAD",
    period: "night"
  },
  specifications: {
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    area: 200
  },
  amenities: [
    { id: "wifi", name: "WiFi", icon: Wifi },
    { id: "parking", name: "Parking", icon: Car },
    { id: "pool", name: "Swimming Pool", icon: Waves },
    { id: "kitchen", name: "Full Kitchen", icon: ChefHat }
  ],
  rating: {
    average: 4.8,
    count: 127
  },
  host: {
    name: "Ahmed",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    responseRate: 98,
    memberSince: "2019"
  },
  bookingLinks: [
    { platform: "Airbnb", url: "#", logo: "/airbnb-logo.png" },
    { platform: "Booking.com", url: "#", logo: "/booking-logo.png" }
  ]
};

export default function PropertyPage() {
    const _params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [_isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockProperty.images.length - 1 : prev - 1
    );
  };
  return (
    <PageWithHeaderPadding>
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-gray-900">
          <img
            src={mockProperty.images[currentImageIndex].url}
            alt={mockProperty.images[currentImageIndex].alt}
            className="w-full h-full object-cover"
          />
          
          {/* Gallery Controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {mockProperty.images.length}
          </div>

          {/* Gallery Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
          >
            View all photos
          </button>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
              <Share2 className="w-5 h-5 text-neutral-700" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-neutral-700'}`} />
            </button>
          </div>
        </div>

        {/* Property Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(mockProperty.rating.average)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      {mockProperty.rating.average} ({mockProperty.rating.count} reviews)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neutral-900">
                      {mockProperty.price.amount} {mockProperty.price.currency}
                    </div>
                    <div className="text-sm text-neutral-600">per night</div>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                  {mockProperty.title}
                </h1>

                <div className="flex items-center text-neutral-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{mockProperty.location.address}</span>
                </div>

                {/* Property Specs */}
                <div className="flex flex-wrap gap-6 text-neutral-700">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary-600" />
                    <span>{mockProperty.specifications.guests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-primary-600" />
                    <span>{mockProperty.specifications.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-primary-600" />
                    <span>{mockProperty.specifications.bathrooms} bathrooms</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
                  About this property
                </h2>
                <div className="prose prose-neutral max-w-none">
                  {mockProperty.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-neutral-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockProperty.amenities.map((amenity) => {
                    const IconComponent = amenity.icon;
                    return (
                      <div key={amenity.id} className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-primary-600" />
                        <span className="text-neutral-700">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Host Information */}
              <div className="border border-neutral-200 rounded-lg p-6">
                <h2 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                  Meet your host
                </h2>
                <div className="flex items-center space-x-4">
                  <img
                    src={mockProperty.host.avatar}
                    alt={mockProperty.host.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-neutral-900">{mockProperty.host.name}</h3>
                    <p className="text-sm text-neutral-600">
                      {mockProperty.host.responseRate}% response rate
                    </p>
                    <p className="text-sm text-neutral-600">
                      Host since {mockProperty.host.memberSince}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="border border-neutral-200 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
                    Book this property
                  </h3>

                  <div className="space-y-4">
                    {mockProperty.bookingLinks.map((link) => (
                      <motion.a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">{link.platform.slice(0, 2)}</span>
                          </div>
                          <span className="font-medium text-neutral-900">
                            Book on {link.platform}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral-400" />
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <p className="text-sm text-neutral-600 text-center">
                      Booking through our trusted partners ensures secure payment and verified listings.
                    </p>
                  </div>
                </div>
              </div>
            </div>          </div>
        </div>
    </PageWithHeaderPadding>
  );
}
