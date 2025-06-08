"use client";

import { useState, useCallback } from "react";
import { MapPin, X } from "lucide-react";

// Note: MapboxMap import temporarily removed to fix build issues

interface PropertyMapProps {
  properties: Array<{
    id: string;
    title: string;
    coordinates: { lat: number; lng: number };
    price: { amount: number; currency: string };
    image: string;
    location?: {
      city?: string;
      region?: string;
    };
  }>;
  selectedProperty?: string;
  onPropertySelect?: (propertyId: string) => void;
  className?: string;
  height?: string;
}

export default function PropertyMap({ 
  properties, 
  selectedProperty, 
  onPropertySelect,
  className = "",
  height = "500px" 
}: PropertyMapProps) {  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const handleMarkerClick = useCallback((propertyId: string) => {
    setSelectedMarker(propertyId);
    onPropertySelect?.(propertyId);
  }, [onPropertySelect]);

  const handlePopupClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Check if Mapbox is properly configured
  const hasMapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN && 
                        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN !== 'your_mapbox_access_token_here';  // Temporarily disable Mapbox integration to fix build issues
  // If Mapbox is configured and no errors, show the interactive map
  if (false && hasMapboxToken) {
    return (
      <div className={`relative bg-neutral-100 rounded-lg overflow-hidden ${className}`} style={{ height }}>
        {/* MapboxMap component temporarily disabled */}
        <div className="w-full h-full flex items-center justify-center bg-blue-50">
          <p className="text-neutral-600">Map component temporarily disabled</p>
        </div>
      </div>
    );
  }

  // Fallback UI when Mapbox is not available or configured
  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden ${className}`} style={{ height }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-neutral-600 p-8">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold mb-2 text-neutral-800">Interactive Map</h3>
          <p className="text-sm mb-4 text-neutral-600">
            {!hasMapboxToken 
              ? "Add your Mapbox access token to .env.local to enable the interactive map" 
              : "Map temporarily unavailable"
            }
          </p>
          {!hasMapboxToken && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-left max-w-md mx-auto">
              <p className="text-xs text-yellow-800 font-medium mb-2">Setup Instructions:</p>
              <ol className="text-xs text-yellow-700 space-y-1">
                <li>1. Get a free token from <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="underline">Mapbox</a></li>
                <li>2. Add it to your .env.local file:</li>
                <li className="font-mono bg-yellow-100 p-1 rounded text-xs">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ...</li>
              </ol>
            </div>
          )}
          {properties.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow-md max-w-sm mx-auto">
              <h4 className="font-medium text-neutral-800 mb-2">Available Properties</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {properties.slice(0, 3).map((property) => (
                  <div 
                    key={property.id}
                    className={`flex items-center space-x-3 p-2 bg-neutral-50 rounded cursor-pointer hover:bg-neutral-100 transition-colors ${
                      selectedMarker === property.id || selectedProperty === property.id ? 'bg-blue-50 border-blue-200 border' : ''
                    }`}
                    onClick={() => handleMarkerClick(property.id)}
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-8 h-8 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkMxNS4zMTM3IDE2IDE4IDEzLjMxMzcgMTggMTBDMTggNi42ODYyOSAxNS4zMTM3IDQgMTIgNEM4LjY4NjI5IDQgNiA2LjY4NjI5IDYgMTBDNiAxMy4zMTM3IDguNjg2MjkgMTYgMTIgMTZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4K';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate">{property.title}</p>
                      <p className="text-xs text-blue-600 font-medium">
                        {property.price.amount} {property.price.currency}
                      </p>
                    </div>
                  </div>
                ))}
                {properties.length > 3 && (
                  <p className="text-xs text-neutral-500 text-center pt-2">
                    +{properties.length - 3} more properties
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Selected property details */}
          {selectedMarker && (
            <div className="mt-4 bg-white rounded-lg p-4 shadow-lg max-w-sm mx-auto">
              {(() => {
                const property = properties.find(p => p.id === selectedMarker);
                if (!property) return null;

                return (
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-neutral-900 text-sm leading-tight pr-2">
                        {property.title}
                      </h4>
                      <button
                        onClick={handlePopupClose}
                        className="flex-shrink-0 p-1 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-neutral-500" />
                      </button>
                    </div>
                    
                    <div className="flex space-x-3">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzMkMzMC42Mjc0IDMyIDM2IDI2LjYyNzQgMzYgMjBDMzYgMTMuMzcyNiAzMC42Mjc0IDggMjQgOEMxNy4zNzI2IDggMTIgMTMuMzcyNiAxMiAyMEMxMiAyNi42Mjc0IDE3LjM3MjYgMzIgMjQgMzJaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-600 mb-1">
                          {property.location?.city && property.location?.region 
                            ? `${property.location.city}, ${property.location.region}`
                            : 'Morocco'
                          }
                        </p>
                        <p className="text-sm font-semibold text-blue-600">
                          {property.price.amount} {property.price.currency} / night
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
      
      {/* Property count badge */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 text-sm text-neutral-600">
          <MapPin className="w-4 h-4" />
          <span>{properties.length} properties</span>
        </div>
      </div>
    </div>
  );
}
