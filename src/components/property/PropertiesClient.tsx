"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Map, List, Filter, ChevronDown, Search, X } from "lucide-react";
import PropertyCard from "./PropertyCard";
import PropertyMap from "@/components/map/PropertyMap";
import FilterPanel, { FilterOptions } from "@/components/search/FilterPanel";
import { Property } from "@/types";

interface PropertiesClientProps {
  properties: Property[];
}

type ViewMode = "grid" | "map" | "list";

export default function PropertiesClient({ properties }: PropertiesClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
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
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "rating" | "newest">("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>();

  // Filter properties based on search and filters
  const applyFilters = useCallback((searchTerm: string, filterOptions: FilterOptions) => {
    let filtered = [...properties];

    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(search) ||
        property.description.toLowerCase().includes(search) ||
        property.location.city.toLowerCase().includes(search) ||
        property.location.region.toLowerCase().includes(search) ||
        property.category.toLowerCase().includes(search)
      );
    }

    // Location filter
    if (filterOptions.location.trim()) {
      const location = filterOptions.location.toLowerCase();
      filtered = filtered.filter(property =>
        property.location.city.toLowerCase().includes(location) ||
        property.location.region.toLowerCase().includes(location) ||
        property.location.neighborhood?.toLowerCase().includes(location)
      );
    }

    // Property type filter
    if (filterOptions.propertyType.length > 0) {
      filtered = filtered.filter(property =>
        filterOptions.propertyType.includes(property.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(property =>
      property.price.amount >= filterOptions.priceRange[0] &&
      property.price.amount <= filterOptions.priceRange[1]
    );

    // Guests filter
    filtered = filtered.filter(property =>
      property.specifications.guests >= filterOptions.guests
    );

    // Bedrooms filter
    if (filterOptions.bedrooms) {
      const minBedrooms = parseInt(filterOptions.bedrooms);
      filtered = filtered.filter(property =>
        property.specifications.bedrooms >= minBedrooms
      );
    }

    // Bathrooms filter
    if (filterOptions.bathrooms) {
      const minBathrooms = parseInt(filterOptions.bathrooms);
      filtered = filtered.filter(property =>
        property.specifications.bathrooms >= minBathrooms
      );
    }

    // Rating filter
    if (filterOptions.rating > 0) {
      filtered = filtered.filter(property =>
        property.rating && property.rating.average >= filterOptions.rating
      );
    }

    // Amenities filter
    if (filterOptions.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filterOptions.amenities.every(amenityId =>
          property.amenities.some(amenity => 
            amenity.id === amenityId || amenity.name.toLowerCase().includes(amenityId)
          )
        )
      );
    }

    return filtered;
  }, [properties]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];
    
    switch (sortBy) {
      case "price_asc":
        return sorted.sort((a, b) => a.price.amount - b.price.amount);
      case "price_desc":
        return sorted.sort((a, b) => b.price.amount - a.price.amount);
      case "rating":
        return sorted.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return sorted;
    }
  }, [filteredProperties, sortBy]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    const filtered = applyFilters(searchQuery, newFilters);
    setFilteredProperties(filtered);
  }, [searchQuery, applyFilters]);

  // Handle search changes
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    const filtered = applyFilters(query, filters);
    setFilteredProperties(filtered);
  }, [filters, applyFilters]);

  // Clear all filters
  const clearAllFilters = () => {
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
    setSearchQuery("");
    setFilteredProperties(properties);
  };

  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== "" ||
           filters.location.trim() !== "" ||
           filters.propertyType.length > 0 ||
           filters.priceRange[0] > 0 ||
           filters.priceRange[1] < 5000 ||
           filters.amenities.length > 0 ||
           filters.bedrooms !== "" ||
           filters.bathrooms !== "" ||
           filters.rating > 0 ||
           filters.guests > 1;
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title and Results Count */}
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900">
                Discover Properties
              </h1>
              <p className="text-neutral-600 mt-2">
                {sortedProperties.length} properties found
                {hasActiveFilters && (
                  <span className="ml-2">
                    (filtered from {properties.length} total)
                  </span>
                )}
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search properties, locations..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            {/* Left Side - View Controls and Filter */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                )}
              </button>

              {/* Desktop Filter Panel */}
              <div className="hidden lg:block">
                <FilterPanel
                  onFiltersChange={handleFiltersChange}
                  initialFilters={filters}
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-3 py-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear all</span>
                </button>
              )}
            </div>

            {/* Right Side - View Mode and Sort */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-primary-600"
                      : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-primary-600"
                      : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "map"
                      ? "bg-white shadow-sm text-primary-600"
                      : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {viewMode === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-[calc(100vh-300px)] min-h-[600px] bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <PropertyMap
                properties={sortedProperties.map(property => ({
                  id: property.id,
                  title: property.title,
                  location: property.location,
                  price: property.price,
                  images: property.images,
                }))}
                selectedProperty={selectedProperty}
                onPropertySelect={setSelectedProperty}
                height="100%"
              />
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {sortedProperties.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <Search className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      No properties found
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Try adjusting your search criteria or clear some filters to see more results.
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      : "space-y-6"
                  }
                >
                  {sortedProperties.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-neutral-900">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <FilterPanel
                  onFiltersChange={(newFilters) => {
                    handleFiltersChange(newFilters);
                    setShowMobileFilters(false);
                  }}
                  initialFilters={filters}
                  className="!static !shadow-none !bg-transparent"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
