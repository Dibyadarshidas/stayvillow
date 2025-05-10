'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample experiences data for Adventure & Outdoors collection
const adventureExperiences = [
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
  },
  {
    id: 9,
    title: "Paragliding in Bir Billing",
    description: "Experience the thrill of paragliding in one of the world's best paragliding destinations. Soar above the Himalayan foothills with certified instructors.",
    price: "₹3,000",
    duration: "2 hours",
    rating: 4.9,
    reviews: 105,
    image: "https://images.unsplash.com/photo-1503789616460-b70736068a4b?w=800&auto=format&fit=crop&q=80",
    location: "Bir Billing, Himachal Pradesh",
    categories: ["Adventure", "Adrenaline"],
    availableDates: ["Daily (weather permitting)"]
  },
  {
    id: 10,
    title: "Scuba Diving in Andaman",
    description: "Discover the vibrant underwater world of the Andaman Sea. This beginner-friendly scuba diving experience includes training and guided dives at beautiful coral reefs.",
    price: "₹5,500",
    duration: "5 hours",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    location: "Havelock Island, Andaman",
    categories: ["Adventure", "Water Sports"],
    availableDates: ["Mon", "Wed", "Fri", "Sun"]
  }
];

export default function AdventureOutdoorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter experiences based on search
  const filteredExperiences = adventureExperiences.filter(exp => {
    return searchTerm === '' || 
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden mb-8">
        <Image
          src="https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=1600&auto=format&fit=crop&q=80"
          alt="Adventure & Outdoors Experiences"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-lg">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Adventure & Outdoors</h1>
            <p className="text-white/90">Thrilling experiences in India's most spectacular natural settings</p>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-cyan-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/experiences" className="hover:text-cyan-600">Experiences</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Adventure & Outdoors</span>
        </nav>
      </div>
      
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Adventure & Outdoors Experiences</h2>
        <p className="text-gray-600 max-w-3xl">
          From trekking in the Himalayas to wildlife safaris and water sports, these adventures offer the perfect blend of excitement and natural beauty. Explore India's diverse landscapes with experienced guides and create unforgettable memories.
        </p>
      </div>
      
      {/* Search */}
      <div className="relative w-full md:w-64 mb-8">
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
      
      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
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
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium inline-flex items-center gap-2"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
      
      {/* Other Collections */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Explore Other Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Cultural Immersion", image: "https://images.unsplash.com/photo-1561704061-7b246d89655c?w=800&auto=format&fit=crop&q=80" },
            { name: "Food & Cooking", image: "https://images.unsplash.com/photo-1556911073-a517e752729c?w=800&auto=format&fit=crop&q=80" },
            { name: "Wellness Retreats", image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=80" },
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-semibold text-lg text-center">{collection.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 