'use client';
import { useState } from 'react';
import Image from 'next/image';

interface CompetitiveAnalysisProps {
  propertyData?: {
    location: string;
    price: number;
    rating: number;
    amenities?: string[];
  };
}

// Mock competitive data for different locations
const competitiveData = {
  'Goa': {
    avgPrice: 10500,
    priceRange: '₹7,000 - ₹15,000',
    avgRating: 4.7,
    popularAmenities: ['Private Pool', 'Beach Access', 'AC', 'WiFi', '24x7 Power Backup'],
    competitors: [
      {
        name: 'Luxury Beach Villa',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60',
        price: 12000,
        rating: 4.9,
        amenities: ['Private Pool', 'Beach Access', 'AC', 'WiFi', 'Kitchen']
      },
      {
        name: 'Seaside Retreat',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60',
        price: 9500,
        rating: 4.6,
        amenities: ['Beach Access', 'AC', 'WiFi', 'Breakfast']
      },
      {
        name: 'Modern Beach Apartment',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60',
        price: 8200,
        rating: 4.5,
        amenities: ['Beach View', 'Pool Access', 'AC', 'WiFi']
      }
    ]
  },
  'Manali': {
    avgPrice: 8000,
    priceRange: '₹5,000 - ₹12,000',
    avgRating: 4.5,
    popularAmenities: ['Mountain View', 'Fireplace', 'Heating', 'WiFi', 'Parking'],
    competitors: [
      {
        name: 'Mountain View Cabin',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60',
        price: 8500,
        rating: 4.6,
        amenities: ['Mountain View', 'Fireplace', 'Heating', 'WiFi', 'Kitchen']
      },
      {
        name: 'Himalayan Cottage',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60',
        price: 7200,
        rating: 4.4,
        amenities: ['Mountain View', 'Heating', 'WiFi', 'Parking']
      }
    ]
  },
  'Lonavala': {
    avgPrice: 9000,
    priceRange: '₹6,000 - ₹14,000',
    avgRating: 4.6,
    popularAmenities: ['Private Pool', 'Valley View', 'Garden', 'BBQ', '24x7 Power Backup'],
    competitors: [
      {
        name: 'Hilltop Retreat',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60',
        price: 9000,
        rating: 4.7,
        amenities: ['Private Pool', 'Valley View', 'Garden', 'BBQ', 'WiFi']
      }
    ]
  }
};

export default function CompetitiveAnalysis({ propertyData }: CompetitiveAnalysisProps) {
  const [location, setLocation] = useState(propertyData?.location?.split(',')[0] || 'Goa');
  const [showCompetitors, setShowCompetitors] = useState(true);
  
  // Get data for selected location
  const locationData = competitiveData[location as keyof typeof competitiveData] || competitiveData['Goa'];
  
  // Calculate how property compares to average
  const priceComparison = propertyData ? 
    ((propertyData.price - locationData.avgPrice) / locationData.avgPrice * 100).toFixed(1) : 
    '0.0';
  
  const ratingComparison = propertyData ? 
    ((propertyData.rating - locationData.avgRating) / locationData.avgRating * 100).toFixed(1) : 
    '0.0';
  
  return (
    <div className="w-full">
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Competitive Market Analysis</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
          >
            {Object.keys(competitiveData).map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-4">Market Overview: {location}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[var(--color-text-light)]">Average Nightly Rate</p>
                <p className="text-xl font-bold text-[var(--color-primary)]">₹{locationData.avgPrice.toLocaleString()}</p>
                <p className="text-xs text-[var(--color-text-light)]">Range: {locationData.priceRange}</p>
              </div>
              
              {propertyData && (
                <div className="p-3 rounded-lg bg-[var(--color-background)]">
                  <p className="text-sm font-medium mb-1">Your Property</p>
                  <div className="flex justify-between items-center">
                    <span>Price: ₹{propertyData.price.toLocaleString()}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      Number(priceComparison) <= 0 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {Number(priceComparison) >= 0 ? '+' : ''}{priceComparison}% vs. avg
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Rating: {propertyData.rating} ★</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      Number(ratingComparison) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {Number(ratingComparison) >= 0 ? '+' : ''}{ratingComparison}% vs. avg
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Popular Amenities in {location}</h3>
            <div className="flex flex-wrap gap-2">
              {locationData.popularAmenities.map((amenity) => (
                <span 
                  key={amenity} 
                  className={`px-3 py-1 rounded-full text-sm ${
                    propertyData?.amenities?.includes(amenity)
                      ? 'bg-[var(--color-primary)] text-white' 
                      : 'bg-white border border-[var(--color-border)] text-[var(--color-text-light)]'
                  }`}
                >
                  {amenity}
                </span>
              ))}
            </div>
            
            {propertyData && (
              <div className="mt-4 p-3 rounded-lg bg-[var(--color-background)]">
                <p className="text-sm font-medium mb-2">Missing Popular Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {locationData.popularAmenities
                    .filter(amenity => !propertyData.amenities?.includes(amenity))
                    .map((amenity) => (
                      <span 
                        key={amenity} 
                        className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
                      >
                        {amenity}
                      </span>
                    ))}
                  {locationData.popularAmenities
                    .filter(amenity => !propertyData.amenities?.includes(amenity)).length === 0 && (
                      <p className="text-sm text-green-600">Your property has all popular amenities!</p>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold">Similar Properties in {location}</h3>
          <button 
            onClick={() => setShowCompetitors(!showCompetitors)}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            {showCompetitors ? 'Hide' : 'Show'} Competitors
          </button>
        </div>
        
        {showCompetitors && (
          <div className="space-y-4">
            {locationData.competitors.map((competitor, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-white/50 border border-[var(--color-border)]">
                <div className="relative w-full md:w-32 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={competitor.image}
                    alt={competitor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{competitor.name}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-[var(--color-primary)] font-medium">₹{competitor.price.toLocaleString()}</span>
                      <span className="text-xs text-[var(--color-text-light)] ml-1">/night</span>
                    </div>
                    <div className="flex items-center">
                      <span>{competitor.rating} ★</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-[var(--color-text-light)]">Amenities:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {competitor.amenities.map((amenity) => (
                        <span 
                          key={amenity} 
                          className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-background)] text-[var(--color-text-light)]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {propertyData && (
                  <div className="md:w-28 flex flex-row md:flex-col gap-2 text-xs">
                    <div className={`px-2 py-1 rounded-full text-center ${
                      propertyData.price > competitor.price 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {propertyData.price > competitor.price ? 'Higher' : 'Lower'} price
                    </div>
                    <div className={`px-2 py-1 rounded-full text-center ${
                      propertyData.rating >= competitor.rating 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {propertyData.rating >= competitor.rating ? 'Better' : 'Lower'} rating
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-[var(--color-primary)]/10 rounded-lg border border-[var(--color-primary)]/20">
          <h3 className="font-semibold mb-2 flex items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Competitive Recommendations
          </h3>
          <ul className="mt-2 text-sm space-y-1">
            {propertyData && propertyData.price > locationData.avgPrice && (
              <li>• Your price is above market average. Consider adding more premium amenities to justify the higher rate.</li>
            )}
            {propertyData && propertyData.price < locationData.avgPrice && (
              <li>• Your price is below market average. You may have room to increase your rates, especially during peak season.</li>
            )}
            <li>• Properties with {locationData.popularAmenities.slice(0, 3).join(', ')} command higher rates in this area.</li>
            <li>• Consider highlighting local attractions and experiences in your listing description.</li>
            <li>• Properties with professional photography see 25% more bookings in this competitive market.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 