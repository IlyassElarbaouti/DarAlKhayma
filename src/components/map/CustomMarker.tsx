"use client";

import { useEffect } from 'react';

// Fix for default marker icons in react-leaflet
export const useFixMarkerIcons = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Dynamically import Leaflet only on client side
    import('leaflet').then((L) => {
      // Create custom icon for properties
      const propertyIcon = L.divIcon({
        className: 'custom-property-marker',
        html: `
          <div style="
            background: #3B82F6;
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 14px;
              font-weight: bold;
            ">🏠</div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Set as default
      L.Marker.prototype.options.icon = propertyIcon;
    });
  }, []);
};

// Custom marker component - return null for SSR, will be handled by useFixMarkerIcons
export const CustomPropertyIcon = () => {
  // Only run on client side
  if (typeof window === 'undefined') return null;
  
  // Return null - the actual icon will be set by useFixMarkerIcons
  return null;
};
