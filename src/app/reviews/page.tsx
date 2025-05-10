'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample reviews data
const allReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    text: "We had an amazing stay at the villa in Goa. The host was incredibly helpful and the property was even better than the pictures!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    date: "April 2023",
    propertyName: "Luxury Beach Villa",
    propertyId: 1,
    categories: ["Cleanliness", "Communication", "Value"]
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Bangalore",
    text: "Stayvillow made our family vacation to Kerala so easy to plan. The booking process was seamless and the property was perfect for our needs.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    rating: 4,
    date: "March 2023",
    propertyName: "Lakeside Retreat",
    propertyId: 3,
    categories: ["Location", "Accuracy", "Value"]
  },
  {
    id: 3,
    name: "Ananya Gupta",
    location: "Delhi",
    text: "The mountain cabin exceeded our expectations. The views were breathtaking and the amenities were top-notch. Would definitely book again!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    date: "February 2023",
    propertyName: "Mountain View Cabin",
    propertyId: 2,
    categories: ["Cleanliness", "Location", "Amenities"]
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    text: "Our stay at the Heritage Haveli was a cultural experience like no other. The architecture and decor transported us back in time while still providing modern comforts.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    date: "January 2023",
    propertyName: "Heritage Haveli Suite",
    propertyId: 4,
    categories: ["Authenticity", "Comfort", "Service"]
  },
  {
    id: 5,
    name: "Meera Patel",
    location: "Ahmedabad",
    text: "The beachfront cottage was the perfect getaway. Falling asleep to the sound of waves and waking up to a gorgeous sunrise made our honeymoon unforgettable.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    date: "December 2022",
    propertyName: "Beachfront Cottage",
    propertyId: 5,
    categories: ["Romance", "Privacy", "Views"]
  },
  {
    id: 6,
    name: "Arjun Nair",
    location: "Kochi",
    text: "The treehouse was such a unique experience for our family. Our kids loved the adventure and we appreciated the eco-friendly approach of the property.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=80",
    rating: 4,
    date: "November 2022",
    propertyName: "Mountain Treehouse",
    propertyId: 6,
    categories: ["Uniqueness", "Family-friendly", "Nature"]
  },
  {
    id: 7,
    name: "Neha Kapoor",
    location: "Kolkata",
    text: "The cooking class in Delhi was the highlight of our trip! We learned so much about Indian spices and techniques that we've been able to recreate at home.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    date: "October 2022",
    propertyName: "Cooking Class in Delhi",
    propertyId: null,
    experienceId: 1,
    categories: ["Learning", "Cultural", "Value"]
  },
  {
    id: 8,
    name: "Sanjay Verma",
    location: "Pune",
    text: "The yoga retreat in Rishikesh was exactly what I needed. The instructors were knowledgeable and the setting by the Ganges was incredibly peaceful.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    date: "September 2022",
    propertyName: "Yoga Retreat in Rishikesh",
    propertyId: null,
    experienceId: 2,
    categories: ["Wellness", "Instruction", "Environment"]
  }
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filter reviews based on selected filter
  const filteredReviews = allReviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'stays') return review.propertyId !== null;
    if (filter === 'experiences') return review.experienceId !== null;
    if (filter === '5star') return review.rating === 5;
    return true;
  });

  // Sort reviews based on selected sort option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      // Sort by date (assuming more recent dates have higher IDs in our sample data)
      return b.id - a.id;
    } else if (sortBy === 'rating') {
      // Sort by rating (highest first)
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Guest Reviews</h1>
          <p className="text-gray-600 mb-6">
            Read authentic reviews from guests who have experienced our properties and activities.
          </p>
          
          {/* Filter and Sort Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm ${filter === 'all' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All Reviews
              </button>
              <button 
                onClick={() => setFilter('stays')}
                className={`px-4 py-2 rounded-full text-sm ${filter === 'stays' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Stays
              </button>
              <button 
                onClick={() => setFilter('experiences')}
                className={`px-4 py-2 rounded-full text-sm ${filter === 'experiences' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Experiences
              </button>
              <button 
                onClick={() => setFilter('5star')}
                className={`px-4 py-2 rounded-full text-sm ${filter === '5star' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                5-Star Reviews
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border border-gray-200">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">"{review.text}"</p>
              
              <div className="mb-4">
                <Link 
                  href={review.propertyId ? `/property/${review.propertyId}` : review.experienceId ? `/experiences/${review.experienceId}` : '#'} 
                  className="text-cyan-600 text-sm font-medium hover:underline"
                >
                  {review.propertyName}
                </Link>
                <span className="text-xs text-gray-500 ml-2">• {review.date}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {review.categories.map((category, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              &lt;
            </button>
            <button className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center">
              1
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              3
            </button>
            <span className="mx-2">...</span>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 