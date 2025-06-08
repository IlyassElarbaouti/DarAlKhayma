"use client";

import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types";
import Link from "next/link";
import { getFeaturedProperties } from "@/lib/sanityService";
import { useEffect, useState } from "react";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function loadFeaturedProperties() {
      try {        console.log('Starting to load featured properties...');
        const featuredProperties = await getFeaturedProperties();
        console.log('Featured properties loaded:', featuredProperties);
        console.log('Number of featured properties:', featuredProperties.length);
        
        // Log image data specifically
        if (featuredProperties.length > 0) {
          console.log('First property images:', featuredProperties[0].images);
          featuredProperties.forEach((prop, i) => {
            console.log(`Property ${i + 1} (${prop.title}):`, {
              id: prop.id,
              imagesCount: prop.images.length,
              images: prop.images.map(img => ({ id: img.id, url: img.url, alt: img.alt }))
            });
          });
        }
        
        setProperties(featuredProperties);
      } catch (error) {
        console.error('Error loading featured properties:', error);
        setError('Failed to load featured properties');
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-neutral-300 rounded w-1/2 mx-auto mb-12"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <div className="h-48 bg-neutral-300 rounded mb-4"></div>
                    <div className="h-4 bg-neutral-300 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || properties.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              {error || "No featured properties available at the moment."}
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4">
            Featured Properties
          </h2>          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional properties across Morocco&apos;s 
            most sought-after destinations.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/properties"
            className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Properties
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
