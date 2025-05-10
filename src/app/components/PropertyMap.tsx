'use client';

import dynamic from 'next/dynamic';

// Create a dynamic import for Leaflet components with SSR disabled
const MapComponentWithNoSSR = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">Loading map...</div>
      </div>
    )
  }
);

interface PropertyMapProps {
  title: string;
  location: string;
  // Default coordinates for fallback (these point to approximately the center of India)
  lat?: number;
  lng?: number;
}

export default function PropertyMap({ title, location, lat = 20.5937, lng = 78.9629 }: PropertyMapProps) {
  return <MapComponentWithNoSSR title={title} location={location} lat={lat} lng={lng} />;
} 