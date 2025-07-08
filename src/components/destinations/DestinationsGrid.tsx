"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SanityDestination } from "@/types/sanity";

interface DestinationsGridProps {
  destinations: SanityDestination[];
}

export default function DestinationsGrid({ destinations }: DestinationsGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination, index) => (
          <motion.div
            key={destination._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1
            }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
          >
          {/* Image */}
          <div className="relative h-64 md:h-72 overflow-hidden">
            <Image
              src={
                destination.image?.url || 
                `https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`
              }
              alt={destination.image?.alt || destination.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            {/* City Name Overlay */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{destination.name}</h3>
              <div className="flex items-center text-white/90">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{destination.region}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 relative flex-1 flex flex-col">
            {/* Description */}
            <p className="text-neutral-600 mb-4 line-clamp-3 leading-relaxed text-base flex-grow">
              {destination.description || `Discover the beauty and culture of ${destination.name}, with its unique attractions and authentic Moroccan hospitality.`}
            </p>

            {/* Highlights */}
            {destination.highlights && destination.highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {destination.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 3 && (
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                      +{destination.highlights.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CTA - This will stick to bottom */}
            <div className="mt-auto">
              <Link
                href={`/destinations/${destination.slug.current}`}
                className="inline-flex items-center justify-between w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
              >
                <span className="font-medium">Explore {destination.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
}
