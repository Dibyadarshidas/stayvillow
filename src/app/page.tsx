"use client";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import PopularStays from "./components/PopularStays";
import VirtualTourPreview from "./components/VirtualTourPreview";
import AiRecommendations from "./components/AiRecommendations";
import TravelInspiration from "./components/TravelInspiration";
import { 
  getSeasonalRecommendations as getLocationSeasonalRecommendations
} from "./data/mockData";

// Transform properties for UI display
export const popularStays = [
  {
    id: "1",
    title: "Luxury Villa with Infinity Pool",
    location: "Goa, India",
    price: "₹15,000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=600&q=80",
    tag: "Trending",
    description: "Experience ultimate luxury in this stunning beachfront villa with a private infinity pool overlooking the Arabian Sea. Perfect for families and groups seeking an exclusive retreat."
  },
  {
    id: "2",
    title: "Himalayan Mountain Retreat",
    location: "Manali, India",
    price: "₹8,500",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80",
    tag: "Popular",
    description: "Nestled among pine forests with breathtaking views of snow-capped peaks, this cozy mountain cottage offers a perfect blend of rustic charm and modern comfort."
  },
  {
    id: "3",
    title: "Luxury Houseboat Experience",
    location: "Kerala, India",
    price: "₹12,000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80",
    tag: "Luxury",
    description: "Glide through Kerala's serene backwaters on this premium houseboat featuring elegant bedrooms, sun deck, and authentic Kerala cuisine prepared by your private chef."
  },
  {
    id: "4",
    title: "Royal Heritage Haveli",
    location: "Jaipur, India",
    price: "₹9,500",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80",
    tag: "New",
    description: "Step back in time at this meticulously restored 18th-century royal retreat featuring hand-painted frescoes, traditional courtyards, and luxury amenities fit for royalty."
  }
];

const experiences = [
  {
    id: 1,
    title: "Authentic Indian Cooking Masterclass",
    price: "₹2,500",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556911073-a517e752729c?w=800&auto=format&fit=crop&q=80",
    description: "Learn the secrets of traditional Indian cuisine from a master chef in this hands-on cooking class. Create authentic dishes using local spices and techniques passed down through generations."
  },
  {
    id: 2,
    title: "Sunrise Yoga by the Ganges",
    price: "₹3,800",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=80",
    description: "Begin your day with a transformative yoga session as the sun rises over the sacred Ganges River. This spiritual experience combines meditation, asanas, and breathwork in a serene natural setting."
  },
  {
    id: 3,
    title: "Tiger Safari Adventure",
    price: "₹4,500",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
    description: "Embark on an unforgettable wildlife safari through Ranthambore National Park with expert naturalists tracking Bengal tigers in their natural habitat. Includes jeep safari and photography guidance."
  },
  {
    id: 4,
    title: "Mystical Varanasi Dawn Boat Tour",
    price: "₹1,800",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&auto=format&fit=crop&q=80",
    description: "Witness the spiritual awakening of India's holiest city from a traditional wooden boat. Experience the mesmerizing Ganga Aarti ceremony and learn about ancient rituals from a knowledgeable local guide."
  }
];

// Trending locations for hero section
const trendingLocations = [
  {
    id: 1,
    name: "Goa",
    properties: 245,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    description: "Discover India's favorite beach destination with pristine shores, vibrant nightlife, and Portuguese-influenced architecture. From luxury beachfront villas to boutique heritage stays."
  },
  {
    id: 2,
    name: "Jaipur",
    properties: 189,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
    description: "Experience the majestic Pink City with its grand palaces, colorful bazaars, and rich Rajasthani culture. Stay in converted heritage havelis and modern luxury hotels."
  }
];

