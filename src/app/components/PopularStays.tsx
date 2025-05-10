'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { properties } from '../data/mockData';

// Transform properties data for UI display
const stays = properties.map(property => ({
  id: property.id,
  title: property.title,
  location: property.location,
  price: parseInt(property.price.replace(/[^\d]/g, '')),
  rating: property.rating,
  reviews: property.reviews,
  image: property.image,
  tags: [
    property.propertyType,
    property.amenities[0],
    property.metrics.bookmarks > 70 ? "Trending" : 
    property.metrics.avgRating >= 4.9 ? "Luxury" : 
    property.metrics.views > 1200 ? "Popular" : 
    property.hasVirtualTour ? "New" : "Unique"
  ]
}));

export default function PopularStays() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const filters = ["All", "Trending", "New", "Luxury", "Unique"];
  
  const filteredStays = activeFilter === "All" 
    ? stays 
    : stays.filter(stay => stay.tags.includes(activeFilter));

  return (
    <div className="mt-4 md:mt-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 md:mb-5">
        <h2 className="font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Popular Stays</h2>
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto py-1 scrollbar-hide">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {filteredStays.map(stay => (
          <Link 
            key={stay.id}
            href={`/property/${stay.id}`}
            className="block bg-white/40 backdrop-blur-md rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 group"
            onMouseEnter={() => setHoveredId(stay.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative overflow-hidden aspect-[16/10]">
              <Image 
                src={stay.image} 
                alt={stay.title} 
                width={400}
                height={250}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className={`object-cover w-full h-full transition-transform duration-700 ease-in-out ${
                  hoveredId === stay.id ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-wrap gap-1 md:gap-1.5 max-w-[80%]">
                {stay.tags.map((tag, index) => (
                  <span key={index} className="text-[10px] md:text-xs font-semibold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-white/80 backdrop-blur-sm text-cyan-700 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute top-2 md:top-3 right-2 md:right-3">
                <button className="bg-white/80 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-sm text-gray-700 hover:text-red-500 transition-colors flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="align-middle block">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-3 md:p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-gray-800 line-clamp-1">{stay.title}</h3>
                  <div className="text-xs md:text-sm text-gray-500 flex items-center gap-1 mt-0.5 md:mt-1">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="inline align-middle block">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{stay.location}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-yellow-50 rounded-lg">
                  <svg width="12" height="12" fill="currentColor" className="text-yellow-500 inline align-middle block">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <span className="font-medium text-xs md:text-sm text-gray-800">{stay.rating}</span>
                  <span className="text-[10px] md:text-xs text-gray-500">({stay.reviews})</span>
                </div>
              </div>
              
              <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="font-bold text-cyan-700 text-sm md:text-base">
                  ₹{stay.price} <span className="text-gray-500 font-normal text-xs md:text-sm">night</span>
                </div>
                <span className="text-xs md:text-sm text-cyan-600 font-medium flex items-center gap-1 hover:text-cyan-700 transition-colors underline">
                  View Details
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="inline align-middle block">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 md:mt-6 text-center">
        <Link href="/search" className="px-4 md:px-6 py-2 md:py-2.5 border border-cyan-600 text-cyan-600 rounded-lg text-xs md:text-sm font-medium hover:bg-cyan-50 transition-colors inline-block">
          View All Stays
        </Link>
      </div>
    </div>
  );
} 