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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24">      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-primary-900/70 to-primary-800/50 absolute inset-0 z-10" />          {/* Video Background */}
        <HeroVideo
          videoSrc="/hero-video.mp4"
          posterSrc="https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-6 sm:py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >          <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
            <span className="block text-white">Dar Al Khayma</span>
            <span className="block text-accent-400 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 sm:mt-4 md:mt-6 leading-snug">YOUR STAY DESERVES TO BE UNFORGETTABLE</span>
          </h1>

        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto px-2 sm:px-4"
        >
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6">              {/* Location */}
              <div className="sm:col-span-2 md:col-span-1 space-y-1 xs:space-y-2">
                <label className="text-xs xs:text-sm font-medium text-neutral-700 flex items-center">
                  <MapPin className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 text-primary-600" />
                  Where
                </label>
                <select
                  value={searchData.location}
                  onChange={(e) =>
                    setSearchData({ ...searchData, location: e.target.value })
                  }
                  className="w-full p-2 xs:p-2.5 sm:p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-xs xs:text-sm sm:text-base"
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
              <div className="sm:col-span-1 md:col-span-1 space-y-1 xs:space-y-2">
                <label className="text-xs xs:text-sm font-medium text-neutral-700 flex items-center">
                  <Calendar className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 text-primary-600" />
                  Check In
                </label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkIn: e.target.value })
                  }
                  className="w-full p-2 xs:p-2.5 sm:p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-xs xs:text-sm sm:text-base"
                />
              </div>

              {/* Check Out */}
              <div className="sm:col-span-1 md:col-span-1 space-y-1 xs:space-y-2">
                <label className="text-xs xs:text-sm font-medium text-neutral-700 flex items-center">
                  <Calendar className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 text-primary-600" />
                  Check Out
                </label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkOut: e.target.value })
                  }
                  className="w-full p-2 xs:p-2.5 sm:p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-xs xs:text-sm sm:text-base"
                />
              </div>

              {/* Guests */}
              <div className="sm:col-span-2 md:col-span-1 space-y-1 xs:space-y-2">
                <label className="text-xs xs:text-sm font-medium text-neutral-700 flex items-center">
                  <Users className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 text-primary-600" />
                  Guests
                </label>
                <select
                  value={searchData.guests}
                  onChange={(e) =>
                    setSearchData({ ...searchData, guests: parseInt(e.target.value) })
                  }
                  className="w-full p-2 xs:p-2.5 sm:p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-xs xs:text-sm sm:text-base"
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
            <div className="mt-3 xs:mt-4 sm:mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center shadow-lg text-xs xs:text-sm sm:text-base"
              >
                <Search className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1 xs:mr-2" />
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
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
