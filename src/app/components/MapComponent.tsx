'use client';

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

interface MapComponentProps {
  title: string;
  location: string;
  lat: number;
  lng: number;
}

export default function MapComponent({ title, location, lat, lng }: MapComponentProps) {
  const [icon, setIcon] = useState(null);
  
  // Initialize Leaflet only on the client side
  useEffect(() => {
    // Fix for default marker icons in Leaflet with Next.js
    const defaultIcon = L.icon({
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    // Set the default icon for all markers
    L.Marker.prototype.options.icon = defaultIcon;
    
    setIcon(defaultIcon);
  }, []);
  
  if (!icon) {
    return (
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">Loading map...</div>
      </div>
    );
  }
  
  return (
    <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md">
      <MapContainer 
        center={[lat, lng]} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        className="z-10"
        zoomControl={false} // Disable default zoom control to customize position
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Marker position={[lat, lng]}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-sm">{title}</h3>
              <p className="text-xs text-gray-600">{location}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Map overlay with info */}
      <div className="absolute bottom-3 left-3 bg-white p-2 rounded-lg shadow-md z-20 text-xs max-w-[50%]">
        <p className="font-semibold">{location}</p>
        <p className="text-gray-500 text-[10px]">Drag to explore the area</p>
      </div>
    </div>
  );
} 