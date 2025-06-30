"use client";

import { MapPin } from "lucide-react";

interface MapboxMapProps {
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
  selectedMarker: string | null;
  onMarkerClick: (propertyId: string) => void;
  onPopupClose: () => void;
  hoveredProperty?: string | null;
  onError?: (error: any) => void;
  viewState?: any;
}

const MapboxMap = (props: MapboxMapProps) => {
  // Temporarily disabled component due to build issues with dynamic imports
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center text-neutral-600">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        <h3 className="text-xl font-semibold mb-2 text-neutral-800">Map Component</h3>
        <p className="text-sm mb-4 text-neutral-600">
          Showing {props.properties.length} properties
        </p>
        <div className="bg-white rounded-lg p-4 shadow-md max-w-sm mx-auto">
          <h4 className="font-medium text-neutral-800 mb-2">Property Locations</h4>
          <div className="space-y-2">
            {props.properties.slice(0, 3).map((property) => (
              <div key={property.id} className="text-sm text-neutral-600">
                <span className="font-medium">{property.title}</span>
                <br />
                <span className="text-xs">
                  Lat: {property.coordinates.lat.toFixed(4)}, Lng: {property.coordinates.lng.toFixed(4)}
                </span>
              </div>
            ))}
            {props.properties.length > 3 && (
              <div className="text-xs text-neutral-500">
                ... and {props.properties.length - 3} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapboxMap;
