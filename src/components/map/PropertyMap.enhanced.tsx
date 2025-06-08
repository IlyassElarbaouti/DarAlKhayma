"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { MapPin, Home, Eye, Maximize2 } from "lucide-react";
import dynamic from "next/dynamic";

// Import leaflet only on client side
let L: any;
if (typeof window !== 'undefined') {
  L = require('leaflet');
}

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Import Leaflet styles
import 'leaflet/dist/leaflet.css';
import './leaflet-custom.css';

interface PropertyMapProps {
  properties: Array<{
    id: string;
    title: string;
    location: {
      coordinates: { lat: number; lng: number };
      city?: string;
      region?: string;
    };
    price: { amount: number; currency: string };
    images: Array<{ url: string; alt: string }>;
  }>;
  selectedProperty?: string;
  onPropertySelect?: (propertyId: string) => void;
  className?: string;
  height?: string;
}

// Smart zoom calculation based on property distribution
const calculateSmartZoom = (properties: any[]) => {
  if (properties.length === 0) return 10;
  if (properties.length === 1) return 14;
  
  // Calculate bounding box
  const lats = properties.map(p => p.location.coordinates.lat);
  const lngs = properties.map(p => p.location.coordinates.lng);
  
  const latRange = Math.max(...lats) - Math.min(...lats);
  const lngRange = Math.max(...lngs) - Math.min(...lngs);
  const maxRange = Math.max(latRange, lngRange);
  
  // Determine zoom based on spread
  if (maxRange > 10) return 6;
  if (maxRange > 5) return 7;
  if (maxRange > 2) return 8;
  if (maxRange > 1) return 9;
  if (maxRange > 0.5) return 10;
  if (maxRange > 0.1) return 11;
  return 12;
};

