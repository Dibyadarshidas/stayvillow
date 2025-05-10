'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample virtual tour data
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
    description: "Experience this stunning beachfront villa with panoramic ocean views. The 360° virtual tour showcases the infinity pool, luxury interiors, and direct beach access.",
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
    description: "Immerse yourself in mountain luxury with this virtual tour of our spa retreat. Explore the panoramic mountain views, indoor heated pool, and peaceful meditation spaces.",
    link: "/virtual-tours/mountain-retreat-spa"
  },
  {
    id: 3,
    title: "Panoramic Mountain Villa",
    location: "Manali, Himachal Pradesh",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.95,
    reviews: 88,
    price: "₹14,000 - ₹20,000",
    description: "Explore stunning 360° views of the Himalayan range from this luxury villa. The virtual tour shows the glass-walled living areas, mountain-view bedrooms, and outdoor jacuzzi.",
    link: "/virtual-tours/panoramic-mountain-villa"
  },
  {
    id: 4,
    title: "Heritage Haveli Suite",
    location: "Jaipur, Rajasthan",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.89,
    reviews: 63,
    price: "₹16,000 - ₹22,000",
    description: "Step into historic luxury with this virtual tour of our heritage haveli. Explore the ornate architecture, courtyard with fountain, and traditional Rajasthani interiors.",
    link: "/virtual-tours/heritage-haveli-suite"
  },
  {
    id: 5,
    title: "Lakeside Houseboat",
    location: "Alleppey, Kerala",
    thumbnail: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579033385971-a7bc8c6f8c64?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.82,
    reviews: 47,
    price: "₹9,000 - ₹14,000",
    description: "Experience Kerala's backwaters with this virtual tour of our luxury houseboat. View the traditional kettuvallam design with modern amenities and panoramic water views.",
    link: "/virtual-tours/lakeside-houseboat"
  },
  {
    id: 6,
    title: "Modern Treehouse",
    location: "Coorg, Karnataka",
    thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590073844006-33659c8d6bf3?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.91,
    reviews: 58,
    price: "₹11,000 - ₹15,000",
    description: "Tour our elevated treehouse experience with this immersive virtual walkthrough. Explore the canopy-level deck, glass-walled bedroom, and surrounding coffee plantation views.",
    link: "/virtual-tours/modern-treehouse"
  }
];

export default function VirtualToursPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter virtual tours based on active category and search term
  const filteredTours = virtualTours.filter(tour => {
    const matchesCategory = activeCategory === 'all' || 
      (activeCategory === 'luxury' && tour.price.includes('18,000')) ||
      (activeCategory === 'beach' && tour.location.toLowerCase().includes('goa')) ||
      (activeCategory === 'mountain' && (tour.location.toLowerCase().includes('himalaya') || tour.location.toLowerCase().includes('shimla') || tour.location.toLowerCase().includes('manali')));
    
    const matchesSearch = searchTerm === '' ||
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Virtual Tours Experience</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          Explore our properties in immersive 360° virtual reality before booking. Take a virtual walk through your next dream vacation stay from the comfort of your home.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            All Tours
          </button>
          <button 
            onClick={() => setActiveCategory('luxury')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === 'luxury'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            Luxury
          </button>
          <button 
            onClick={() => setActiveCategory('beach')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === 'beach'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            Beach
          </button>
          <button 
            onClick={() => setActiveCategory('mountain')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === 'mountain'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            Mountain
          </button>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search virtual tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Tour Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour) => (
          <div 
            key={tour.id}
            className="bg-white/40 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={tour.thumbnail}
                alt={tour.title}
                width={400}
                height={300}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* VR Indicator */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-800">360° TOUR</span>
              </div>
              
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{tour.title}</h3>
                <p className="text-white/90 text-sm flex items-center gap-1">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {tour.location}
                </p>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                  <svg width="16" height="16" fill="currentColor" className="text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <span className="font-medium text-sm">{tour.rating}</span>
                  <span className="text-xs text-gray-500">({tour.reviews})</span>
                </div>
                <div className="text-cyan-600 font-medium">{tour.price.split(' ')[0]}</div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
              
              <div className="flex gap-3">
                <Link 
                  href={tour.link} 
                  className="flex-1 px-4 py-2 border border-cyan-600 text-cyan-600 bg-white text-sm font-medium rounded-lg hover:bg-cyan-50 transition-colors text-center"
                >
                  View Property
                </Link>
                <Link 
                  href={`${tour.link}/vr-tour`} 
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-1"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                  Start VR Tour
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTours.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">No virtual tours found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium inline-flex items-center gap-2"
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {/* Interactive VR Guide */}
      <div className="mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-8 border border-cyan-100 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">How to Use Our Virtual Tours</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4 text-white font-bold">1</div>
            <h4 className="font-bold text-gray-800 mb-2">Select a Property</h4>
            <p className="text-gray-600 text-sm">Browse our collection of properties with virtual tours and select one that interests you.</p>
          </div>
          
          <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4 text-white font-bold">2</div>
            <h4 className="font-bold text-gray-800 mb-2">Navigate the Tour</h4>
            <p className="text-gray-600 text-sm">Use your mouse, keyboard arrows, or touch screen to move around and explore the property in 360°.</p>
          </div>
          
          <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4 text-white font-bold">3</div>
            <h4 className="font-bold text-gray-800 mb-2">Book Your Stay</h4>
            <p className="text-gray-600 text-sm">Once you&apos;ve explored the property virtually, you can book with confidence knowing exactly what to expect.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/help/virtual-tour-guide" className="text-cyan-600 font-medium hover:underline">
            Learn more about our VR technologies
          </Link>
        </div>
      </div>
    </div>
  );
} 