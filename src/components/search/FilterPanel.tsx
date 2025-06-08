"use client";

import { useState } from "react";
import { SlidersHorizontal, X, MapPin, Calendar, Users, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterPanelProps {
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

export default function FilterPanel({ onFiltersChange, className = "" }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    propertyType: "",
    priceRange: [0, 5000],
    amenities: [] as string[],
    bedrooms: "",
    bathrooms: "",
  });

  const propertyTypes = [
    { id: "riad", label: "Riad", icon: "🏛️" },
    { id: "villa", label: "Villa", icon: "🏖️" },
    { id: "apartment", label: "Apartment", icon: "🏢" },
    { id: "house", label: "House", icon: "🏠" },
    { id: "chalet", label: "Chalet", icon: "🏔️" },
  ];

  const amenities = [
    { id: "pool", label: "Swimming Pool", icon: "🏊" },
    { id: "wifi", label: "WiFi", icon: "📶" },
    { id: "kitchen", label: "Kitchen", icon: "👨‍🍳" },
    { id: "parking", label: "Parking", icon: "🚗" },
    { id: "ac", label: "Air Conditioning", icon: "❄️" },
    { id: "terrace", label: "Terrace", icon: "🌅" },
    { id: "garden", label: "Garden", icon: "🌳" },
    { id: "beachfront", label: "Beachfront", icon: "🏖️" },
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    handleFilterChange("amenities", newAmenities);
  };

  const clearFilters = () => {
    const defaultFilters = {
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      propertyType: "",
      priceRange: [0, 5000],
      amenities: [],
      bedrooms: "",
      bathrooms: "",
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  return (
    <div className={className}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5 text-neutral-600" />
        <span className="text-neutral-700 font-medium">Filters</span>
        {(filters.propertyType || filters.amenities.length > 0) && (
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
        )}
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-xl font-display font-semibold text-neutral-900">
                  Filter Properties
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-6 space-y-8">
                {/* Location */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="City or region..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Check In
                    </label>
                    <input
                      type="date"
                      value={filters.checkIn}
                      onChange={(e) => handleFilterChange("checkIn", e.target.value)}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-700">
                      Check Out
                    </label>
                    <input
                      type="date"
                      value={filters.checkOut}
                      onChange={(e) => handleFilterChange("checkOut", e.target.value)}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-700 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Guests
                  </label>
                  <select
                    value={filters.guests}
                    onChange={(e) => handleFilterChange("guests", parseInt(e.target.value))}
                    className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-700 flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleFilterChange("propertyType", 
                          filters.propertyType === type.id ? "" : type.id
                        )}
                        className={`
                          p-3 border rounded-lg text-left transition-colors
                          ${filters.propertyType === type.id
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-neutral-200 hover:bg-neutral-50"
                          }
                        `}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{type.icon}</span>
                          <span className="text-sm font-medium">{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-700">
                    Price Range (MAD per night)
                  </label>
                  <div className="px-3">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-600 mt-1">
                      <span>0 MAD</span>
                      <span>{filters.priceRange[1]} MAD</span>
                    </div>
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-700">
                      Bedrooms
                    </label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num}+
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-700">
                      Bathrooms
                    </label>
                    <select
                      value={filters.bathrooms}
                      onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}+
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-700">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {amenities.map((amenity) => (
                      <button
                        key={amenity.id}
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className={`
                          p-3 border rounded-lg text-left transition-colors
                          ${filters.amenities.includes(amenity.id)
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-neutral-200 hover:bg-neutral-50"
                          }
                        `}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{amenity.icon}</span>
                          <span className="text-xs font-medium">{amenity.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-neutral-200 p-6 bg-neutral-50">
                <div className="flex space-x-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-3 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-white transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
