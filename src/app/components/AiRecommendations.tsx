'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const recommendationCategories = [
  { id: 'trending', name: 'Trending Now' },
  { id: 'family', name: 'Family-Friendly' },
  { id: 'romantic', name: 'Romantic Getaways' },
  { id: 'adventure', name: 'Adventure Seekers' },
  { id: 'work', name: 'Work & Stay' }
];

const recommendations = {
  trending: [
    {
      id: 't1',
      title: 'Hill Station Getaway with Valley Views',
      location: 'Nainital, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹7,500 - ₹12,000',
      match: 98,
      tags: ['Mountain', 'Scenic', 'Popular']
    },
    {
      id: 't2',
      title: 'Modern Beach House with Private Pool',
      location: 'Alibaug, Maharashtra',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹15,000 - ₹22,000',
      match: 95,
      tags: ['Beach', 'Pool', 'Luxury']
    },
    {
      id: 't3',
      title: 'Heritage Boutique Hotel',
      location: 'Jaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹8,500 - ₹14,000',
      match: 91,
      tags: ['Heritage', 'Cultural', 'Design']
    }
  ],
  family: [
    {
      id: 'f1',
      title: 'Spacious Villa with Garden & Pool',
      location: 'Lonavala, Maharashtra',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹12,000 - ₹18,000',
      match: 97,
      tags: ['Pool', 'Garden', 'Family']
    },
    {
      id: 'f2',
      title: 'Kid-Friendly Resort with Activities',
      location: 'Coorg, Karnataka',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹9,500 - ₹15,000',
      match: 94,
      tags: ['Activities', 'Resort', 'Nature']
    }
  ],
  romantic: [
    {
      id: 'r1',
      title: 'Treehouse for Two with Lake View',
      location: 'Munnar, Kerala',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹11,000 - ₹16,000',
      match: 99,
      tags: ['Romantic', 'Unique', 'Private']
    },
    {
      id: 'r2',
      title: 'Elegant Houseboat for Couples',
      location: 'Alleppey, Kerala',
      image: 'https://images.unsplash.com/photo-1624685171483-e80c91b3c4cf?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹7,800 - ₹12,500',
      match: 96,
      tags: ['Waterfront', 'Romantic', 'Scenic']
    }
  ],
  adventure: [
    {
      id: 'a1',
      title: 'Cliff-side Tent with Trekking Trails',
      location: 'Bir Billing, Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹4,500 - ₹8,000',
      match: 98,
      tags: ['Adventure', 'Trekking', 'Views']
    },
    {
      id: 'a2',
      title: 'Jungle Cottage with Wildlife Tours',
      location: 'Jim Corbett, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹6,500 - ₹11,000',
      match: 93,
      tags: ['Wildlife', 'Nature', 'Adventure']
    }
  ],
  work: [
    {
      id: 'w1',
      title: 'Modern Apartment with Workstation',
      location: 'Bengaluru, Karnataka',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹5,000 - ₹9,000',
      match: 96,
      tags: ['Workspace', 'WiFi', 'Urban']
    },
    {
      id: 'w2',
      title: 'Hill View Cabin with High-Speed Internet',
      location: 'Dharamshala, Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹7,200 - ₹12,500',
      match: 92,
      tags: ['Remote Work', 'Views', 'Quiet']
    }
  ]
};

export default function AiRecommendations() {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState([
    'Beach destinations',
    'Mountain views',
    'Private pools',
    'Pet-friendly'
  ]);
  
  // Simulate AI loading when changing categories
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
            AI-Powered Recommendations
          </h2>
          <p className="text-sm text-gray-600 mt-1">Tailored stays based on your preferences and browsing patterns</p>
        </div>
        
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-700 text-sm font-medium border border-cyan-200 hover:bg-cyan-100 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
          Update Preferences
        </button>
      </div>
      
      {/* AI Preferences Pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {userPreferences.map((pref, index) => (
          <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-gray-200">
            <svg width="12" height="12" fill="currentColor" className="text-cyan-600">
              <path d="M20 4v13a3 3 0 01-3 3H7a3 3 0 01-3-3V4"></path>
              <path d="M16 3H8a2 2 0 00-2 2v0a2 2 0 002 2h8a2 2 0 002-2v0a2 2 0 00-2-2z"></path>
              <path d="M12 3v0"></path>
              <path d="M12 16v0"></path>
              <path d="M16 8h0"></path>
              <path d="M16 12h0"></path>
              <path d="M8 8h0"></path>
              <path d="M8 12h0"></path>
            </svg>
            {pref}
            <button className="text-gray-500 hover:text-gray-700">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        ))}
        <button className="flex items-center gap-1 px-3 py-1.5 bg-white/50 rounded-full text-xs font-medium text-gray-600 hover:bg-white/80 transition-colors">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
          Add Preference
        </button>
      </div>
      
      {/* Category Navigation */}
      <div className="flex space-x-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {recommendationCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Recommendation Cards */}
      <div className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl z-10">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-medium text-gray-700">Analyzing your preferences...</p>
            </div>
          </div>
        ) : null}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations[activeCategory].map((item) => (
            <div 
              key={item.id} 
              className="bg-white/40 backdrop-blur-md rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-white/50 relative"
            >
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-600/90 to-blue-600/90 rounded-full text-white text-xs font-bold shadow-md">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10l-6-6m6 6l-6 6m6-6H3"></path>
                </svg>
                {item.match}% Match
              </div>
              
              <div className="relative aspect-[5/3] overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={400}
                  height={240}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <div className="flex gap-1.5">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="text-xs font-medium px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-cyan-700 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-base line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1 mb-2">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {item.location}
                </p>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <div className="font-bold text-cyan-700">{item.priceRange}</div>
                  <button className="px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-lg text-sm font-medium border border-cyan-200 hover:bg-cyan-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
              
              {/* Why recommended tooltip */}
              <div className="absolute -bottom-12 left-0 right-0 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <p className="text-xs text-gray-600">Recommended based on your interest in {item.tags[0].toLowerCase()} properties and {item.location} searches.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 bg-gradient-to-r from-cyan-100 to-blue-100 p-4 rounded-xl border border-cyan-200">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white p-2 rounded-lg shadow-md">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="M14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
              <path d="M7.5 19a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
              <path d="M12 12L7.5 14.5"></path>
              <path d="M12 7v5"></path>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 text-sm">How AI Recommendations Work</h3>
            <p className="text-xs text-gray-600 mt-1 mb-2">
              Our system analyzes your browsing patterns, saved properties, and preferences to suggest stays that match your unique travel style.
            </p>
            <button className="text-xs text-cyan-600 font-medium flex items-center gap-1">
              Learn more about our AI
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 