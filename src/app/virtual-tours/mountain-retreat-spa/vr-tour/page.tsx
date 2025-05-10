'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function VRTourPage() {
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [rotationPosition, setRotationPosition] = useState(0);
  const tourContainerRef = useRef(null);
  const router = useRouter();
  
  // VR Tour images - in a real app, these would be high-resolution 360° panoramas
  const tourImages = [
    "/vr-tours/mountain-spa-1.jpg",
    "/vr-tours/mountain-spa-2.jpg",
    "/vr-tours/mountain-spa-3.jpg",
    "/vr-tours/mountain-spa-4.jpg",
    "/vr-tours/mountain-spa-5.jpg",
  ];
  
  // Fallback images if VR tour folder doesn't exist yet
  const fallbackImages = [
    "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=1500&q=90",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1500&q=90",
    "https://images.unsplash.com/photo-1595514535215-9a3f0f8a1b2a?auto=format&fit=crop&w=1500&q=90",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1500&q=90",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1500&q=90",
  ];
  
  // Property information
  const propertyInfo = {
    title: "Mountain Retreat with Spa",
    location: "Shimla, Himachal Pradesh",
    price: "₹10,500 - ₹16,000",
    description: "Immerse yourself in mountain luxury with this spa retreat. Explore the panoramic mountain views, indoor heated pool, and peaceful meditation spaces."
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-rotate effect
  useEffect(() => {
    let rotationInterval;
    
    if (isRotating) {
      rotationInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tourImages.length);
      }, 2000);
    }
    
    return () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [isRotating, tourImages.length]);
  
  // Mouse and touch event handlers for manual rotation
  const handleDragStart = (clientX) => {
    setIsRotating(false);
    setDragStart(clientX);
  };
  
  const handleDragMove = (clientX) => {
    if (dragStart === 0) return;
    
    const dragDistance = clientX - dragStart;
    const containerWidth = tourContainerRef.current?.offsetWidth || 1000;
    const rotationIncrement = (dragDistance / containerWidth) * 100;
    
    setRotationPosition((prev) => {
      const newPosition = prev + rotationIncrement;
      // Determine if we should move to next/previous image
      if (newPosition > 50) {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === 0 ? tourImages.length - 1 : prevIndex - 1
        );
        return 0;
      } else if (newPosition < -50) {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % tourImages.length
        );
        return 0;
      }
      return newPosition;
    });
    
    setDragStart(clientX);
  };
  
  const handleDragEnd = () => {
    setDragStart(0);
    setRotationPosition(0);
  };
  
  const handleMouseDown = (e) => {
    handleDragStart(e.clientX);
  };
  
  const handleMouseMove = (e) => {
    if (dragStart !== 0) {
      handleDragMove(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    handleDragEnd();
  };
  
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    handleDragEnd();
  };
  
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };
  
  // Handle navigation between rooms
  const goToNextRoom = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tourImages.length);
  };
  
  const goToPrevRoom = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? tourImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="bg-black/80 backdrop-blur-lg text-white p-4 sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/virtual-tours" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            <span>Exit VR Tour</span>
          </Link>
          
          <h1 className="text-xl font-bold">{propertyInfo.title}</h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleRotation}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                isRotating 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16"></path>
                <path d="M2 12c0-6 4.39-10 9.806-10C16.209 2 19.76 4.335 21 8"></path>
                <path d="M22 12h-4"></path>
                <path d="M6 12H2"></path>
                <path d="M18 8l3 4-3 4"></path>
                <path d="M6 16l-3-4 3-4"></path>
              </svg>
              {isRotating ? 'Stop Auto-Rotate' : 'Auto-Rotate'}
            </button>
            
            <Link 
              href="/property/2"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
            >
              Book This Property
            </Link>
          </div>
        </div>
      </div>
      
      {/* VR Tour View */}
      <div 
        ref={tourContainerRef}
        className="flex-1 relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-cyan-500 border-cyan-100/30 rounded-full animate-spin mb-4"></div>
            <p className="text-white text-xl font-medium">Loading VR Experience...</p>
            <p className="text-white/60 text-sm mt-2">Preparing high-resolution panoramic views</p>
          </div>
        )}
        
        {/* Main VR image */}
        <div className="relative h-[calc(100vh-4rem)] w-full">
          <Image
            src={fallbackImages[currentImageIndex]}
            alt={`Virtual tour view ${currentImageIndex + 1}`}
            fill
            className="object-cover transform transition-transform duration-300"
            style={{ 
              transform: `translateX(${rotationPosition}px)` 
            }}
            unoptimized
          />
          
          {/* Navigation arrows */}
          <button 
            onClick={goToPrevRoom}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          
          <button 
            onClick={goToNextRoom}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
          
          {/* Draggable indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white bg-black/70 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 9l4-4 4 4"></path>
              <path d="M5 15l4 4 4-4"></path>
              <path d="M19 9l-4-4-4 4"></path>
              <path d="M19 15l-4 4-4-4"></path>
            </svg>
            Drag to look around
          </div>
        </div>
      </div>
      
      {/* Bottom Control Panel */}
      <div className="bg-black/80 backdrop-blur-lg text-white p-4 border-t border-white/10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-semibold">{propertyInfo.title}</h2>
            <p className="text-white/70 text-sm">{propertyInfo.location} • {propertyInfo.price}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: tourImages.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentImageIndex === index
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Link 
              href="/property/2"
              className="px-4 py-2 bg-white text-black rounded-lg text-sm hover:bg-white/80 transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-4 py-2 rounded-lg text-sm ${
                isRotating
                  ? 'bg-cyan-600 text-white'
                  : 'border border-white/20 text-white hover:bg-white/10'
              }`}
            >
              {isRotating ? 'Pause Tour' : 'Start Tour'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 