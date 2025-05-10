'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

// Mock data with Indian properties
const stays = [
  {
    id: 1,
    title: "Luxury Pool Villa",
    location: "Goa, India",
    price: 12000,
    rating: 4.9,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60",
    amenities: ["Private Pool", "Beach Access", "AC", "WiFi", "Kitchen"],
    type: "Villa",
    guests: 6,
    bedrooms: 3,
    bathrooms: 3
  },
  {
    id: 2,
    title: "Mountain View Cabin",
    location: "Manali, Himachal Pradesh",
    price: 8500,
    rating: 4.6,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    amenities: ["Mountain View", "Fireplace", "Heating", "WiFi", "Kitchen"],
    type: "Cabin",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1
  },
  {
    id: 3,
    title: "Hilltop Retreat",
    location: "Lonavala, Maharashtra",
    price: 9000,
    rating: 4.7,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60",
    amenities: ["Private Pool", "Valley View", "Garden", "BBQ", "WiFi"],
    type: "Villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3
  },
  {
    id: 4,
    title: "Beachfront Cottage",
    location: "Kovalam, Kerala",
    price: 10500,
    rating: 4.8,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=60",
    amenities: ["Beach Access", "Sea View", "AC", "WiFi", "Kitchen"],
    type: "Cottage",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2
  },
  {
    id: 5,
    title: "Lakeside Bungalow",
    location: "Udaipur, Rajasthan",
    price: 11000,
    rating: 4.7,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60",
    amenities: ["Lake View", "Private Garden", "AC", "WiFi", "Kitchen"],
    type: "Bungalow",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2
  },
  {
    id: 6,
    title: "Heritage Haveli Suite",
    location: "Jaipur, Rajasthan",
    price: 15000,
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
    amenities: ["Heritage Property", "Pool Access", "AC", "WiFi", "Breakfast"],
    type: "Heritage",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1
  }
];

// Popular Indian destinations for search suggestions
const popularDestinations = [
  "Goa", "Manali", "Lonavala", "Udaipur", "Jaipur", "Kerala", "Shimla", 
  "Ooty", "Darjeeling", "Rishikesh", "Mumbai", "Delhi", "Bangalore"
];

// Popular amenities
const popularAmenities = [
  "Private Pool", "Beach Access", "Mountain View", "WiFi", "AC", 
  "Kitchen", "Breakfast", "Parking", "Pet Friendly", "24x7 Power Backup"
];

// Sample data for properties
const properties = [
  {
    id: 1,
    title: "Luxury Beach Villa",
    location: "Goa, India",
    price: "₹12,000",
    pricePerNight: "₹12,000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
    tag: "Trending",
    description: "Stunning beachfront villa with private access to Anjuna Beach. Enjoy the infinity pool and panoramic ocean views.",
    features: ["4 Bedrooms", "Private Pool", "Beach Access", "Fully Staffed", "Ocean View"]
  },
  {
    id: 2,
    title: "Mountain View Cabin",
    location: "Manali, Himachal Pradesh",
    price: "₹8,500",
    pricePerNight: "₹8,500",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80",
    tag: "New",
    description: "Cozy wooden cabin with breathtaking views of the Himalayan mountains. Perfect for a serene getaway.",
    features: ["3 Bedrooms", "Fireplace", "Mountain View", "Hiking Trails", "Private Deck"]
  },
  {
    id: 3,
    title: "Lakeside Retreat",
    location: "Udaipur, Rajasthan",
    price: "₹15,000",
    pricePerNight: "₹15,000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    tag: "Popular",
    description: "Elegant lakeside property with traditional Rajasthani architecture and modern amenities. Beautiful sunset views over Lake Pichola.",
    features: ["5 Bedrooms", "Rooftop Terrace", "Lake View", "Pool", "Heritage Architecture"]
  },
  {
    id: 4,
    title: "Heritage Haveli Suite",
    location: "Jaipur, Rajasthan",
    price: "₹18,000",
    pricePerNight: "₹18,000",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    tag: "Luxury",
    description: "Experience royal living in this meticulously restored heritage haveli in the heart of Pink City. Ornate architecture with modern comforts.",
    features: ["Royal Suite", "Heritage Property", "Courtyard", "Spa Services", "Restaurant"]
  },
  {
    id: 5,
    title: "Beachfront Cottage",
    location: "Kovalam, Kerala",
    price: "₹10,500",
    pricePerNight: "₹10,500",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=80",
    tag: "Featured",
    description: "Charming cottage surrounded by coconut trees with direct beach access. Perfect for a peaceful tropical vacation.",
    features: ["2 Bedrooms", "Beach Access", "Garden", "Seafood Restaurant", "Ayurvedic Spa"]
  },
  {
    id: 6,
    title: "Mountain Treehouse",
    location: "Munnar, Kerala",
    price: "₹9,500",
    pricePerNight: "₹9,500",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    tag: "Unique",
    description: "Unique treehouse experience with stunning views of tea plantations. Wake up to the sounds of nature and misty mountain views.",
    features: ["1 Bedroom", "Tea Plantation View", "Nature Trails", "Breakfast Included", "Eco-friendly"]
  }
];

