'use client';
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import RevenueForecast from "../../../app/components/RevenueForecast";
import CompetitiveAnalysis from "../../../app/components/CompetitiveAnalysis";

const mockProperties = [
  {
    id: 1,
    title: "Luxury Pool Villa in Goa",
    location: "Goa, India",
    price: 12000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60",
    bookings: [
      { guest: "Amit", dates: "12-15 June 2024", status: "Confirmed", amount: 36000 },
      { guest: "Priya", dates: "20-22 July 2024", status: "Pending", amount: 24000 }
    ],
    stats: {
      occupancyRate: {
        current: 72,
        previous: 65,
        trend: "up"
      },
      earnings: {
        current: 96000,
        previous: 84000,
        trend: "up"
      },
      reviews: {
        count: 24,
        average: 4.9
      }
    }
  },
  {
    id: 2,
    title: "Hilltop Retreat in Lonavala",
    location: "Lonavala, Maharashtra",
    price: 9000,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60",
    bookings: [
      { guest: "Rahul", dates: "5-8 June 2024", status: "Confirmed", amount: 27000 },
      { guest: "Neha", dates: "15-17 August 2024", status: "Pending", amount: 18000 }
    ],
    stats: {
      occupancyRate: {
        current: 65,
        previous: 70,
        trend: "down"
      },
      earnings: {
        current: 54000,
        previous: 63000,
        trend: "down"
      },
      reviews: {
        count: 18,
        average: 4.7
      }
    }
  },
  {
    id: 3,
    title: "Mountain View Cabin",
    location: "Manali, Himachal Pradesh",
    price: 8500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    bookings: [
      { guest: "Vikram", dates: "10-12 July 2024", status: "Confirmed", amount: 17000 }
    ],
    stats: {
      occupancyRate: {
        current: 58,
        previous: 42,
        trend: "up"
      },
      earnings: {
        current: 42500,
        previous: 34000,
        trend: "up"
      },
      reviews: {
        count: 15,
        average: 4.6
      }
    }
  }
];

// Mock monthly data for charts
const monthlyData = {
  earnings: [45000, 52000, 48000, 61000, 55000, 67000],
  occupancy: [55, 62, 58, 70, 65, 72],
  bookings: [4, 5, 4, 6, 5, 7]
};

