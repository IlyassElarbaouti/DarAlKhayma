"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/search/SearchBar";
import FilterPanel from "@/components/search/FilterPanel";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyMap from "@/components/map/PropertyMap";
import { Grid, Map, SortAsc } from "lucide-react";
import { Property } from "@/types";
import { 
  filterProperties, 
  sortProperties, 
  sortOptions,
  type SearchFilters 
} from "@/lib/propertyUtils";

interface SearchData {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface FilterData {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: [number, number];
  amenities: string[];
  bedrooms: string;
  bathrooms: string;
}

interface PropertiesClientProps {
  properties: Property[];
}

export default function PropertiesClient({ properties }: PropertiesClientProps) {
  const [_searchData, setSearchData] = useState<SearchData>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [filters, setFilters] = useState<FilterData>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: [0, 5000],
    amenities: [],
    bedrooms: "",
    bathrooms: "",
  });  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Convert filters to SearchFilters format
  const searchFilters: SearchFilters = useMemo(() => {
    return {
      location: filters.location,
      guests: filters.guests,
      priceRange: {
        min: filters.priceRange[0],
        max: filters.priceRange[1],
      },
      amenities: filters.amenities,
      bedrooms: filters.bedrooms ? parseInt(filters.bedrooms) : undefined,
      bathrooms: filters.bathrooms ? parseInt(filters.bathrooms) : undefined,
      availability: filters.checkIn && filters.checkOut ? {
        checkIn: new Date(filters.checkIn),
        checkOut: new Date(filters.checkOut),
      } : undefined,
    };
  }, [filters]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(properties, searchFilters);
    return sortProperties(filtered, sortBy);
  }, [properties, searchFilters, sortBy]);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    setFilters(prev => ({
      ...prev,
      location: data.location,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
    }));
  };

  const handleFilterChange = (newFilters: FilterData) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Search Section */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Discover Premium Properties
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Find your perfect luxury rental from our curated collection of exceptional properties across Morocco
            </p>
          </div>
            <SearchBar 
            onSearch={handleSearch}
          />
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
                <span className="text-sm text-neutral-500">
                  {filteredProperties.length} properties found
                </span>
              </div>              <FilterPanel 
                onFiltersChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-5 h-5 text-neutral-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-neutral-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${viewMode === "grid"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                    }`}
                >
                  <Grid className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${viewMode === "map"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900"
                    }`}
                >
                  <Map className="w-4 h-4" />
                  Map
                </button>
              </div>
            </div>

            {/* Results */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="h-[600px] rounded-lg overflow-hidden">
                <PropertyMap properties={filteredProperties} />
              </div>
            )}

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Grid className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  No properties found
                </h3>
                <p className="text-neutral-600">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
