'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

// Popular destination suggestions for autosuggest
const popularDestinations = [
  "Goa, India",
  "Kerala, India",
  "Manali, Himachal Pradesh",
  "Udaipur, Rajasthan",
  "Jaipur, Rajasthan",
  "Munnar, Kerala",
  "Rishikesh, Uttarakhand",
  "Darjeeling, West Bengal"
];

export default function SearchBox() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(popularDestinations);
  const [activeSection, setActiveSection] = useState("location");
  const [isFocused, setIsFocused] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (location.trim() === "") {
      setFilteredSuggestions(popularDestinations);
    } else {
      const filtered = popularDestinations.filter(
        dest => dest.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [location]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    // Move focus to next field
    setActiveSection("dates");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white/30 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg p-3 md:p-6 flex flex-col gap-2 md:gap-4 border border-white/50 hover:border-white/70 transition-all duration-300 relative">
      <div className="font-bold text-lg md:text-xl text-white mb-1 md:mb-2 flex items-center">
        <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-2"></span>
        <span className="font-serif">Find your perfect stay</span>
      </div>
      
      {/* Location Input with Autosuggest */}
      <div className="relative" ref={suggestionRef}>
        <div 
          className={`flex items-center p-2 md:p-3 
            ${activeSection === "location" 
              ? "ring-2 ring-cyan-400 bg-white/90" 
              : "border border-gray-200 bg-white/80"} 
            rounded-lg transition-all duration-300 hover:bg-white/90 hover:border-white`}
        >
          <svg width="18" height="18" className="text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12l-3.35-3.35M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => {
              setShowSuggestions(true);
              setActiveSection("location");
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent border-none focus:ring-0 outline-none placeholder-gray-500 text-sm md:text-base font-light"
          />
        </div>
        
        {showSuggestions && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-[180px] md:max-h-[200px] overflow-y-auto py-2 border border-gray-100 animate-fadeIn">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 md:px-4 py-1.5 md:py-2 hover:bg-cyan-50 cursor-pointer text-gray-700 text-xs md:text-sm transition-colors flex items-center font-light"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <svg width="14" height="14" className="text-cyan-500 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 12l-8 4V4a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1h-3M12 19l-8-4" />
                  </svg>
                  {suggestion}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-xs md:text-sm font-light">No matches found</div>
            )}
          </div>
        )}
      </div>
      
      {/* Date Range Picker */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div 
          className={`flex items-center p-2 md:p-3 
            ${activeSection === "dates" 
              ? "ring-2 ring-cyan-400 bg-white/90" 
              : "border border-gray-200 bg-white/80"} 
            rounded-lg flex-1 transition-all duration-300 hover:bg-white/90 hover:border-white`}
        >
          <svg width="16" height="16" className="text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <input
            type="date"
            placeholder="Check-in"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            onFocus={() => setActiveSection("dates")}
            className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-700 text-xs md:text-sm font-light"
          />
        </div>
        <div 
          className={`flex items-center p-2 md:p-3 
            ${activeSection === "dates" 
              ? "ring-2 ring-cyan-400 bg-white/90" 
              : "border border-gray-200 bg-white/80"} 
            rounded-lg flex-1 transition-all duration-300 hover:bg-white/90 hover:border-white`}
        >
          <svg width="16" height="16" className="text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <input
            type="date"
            placeholder="Check-out"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            onFocus={() => setActiveSection("dates")}
            className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-700 text-xs md:text-sm font-light"
          />
        </div>
      </div>
      
      {/* Guests Selector */}
      <div 
        className={`flex items-center p-2 md:p-3 
          ${activeSection === "guests" 
            ? "ring-2 ring-cyan-400 bg-white/90" 
            : "border border-gray-200 bg-white/80"} 
          rounded-lg transition-all duration-300 hover:bg-white/90 hover:border-white`}
      >
        <svg width="16" height="16" className="text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
          <path d="M16 3.13a4 4 0 010 7.75"></path>
        </svg>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          onFocus={() => setActiveSection("guests")}
          className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-700 text-xs md:text-sm appearance-none cursor-pointer font-light"
        >
          {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
        </select>
        <svg width="14" height="14" className="text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </div>
      
      {/* Search Button */}
      <button 
        className="btn w-full py-2.5 md:py-3 mt-1 md:mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center text-sm md:text-base overflow-hidden" 
        type="submit"
      >
        <svg width="16" height="16" className="mr-1 md:mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span className="hidden sm:inline font-light">Find Your Perfect Stay</span>
        <span className="sm:hidden font-light">Search</span>
      </button>
      
      {/* Popular destinations hint */}
      <div className="flex flex-wrap gap-2 mt-1 px-1">
        <span className="text-xs text-white/80 font-light">Popular:</span>
        {popularDestinations.slice(0, 3).map((dest, idx) => (
          <button 
            key={idx} 
            type="button"
            onClick={() => {
              setLocation(dest);
              setActiveSection("dates");
            }}
            className="text-xs text-white/90 hover:text-white transition-colors font-light"
          >
            {dest.split(',')[0]}
          </button>
        ))}
      </div>
    </form>
  );
} 