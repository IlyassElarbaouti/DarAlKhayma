"use client";

import { useState } from "react";
import Image from "next/image";
import { Property } from "@/types";
import { 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Star,
  Heart,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Wifi
} from "lucide-react";
import { motion } from "framer-motion";

interface PropertyPageClientProps {
  property: Property;
}

export default function PropertyPageClient({ property }: PropertyPageClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-gray-900">
        {property.images.length > 0 && (
          <Image
            src={property.images[currentImageIndex].url}
            alt={property.images[currentImageIndex].alt}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Gallery Controls */}
        {property.images.length > 1 && (
          <>
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
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </>
        )}

        {/* Gallery Button */}
        {property.images.length > 1 && (
          <button className="absolute bottom-4 right-4 bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-100 transition-colors">
            View all {property.images.length} photos
          </button>
        )}

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
                  {property.rating && (
                    <>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(property.rating?.average || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-neutral-700">
                        {property.rating.average} ({property.rating.count} reviews)
                      </span>
                    </>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900">
                    {property.price.amount} {property.price.currency}
                  </div>
                  <div className="text-sm text-neutral-600">per {property.price.period}</div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                {property.title}
              </h1>

              <div className="flex items-center text-neutral-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>
                  {property.location.neighborhood && `${property.location.neighborhood}, `}
                  {property.location.city}, {property.location.region}
                </span>
              </div>

              {/* Property Specs */}
              <div className="flex flex-wrap gap-6 text-neutral-700">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-600" />
                  <span>{property.specifications.guests} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2 text-primary-600" />
                  <span>{property.specifications.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2 text-primary-600" />
                  <span>{property.specifications.bathrooms} bathrooms</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
                About this property
              </h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-3">
                      <Wifi className="w-5 h-5 text-primary-600" />
                      <span className="text-neutral-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="border border-neutral-200 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
                  Book this property
                </h3>

                {property.bookingLinks && property.bookingLinks.length > 0 ? (
                  <div className="space-y-4">
                    {property.bookingLinks.map((link) => (
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
                ) : (
                  <div className="text-center text-neutral-600 py-4">
                    <p>Contact us for booking information</p>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 text-center">
                    Booking through our trusted partners ensures secure payment and verified listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
