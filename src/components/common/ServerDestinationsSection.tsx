"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SanityDestination } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface ServerDestinationsSectionProps {
  destinations: SanityDestination[];
}

export default function ServerDestinationsSection({ destinations }: ServerDestinationsSectionProps) {
  // Helper function to format price range
  const formatPriceRange = (minPrice?: number, maxPrice?: number) => {
    if (!minPrice || !maxPrice) return "From MAD 500/night";
    
    // Convert MAD to EUR for display (approximate conversion)
    const minEur = Math.round(minPrice / 11);
    const maxEur = Math.round(maxPrice / 11);
    
    return `€${minEur}-${maxEur}`;
  };

  if (destinations.length === 0) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
              Explore Morocco&apos;s
              <span className="block text-primary-600">Premier Destinations</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
              No featured destinations available at the moment.
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            Explore Morocco&apos;s
            <span className="block text-primary-600">Premier Destinations</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            From the bustling souks of Marrakech to the coastal charm of Essaouira, 
            discover unique accommodations in Morocco&apos;s most captivating cities.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={`/destinations/${destination.slug.current}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    {destination.image && (
                      <Image
                        src={urlFor(destination.image).width(800).height(400).url()}
                        alt={destination.image.alt || destination.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Property Count Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-medium text-neutral-800">
                        {destination.propertyCount || 0} properties
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-neutral-800 mb-1">
                          {destination.name}
                        </h3>
                        <div className="flex items-center text-neutral-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{destination.region}</span>
                        </div>
                        <p className="text-primary-600 font-semibold">
                          From {formatPriceRange(destination.minPrice, destination.maxPrice)}/night
                        </p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {destination.highlights?.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Explore Button */}
                    <button className="mt-4 w-full bg-neutral-100 hover:bg-primary-600 text-neutral-800 hover:text-white py-3 rounded-lg font-medium transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
                      Explore {destination.name}
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/destinations"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            View All Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
