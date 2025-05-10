'use client';

import { useState, useEffect, useRef, TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const virtualTours = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Goa, India",
    thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.92,
    reviews: 76,
    price: "₹12,000 - ₹18,000",
    link: "/virtual-tours/luxury-beachfront-villa"
  },
  {
    id: 2,
    title: "Mountain Retreat with Spa",
    location: "Shimla, Himachal Pradesh",
    thumbnail: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595514535215-9a3f0f8a1b2a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.87,
    reviews: 54,
    price: "₹10,500 - ₹16,000",
    link: "/virtual-tours/mountain-retreat-spa"
  }
];

// Pre-load images for smoother transitions
const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new window.Image();
    img.src = src;
  });
};

export default function VirtualTourPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTour, setActiveTour] = useState(virtualTours[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Pre-load images when component mounts
  useEffect(() => {
    virtualTours.forEach(tour => {
      preloadImages(tour.previewImages);
    });
    setIsImagesLoaded(true);
  }, []);
  
  // Pre-load images when active tour changes
  useEffect(() => {
    if (activeTour) {
      preloadImages(activeTour.previewImages);
      setIsImagesLoaded(true);
    }
  }, [activeTour]);
  
  // Auto-rotate images for 360 effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isRotating && isImagesLoaded) {
      intervalId = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveImageIndex((prev) => (prev + 1) % activeTour.previewImages.length);
          setIsTransitioning(false);
        }, 200);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRotating, activeTour.previewImages.length, isImagesLoaded]);
  
  const handleTourSelect = (index: number) => {
    setActiveIndex(index);
    setActiveTour(virtualTours[index]);
    setActiveImageIndex(0);
    setIsRotating(false);
  };

  const handleRotateToggle = () => {
    setIsRotating(!isRotating);
  };

  const handleNextImage = (): void => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImageIndex((prev) => (prev + 1) % activeTour.previewImages.length);
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrevImage = (): void => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImageIndex((prev) => (prev - 1 + activeTour.previewImages.length) % activeTour.previewImages.length);
      setIsTransitioning(false);
    }, 200);
  };
  
  // Touch event handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (): void => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - next image
      handleNextImage();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right - previous image
      handlePrevImage();
    }
  };

  return (
    <div className="mt-8 md:mt-12 mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 md:mb-6">
        <h2 className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
          Experience in Virtual Reality
        </h2>
        <Link 
          href="/virtual-tours" 
          className="text-cyan-600 text-sm font-medium flex items-center gap-1 hover:text-cyan-700 transition-colors"
        >
          View all tours
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Main 360 Preview */}
        <div className="md:col-span-2 bg-white/40 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div 
            className="relative aspect-[16/10]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isImagesLoaded && (
              <>
                <Image
                  src={activeTour.previewImages[activeImageIndex]}
                  alt={activeTour.title}
                  width={1200}
                  height={700}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className={`object-cover w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-70' : 'opacity-100'}`}
                  quality={90}
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* VR Indicator */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1 md:gap-2 shadow-md">
                  <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] md:text-xs font-semibold text-gray-800">360° VIRTUAL TOUR</span>
                </div>
                
                {/* VR Controls */}
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 flex gap-1 md:gap-2">
                  <button 
                    onClick={handlePrevImage}
                    className="p-1.5 md:p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 shadow-md hover:bg-white hover:shadow-lg transition-all"
                    aria-label="Previous view"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={handleRotateToggle}
                    className={`p-1.5 md:p-2 rounded-full backdrop-blur-sm shadow-md transition-all ${
                      isRotating ? 'bg-cyan-600 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                    aria-label={isRotating ? "Stop rotation" : "Start rotation"}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={handleNextImage}
                    className="p-1.5 md:p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 shadow-md hover:bg-white hover:shadow-lg transition-all"
                    aria-label="Next view"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                
                {/* Location & Title Overlay */}
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
                  <h3 className="text-white font-bold text-base md:text-xl">{activeTour.title}</h3>
                  <p className="text-white/90 text-xs md:text-sm flex items-center gap-1">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {activeTour.location}
                  </p>
                </div>
                
                {/* Image Navigation Dots */}
                <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-1.5">
                  {activeTour.previewImages.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setActiveImageIndex(index);
                          setIsTransitioning(false);
                        }, 200);
                      }}
                      className={`h-1.5 md:h-2 rounded-full transition-all ${
                        index === activeImageIndex 
                          ? 'bg-white w-4 md:w-6' 
                          : 'bg-white/50 w-1.5 md:w-2 hover:bg-white/80'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
            
            {!isImagesLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 md:w-10 h-8 md:h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <div className="p-3 md:p-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-500">Entire property</div>
                  <div className="text-xs md:text-sm font-medium text-gray-700">Hosted by Luxury Vacation Homes</div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 bg-yellow-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg">
                <svg width="14" height="14" fill="currentColor" className="text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
                <span className="font-medium text-xs md:text-sm">{activeTour.rating}</span>
                <span className="text-[10px] md:text-xs text-gray-500">({activeTour.reviews})</span>
              </div>
            </div>
            
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
              <div>
                <div className="text-cyan-600 font-medium text-sm md:text-base">{activeTour.price}</div>
                <div className="text-gray-500 font-normal text-[10px] md:text-xs">per night</div>
              </div>
              <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
                <Link 
                  href={activeTour.link} 
                  className="px-3 md:px-4 py-1.5 md:py-2 border border-cyan-600 text-cyan-600 bg-white text-xs md:text-sm font-medium rounded-lg hover:bg-cyan-50 transition-colors flex-1 sm:flex-auto text-center"
                >
                  Explore Property
                </Link>
                <Link 
                  href={`${activeTour.link}/vr-tour`} 
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs md:text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1 flex-1 sm:flex-auto"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                  Book VR Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tour Selection */}
        <div className="space-y-3 md:space-y-4">
          <div className="p-3 md:p-5 bg-white/40 backdrop-blur-md rounded-xl shadow-md border border-white/50">
            <h3 className="font-medium text-gray-800 text-sm md:text-base mb-2 md:mb-3">Available Virtual Tours</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Experience our properties in immersive 360° before booking. Take a virtual walk through your next vacation stay.
            </p>
            
            <div className="space-y-2 md:space-y-3 mt-3 md:mt-4">
              {virtualTours.map((tour, index) => (
                <button
                  key={tour.id}
                  onClick={() => handleTourSelect(index)}
                  className={`w-full p-2 md:p-3 flex items-center gap-2 md:gap-3 rounded-lg transition-all text-left ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 shadow-md' 
                      : 'bg-white/70 border border-transparent hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={tour.thumbnail}
                      alt={tour.title}
                      width={64}
                      height={64} 
                      sizes="(max-width: 768px) 48px, 64px"
                      className="object-cover w-full h-full"
                    />
                    {activeIndex === index && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                          <svg width="10" height="10" fill="currentColor" className="text-cyan-600" viewBox="0 0 24 24">
                            <path d="M5 3l5 5-5 5V3z"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-xs md:text-sm line-clamp-1">{tour.title}</h4>
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1">{tour.location}</p>
                    <div className="flex items-center gap-1">
                      <svg width="10" height="10" fill="currentColor" className="text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                      <span className="text-[10px] md:text-xs text-gray-600">{tour.rating} ({tour.reviews})</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-3 md:mt-5 pt-3 md:pt-4 border-t border-gray-200">
              <Link 
                href="/virtual-tours" 
                className="w-full text-center text-cyan-600 text-xs md:text-sm font-medium hover:text-cyan-700 transition-colors flex items-center justify-center gap-1"
              >
                View All VR Tours
                <span className="text-[10px] md:text-xs px-1.5 py-0.5 bg-cyan-100 rounded-full">12</span>
              </Link>
            </div>
          </div>
          
          <div className="p-3 md:p-5 bg-gradient-to-br from-cyan-600/90 to-blue-700/90 backdrop-blur-md rounded-xl shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-white/10 rounded-full -mr-12 md:-mr-16 -mt-12 md:-mt-16"></div>
            <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-white/10 rounded-full -ml-8 md:-ml-12 -mb-8 md:-mb-12"></div>
            <div className="relative z-10">
              <h3 className="font-medium text-sm md:text-base mb-1 md:mb-2">Planning to List Your Property?</h3>
              <p className="text-xs md:text-sm text-white/90 mb-3 md:mb-4">
                Create your own virtual tours with our free VR kit. Increase bookings by up to 40%.
              </p>
              <Link
                href="/host/create-vr-tour"
                className="w-full py-1.5 md:py-2.5 bg-white text-cyan-700 text-xs md:text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-1"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Create VR Tour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 