// Filter types
const filterOptions = {
  propertyType: ["Villa", "Apartment", "House", "Cottage", "Unique Stays"],
  amenities: ["Pool", "Beach Access", "Mountain View", "Air Conditioning", "Wifi", "Kitchen", "Parking", "Balcony"],
  price: ["Under ₹5,000", "₹5,000 - ₹10,000", "₹10,000 - ₹15,000", "₹15,000 - ₹20,000", "₹20,000+"],
  rating: ["4.5+", "4.0+", "3.5+", "3.0+"]
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [propertyType, setPropertyType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filteredStays, setFilteredStays] = useState(stays);
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [searchedCategory, setSearchedCategory] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Generate search suggestions based on input
  useEffect(() => {
    if (location.length > 1) {
      const suggestions = popularDestinations.filter(dest => 
        dest.toLowerCase().includes(location.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [location]);

  // Apply filters
  useEffect(() => {
    let results = [...stays];
    
    // Location filter
    if (location) {
      results = results.filter(stay => 
        stay.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Keyword filter
    if (keyword) {
      results = results.filter(stay => 
        stay.title.toLowerCase().includes(keyword.toLowerCase()) || 
        stay.amenities.some(amenity => amenity.toLowerCase().includes(keyword.toLowerCase()))
      );
    }
    
    // Guest filter
    if (guests) {
      results = results.filter(stay => stay.guests >= guests);
    }
    
    // Price range filter
    results = results.filter(stay => 
      stay.price >= priceRange[0] && stay.price <= priceRange[1]
    );
    
    // Property type filter
    if (propertyType) {
      results = results.filter(stay => stay.type === propertyType);
    }
    
    // Amenities filter
    if (selectedAmenities.length > 0) {
      results = results.filter(stay => 
        selectedAmenities.every(amenity => stay.amenities.includes(amenity))
      );
    }
    
    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "recommended":
      default:
        // Keep original order which is assumed to be recommended
        break;
    }
    
    setFilteredStays(results);
  }, [location, checkIn, checkOut, guests, keyword, priceRange, propertyType, selectedAmenities, sortBy]);

  useEffect(() => {
    // Get search parameters
    const location = searchParams?.get('location');
    const category = searchParams?.get('category');
    
    if (location) {
      setSearchedLocation(location);
    }
    
    if (category) {
      setSearchedCategory(category);
    }
    
    // Filter properties based on search parameters
    let results = [...properties];
    
    if (location) {
      results = results.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      // Simple category filter - in a real app, you'd have proper category mapping
      if (category === "Beachfront") {
        results = results.filter(property => 
          property.location.includes("Goa") || 
          property.location.includes("Kerala") ||
          property.features.includes("Beach Access")
        );
      } else if (category === "Mountain View") {
        results = results.filter(property => 
          property.location.includes("Manali") || 
          property.location.includes("Himachal") ||
          property.features.includes("Mountain View")
        );
      } else if (category === "Heritage Homes") {
        results = results.filter(property => 
          property.location.includes("Jaipur") || 
          property.location.includes("Rajasthan") ||
          property.features.includes("Heritage")
        );
      }
    }
    
    setFilteredProperties(results);
  }, [searchParams]);

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setLocation("");
    setCheckIn("");
    setCheckOut("");
    setGuests(2);
    setKeyword("");
    setPriceRange([0, 20000]);
    setPropertyType("");
    setSelectedAmenities([]);
    setSortBy("recommended");
  };

  const handleFilterToggle = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const handleSort = (option: string) => {
    setSortBy(option);
    let sorted = [...filteredProperties];
    
    if (option === "price-low") {
      sorted.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
    } else if (option === "price-high") {
      sorted.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
    } else if (option === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProperties(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {searchedLocation ? `Stays in ${searchedLocation}` : 
            searchedCategory ? `${searchedCategory} Stays` : 
            'All Available Properties'}
        </h1>
        <p className="text-gray-600">
          {filteredProperties.length} properties {searchedLocation ? `in ${searchedLocation}` : ''} 
          {searchedCategory ? ` with ${searchedCategory}` : ''}
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="glass-card mb-6 p-5">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-md mb-3">Price Range</h3>
              <div className="space-y-2">
                {filterOptions.price.map((price) => (
                  <div key={price} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`price-${price}`} 
                      className="mr-2 form-checkbox rounded text-[var(--color-primary)]" 
                      checked={activeFilters.includes(price)}
                      onChange={() => handleFilterToggle(price)}
                    />
                    <label htmlFor={`price-${price}`} className="text-sm text-gray-700">{price}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Property Type */}
            <div className="mb-6">
              <h3 className="font-medium text-md mb-3">Property Type</h3>
              <div className="space-y-2">
                {filterOptions.propertyType.map((type) => (
                  <div key={type} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`type-${type}`} 
                      className="mr-2 form-checkbox rounded text-[var(--color-primary)]" 
                      checked={activeFilters.includes(type)}
                      onChange={() => handleFilterToggle(type)}
                    />
                    <label htmlFor={`type-${type}`} className="text-sm text-gray-700">{type}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mb-6">
              <h3 className="font-medium text-md mb-3">Amenities</h3>
              <div className="space-y-2">
                {filterOptions.amenities.slice(0, 5).map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`amenity-${amenity}`} 
                      className="mr-2 form-checkbox rounded text-[var(--color-primary)]" 
                      checked={activeFilters.includes(amenity)}
                      onChange={() => handleFilterToggle(amenity)}
                    />
                    <label htmlFor={`amenity-${amenity}`} className="text-sm text-gray-700">{amenity}</label>
                  </div>
                ))}
              </div>
              <button className="text-[var(--color-primary)] text-sm font-medium mt-2">
                Show more amenities
              </button>
            </div>
            
            {/* Rating */}
            <div>
              <h3 className="font-medium text-md mb-3">Guest Rating</h3>
              <div className="space-y-2">
                {filterOptions.rating.map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`rating-${rating}`} 
                      className="mr-2 form-checkbox rounded text-[var(--color-primary)]" 
                      checked={activeFilters.includes(rating)}
                      onChange={() => handleFilterToggle(rating)}
                    />
                    <label htmlFor={`rating-${rating}`} className="text-sm text-gray-700">{rating} <span className="text-yellow-500">★</span></label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recently Viewed */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-md mb-4">Recently Viewed</h3>
            <div className="space-y-4">
              {properties.slice(0, 2).map((property) => (
                <Link href={`/property/${property.id}`} key={property.id} className="flex gap-3 group">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">{property.title}</h4>
                    <p className="text-xs text-gray-500">{property.location}</p>
                    <p className="text-xs font-medium text-[var(--color-primary)]">{property.price} / night</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content - Property Listings */}
        <div className="w-full lg:w-3/4">
          {/* Sort & View Options */}
          <div className="flex flex-wrap items-center justify-between p-4 mb-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Sort by:</span>
              <button 
                className={`px-3 py-1 rounded-full ${sortBy === 'recommended' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleSort('recommended')}
              >
                Recommended
              </button>
              <button 
                className={`px-3 py-1 rounded-full ${sortBy === 'price-low' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleSort('price-low')}
              >
                Price (Low to High)
              </button>
              <button 
                className={`px-3 py-1 rounded-full ${sortBy === 'price-high' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleSort('price-high')}
              >
                Price (High to Low)
              </button>
              <button 
                className={`px-3 py-1 rounded-full ${sortBy === 'rating' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleSort('rating')}
              >
                Top Rated
              </button>
            </div>
            
            <div className="mt-3 sm:mt-0 flex gap-2">
              <button className="p-2 bg-gray-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </button>
              <button className="p-2 bg-[var(--color-primary)] rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Property Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Link 
                  key={property.id} 
                  href={`/property/${property.id}`}
                  className="group glass-card p-4 hover-lift transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[var(--color-primary)]">
                      {property.rating} ★
                    </div>
                    {property.tag && (
                      <div className="absolute top-3 left-3 bg-[var(--color-primary)]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                        {property.tag}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-[var(--color-text-light)] mb-2">{property.location}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base md:text-lg font-bold text-[var(--color-primary)]">
                      {property.price}
                      <span className="text-xs md:text-sm font-normal text-[var(--color-text-light)]"> /night</span>
                    </span>
                    <span className="text-xs md:text-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full font-medium">
                      View Details
                    </span>
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
                <h3 className="text-xl font-bold mb-2">No properties found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                <Link 
                  href="/" 
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                  </svg>
                  Return to Home
                </Link>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {filteredProperties.length > 0 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"></path>
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600">3</button>
                <span className="w-10 h-10 flex items-center justify-center text-gray-600">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600">8</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 