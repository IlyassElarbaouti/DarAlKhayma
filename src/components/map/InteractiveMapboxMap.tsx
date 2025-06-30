"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin } from "lucide-react";

interface Property {
  id: string;
  title: string;
  coordinates: { lat: number; lng: number };
  price: { amount: number; currency: string };
  image: string;
  location?: {
    city?: string;
    region?: string;
  };
  rating?: number;
  propertyType?: string;
}

interface MapboxMapProps {
  properties: Property[];
  selectedProperty?: string;
  selectedMarker?: string | null;
  onMarkerClick?: (propertyId: string) => void;
  onPopupClose?: () => void;
  hoveredProperty?: string | null;
  onError?: (error: any) => void;
  viewState?: any;
  className?: string;
}

// Set your Mapbox access token - get it from https://account.mapbox.com/
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const MapboxMap = ({ 
  properties, 
  selectedProperty, 
  selectedMarker,
  onMarkerClick,
  onPopupClose,
  hoveredProperty,
  onError,
  className = ""
}: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const popup = useRef<mapboxgl.Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      // Center map on Morocco
      const center: [number, number] = [-7.6292, 33.9716]; // Morocco center
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: center,
        zoom: 6,
        attributionControl: false
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        onError?.(e);
        console.error('Mapbox error:', e);
      });

    } catch (error) {
      onError?.(error);
      console.error('Failed to initialize map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [onError]);
  // Add/update markers when properties change
  useEffect(() => {
    if (!map.current || !mapLoaded || !properties.length) return;

    // Show property popup function
    const showPropertyPopup = (property: Property) => {
      if (!map.current) return;

      // Close existing popup
      if (popup.current) {
        popup.current.remove();
      }

      const popupContent = `
        <div class="property-popup max-w-sm">
          <div class="relative">
            <img 
              src="${property.image}" 
              alt="${property.title}"
              class="w-full h-32 object-cover rounded-t-lg"
              onError="this.src='/placeholder-property.jpg'"
            />
            <button 
              onclick="this.closest('.mapboxgl-popup').remove()"
              class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="p-3">
            <h3 class="font-semibold text-lg text-gray-900 mb-1">${property.title}</h3>
            <p class="text-sm text-gray-600 mb-2">
              ${property.location?.city || ''}, ${property.location?.region || ''}
            </p>
            <div class="flex items-center justify-between">
              <div class="text-lg font-bold text-primary-600">
                ${property.price.amount} ${property.price.currency}
                <span class="text-sm font-normal text-gray-600">/night</span>
              </div>
              ${property.rating ? `
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm font-medium">${property.rating}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      popup.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '300px',
        className: 'property-popup-container'
      })
        .setLngLat([property.coordinates.lng, property.coordinates.lat])
        .setHTML(popupContent)
        .addTo(map.current);

      popup.current.on('close', () => {
        onPopupClose?.();
      });
    };

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Create custom marker element
    const createMarkerElement = (property: Property, isSelected = false, isHovered = false) => {
      const el = document.createElement('div');
      el.className = `property-marker ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`;
      el.innerHTML = `
        <div class="
          bg-white border-2 rounded-lg shadow-lg cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'border-primary-500 scale-110 z-10' 
            : isHovered 
            ? 'border-primary-300 scale-105' 
            : 'border-neutral-200 hover:border-primary-300 hover:scale-105'
          }
        ">
          <div class="p-2 text-center">
            <div class="text-sm font-semibold text-neutral-800">
              ${property.price.amount} ${property.price.currency}
            </div>
          </div>
        </div>
      `;
      return el;
    };

    // Add markers for each property
    properties.forEach((property) => {
      const isSelected = selectedProperty === property.id || selectedMarker === property.id;
      const isHovered = hoveredProperty === property.id;
      
      const el = createMarkerElement(property, isSelected, isHovered);
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.coordinates.lng, property.coordinates.lat])
        .addTo(map.current!);

      // Add click handler
      el.addEventListener('click', () => {
        onMarkerClick?.(property.id);
        showPropertyPopup(property);
      });

      markers.current[property.id] = marker;
    });

    // Fit map to show all properties
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(property => {
        bounds.extend([property.coordinates.lng, property.coordinates.lat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    }

  }, [properties, mapLoaded, selectedProperty, selectedMarker, hoveredProperty, onMarkerClick, onPopupClose]);
  // Handle selected property change
  useEffect(() => {
    if (!map.current || !selectedProperty || !properties.length) return;

    const property = properties.find(p => p.id === selectedProperty);
    if (!property) return;

    // Center map on selected property
    map.current.flyTo({
      center: [property.coordinates.lng, property.coordinates.lat],
      zoom: 14,
      duration: 1000
    });

    // Close existing popup
    if (popup.current) {
      popup.current.remove();
    }

    const popupContent = `
      <div class="property-popup max-w-sm">
        <div class="relative">
          <img 
            src="${property.image}" 
            alt="${property.title}"
            class="w-full h-32 object-cover rounded-t-lg"
            onError="this.src='/placeholder-property.jpg'"
          />
          <button 
            onclick="this.closest('.mapboxgl-popup').remove()"
            class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-3">
          <h3 class="font-semibold text-lg text-gray-900 mb-1">${property.title}</h3>
          <p class="text-sm text-gray-600 mb-2">
            ${property.location?.city || ''}, ${property.location?.region || ''}
          </p>
          <div class="flex items-center justify-between">
            <div class="text-lg font-bold text-primary-600">
              ${property.price.amount} ${property.price.currency}
              <span class="text-sm font-normal text-gray-600">/night</span>
            </div>
            ${property.rating ? `
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-sm font-medium">${property.rating}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    popup.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: '300px',
      className: 'property-popup-container'
    })
      .setLngLat([property.coordinates.lng, property.coordinates.lat])
      .setHTML(popupContent)
      .addTo(map.current);

    popup.current.on('close', () => {
      onPopupClose?.();
    });

  }, [selectedProperty, properties, onPopupClose]);

  // If no Mapbox token, show fallback
  if (!MAPBOX_TOKEN) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center ${className}`}>
        <div className="text-center text-neutral-600 p-8">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold mb-2 text-neutral-800">Map Configuration Needed</h3>
          <p className="text-sm mb-4 text-neutral-600 max-w-md">
            To enable the interactive map, please add your Mapbox access token to the environment variables.
          </p>
          <div className="bg-white rounded-lg p-4 shadow-md max-w-sm mx-auto">
            <h4 className="font-medium text-neutral-800 mb-2">Property Locations ({properties.length})</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {properties.slice(0, 5).map((property) => (
                <div key={property.id} className="text-sm text-neutral-600 text-left">
                  <span className="font-medium">{property.title}</span>
                  <br />
                  <span className="text-xs">
                    {property.location?.city}, {property.location?.region}
                  </span>
                </div>
              ))}
              {properties.length > 5 && (
                <div className="text-xs text-neutral-500">
                  ... and {properties.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        ref={mapContainer} 
        className={`w-full h-full ${className}`}
        style={{ minHeight: '400px' }}
      />
      <style jsx global>{`
        .property-marker {
          cursor: pointer;
        }
        .property-popup-container .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .property-popup-container .mapboxgl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </>
  );
};

export default MapboxMap;