export default function HostDashboard() {
  const [properties, setProperties] = useState(mockProperties);
  const [showBookings, setShowBookings] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState("30days");
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate total earnings
  const totalEarnings = properties.reduce((sum, property) => sum + property.stats.earnings.current, 0);
  
  // Calculate previous period earnings
  const previousEarnings = properties.reduce((sum, property) => sum + property.stats.earnings.previous, 0);
  
  // Calculate earnings change percentage
  const earningsChangePercent = ((totalEarnings - previousEarnings) / previousEarnings * 100).toFixed(1);
  
  // Calculate average occupancy
  const averageOccupancy = properties.reduce((sum, property) => sum + property.stats.occupancyRate.current, 0) / properties.length;
  
  // Calculate previous period occupancy
  const previousOccupancy = properties.reduce((sum, property) => sum + property.stats.occupancyRate.previous, 0) / properties.length;
  
  // Calculate occupancy change percentage
  const occupancyChangePercent = ((averageOccupancy - previousOccupancy) / previousOccupancy * 100).toFixed(1);
  
  // Calculate total bookings
  const totalBookings = properties.reduce((sum, property) => sum + property.bookings.length, 0);
  
  // Calculate average rating
  const averageRating = properties.reduce((sum, property) => sum + property.stats.reviews.average, 0) / properties.length;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Host Dashboard</h1>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden">
            <button 
              className={`px-3 py-1.5 text-sm ${timeRange === '30days' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
              onClick={() => setTimeRange('30days')}
            >
              30 Days
            </button>
            <button 
              className={`px-3 py-1.5 text-sm ${timeRange === '90days' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
              onClick={() => setTimeRange('90days')}
            >
              90 Days
            </button>
            <button 
              className={`px-3 py-1.5 text-sm ${timeRange === 'year' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
          <Link 
            href="/host/properties" 
            className="btn btn-secondary"
          >
            View All Properties
          </Link>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-6 overflow-x-auto">
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'overview' 
              ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' 
              : 'text-[var(--color-text-light)]'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Performance Overview
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'properties' 
              ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' 
              : 'text-[var(--color-text-light)]'
          }`}
          onClick={() => setActiveTab('properties')}
        >
          Property Management
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'forecast' 
              ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' 
              : 'text-[var(--color-text-light)]'
          }`}
          onClick={() => setActiveTab('forecast')}
        >
          Revenue Forecast
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'competitive' 
              ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' 
              : 'text-[var(--color-text-light)]'
          }`}
          onClick={() => setActiveTab('competitive')}
        >
          Competitive Analysis
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'insights' 
              ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' 
              : 'text-[var(--color-text-light)]'
          }`}
          onClick={() => setActiveTab('insights')}
        >
          Seasonal Insights
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center justify-between">
                <p className="text-[var(--color-text-light)] text-sm">Total Earnings</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${Number(earningsChangePercent) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {Number(earningsChangePercent) >= 0 ? '+' : ''}{earningsChangePercent}%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mt-2">₹{totalEarnings.toLocaleString()}</h3>
              <div className="mt-4 h-10 bg-[var(--color-background)] relative rounded-md overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-[var(--color-primary)]/20 w-full">
                  {monthlyData.earnings.map((val, i) => (
                    <div 
                      key={i} 
                      className="absolute bottom-0 bg-[var(--color-primary)]" 
                      style={{
                        left: `${i * (100 / monthlyData.earnings.length)}%`,
                        width: `${100 / monthlyData.earnings.length}%`,
                        height: `${(val / Math.max(...monthlyData.earnings)) * 100}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center justify-between">
                <p className="text-[var(--color-text-light)] text-sm">Occupancy Rate</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${Number(occupancyChangePercent) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {Number(occupancyChangePercent) >= 0 ? '+' : ''}{occupancyChangePercent}%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mt-2">{averageOccupancy.toFixed(0)}%</h3>
              <div className="mt-4 h-10 bg-[var(--color-background)] relative rounded-md overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-[var(--color-primary)]/20 w-full">
                  {monthlyData.occupancy.map((val, i) => (
                    <div 
                      key={i} 
                      className="absolute bottom-0 bg-[var(--color-primary)]" 
                      style={{
                        left: `${i * (100 / monthlyData.occupancy.length)}%`,
                        width: `${100 / monthlyData.occupancy.length}%`,
                        height: `${(val / 100) * 100}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center justify-between">
                <p className="text-[var(--color-text-light)] text-sm">Total Bookings</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mt-2">{totalBookings}</h3>
              <div className="mt-4 h-10 bg-[var(--color-background)] relative rounded-md overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-[var(--color-primary)]/20 w-full">
                  {monthlyData.bookings.map((val, i) => (
                    <div 
                      key={i} 
                      className="absolute bottom-0 bg-[var(--color-primary)]" 
                      style={{
                        left: `${i * (100 / monthlyData.bookings.length)}%`,
                        width: `${100 / monthlyData.bookings.length}%`,
                        height: `${(val / Math.max(...monthlyData.bookings)) * 100}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center justify-between">
                <p className="text-[var(--color-text-light)] text-sm">Average Rating</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {properties.reduce((sum, p) => sum + p.stats.reviews.count, 0)} reviews
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mt-2">{averageRating.toFixed(1)} ★</h3>
              <div className="mt-4 flex items-center">
                <div className="flex-1 h-2 bg-[var(--color-background)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-primary)]"
                    style={{ width: `${(averageRating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-[var(--color-text-light)]">5.0</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card mb-6">
            <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--color-primary)]/10 rounded-lg border border-[var(--color-primary)]/20">
                <h3 className="font-semibold flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Increase Revenue
                </h3>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Update your property photos - listings with professional photos earn 25% more</li>
                  <li>• Add special festival rates for Diwali and Holi - these periods see 40% higher demand</li>
                  <li>• Consider offering airport pickup service - 65% of travelers prefer properties with this option</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                <h3 className="font-semibold flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Booking Optimization
                </h3>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Your minimum stay requirement may be too long - properties with 2-night minimums see 30% more bookings</li>
                  <li>• Consider offering weekly stay discounts of 10-15% to increase longer bookings</li>
                  <li>• Your response time is excellent - keep maintaining quick responses to maintain your Superhost status</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'properties' && (
        <div className="glass-card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Property Performance</h2>
            <Link 
              href="/host/list-property" 
              className="btn btn-primary text-sm"
            >
              Add New Property
            </Link>
          </div>
          <div className="space-y-4">
            {properties.map((prop) => (
              <div key={prop.id} className="p-4 rounded-lg bg-white/50 border border-[var(--color-border)] shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{prop.title}</h3>
                        <p className="text-[var(--color-text-light)]">{prop.location}</p>
                      </div>
                      <div className="text-[var(--color-primary)] font-bold">
                        ₹{prop.price.toLocaleString()} <span className="text-xs font-normal text-[var(--color-text-light)]">/night</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-[var(--color-text-light)]">Occupancy</p>
                        <div className="flex items-center">
                          <span className="font-semibold">{prop.stats.occupancyRate.current}%</span>
                          <span className={`ml-2 text-xs ${prop.stats.occupancyRate.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {prop.stats.occupancyRate.trend === 'up' ? '↑' : '↓'} 
                            {Math.abs(prop.stats.occupancyRate.current - prop.stats.occupancyRate.previous)}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-light)]">Earnings</p>
                        <div className="flex items-center">
                          <span className="font-semibold">₹{prop.stats.earnings.current.toLocaleString()}</span>
                          <span className={`ml-2 text-xs ${prop.stats.earnings.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {prop.stats.earnings.trend === 'up' ? '↑' : '↓'} 
                            {Math.abs((prop.stats.earnings.current - prop.stats.earnings.previous) / prop.stats.earnings.previous * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-light)]">Rating</p>
                        <div className="flex items-center">
                          <span className="font-semibold">{prop.stats.reviews.average} ★</span>
                          <span className="ml-2 text-xs text-[var(--color-text-light)]">
                            ({prop.stats.reviews.count} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:w-32">
                    <Link href={`/host/edit/${prop.id}`} className="btn btn-secondary text-sm px-3 py-1.5 flex-1 text-center">
                      Edit
                    </Link>
                    <button 
                      className="btn bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50 text-sm px-3 py-1.5 flex-1 rounded-lg" 
                      onClick={() => setShowBookings(showBookings === prop.id ? null : prop.id)}
                    >
                      {showBookings === prop.id ? "Hide" : "Bookings"}
                    </button>
                  </div>
                </div>
                
                {showBookings === prop.id && (
                  <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                    <div className="font-semibold mb-2">Upcoming Bookings</div>
                    {prop.bookings.length === 0 ? (
                      <div className="text-[var(--color-text-light)]">No bookings yet.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-[var(--color-text-light)]">
                              <th className="pb-2">Guest</th>
                              <th className="pb-2">Dates</th>
                              <th className="pb-2">Amount</th>
                              <th className="pb-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prop.bookings.map((b, i) => (
                              <tr key={i} className="border-t border-[var(--color-border)]">
                                <td className="py-2">{b.guest}</td>
                                <td className="py-2">{b.dates}</td>
                                <td className="py-2">₹{b.amount.toLocaleString()}</td>
                                <td className="py-2">
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    b.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                                  }`}>
                                    {b.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'forecast' && (
        <RevenueForecast propertyData={properties.length > 0 ? {
          price: properties[0].price,
          occupancyRate: properties[0].stats.occupancyRate,
          earnings: properties[0].stats.earnings
        } : undefined} />
      )}

      {activeTab === 'competitive' && (
        <CompetitiveAnalysis propertyData={properties.length > 0 ? {
          location: properties[0].location,
          price: properties[0].price,
          rating: properties[0].stats.reviews.average,
          amenities: ['Private Pool', 'WiFi', 'AC', '24x7 Power Backup', 'Kitchen']
        } : undefined} />
      )}

      {activeTab === 'insights' && (
        <div className="glass-card mb-6">
          <h2 className="text-xl font-bold mb-4">Seasonal Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)]">
              <h3 className="font-semibold text-lg mb-2">Peak Season</h3>
              <p className="text-[var(--color-text-light)] mb-2">October - March</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Increase rates by 20-30%
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Minimum 3-night stays
                </li>
              </ul>
            </div>
            <div className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)]">
              <h3 className="font-semibold text-lg mb-2">Mid Season</h3>
              <p className="text-[var(--color-text-light)] mb-2">April - June</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  Standard rates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  Weekend premium: 15%
                </li>
              </ul>
            </div>
            <div className="bg-[var(--color-background)] p-4 rounded-lg border border-[var(--color-border)]">
              <h3 className="font-semibold text-lg mb-2">Low Season</h3>
              <p className="text-[var(--color-text-light)] mb-2">July - September</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  Discount rates by 10-15%
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  Offer weekly stay discounts
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-4">Festival Pricing Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[var(--color-text-light)] border-b border-[var(--color-border)]">
                    <th className="pb-2">Festival</th>
                    <th className="pb-2">Period</th>
                    <th className="pb-2">Recommended Price Increase</th>
                    <th className="pb-2">Expected Occupancy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border)]">
                    <td className="py-3">Diwali</td>
                    <td className="py-3">October/November</td>
                    <td className="py-3">+40-50%</td>
                    <td className="py-3">90-95%</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]">
                    <td className="py-3">Christmas & New Year</td>
                    <td className="py-3">December 20 - January 5</td>
                    <td className="py-3">+50-60%</td>
                    <td className="py-3">95-100%</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]">
                    <td className="py-3">Holi</td>
                    <td className="py-3">March</td>
                    <td className="py-3">+30-40%</td>
                    <td className="py-3">85-90%</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]">
                    <td className="py-3">Summer Vacation</td>
                    <td className="py-3">May-June</td>
                    <td className="py-3">+20-30%</td>
                    <td className="py-3">75-85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 