const categories = [
  { name: "Beachfront", icon: "🏖️", count: 89, description: "Wake up to stunning ocean views and direct beach access. Perfect for sun-seekers and water sports enthusiasts." },
  { name: "Mountain View", icon: "🏔️", count: 72, description: "Breathtaking panoramic vistas of majestic peaks. Ideal for nature lovers and adventure seekers." },
  { name: "Heritage Homes", icon: "🏛️", count: 45, description: "Stay in historically significant properties with authentic architecture and cultural significance." },
  { name: "Houseboats", icon: "⛵", count: 36, description: "Unique floating accommodations offering tranquil water views and a truly immersive experience." },
  { name: "Luxury Villas", icon: "🏡", count: 94, description: "Exclusive private residences with premium amenities, personalized service, and ultimate privacy." },
  { name: "Treehouses", icon: "🌳", count: 23, description: "Elevated eco-friendly retreats nestled among treetops for a magical forest experience." }
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Our stay at the beachfront villa in Goa exceeded all expectations! The property was even more stunning than the photos, with direct access to a pristine beach. The host arranged a surprise sunset dinner for my husband's birthday. We're already planning our return trip next year!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    stay: "Luxury Villa with Infinity Pool, Goa",
    date: "April 2023"
  },
  {
    name: "Rahul Mehta",
    location: "Bangalore",
    text: "The houseboat experience in Kerala's backwaters was truly magical. Waking up to misty waters and birds chirping, enjoying freshly prepared Kerala cuisine, and watching the sunset from the deck - it was the perfect escape from city life. The attention to detail and the knowledge of our guide made this a memorable family vacation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    rating: 5,
    stay: "Luxury Houseboat Experience, Kerala",
    date: "February 2023"
  }
];

// Seasonal recommendations based on current month
const getSeasonalRecommendations = () => {
  const currentMonth = new Date().getMonth(); // 0-11 (Jan-Dec)
  const recommendations = getLocationSeasonalRecommendations(currentMonth);
  
  // Define return type
  const result: {
    title: string;
    subtitle: string;
    recommendations: Array<{name: string; reason: string}>;
  } = {
    title: "",
    subtitle: "",
    recommendations: []
  };
  
  // If we have recommendations from our data
  if (recommendations && recommendations.length > 0) {
    // Winter season (November to February)
    if (currentMonth >= 10 || currentMonth <= 1) {
      result.title = "Winter Getaways";
      result.subtitle = "Perfect season for Rajasthan and Goa";
      result.recommendations = recommendations.map(rec => ({
        name: rec.location,
        reason: rec.description.substring(0, 30)
      }));
    }
    // Summer season (March to June)
    else if (currentMonth >= 2 && currentMonth <= 5) {
      result.title = "Summer Escapes";
      result.subtitle = "Beat the heat in these hill stations";
      result.recommendations = recommendations.map(rec => ({
        name: rec.location,
        reason: rec.description.substring(0, 30)
      }));
    }
    // Monsoon season (July to October)
    else {
      result.title = "Monsoon Magic";
      result.subtitle = "Experience lush landscapes and pleasant weather";
      result.recommendations = recommendations.map(rec => ({
        name: rec.location,
        reason: rec.description.substring(0, 30)
      }));
    }
  } else {
    // Fallback if no data-driven recommendations
    // Winter season (November to February)
    if (currentMonth >= 10 || currentMonth <= 1) {
      result.title = "Winter Getaways";
      result.subtitle = "Perfect season for Rajasthan and Goa";
      result.recommendations = [
        { name: "Goa", reason: "Perfect beach weather" },
        { name: "Rajasthan", reason: "Comfortable temperatures for exploring" },
        { name: "Kerala", reason: "Ideal climate for backwater cruises" }
      ];
    }
    // Summer season (March to June)
    else if (currentMonth >= 2 && currentMonth <= 5) {
      result.title = "Summer Escapes";
      result.subtitle = "Beat the heat in these hill stations";
      result.recommendations = [
        { name: "Himachal Pradesh", reason: "Cool mountain air" },
        { name: "Uttarakhand", reason: "Refreshing climate" },
        { name: "Sikkim", reason: "Pleasant weather and blooming flowers" }
      ];
    }
    // Monsoon season (July to October)
    else {
      result.title = "Monsoon Magic";
      result.subtitle = "Experience lush landscapes and pleasant weather";
      result.recommendations = [
        { name: "Western Ghats", reason: "Stunning waterfalls and greenery" },
        { name: "Coorg", reason: "Misty landscapes and coffee plantations" },
        { name: "Meghalaya", reason: "Living root bridges and rainfall" }
      ];
    }
  }
  
  return result;
};

// Trending searches
const trendingSearches = ["Goa Beach Villas", "Homestays in Manali", "Houseboats in Kerala", "Heritage Hotels in Jaipur", "Resorts with Private Pool"];

