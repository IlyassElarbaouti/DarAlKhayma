"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import HeroVideo from "@/components/video/HeroVideo";
import { getAllLocations } from "@/lib/sanityService";
import { SanityLocation } from "@/types/sanity";

export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [locations, setLocations] = useState<SanityLocation[]>([]);

  useEffect(() => {
    async function loadLocations() {
      try {
        const allLocations = await getAllLocations();
        setLocations(allLocations);
      } catch (error) {
        console.error('Error loading locations:', error);
      }
    }

    loadLocations();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here - redirect to properties page with search params
    const searchParams = new URLSearchParams();
    if (searchData.location) searchParams.set('location', searchData.location);
    if (searchData.checkIn) searchParams.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) searchParams.set('checkOut', searchData.checkOut);
    if (searchData.guests > 1) searchParams.set('guests', searchData.guests.toString());
    
    window.location.href = `/properties?${searchParams.toString()}`;
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-primary-900/70 to-primary-800/50 absolute inset-0 z-10" />          {/* Video Background */}
        <HeroVideo
          videoSrc="/hero-video.mp4"
          posterSrc="https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Discover Morocco&apos;s
            <span className="block text-accent-400">Finest Properties</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in luxury accommodations across Morocco&apos;s most 
            enchanting destinations. From traditional riads to modern villas.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary-600" />
                  Where
                </label>
                <select
                  value={searchData.location}
                  onChange={(e) =>
                    setSearchData({ ...searchData, location: e.target.value })
                  }
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a destination...</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location.city}>
                      {location.city}, {location.region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check In */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                  Check In
                </label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkIn: e.target.value })
                  }
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Check Out */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                  Check Out
                </label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkOut: e.target.value })
                  }
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-primary-600" />
                  Guests
                </label>
                <select
                  value={searchData.guests}
                  onChange={(e) =>
                    setSearchData({ ...searchData, guests: parseInt(e.target.value) })
                  }
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </button>
            </div>
          </form>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
