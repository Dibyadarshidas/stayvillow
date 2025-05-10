'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample experiences data
const experiencesList = [
  {
    id: 1,
    title: "Cooking Class in Delhi",
    description: "Learn authentic North Indian cuisine from expert local chefs. Master the art of spice blending and traditional cooking techniques in this hands-on experience.",
    price: "₹2,500",
    duration: "3 hours",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80",
    location: "Delhi, India",
    categories: ["Cooking", "Cultural"],
    availableDates: ["Mon", "Wed", "Fri", "Sat"]
  },
  {
    id: 2,
    title: "Yoga Retreat in Rishikesh",
    description: "Experience traditional yoga in the spiritual capital of India. Daily sessions by the Ganges River with certified yoga masters in a peaceful ashram setting.",
    price: "₹3,800",
    duration: "4 hours",
    rating: 5.0,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    location: "Rishikesh, Uttarakhand",
    categories: ["Wellness", "Spiritual"],
    availableDates: ["Daily"]
  },
  {
    id: 3,
    title: "Wildlife Safari in Ranthambore",
    description: "Explore the wilderness of Ranthambore National Park in an open jeep safari. Spot tigers, leopards, and diverse wildlife in their natural habitat.",
    price: "₹4,500",
    duration: "6 hours",
    rating: 4.8,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    location: "Ranthambore, Rajasthan",
    categories: ["Adventure", "Wildlife"],
    availableDates: ["Tue", "Thu", "Sat", "Sun"]
  },
  {
    id: 4,
    title: "Boat Tour of Varanasi Ghats",
    description: "Witness the spiritual rituals at dawn with a serene boat ride along the historic Varanasi ghats. Experience the morning aarti and local traditions.",
    price: "₹1,800",
    duration: "2 hours",
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&auto=format&fit=crop&q=80",
    location: "Varanasi, Uttar Pradesh",
    categories: ["Cultural", "Spiritual"],
    availableDates: ["Daily"]
  },
  {
    id: 5,
    title: "Goan Spice Plantation Tour",
    description: "Walk through aromatic spice plantations with expert guides explaining organic farming practices. Includes traditional Goan lunch made with fresh spices.",
    price: "₹2,200",
    duration: "5 hours",
    rating: 4.6,
    reviews: 83,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop&q=80",
    location: "Ponda, Goa",
    categories: ["Nature", "Culinary"],
    availableDates: ["Mon", "Wed", "Fri"]
  },
  {
    id: 6,
    title: "Himalayan Trek with Guide",
    description: "Trek through scenic Himalayan trails with experienced local guides. Discover hidden viewpoints and learn about mountain ecology and culture.",
    price: "₹3,500",
    duration: "8 hours",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=800&auto=format&fit=crop&q=80",
    location: "Mcleodganj, Himachal Pradesh",
    categories: ["Adventure", "Nature"],
    availableDates: ["Tue", "Thu", "Sat", "Sun"]
  }
];

// Experience categories
const categories = [
  "All",
  "Cultural",
  "Adventure",
  "Wellness",
  "Culinary",
  "Wildlife",
  "Spiritual",
  "Nature"
];

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter experiences based on category and search
  const filteredExperiences = experiencesList.filter(exp => {
    const matchesCategory = activeCategory === 'All' || exp.categories.includes(activeCategory);
    const matchesSearch = searchTerm === '' || 
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Unique Experiences</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore authentic local experiences curated by our experts. From cooking classes to wildlife safaris, immerse yourself in Indian culture and create unforgettable memories.
        </p>
      </div>
      
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&auto=format&fit=crop&q=80"
          alt="Unique Indian Experiences"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-lg">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">Experience the Real India</h2>
            <p className="text-white/90 mb-6">Handpicked experiences that connect you with authentic Indian culture, cuisine, and traditions</p>
            <div className="flex gap-3">
              <Link href="#experiences" className="px-5 py-2.5 bg-white text-cyan-700 rounded-lg font-medium shadow-md hover:shadow-lg">
                Browse Experiences
              </Link>
              <Link href="/experiences/gift" className="px-5 py-2.5 bg-white/20 text-white backdrop-blur-sm rounded-lg font-medium border border-white/30 hover:bg-white/30">
                Gift an Experience
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Experiences Grid */}
      <div id="experiences" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((experience) => (
            <Link 
              key={experience.id}
              href={`/experiences/${experience.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={80}
                  loading="eager"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[var(--color-primary)]">
                  {experience.rating} ★ ({experience.reviews})
                </div>
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {experience.categories.map((cat) => (
                    <span 
                      key={cat} 
                      className="text-xs px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full text-white"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {experience.location}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {experience.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {experience.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[var(--color-primary)] font-bold">{experience.price}</div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {experience.duration}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Available: <span className="font-medium">{experience.availableDates.join(', ')}</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">No experiences found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium inline-flex items-center gap-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Featured Collections */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Curated Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Cultural Immersion", image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&auto=format&fit=crop&q=80" },
            { name: "Adventure & Outdoors", image: "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=800&auto=format&fit=crop&q=80" },
            { name: "Food & Cooking", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80" },
            { name: "Wellness Retreats", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80" },
          ].map((collection, index) => (
            <Link
              key={index}
              href={`/experiences/collections/${collection.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative h-40 rounded-lg overflow-hidden group"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                loading="eager"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-semibold text-lg text-center">{collection.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Become a Host CTA */}
      <div className="mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-8 border border-cyan-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Share Your Expertise</h3>
            <p className="text-gray-600 mb-6">
              Are you passionate about your city or have a unique skill to share? Join our community of experience hosts and earn by sharing your knowledge with travelers.
            </p>
            <Link 
              href="/host/experiences" 
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Become an Experience Host
            </Link>
          </div>
          <div className="md:w-1/3">
            <div className="relative h-40 md:h-60 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&auto=format&fit=crop&q=80"
                alt="Become an experience host"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="eager"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 