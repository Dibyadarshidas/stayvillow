'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { locations } from '../data/mockData';

interface Destination {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image: string;
  activities: string[];
  bestTime: string;
  averagePrice: string;
}

// Transform location data for UI display
const destinations: Destination[] = locations.map(location => {
  // Find recommended season for "best time"
  const recommendedSeason = location.seasonality.find(s => s.isRecommended);
  const bestTimeMonthStart = recommendedSeason?.startMonth || 0;
  const bestTimeMonthEnd = recommendedSeason?.endMonth || 0;
  
  // Month names for formatting best time
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Format best time string
  let bestTime = 'Year-round';
  if (recommendedSeason) {
    bestTime = `${monthNames[bestTimeMonthStart]} to ${monthNames[bestTimeMonthEnd % 12]}`;
  }
  
  // Format activities from travel tips
  const activities = location.travelTips.map(tip => 
    tip.split(' ').slice(0, 2).join(' ')
  );
  
  // Get tagline from first sentence of description
  const tagline = location.description.split('.')[0];
  
  return {
    id: location.id,
    name: location.name,
    tagline: tagline,
    description: location.description,
    image: location.images[0],
    activities: activities,
    bestTime: bestTime,
    averagePrice: recommendedSeason ? 
      `₹${recommendedSeason.averagePricing - 2000} - ₹${recommendedSeason.averagePricing + 3000} per night` : 
      '₹6,000 - ₹15,000 per night'
  };
});

export default function TravelInspiration() {
  const [activeDestination, setActiveDestination] = useState<Destination>(destinations[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const handleDestinationClick = (destination: Destination) => {
    if (destination.id === activeDestination.id) return;
    
    setIsAnimating(true);
    setActiveDestination(destination);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  // Carousel drag functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!carouselRef.current) return;
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // For mobile touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.clientX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    const touch = e.touches[0];
    const x = touch.clientX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  return (
    <div className="mt-10 md:mt-16 mb-10 md:mb-16">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-bold text-xl md:text-2xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
          Get Inspired
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
          Discover India's most breathtaking destinations and plan your perfect getaway with our curated travel inspiration.
        </p>
      </div>
      
      {/* Selected Destination Showcase */}
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl mb-6 md:mb-8">
        <div className={`relative aspect-video ${isAnimating ? 'animate-fadeIn' : ''}`}>
          <Image
            src={activeDestination.image}
            alt={activeDestination.name}
            fill
            className="object-cover transition-transform duration-500 ease-out hover:scale-105"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Destination Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-10">
            <div className="max-w-2xl">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">{activeDestination.name}</h2>
             {/*  <p className="text-white/90 text-base md:text-lg mb-2 md:mb-4">{activeDestination.tagline}</p> */}
              <p className="text-white/80 mb-3 md:mb-4 max-w-xl text-sm md:text-base">{activeDestination.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                <div>
                  <div className="text-white/60 text-xs md:text-sm">Best Time to Visit</div>
                  <div className="text-white font-medium text-sm md:text-base">{activeDestination.bestTime}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs md:text-sm">Average Price</div>
                  <div className="text-white font-medium text-sm md:text-base">{activeDestination.averagePrice}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                {activeDestination.activities.map((activity, index) => (
                  <span key={index} className="px-2 md:px-3 py-1 md:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm">
                    {activity}
                  </span>
                ))}
              </div>
              
              <Link href={`/search?location=${encodeURIComponent(activeDestination.name)}`} className="bg-white hover:bg-white/90 text-cyan-700 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium shadow-md transition-colors flex items-center gap-2 inline-flex">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
                Explore {activeDestination.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Destination Carousel */}
      <div 
        className="flex space-x-3 md:space-x-4 py-3 md:py-4 overflow-x-auto scrollbar-hide cursor-grab" 
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {destinations.map((destination) => (
          <div 
            key={destination.id} 
            className={`relative min-w-[180px] sm:min-w-[220px] md:min-w-[250px] aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden shadow-md ${
              activeDestination.id === destination.id ? 'ring-4 ring-cyan-500' : ''
            } transform transition-all duration-200 ${
              activeDestination.id === destination.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'
            }`}
            onClick={() => handleDestinationClick(destination)}
          >
            <Image 
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h3 className="text-white font-bold text-lg md:text-xl">{destination.name}</h3>
              <p className="text-white/80 text-xs md:text-sm line-clamp-2">{destination.tagline}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call-to-Action Section */}
      <div className="mt-8 md:mt-12 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 md:p-6 border border-cyan-100">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="w-full md:w-2/3">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">Plan Your Perfect Getaway</h3>
            <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
              Get personalized travel recommendations, exclusive deals, and insider tips for your next vacation.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 md:px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none text-sm md:text-base"
              />
              <button className="px-4 md:px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap text-sm md:text-base">
                Get Inspired
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center mt-4 md:mt-0">
            <div className="relative w-32 h-32 md:w-40 md:h-40 backdrop-blur-md rounded-full p-1 bg-gradient-to-r from-cyan-200 to-blue-200">
              <div className="absolute inset-1 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=300&q=80"
                  alt="Travel inspiration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 