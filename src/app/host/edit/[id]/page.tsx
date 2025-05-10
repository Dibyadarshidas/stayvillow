'use client';
import { useState } from "react";
import Link from "next/link";

const allAmenities = ["Private Pool", "WiFi", "Breakfast", "Parking", "AC", "Pet Friendly", "Garden", "Sea View"];
const mockProperty = {
  title: "Luxury Pool Villa in Goa",
  location: "Goa, India",
  price: 12000,
  description: "A stunning villa with a private pool, perfect for summer getaways.",
  amenities: ["Private Pool", "WiFi", "Breakfast"]
};

export default function EditPropertyPage() {
  const [title, setTitle] = useState(mockProperty.title);
  const [location, setLocation] = useState(mockProperty.location);
  const [price, setPrice] = useState(mockProperty.price.toString());
  const [description, setDescription] = useState(mockProperty.description);
  const [amenities, setAmenities] = useState<string[]>(mockProperty.amenities);

  function toggleAmenity(a: string) {
    setAmenities(amenities.includes(a) ? amenities.filter(x => x !== a) : [...amenities, a]);
  }

  return (
    <div className="w-full">
      <div className="glass-card">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Property</h1>
        <form className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Property Title</label>
            <input 
              type="text" 
              placeholder="e.g. Luxury Beach Villa" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="form-input" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Bali, Indonesia" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              className="form-input" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Price per night (INR)</label>
            <input 
              type="number" 
              placeholder="e.g. 5000" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              className="form-input" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Description</label>
            <textarea 
              placeholder="Describe your property..." 
              rows={4} 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="form-input" 
              required 
            />
          </div>
          
          <div>
            <div className="text-sm font-medium text-[var(--color-text-light)] mb-2">Amenities</div>
            <div className="flex flex-wrap gap-2">
              {allAmenities.map(a => (
                <button 
                  type="button" 
                  key={a} 
                  onClick={() => toggleAmenity(a)} 
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    amenities.includes(a) 
                      ? 'bg-[var(--color-primary)] text-white' 
                      : 'bg-white border border-[var(--color-border)] text-[var(--color-text-light)]'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Upload Images</label>
            <input 
              type="file" 
              multiple 
              disabled 
              className="opacity-60 cursor-not-allowed form-input" 
            />
            <span className="text-xs text-[var(--color-text-light)]/70 mt-1 block">(Image upload coming soon)</span>
          </div>
          
          <div className="flex flex-col gap-4 mt-4">
            <button className="btn btn-primary">Save Changes</button>
            <Link href="/host/dashboard" className="text-[var(--color-primary)] hover:underline text-center">
              Back to Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 