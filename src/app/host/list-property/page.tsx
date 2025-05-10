'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const allAmenities = [
  "Private Pool", 
  "WiFi", 
  "AC", 
  "Breakfast", 
  "Parking", 
  "Pet Friendly", 
  "Garden", 
  "Sea View", 
  "Mountain View", 
  "Balcony", 
  "Kitchen", 
  "Cook Service",
  "24x7 Power Backup",
  "Caretaker",
  "Housekeeping",
  "Indoor Games",
  "Bonfire",
  "Temple/Puja Room"
];

const propertyTypes = [
  "Villa", 
  "Apartment", 
  "Bungalow", 
  "Farmhouse", 
  "Cottage", 
  "Heritage Home",
  "Houseboat", 
  "Beach House",
  "Hill Station Retreat",
  "Jungle Lodge"
];

const popularLocations = [
  "Goa",
  "Lonavala",
  "Shimla",
  "Manali",
  "Rishikesh",
  "Udaipur",
  "Jaipur",
  "Munnar",
  "Coorg",
  "Ooty",
  "Alibaug",
  "Darjeeling"
];

export default function ListPropertyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    price: "",
    description: "",
    bedrooms: "1",
    bathrooms: "1",
    maxGuests: "2",
    amenities: [] as string[],
    images: [] as string[],
    houseRules: "",
    nearbyAttractions: "",
    cancellationPolicy: "Flexible"
  });

  // Mock images for preview
  const mockImages = [
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your API
    console.log("Form submitted:", formData);
    // Redirect to the properties page
    window.location.href = "/host/properties";
  };

  return (
    <div className="w-full">
      <div className="glass-card">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">List Your Property</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center w-full">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 3 ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Property Title*</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="e.g. Luxury Beach Villa in Goa" 
                  value={formData.title} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Property Type*</label>
                <select 
                  name="type"
                  value={formData.type} 
                  onChange={handleChange} 
                  className="form-input" 
                  required
                >
                  <option value="">Select property type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Location*</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <select 
                    name="location"
                    value={formData.location} 
                    onChange={handleChange} 
                    className="form-input md:w-1/2" 
                    required
                  >
                    <option value="">Select popular location</option>
                    {popularLocations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                  {formData.location === 'other' && (
                    <input 
                      type="text" 
                      placeholder="Enter location" 
                      className="form-input md:w-1/2" 
                    />
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-light)]/70 mt-1">
                  Popular tourist destinations are more likely to get bookings
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Price per night (₹)*</label>
                <input 
                  type="number" 
                  name="price"
                  placeholder="e.g. 5000" 
                  value={formData.price} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
                <p className="text-xs text-[var(--color-text-light)]/70 mt-1">
                  Recommended price range for your property type: ₹4,000 - ₹12,000
                </p>
              </div>

              <div className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)]">
                <h3 className="font-semibold mb-2 flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Hosting Tips
                </h3>
                <ul className="text-sm text-[var(--color-text-light)] space-y-1">
                  <li>• Properties with clear titles get 35% more views</li>
                  <li>• Add "near [landmark]" to attract more guests</li>
                  <li>• Competitive pricing can increase bookings by 40%</li>
                </ul>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next: Property Details
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Property Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Description*</label>
                <textarea 
                  name="description"
                  placeholder="Describe your property..." 
                  rows={4} 
                  value={formData.description} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
                <p className="text-xs text-[var(--color-text-light)]/70 mt-1">
                  Highlight unique features, nearby attractions, and the experience guests can expect
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Bedrooms*</label>
                  <select 
                    name="bedrooms"
                    value={formData.bedrooms} 
                    onChange={handleChange} 
                    className="form-input" 
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Bathrooms*</label>
                  <select 
                    name="bathrooms"
                    value={formData.bathrooms} 
                    onChange={handleChange} 
                    className="form-input" 
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Max Guests*</label>
                  <select 
                    name="maxGuests"
                    value={formData.maxGuests} 
                    onChange={handleChange} 
                    className="form-input" 
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-[var(--color-text-light)] mb-2">Amenities</div>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.map(amenity => (
                    <button 
                      type="button" 
                      key={amenity} 
                      onClick={() => toggleAmenity(amenity)} 
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        formData.amenities.includes(amenity) 
                          ? 'bg-[var(--color-primary)] text-white' 
                          : 'bg-white border border-[var(--color-border)] text-[var(--color-text-light)]'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[var(--color-text-light)]/70 mt-2">
                  Properties with 8+ amenities get 40% more bookings
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Nearby Attractions</label>
                <textarea 
                  name="nearbyAttractions"
                  placeholder="e.g. 5 min walk to Calangute Beach, 10 min drive to Fort Aguada..." 
                  rows={2} 
                  value={formData.nearbyAttractions} 
                  onChange={handleChange} 
                  className="form-input" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">House Rules</label>
                <textarea 
                  name="houseRules"
                  placeholder="Any specific rules for guests..." 
                  rows={2} 
                  value={formData.houseRules} 
                  onChange={handleChange} 
                  className="form-input" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Cancellation Policy</label>
                <select 
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy} 
                  onChange={handleChange} 
                  className="form-input" 
                >
                  <option value="Flexible">Flexible - Full refund 24 hours prior to check-in</option>
                  <option value="Moderate">Moderate - Full refund 5 days prior to check-in</option>
                  <option value="Strict">Strict - 50% refund up until 1 week prior to check-in</option>
                </select>
              </div>
              
              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next: Upload Photos
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Photos */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Upload Photos</label>
                <input 
                  type="file" 
                  multiple 
                  className="form-input" 
                />
                <p className="text-xs text-[var(--color-text-light)]/70 mt-1">
                  Upload at least 5 photos. First photo will be used as cover image.
                </p>
              </div>
              
              <div className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)] mb-6">
                <h3 className="font-semibold mb-2">Photo Tips</h3>
                <ul className="text-sm text-[var(--color-text-light)] space-y-1">
                  <li>• Take photos during daylight for better lighting</li>
                  <li>• Include all rooms, outdoor areas, and special features</li>
                  <li>• Highlight unique aspects like views or traditional decor</li>
                  <li>• Properties with 15+ photos get 50% more bookings</li>
                </ul>
              </div>
              
              <div>
                <div className="text-sm font-medium text-[var(--color-text-light)] mb-2">Preview</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockImages.map((img, i) => (
                    <div key={i} className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`Preview ${i+1}`}
                        fill
                        className="object-cover"
                      />
                      <button 
                        type="button"
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                      >
                        ×
                      </button>
                      {i === 0 && (
                        <div className="absolute bottom-2 left-2 bg-[var(--color-primary)] text-white text-xs px-2 py-1 rounded">
                          Cover Photo
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--color-primary)]/10 p-4 rounded-lg border border-[var(--color-primary)]/20">
                <h3 className="font-semibold text-[var(--color-primary)] mb-2 flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verification Notice
                </h3>
                <p className="text-sm text-[var(--color-text-light)]">
                  Your property will undergo verification within 24-48 hours after submission. Our team may contact you for additional details.
                </p>
              </div>
              
              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  List Property
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 