// Upcoming festivals
const upcomingFestivals = () => {
  const currentMonth = new Date().getMonth();
  
  if (currentMonth >= 9 && currentMonth <= 10) { // Oct-Nov
    return {
      title: "Diwali Special Getaways",
      text: "Experience the Festival of Lights with our curated stays featuring traditional decorations, special festive meals, and local celebrations.",
      icon: "✨",
      discount: "15% off on selected properties"
    };
  } else if (currentMonth >= 1 && currentMonth <= 2) { // Feb-Mar
    return {
      title: "Holi Celebration Packages",
      text: "Join authentic color festivities in Mathura, Vrindavan, or Jaipur with our special accommodation packages including festival guides.",
      icon: "🎨",
      discount: "10% off on group bookings"
    };
  } else if (currentMonth >= 7 && currentMonth <= 8) { // Aug-Sep
    return {
      title: "Ganesh Chaturthi Specials",
      text: "Witness grand celebrations in Mumbai and Pune with our centrally located properties offering easy access to pandals and processions.",
      icon: "🪔",
      discount: "Free airport transfers on 3+ night stays"
    };
  } else {
    return {
      title: "Seasonal Festival Experiences",
      text: "Discover India's rich cultural heritage through our specially curated stays coinciding with local festivals and celebrations.",
      icon: "🎭",
      discount: "Early bird discounts available"
    };
  }
};

