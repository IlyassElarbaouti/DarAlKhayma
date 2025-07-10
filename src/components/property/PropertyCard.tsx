"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, Bed, Bath, Star, Heart, Camera } from "lucide-react";
import { Property } from "@/types";
import { cn, formatPrice, formatRating } from "@/lib/utils";
import { useState, useCallback } from "react";
import ImageGallery from "@/components/common/ImageGallery";
import PropertyCarousel from "@/components/common/PropertyCarousel";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // Safe rating handling
  const ratingInfo = formatRating(property.rating);

  // Debug logging for images
  console.log(`PropertyCard for ${property.title}:`, {
    imagesCount: property.images.length,
    currentImageIndex: currentImage,
    currentImageUrl: property.images[currentImage]?.url,
    allImages: property.images.map(img => ({ id: img.id, url: img.url }))
  });

  const openGallery = useCallback((index: number) => {
    setCurrentImage(index);
    setShowGallery(true);
  }, []);

  // Function to get tag display information
  const getTagInfo = (tag: string) => {
    switch (tag) {
      case 'featured':
        return {
          label: 'Featured',
          className: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
        };
      case 'superior-collection':
        return {
          label: 'Superior Collection',
          className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
        };
      case 'new-addition':
        return {
          label: 'New Addition',
          className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
        };
      default:
        return {
          label: tag,
          className: 'bg-gray-500 text-white'
        };
    }
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
      <div className="relative">
        <PropertyCarousel
          images={property.images.map(img => ({
            id: img.id,
            url: img.url,
            alt: img.alt || property.title
          }))}
          propertyTitle={property.title}
          onImageClick={openGallery}
          priority={index === 0}
          className="cursor-pointer"
        />

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200 z-20"
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
            onClick={(e) => {
              e.stopPropagation();
              openGallery(currentImage);
            }}
            className="absolute top-4 right-16 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200 z-20"
          >
            <Camera className="w-4 h-4 text-neutral-600" />
          </button>
        )}

        {/* Property Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {/* Legacy featured badge */}
          {property.featured && (!property.tags || !property.tags.includes('featured')) && (
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          )}
          
          {/* New tags system */}
          {property.tags && property.tags.length > 0 && (
            <>
              {property.tags.map((tag) => {
                const tagInfo = getTagInfo(tag);
                return (
                  <div
                    key={tag}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      tagInfo.className
                    )}
                  >
                    {tagInfo.label}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm capitalize z-20">
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
          </div>          {ratingInfo.hasRating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium ml-1">
                {ratingInfo.average}
              </span>
              <span className="text-sm text-neutral-500 ml-1">
                ({ratingInfo.count})
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-neutral-800 mb-2 line-clamp-2">
          {property.title}
        </h3>

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
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            View Details
          </Link>
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
