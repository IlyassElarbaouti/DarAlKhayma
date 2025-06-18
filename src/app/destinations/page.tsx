"use client";

import { useState } from "react";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { MapPin, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Mock destinations data
const destinations = [
  {
    id: "marrakech",
    name: "Marrakech",
    region: "Marrakech-Safi",
    description: "The Red City offers a perfect blend of ancient traditions and modern luxury. Explore bustling souks, magnificent palaces, and serene riads.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    propertyCount: 45,
    priceRange: "800 - 3000 MAD",
    highlights: ["Medina", "Atlas Mountains", "Majorelle Garden", "Jemaa el-Fnaa"],
    rating: 4.8
  },
  {
    id: "casablanca",
    name: "Casablanca",
    region: "Casablanca-Settat",
    description: "Morocco's economic capital combines Art Deco architecture with modern skyscrapers. Perfect for business travelers and urban explorers.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    propertyCount: 32,
    priceRange: "600 - 2500 MAD",
    highlights: ["Hassan II Mosque", "Corniche", "Art Deco District", "Marina"],
    rating: 4.6
  },
  {
    id: "fez",
    name: "Fez",
    region: "Fès-Meknès",
    description: "The spiritual and cultural heart of Morocco. Home to the world's oldest university and most authentic medieval medina.",
    image: "https://images.unsplash.com/photo-1570191920228-6b6bb4c1da24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    propertyCount: 28,
    priceRange: "700 - 2200 MAD",
    highlights: ["Fes el-Bali", "Al Quaraouiyine", "Tanneries", "Bou Inania Madrasa"],
    rating: 4.7
  },
  {
    id: "essaouira",
    name: "Essaouira",
    region: "Marrakech-Safi",
    description: "The windy city by the sea. A UNESCO World Heritage site known for its Portuguese-influenced architecture and artistic community.",
    image: "https://images.unsplash.com/photo-1548993003-99e5ed1e4ea7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    propertyCount: 18,
    priceRange: "500 - 1800 MAD",
    highlights: ["Medina Ramparts", "Skala Port", "Argan Cooperatives", "Windsurfing"],
    rating: 4.9
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    region: "Tanger-Tetouan-Al Hoceima",
    description: "The Blue Pearl of Morocco nestled in the Rif Mountains. Famous for its blue-painted buildings and stunning mountain views.",
    image: "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    propertyCount: 12,
    priceRange: "400 - 1200 MAD",
    highlights: ["Blue Medina", "Ras El Ma", "Spanish Mosque", "Hiking Trails"],
    rating: 4.8
  },
  {
    id: "agadir",
    name: "Agadir",
    region: "Souss-Massa",
    description: "Morocco's premier beach destination with modern resorts, golden beaches, and year-round sunshine.",
    image: "https://images.unsplash.com/photo-1570003179394-d68d3c2a82b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    propertyCount: 35,
    priceRange: "600 - 2800 MAD",
    highlights: ["Beach Promenade", "Souk El Had", "Paradise Valley", "Anti-Atlas Mountains"],
    rating: 4.5
  }
];

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = Array.from(new Set(destinations.map(d => d.region)));

  const filteredDestinations = selectedRegion === "all" 
    ? destinations 
    : destinations.filter(d => d.region === selectedRegion);

  return (
    <PageWithHeaderPadding>
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary-900 to-primary-700">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
              >
                Explore Morocco
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Discover the diverse beauty of Morocco, from imperial cities to coastal towns, 
                desert landscapes to mountain retreats.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setSelectedRegion("all")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedRegion === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All Regions
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedRegion === region
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/destinations/${destination.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                    {/* Image */}                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{destination.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-display font-semibold text-neutral-900">
                          {destination.name}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" />
                      </div>

                      <p className="text-neutral-600 mb-4 line-clamp-3">
                        {destination.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{destination.propertyCount} properties</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{destination.region}</span>
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="text-primary-600 font-semibold mb-4">
                        {destination.priceRange} / night
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.slice(0, 3).map((highlight) => (
                          <span
                            key={highlight}
                            className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                        {destination.highlights.length > 3 && (
                          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                            +{destination.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                Ready to Explore Morocco?
              </h2>
              <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
                Browse our curated collection of properties across all these amazing destinations. 
                Each property is hand-picked for quality and authentic Moroccan experience.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>            </div>
          </div>
        </div>
    </PageWithHeaderPadding>
  );
}