export default function HomePage() {
  const festival = upcomingFestivals();
  const [scrollPosition, setScrollPosition] = useState(0);
  const seasonalRecommendation = getSeasonalRecommendations();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="w-full">
      {/* Enhanced Hero Section with Modern Design */}
      <section className="relative min-h-[95vh] md:min-h-[90vh] mb-8 md:mb-16 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-gradient-to-r z-10"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.4) 100%)'
            }}
          ></div>
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-5"></div>
          <Image
            src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2000&q=90"
            alt="Luxury villa with infinity pool"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover"
            style={{
              transform: `scale(${1 + scrollPosition * 0.0005}) translateY(${scrollPosition * 0.1}px)`,
              transition: 'transform 0.3s ease-out',
              filter: 'brightness(0.85)'
            }}
          />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row h-full container mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-12 md:pb-24">
          {/* Left Content: Search and Popular Stays */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-12 pb-8 flex flex-col justify-center">
            <div className="mt-4 mb-10 md:mb-14 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm md:text-base font-medium mb-5 md:mb-6 border border-white/20 hover:border-white/30 transition-all duration-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-semibold">Premium Getaways</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
                <span className="block mb-3">Discover <span className="italic font-normal">Extraordinary</span></span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-200 drop-shadow-sm">Destinations</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-12 max-w-xl leading-relaxed font-light tracking-wide">
                Experience luxury villas and unique retreats across India&apos;s most stunning locations.
              </p>
              
              {/* Enhanced Stats with Modern Design */}
              <div className="grid grid-cols-3 gap-4 md:flex md:gap-10 mb-8 md:mb-12 px-4 md:px-6 py-4 md:py-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-1">
                    <span className="font-serif">2,500</span>
                    <span className="text-cyan-300 text-xl md:text-3xl">+</span>
                  </div>
                  <div className="text-white/70 text-sm md:text-base font-light">Luxury properties</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-1">
                    <span className="font-serif">4.8</span>
                    <span className="text-cyan-300 text-xl md:text-3xl">/5</span>
                  </div>
                  <div className="text-white/70 text-sm md:text-base font-light">Guest satisfaction</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-1">
                    <span className="font-serif">100K</span>
                    <span className="text-cyan-300 text-xl md:text-3xl">+</span>
                  </div>
                  <div className="text-white/70 text-sm md:text-base font-light">Happy travelers</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Search Box */}
            <div className="mb-8 md:mb-12 bg-white/10 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/20 shadow-xl hover:border-white/30 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <SearchBox />
            </div>
            
            {/* Enhanced Trending Categories */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-white/10 hover:border-white/20 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <div className="text-white font-medium mb-3 md:mb-4 text-base md:text-lg flex items-center gap-2">
                <span className="w-1.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                <span className="font-serif">Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {trendingSearches.map((search, index) => (
                  <button 
                    key={index}
                    className="px-4 md:px-5 py-2 md:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm md:text-base font-light transition-all duration-300 hover:shadow-md border border-white/10 hover:border-white/30 hover:translate-y-[-2px]"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Enhanced Seasonal Alert */}
            <div className="bg-gradient-to-r from-cyan-600/70 to-blue-600/70 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start gap-4 md:gap-5">
                <div className="bg-white/20 p-3 md:p-4 rounded-xl shadow-inner hidden sm:flex items-center justify-center">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium font-serif text-lg md:text-xl">{seasonalRecommendation.title}</h3>
                  <p className="text-white/90 text-sm md:text-base mb-3 md:mb-4 font-light">{seasonalRecommendation.subtitle}</p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {seasonalRecommendation.recommendations.map((rec, index) => (
                      <span key={index} className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-full text-white text-sm border border-white/20 cursor-pointer font-light">
                        {rec.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content: Featured Properties & Experiences */}
          <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 flex items-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-300 shadow-2xl w-full animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <div className="p-5 md:p-7">
                <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4 md:mb-6 flex items-center gap-2 font-serif">
                  <span className="w-2 h-7 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full inline-block"></span>
                  Featured Experiences
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  {experiences.slice(0, 2).map((exp) => (
                    <div 
                      key={exp.id} 
                      className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-500"
                    >
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        width={400}
                        height={300}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                        quality={95}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                        <h3 className="text-white font-medium text-lg md:text-xl group-hover:text-cyan-200 transition-colors font-serif">{exp.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-cyan-300 font-semibold text-base md:text-lg">{exp.price}</div>
                          <div className="flex items-center gap-1 text-white/90 text-sm md:text-base">
                            <svg width="16" height="16" fill="currentColor" className="text-yellow-400">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                            {exp.rating}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 group-hover:h-full transition-all duration-500 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                          <Link 
                            href={`/experiences/${exp.id}`}
                            className="px-4 md:px-5 py-2 md:py-2.5 bg-white text-cyan-700 rounded-lg font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-sm md:text-base"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="relative rounded-xl overflow-hidden aspect-video mb-6 md:mb-8 shadow-lg group">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90"
                    alt="Luxury villa panorama"
                    width={600}
                    height={350}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
                    quality={95}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 md:p-7">
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm md:text-base font-light mb-3 md:mb-4 w-auto max-w-max border border-white/30">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      360° Virtual Tours
                    </div>
                    <h3 className="text-white font-semibold text-xl md:text-2xl font-serif">Panoramic Mountain Villa</h3>
                    <p className="text-white/80 text-sm md:text-base mb-4 md:mb-5 font-light">Experience stunning 360° views of the Himalayan range</p>
                    <Link 
                      href="/virtual-tours/panoramic-mountain-villa"
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2 md:gap-3 w-auto max-w-max group-hover:translate-y-[-2px]"
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                      Book a Virtual Tour
                    </Link>
                  </div>
                </div>
                
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 md:mb-5 flex items-center gap-2 font-serif">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full inline-block"></span>
                  Trending Locations
                </h2>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {trendingLocations.map((location) => (
                    <Link 
                      key={location.id}
                      href={`/search?location=${location.name}`}
                      className="group relative rounded-xl overflow-hidden aspect-square shadow-lg hover:shadow-xl transition-all duration-300 block"
                    >
                      <Image
                        src={location.image}
                        alt={location.name}
                        width={300}
                        height={300}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                        quality={95}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 transform translate-y-0 group-hover:translate-y-[-2px] transition-transform duration-300">
                        <h3 className="text-white font-medium text-lg md:text-xl font-serif">{location.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-white/80 text-sm md:text-base font-light">{location.properties} properties</p>
                          <span className="text-sm px-3 py-1 md:py-1.5 bg-white/30 backdrop-blur-sm rounded-full text-white font-light">Explore</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Container */}
      <div className="container mx-auto px-6">
        {/* Category Section with Interactive Cards */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Explore by <span className="text-gradient">Category</span>
          </h2>
          <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar scrollbar-hide">
            {categories.map((category, index) => (
              <Link 
                key={index}
                href={`/search?category=${encodeURIComponent(category.name)}`}
                className="min-w-[180px] h-[120px] bg-white rounded-xl flex flex-col items-center justify-center shadow-sm border border-[var(--color-border)] hover-lift relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                <span className="font-medium text-sm">{category.name}</span>
                <span className="text-xs text-[var(--color-text-light)] mt-1">{category.count} properties</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Stays Section */}
        <PopularStays />
        
        {/* Travel Inspiration Section */}
        <TravelInspiration />
        
        {/* Virtual Tour Feature */}
        <VirtualTourPreview />
        
        {/* AI Recommendations Section */}
        <AiRecommendations />
      
        {/* Rest of the original content continues here */}
        {/* Festival Alert Banner - Repositioned as a standalone section */}
        <section className="mb-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white px-4 sm:px-6 py-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                    <span className="text-xl sm:text-2xl">{festival.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-base sm:text-lg">{festival.title}</p>
                    <p className="text-xs sm:text-sm text-white/90">{festival.text}</p>
                    <p className="text-xs sm:text-sm text-white font-medium mt-1 bg-white/20 px-2 py-0.5 rounded-full inline-block">{festival.discount}</p>
                  </div>
                </div>
                <Link 
                  href="/search" 
                  className="bg-white text-[var(--color-primary)] px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/90 transition-colors shadow-sm whitespace-nowrap mt-2 md:mt-0 self-start md:self-center"
                >
                  View Special Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Experiences Section with Animation */}
        <section className="py-10 mb-12 bg-[var(--color-background)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Unique <span className="text-gradient">Experiences</span>
            </h2>
            <Link href="/experiences" className="text-[var(--color-primary)] hover:underline flex items-center">
              <span>View all experiences</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((experience) => (
              <Link 
                key={experience.id} 
                href={`/experiences/${experience.id}`}
                className="group glass-card p-4 hover-lift transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[var(--color-primary)]">
                    {experience.rating} ★
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">Discover More</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                  {experience.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--color-primary)]">
                    {experience.price}
                    <span className="text-xs font-normal text-[var(--color-text-light)]"> per person</span>
                  </span>
                  <span className="p-3 btn-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Book Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Host Promotion with Animated Elements */}
        <section className="mb-12 px-4">
          <div className="relative h-[500px] rounded-xl overflow-hidden max-w-6xl mx-auto shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
              alt="Become a host"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              loading="lazy"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10" />
            
            <div className="absolute inset-0 flex items-center p-6 md:p-10 lg:p-16">
              <div className="max-w-md">
                <div className="inline-block bg-[var(--color-accent)]/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-5">
                  Become a Host
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
                  Earn Extra Income <br/>as a Host
                </h2>
                <div className="bg-white/15 backdrop-blur-sm p-6 rounded-xl border border-white/20 mb-8 shadow-lg">
                  <p className="text-white mb-4 text-base">
                    List your property on Stayvillow and earn up to ₹50,000 per month. We handle the bookings, you enjoy the benefits.
                  </p>
                  <ul className="text-white/90 text-sm space-y-3.5">
                    <li className="flex items-center">
                      <div className="bg-[var(--color-accent)]/20 rounded-full p-1 mr-3 w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <span>Easy listing process</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-[var(--color-accent)]/20 rounded-full p-1 mr-3 w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <span>24/7 customer support</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-[var(--color-accent)]/20 rounded-full p-1 mr-3 w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <span>Secure payments</span>
                    </li>
                  </ul>
                </div>
                <Link href="/host" className="btn btn-primary hover-lift px-8 py-3 text-base shadow-lg">
                  Start Hosting
                </Link>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-lg hidden lg:block">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">2,500+</div>
                <div className="text-sm font-medium text-[var(--color-text-light)]">Happy Hosts</div>
              </div>
            </div>
            
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-lg hidden lg:block">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">₹42,000</div>
                <div className="text-sm font-medium text-[var(--color-text-light)]">Avg. Monthly Income</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials with Rating */}
        <section className="py-10 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What Our Guests <span className="text-gradient">Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-6 hover-lift transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-[var(--color-primary)]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--color-text-light)]">{testimonial.location}</p>
                    <div className="flex text-yellow-500 mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-primary)] font-medium mb-2">{testimonial.stay}</p>
                <p className="italic text-[var(--color-text)]">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-4 text-xs text-[var(--color-text-light)] flex justify-between items-center">
                  <span>Verified Stay • {testimonial.date}</span>
                  <div className="flex space-x-1">
                    {['Cleanliness', 'Communication', 'Value'].map((category, i) => (
                      <span key={i} className="px-2 py-1 bg-[var(--color-background)] rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/reviews" className="text-[var(--color-primary)] hover:underline">
              Read more reviews from our happy guests →
            </Link>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="mb-12 text-center">
          <h3 className="text-xl font-medium mb-6 text-[var(--color-text-light)]">Trusted by travelers across India</h3>
          <div className="flex justify-center flex-wrap gap-8">
            {['Secure Payment', 'Verified Properties', '24/7 Support', 'Best Price Guarantee'].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-primary)]">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
