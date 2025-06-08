"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, Bed, Bath, Star, Heart, Camera } from "lucide-react";
import { Property } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { useState } from "react";
import ImageGallery from "@/components/common/ImageGallery";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // Debug logging for images
  console.log(`PropertyCard for ${property.title}:`, {
    imagesCount: property.images.length,
    currentImageIndex: currentImage,
    currentImageUrl: property.images[currentImage]?.url,
    allImages: property.images.map(img => ({ id: img.id, url: img.url }))
  });

  const handleImageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImage((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImage((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const openGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowGallery(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Gallery */}
      <div className="relative h-64 md:h-72 overflow-hidden">        <Link href={`/properties/${property.slug}`}>
          {property.images.length > 0 && property.images[currentImage]?.url ? (
            <Image
              src={property.images[currentImage].url}
              alt={property.images[currentImage]?.alt || property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error('Image failed to load:', property.images[currentImage]?.url);
                // Hide the image on error
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
              <div className="text-neutral-500 text-center">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No Image Available</p>
              </div>
            </div>
          )}
        </Link>

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={() => handleImageChange("prev")}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleImageChange("next")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  currentImage === idx ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              isLiked ? "fill-red-500 text-red-500" : "text-neutral-600"
            )}
          />
        </button>

        {/* Gallery Button */}
        {property.images.length > 1 && (
          <button
            onClick={openGallery}
            className="absolute top-4 right-16 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200"
          >
            <Camera className="w-4 h-4 text-neutral-600" />
          </button>
        )}

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm capitalize">
          {property.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-neutral-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location.city}, {property.location.region}</span>
          </div>
          {property.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium ml-1">
                {property.rating.average.toFixed(1)}
              </span>
              <span className="text-sm text-neutral-500 ml-1">
                ({property.rating.count})
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <Link href={`/properties/${property.slug}`}>
          <h3 className="font-semibold text-lg text-neutral-800 hover:text-primary-600 transition-colors duration-200 mb-2 line-clamp-2">
            {property.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {property.shortDescription || property.description}
        </p>

        {/* Specifications */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{property.specifications.guests} guests</span>
          </div>
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.specifications.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.specifications.bathrooms} baths</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-800">
              {formatPrice(property.price.amount, property.price.currency)}
            </span>
            <span className="text-neutral-600 ml-1">/ {property.price.period}</span>
          </div>
          <Link
            href={`/properties/${property.slug}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            View Details          </Link>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={property.images.map(img => img.url)}
        title={property.title}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        initialIndex={currentImage}
      />
    </motion.div>
  );
}
