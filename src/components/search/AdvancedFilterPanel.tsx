"use client";

import { useState } from "react";
import { SlidersHorizontal, X, MapPin, Users, Bed, Bath } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface FilterOptions {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyType: string[];
  priceRange: [number, number];
  amenities: string[];
  bedrooms: string;
  bathrooms: string;
  rating: number;
}

interface FilterPanelProps {
  onFiltersChange?: (filters: FilterOptions) => void;
  className?: string;
  initialFilters?: Partial<FilterOptions>;
}

export default function FilterPanel({ 
  onFiltersChange, 
  className = "", 
  initialFilters = {} 
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    propertyType: [],
    priceRange: [0, 5000],
    amenities: [],
    bedrooms: "",
    bathrooms: "",
    rating: 0,
    ...initialFilters
  });

  const propertyTypes = [
    { id: "riad", label: "Riad", icon: "🏛️" },
    { id: "villa", label: "Villa", icon: "🏖️" },
    { id: "apartment", label: "Apartment", icon: "🏢" },
    { id: "house", label: "House", icon: "🏠" },
    { id: "chalet", label: "Chalet", icon: "🏔️" },
    { id: "guesthouse", label: "Guesthouse", icon: "🏘️" },
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
    { id: "spa", label: "Spa", icon: "🧘" },
    { id: "gym", label: "Gym", icon: "💪" },
    { id: "petfriendly", label: "Pet Friendly", icon: "🐕" },
    { id: "hammam", label: "Hammam", icon: "🛁" },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handlePropertyTypeToggle = (typeId: string) => {
    const newTypes = filters.propertyType.includes(typeId)
      ? filters.propertyType.filter(id => id !== typeId)
      : [...filters.propertyType, typeId];
    
    handleFilterChange("propertyType", newTypes);
  };

  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    handleFilterChange("amenities", newAmenities);
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      propertyType: [],
      priceRange: [0, 5000],
      amenities: [],
      bedrooms: "",
      bathrooms: "",
      rating: 0,
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.propertyType.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.rating > 0) count++;
    if (filters.location) count++;
    if (filters.checkIn) count++;
    if (filters.checkOut) count++;
    if (filters.guests > 1) count++;
    return count;
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
        {getActiveFilterCount() > 0 && (
          <Badge variant="secondary" className="bg-primary-100 text-primary-700">
            {getActiveFilterCount()}
          </Badge>
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

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filter Content */}
              <div className="p-6 space-y-8">
                {/* Basic Search */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-neutral-900">Basic Search</h4>
                  
                  {/* Location */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Marrakech, Casablanca..."
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Check In/Out */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-neutral-700">
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
                </div>

                {/* Property Type */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-neutral-900">Property Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handlePropertyTypeToggle(type.id)}
                        className={`
                          p-3 border rounded-lg text-left transition-colors
                          ${filters.propertyType.includes(type.id)
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
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-neutral-900">Price Range</h4>
                  <div className="space-y-4">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange("priceRange", value as [number, number])}
                      max={5000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>{filters.priceRange[0]} MAD</span>
                      <span>{filters.priceRange[1]} MAD</span>
                    </div>
                  </div>
                </div>

                {/* Rooms */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-neutral-900">Rooms</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-neutral-700 flex items-center">
                        <Bed className="w-4 h-4 mr-2" />
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
                      <label className="text-sm font-medium text-neutral-700 flex items-center">
                        <Bath className="w-4 h-4 mr-2" />
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
                </div>

                {/* Rating */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-neutral-900">Minimum Rating</h4>
                  <div className="flex space-x-2">
                    {[0, 3, 4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange("rating", rating)}
                        className={`
                          px-3 py-2 border rounded-lg text-sm font-medium transition-colors
                          ${filters.rating === rating
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-neutral-200 hover:bg-neutral-50"
                          }
                        `}
                      >
                        {rating === 0 ? "Any" : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-neutral-900">Amenities</h4>
                  <div className="grid grid-cols-1 gap-2">
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
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{amenity.icon}</span>
                          <span className="text-sm font-medium">{amenity.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-6">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="flex-1"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
