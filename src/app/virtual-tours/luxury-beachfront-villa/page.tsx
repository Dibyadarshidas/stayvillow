'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LuxuryBeachfrontVillaPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const propertyInfo = {
    title: "Luxury Beachfront Villa",
    location: "Goa, India",
    rating: 4.92,
    reviews: 76,
    price: "₹12,000 - ₹18,000",
    description: "Experience this stunning beachfront villa with panoramic ocean views. The 360° virtual tour showcases the infinity pool, luxury interiors, and direct beach access.",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1500&q=90",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1500&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=90",
      "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&w=1500&q=90",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1500&q=90",
    ]
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{propertyInfo.title}</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{propertyInfo.location}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
            <span>{propertyInfo.rating}</span>
            <span className="text-sm">({propertyInfo.reviews} reviews)</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image 
            src={propertyInfo.images[0]} 
            alt={propertyInfo.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {propertyInfo.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative h-[190px] rounded-xl overflow-hidden">
              <Image 
                src={image} 
                alt={`${propertyInfo.title} view ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex border-b mb-6">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-600'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 font-medium ${activeTab === 'features' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-600'}`}
          >
            Features
          </button>
          <button 
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2 font-medium ${activeTab === 'location' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-600'}`}
          >
            Location
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-600'}`}
          >
            Reviews
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="text-gray-700 mb-6">
              {propertyInfo.description}
            </p>
            
            <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Experience in Virtual Reality</h3>
              <p className="text-gray-700 mb-4">
                Take a virtual tour of this property before booking! Our 360° panoramic view lets you explore every room as if you were there in person.
              </p>
              <Link
                href="/virtual-tours/luxury-beachfront-villa/vr-tour"
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                </svg>
                Start VR Tour
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="mb-4">
              <span className="block text-2xl font-bold text-cyan-600">{propertyInfo.price.split(' ')[0]}</span>
              <span className="text-gray-500">per night</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Guests</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                  <option>5+ guests</option>
                </select>
              </div>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg mb-4">
              Book Now
            </button>
            
            <button className="w-full py-3 border border-cyan-600 text-cyan-600 font-medium rounded-lg">
              Contact Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 