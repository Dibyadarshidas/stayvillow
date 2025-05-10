'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const mockProperties = [
  {
    id: 1,
    title: "Luxury Pool Villa in Goa",
    location: "Goa, India",
    price: 12000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60",
    rating: 4.9,
    reviews: 24,
    status: "Active",
    bookings: 8,
    occupancyRate: 72,
    earnings: 96000
  },
  {
    id: 2,
    title: "Hilltop Retreat in Lonavala",
    location: "Lonavala, Maharashtra",
    price: 9000,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60",
    rating: 4.7,
    reviews: 18,
    status: "Active",
    bookings: 6,
    occupancyRate: 65,
    earnings: 54000
  },
  {
    id: 3,
    title: "Beachfront Cottage",
    location: "Gokarna, Karnataka",
    price: 7500,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60",
    rating: 4.8,
    reviews: 12,
    status: "Inactive",
    bookings: 0,
    occupancyRate: 0,
    earnings: 0
  },
  {
    id: 4,
    title: "Mountain View Cabin",
    location: "Manali, Himachal Pradesh",
    price: 8500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    rating: 4.6,
    reviews: 15,
    status: "Active",
    bookings: 5,
    occupancyRate: 58,
    earnings: 42500
  }
];

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState(mockProperties);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");

  const filteredProperties = filter === "all" 
    ? properties 
    : properties.filter(p => p.status.toLowerCase() === filter.toLowerCase());

  // Calculate total earnings
  const totalEarnings = properties.reduce((sum, property) => sum + property.earnings, 0);
  
  // Calculate total bookings
  const totalBookings = properties.reduce((sum, property) => sum + property.bookings, 0);
  
  // Calculate average occupancy rate
  const activeProperties = properties.filter(p => p.status === "Active");
  const averageOccupancy = activeProperties.length > 0 
    ? activeProperties.reduce((sum, p) => sum + p.occupancyRate, 0) / activeProperties.length 
    : 0;

  return (
    <div className="w-full">
      {/* Performance Dashboard */}
      <div className="glass-card mb-6">
        <h2 className="text-xl font-bold mb-4">Performance Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-[var(--color-border)] shadow-sm">
            <p className="text-[var(--color-text-light)] text-sm">Total Earnings</p>
            <h3 className="text-2xl font-bold text-[var(--color-primary)]">₹{totalEarnings.toLocaleString()}</h3>
            <p className="text-xs text-[var(--color-text-light)]">Last 30 days</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[var(--color-border)] shadow-sm">
            <p className="text-[var(--color-text-light)] text-sm">Total Bookings</p>
            <h3 className="text-2xl font-bold text-[var(--color-primary)]">{totalBookings}</h3>
            <p className="text-xs text-[var(--color-text-light)]">Last 30 days</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[var(--color-border)] shadow-sm">
            <p className="text-[var(--color-text-light)] text-sm">Average Occupancy</p>
            <h3 className="text-2xl font-bold text-[var(--color-primary)]">{averageOccupancy.toFixed(0)}%</h3>
            <p className="text-xs text-[var(--color-text-light)]">Last 30 days</p>
          </div>
        </div>
      </div>

      {/* Property Management */}
      <div className="glass-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">My Properties</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden">
              <button 
                className={`px-3 py-1.5 text-sm ${filter === 'all' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1.5 text-sm ${filter === 'active' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={`px-3 py-1.5 text-sm ${filter === 'inactive' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setFilter('inactive')}
              >
                Inactive
              </button>
            </div>
            <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden">
              <button 
                className={`px-3 py-1.5 text-sm flex items-center ${view === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setView('grid')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
                Grid
              </button>
              <button 
                className={`px-3 py-1.5 text-sm flex items-center ${view === 'list' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setView('list')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                List
              </button>
            </div>
            <Link 
              href="/host/list-property" 
              className="btn btn-primary"
            >
              Add Property
            </Link>
          </div>
        </div>
        
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="p-4 rounded-lg bg-white/50 border border-[var(--color-border)] shadow-sm">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                <p className="text-[var(--color-text-light)] text-sm mb-2">{property.location}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[var(--color-primary)] font-bold">₹{property.price.toLocaleString()}<span className="text-xs font-normal text-[var(--color-text-light)]">/night</span></span>
                  <span className="text-sm text-[var(--color-text-light)]">★ {property.rating} ({property.reviews} reviews)</span>
                </div>
                
                {property.status === 'Active' && (
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-[var(--color-background)] p-2 rounded">
                      <p className="text-xs text-[var(--color-text-light)]">Bookings</p>
                      <p className="font-semibold">{property.bookings}</p>
                    </div>
                    <div className="bg-[var(--color-background)] p-2 rounded">
                      <p className="text-xs text-[var(--color-text-light)]">Occupancy</p>
                      <p className="font-semibold">{property.occupancyRate}%</p>
                    </div>
                    <div className="bg-[var(--color-background)] p-2 rounded">
                      <p className="text-xs text-[var(--color-text-light)]">Earnings</p>
                      <p className="font-semibold">₹{(property.earnings/1000).toFixed(0)}K</p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Link href={`/host/edit/${property.id}`} className="btn btn-secondary text-xs px-3 py-1.5 flex-1 text-center">
                    Edit
                  </Link>
                  <button className="btn bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 flex-1">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div key={property.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-white/50 border border-[var(--color-border)] shadow-sm">
                <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                      <p className="text-[var(--color-text-light)] text-sm">{property.location}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[var(--color-primary)] font-bold">₹{property.price.toLocaleString()}<span className="text-xs font-normal text-[var(--color-text-light)]">/night</span></span>
                    <span className="text-sm text-[var(--color-text-light)]">★ {property.rating}</span>
                    <span className="text-sm text-[var(--color-text-light)]">{property.reviews} reviews</span>
                  </div>
                  
                  {property.status === 'Active' && (
                    <div className="flex gap-4 mt-3">
                      <div>
                        <span className="text-xs text-[var(--color-text-light)]">Bookings:</span>
                        <span className="font-semibold ml-1">{property.bookings}</span>
                      </div>
                      <div>
                        <span className="text-xs text-[var(--color-text-light)]">Occupancy:</span>
                        <span className="font-semibold ml-1">{property.occupancyRate}%</span>
                      </div>
                      <div>
                        <span className="text-xs text-[var(--color-text-light)]">Earnings:</span>
                        <span className="font-semibold ml-1">₹{property.earnings.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex md:flex-col gap-2 md:w-32">
                  <Link href={`/host/edit/${property.id}`} className="btn btn-secondary text-xs px-3 py-1.5 flex-1 text-center">
                    Edit
                  </Link>
                  <button className="btn bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 flex-1">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-light)]">
            <p className="text-lg mb-4">No properties found</p>
            <Link href="/host/list-property" className="btn btn-primary">
              Add Your First Property
            </Link>
          </div>
        )}

        {filteredProperties.length > 0 && (
          <div className="mt-8 p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
            <h3 className="font-semibold mb-3 flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Pricing Recommendations
            </h3>
            <ul className="text-sm text-[var(--color-text-light)] space-y-2">
              <li>• Peak season in Goa is October to March - consider increasing rates by 20-30%</li>
              <li>• Hill stations see higher demand during summer months (April-June)</li>
              <li>• Weekends typically command 15-25% higher rates than weekdays</li>
              <li>• Properties with 4.8+ ratings can increase rates by 10-15%</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 