// Create custom luxury marker icon
const createLuxuryMarkerIcon = (isSelected: boolean = false, price?: string) => {
  const markerColor = isSelected ? '#F59E0B' : '#2D5A5A';
  const markerColorDark = isSelected ? '#D97706' : '#254848';
  
  return L.divIcon({
    className: 'luxury-marker',
    html: `
      <div class="luxury-marker-container ${isSelected ? 'selected' : ''}" style="
        width: 48px;
        height: 48px;
        position: relative;
        z-index: ${isSelected ? 1000 : 500};
      ">
        <div class="luxury-marker-pin" style="
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, ${markerColor} 0%, ${markerColorDark} 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 4px solid white;
          box-shadow: 
            0 8px 25px rgba(45, 90, 90, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          backdrop-filter: blur(10px);
          ${isSelected ? 'transform: rotate(-45deg) scale(1.2);' : ''}
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          ">
            🏠
          </div>
        </div>
        ${price ? `
          <div class="luxury-marker-price" style="
            position: absolute;
            top: -45px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(45, 90, 90, 0.95);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(245, 230, 211, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            font-family: 'Inter', sans-serif;
          ">
            ${price}
          </div>
        ` : ''}
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48]
  });
};

export default function PropertyMap({ 
  properties, 
  selectedProperty,
  onPropertySelect,
  className = "",
  height = "500px" 
}: PropertyMapProps) {  const [isClient, setIsClient] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const _mapRef = useRef<L.Map | null>(null);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Smart zoom and center on selectedProperty change
  useEffect(() => {
    if (!mapInstance || !selectedProperty) return;
    
    const property = properties.find(p => p.id === selectedProperty);
    if (property) {
      mapInstance.setView(
        [property.location.coordinates.lat, property.location.coordinates.lng],
        14,
        { animate: true, duration: 1 }
      );
      setViewMode('detailed');
    }
  }, [selectedProperty, mapInstance, properties]);

  const handleMarkerClick = useCallback((propertyId: string) => {
    onPropertySelect?.(propertyId);
  }, [onPropertySelect]);

  // Fit bounds to show all properties
  const fitBounds = useCallback(() => {
    if (!mapInstance || properties.length === 0) return;
    
    if (properties.length === 1) {
      const property = properties[0];
      mapInstance.setView(
        [property.location.coordinates.lat, property.location.coordinates.lng],
        14,
        { animate: true, duration: 1 }
      );
    } else {
      const group = new L.FeatureGroup();
      properties.forEach(property => {
        const marker = L.marker([
          property.location.coordinates.lat,
          property.location.coordinates.lng
        ]);
        group.addLayer(marker);
      });
      mapInstance.fitBounds(group.getBounds(), { 
        padding: [50, 50],
        animate: true,
        duration: 1
      });
    }
    setViewMode('overview');
  }, [mapInstance, properties]);

  // Calculate center point of all properties
  const center = properties.length > 0 ? {
    lat: properties.reduce((sum, prop) => sum + prop.location.coordinates.lat, 0) / properties.length,
    lng: properties.reduce((sum, prop) => sum + prop.location.coordinates.lng, 0) / properties.length
  } : { lat: 31.6295, lng: -7.9811 }; // Default to Marrakech

  const smartZoom = calculateSmartZoom(properties);

  // If not client-side yet, show loading with luxury theme
  if (!isClient) {
    return (
      <div className={`relative bg-gradient-to-br from-primary-50 to-accent-100 rounded-2xl overflow-hidden ${className}`} style={{ height }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-700">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-25"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <p className="text-lg font-medium font-playfair">Chargement de la carte...</p>
            <p className="text-sm text-primary-600 mt-2">Découvrez nos propriétés exceptionnelles</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-accent-300 to-accent-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-secondary-300 to-secondary-400 rounded-full opacity-20 blur-xl"></div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border border-primary-100 ${className}`} style={{ height }}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={fitBounds}
          className="bg-white/95 backdrop-blur-sm border border-primary-200 rounded-xl px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Vue d'ensemble
        </button>
        {selectedProperty && (
          <button
            onClick={() => onPropertySelect?.('')}
            className="bg-accent-500/95 backdrop-blur-sm border border-accent-600 rounded-xl px-4 py-2 text-sm font-medium text-primary-700 hover:bg-accent-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Maximize2 className="w-4 h-4" />
            Tout voir
          </button>
        )}
      </div>      <MapContainer
        center={[center.lat, center.lng]}
        zoom={smartZoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0 dar-al-khayma-map"
        ref={(map) => {
          if (map) setMapInstance(map);
        }}
      >
        {/* Custom tile layer with better styling */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        
        {/* Property Markers */}
        {properties.map((property) => {
          const isSelected = selectedProperty === property.id;
          return (
            <Marker
              key={property.id}
              position={[property.location.coordinates.lat, property.location.coordinates.lng]}
              icon={createLuxuryMarkerIcon(isSelected, `${property.price.amount} ${property.price.currency}`)}
              eventHandlers={{
                click: () => handleMarkerClick(property.id),
              }}
            >
              <Popup className="luxury-popup">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 max-w-sm border border-primary-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-primary-900 text-base leading-tight pr-2 font-playfair">
                      {property.title}
                    </h3>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="relative">
                      <img
                        src={property.images[0]?.url || ''}
                        alt={property.images[0]?.alt || property.title}
                        className="w-16 h-16 object-cover rounded-xl flex-shrink-0 border-2 border-accent-200"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjVFNkQzIi8+CjxwYXRoIGQ9Ik0yNCAzMkMyOC40MTgzIDMyIDMyIDI4LjQxODMgMzIgMjRDMzIgMTkuNTgxNyAyOC40MTgzIDE2IDI0IDE2QzE5LjU4MTcgMTYgMTYgMTkuNTgxNyAxNiAyNEMxNiAyOC40MTgzIDE5LjU4MTcgMzIgMjQgMzJaIiBzdHJva2U9IiMyRDVBNUEiIHN0cm9rZS13aWR0aD0iMyIvPgo8L3N2Zz4K';
                        }}
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-primary-600 mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.location?.city && property.location?.region 
                          ? `${property.location.city}, ${property.location.region}`
                          : 'Maroc'
                        }
                      </p>
                      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block">
                        {property.price.amount} {property.price.currency} / nuit
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleMarkerClick(property.id)}
                    className="w-full mt-3 bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-primary-800 font-medium py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Voir la propriété
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Enhanced property count badge */}
      <div className="absolute bottom-4 left-4 bg-primary-900/90 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-xl z-10 border border-primary-700">
        <div className="flex items-center space-x-3 text-sm">
          <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary-800" />
          </div>
          <div>
            <p className="font-semibold">{properties.length} propriétés</p>
            <p className="text-xs text-primary-200">
              {viewMode === 'detailed' ? 'Vue détaillée' : 'Vue d\'ensemble'}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced map attribution */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl text-xs text-primary-600 z-10 border border-primary-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
          Dar Al Khayma • OpenStreetMap
        </div>
      </div>

      {/* Decorative overlay for luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none rounded-2xl"></div>
    </div>
  );
}
