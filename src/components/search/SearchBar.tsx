"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Calendar, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch?: (searchData: any) => void;
  className?: string;
  variant?: "hero" | "header" | "page";
}

// Mock location data - in a real app, this would come from an API
const moroccanLocations = [
  { id: "marrakech", name: "Marrakech", region: "Marrakech-Safi" },
  { id: "casablanca", name: "Casablanca", region: "Casablanca-Settat" },
  { id: "fez", name: "Fez", region: "Fès-Meknès" },
  { id: "rabat", name: "Rabat", region: "Rabat-Salé-Kénitra" },
  { id: "essaouira", name: "Essaouira", region: "Marrakech-Safi" },
  { id: "chefchaouen", name: "Chefchaouen", region: "Tanger-Tetouan-Al Hoceima" },
  { id: "agadir", name: "Agadir", region: "Souss-Massa" },
  { id: "tangier", name: "Tangier", region: "Tanger-Tetouan-Al Hoceima" },
];

export default function SearchBar({ onSearch, className = "", variant = "page" }: SearchBarProps) {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(moroccanLocations);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const isHeroVariant = variant === "hero";
  const isHeaderVariant = variant === "header";

  useEffect(() => {
    if (searchData.location) {
      const filtered = moroccanLocations.filter(location =>
        location.name.toLowerCase().includes(searchData.location.toLowerCase()) ||
        location.region.toLowerCase().includes(searchData.location.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(moroccanLocations);
    }
  }, [searchData.location]);

  const handleLocationSelect = (location: any) => {
    setSearchData({ ...searchData, location: location.name });
    setShowLocationSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchData);
  };

  const clearLocation = () => {
    setSearchData({ ...searchData, location: "" });
    locationInputRef.current?.focus();
  };

  const containerClasses = isHeroVariant 
    ? "bg-white/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl"
    : isHeaderVariant
    ? "bg-white border border-neutral-200 rounded-lg shadow-md p-4"
    : "bg-white border border-neutral-200 rounded-lg p-6";

  const gridClasses = isHeaderVariant 
    ? "grid grid-cols-1 md:grid-cols-5 gap-3"
    : "grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6";

  return (
    <div className={className}>
      <form onSubmit={handleSearch} className={containerClasses}>
        <div className={gridClasses}>
          {/* Location */}
          <div className={`space-y-2 relative ${isHeaderVariant ? 'md:col-span-2' : ''}`}>
            <label className="text-sm font-medium text-neutral-700 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary-600" />
              Where
            </label>
            <div className="relative">
              <input
                ref={locationInputRef}
                type="text"
                placeholder="Marrakech, Casablanca..."
                value={searchData.location}
                onChange={(e) => {
                  setSearchData({ ...searchData, location: e.target.value });
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-8"
              />
              {searchData.location && (
                <button
                  type="button"
                  onClick={clearLocation}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neutral-100 rounded"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}

              {/* Location Suggestions */}
              <AnimatePresence>
                {showLocationSuggestions && filteredLocations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                  >
                    {filteredLocations.map((location) => (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() => handleLocationSelect(location)}
                        className="w-full text-left px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-neutral-400" />
                          <div>
                            <div className="font-medium text-neutral-900">{location.name}</div>
                            <div className="text-sm text-neutral-600">{location.region}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className={`${isHeaderVariant ? 'mt-3' : 'mt-6'}`}>
          <button
            type="submit"
            className={`
              bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg 
              hover:from-primary-700 hover:to-primary-800 transition-all duration-200 
              flex items-center justify-center shadow-lg
              ${isHeaderVariant 
                ? 'w-full px-4 py-3 text-sm' 
                : 'w-full md:w-auto px-8 py-4'
              }
            `}
          >
            <Search className={`${isHeaderVariant ? 'w-4 h-4' : 'w-5 h-5'} mr-2`} />
            Search Properties
          </button>
        </div>
      </form>

      {/* Click outside to close suggestions */}
      {showLocationSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLocationSuggestions(false)}
        />
      )}
    </div>
  );
}
