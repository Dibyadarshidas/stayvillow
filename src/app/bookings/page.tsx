'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      title: 'Luxury Pool Villa',
      location: 'Goa, India',
      dates: 'Oct 15 - Oct 20, 2024',
      checkIn: '2024-10-15',
      checkOut: '2024-10-20',
      status: 'Confirmed',
      totalAmount: 60000,
      paymentStatus: 'Paid',
      guests: 4,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60',
      host: {
        name: 'Priya Sharma',
        responseRate: '98%',
        rating: 4.9
      },
      cancellationPolicy: 'Free cancellation until Oct 8, 2024'
    },
    {
      id: 2,
      title: 'Mountain View Cabin',
      location: 'Manali, Himachal Pradesh',
      dates: 'Dec 5 - Dec 10, 2024',
      checkIn: '2024-12-05',
      checkOut: '2024-12-10',
      status: 'Pending',
      totalAmount: 42500,
      paymentStatus: 'Partially Paid',
      guests: 2,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60',
      host: {
        name: 'Rajesh Kumar',
        responseRate: '95%',
        rating: 4.8
      },
      cancellationPolicy: 'Free cancellation until Nov 25, 2024'
    },
    {
      id: 3,
      title: 'Hilltop Retreat',
      location: 'Lonavala, Maharashtra',
      dates: 'Jan 15 - Jan 18, 2025',
      checkIn: '2025-01-15',
      checkOut: '2025-01-18',
      status: 'Confirmed',
      totalAmount: 27000,
      paymentStatus: 'Paid',
      guests: 6,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60',
      host: {
        name: 'Anita Desai',
        responseRate: '100%',
        rating: 4.7
      },
      cancellationPolicy: 'Free cancellation until Jan 5, 2025'
    },
    {
      id: 4,
      title: 'Heritage Haveli Suite',
      location: 'Jaipur, Rajasthan',
      dates: 'Nov 2 - Nov 5, 2024',
      checkIn: '2024-11-02',
      checkOut: '2024-11-05',
      status: 'Completed',
      totalAmount: 45000,
      paymentStatus: 'Paid',
      guests: 2,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      host: {
        name: 'Vikram Singh',
        responseRate: '97%',
        rating: 4.9
      },
      cancellationPolicy: 'Non-refundable'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);

  // Filter bookings based on status
  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status.toLowerCase() === activeFilter.toLowerCase());

  // Calculate days until check-in
  const calculateDaysUntil = (dateString: string) => {
    const today = new Date();
    const checkInDate = new Date(dateString);
    const diffTime = checkInDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get AI recommendation based on booking location and dates
  const getAIRecommendation = (booking: any) => {
    const location = booking.location.split(',')[0];
    const checkInMonth = new Date(booking.checkIn).getMonth();
    
    // Winter months (November to February)
    if (checkInMonth >= 10 || checkInMonth <= 1) {
      if (location === 'Goa') {
        return "Perfect time to visit Goa! Pack light clothing and don't miss the sunset beach parties.";
      } else if (location === 'Manali') {
        return "It's snow season in Manali! Pack warm clothes and check out the winter sports activities.";
      } else if (location === 'Jaipur') {
        return "Great time to explore Jaipur's palaces. The weather will be pleasant for sightseeing.";
      }
    } 
    // Summer months (March to June)
    else if (checkInMonth >= 2 && checkInMonth <= 5) {
      if (location === 'Lonavala') {
        return "Consider visiting the nearby waterfalls and viewpoints early morning to avoid heat.";
      } else if (location === 'Manali') {
        return "Perfect time for trekking and outdoor activities in Manali. The views will be spectacular!";
      }
    }
    
    return `We've analyzed weather patterns for your ${location} trip. Pack accordingly and check local events happening during your stay!`;
  };

  // Toggle booking details expansion
  const toggleBookingDetails = (id: number) => {
    if (expandedBooking === id) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(id);
    }
  };

  return (
    <div className="w-full">
      <div className="glass-card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
          
          <div className="flex mt-4 md:mt-0">
            <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden">
              <button 
                className={`px-3 py-1.5 text-sm ${activeFilter === 'all' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1.5 text-sm ${activeFilter === 'confirmed' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setActiveFilter('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`px-3 py-1.5 text-sm ${activeFilter === 'pending' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setActiveFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`px-3 py-1.5 text-sm ${activeFilter === 'completed' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-text-light)]'}`}
                onClick={() => setActiveFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
            <p className="text-[var(--color-text-light)] mb-6">
              {activeFilter === 'all' 
                ? "You don't have any bookings yet" 
                : `You don't have any ${activeFilter} bookings`}
            </p>
            <Link href="/search" className="btn btn-primary">
              Explore properties
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const daysUntil = calculateDaysUntil(booking.checkIn);
              const isPast = daysUntil < 0;
              const isUpcoming = daysUntil >= 0 && daysUntil <= 7;
              
              return (
                <div key={booking.id} className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-[var(--color-border)]">
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Property image */}
                      <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden">
                        <Image
                          src={booking.image}
                          alt={booking.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Booking details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.title}</h3>
                            <p className="text-[var(--color-text-light)]">{booking.location}</p>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {booking.status}
                            </span>
                            
                            {isUpcoming && !isPast && (
                              <span className="ml-2 px-3 py-1 rounded-full text-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                {daysUntil === 0 ? 'Today' : `In ${daysUntil} day${daysUntil > 1 ? 's' : ''}`}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-xs text-[var(--color-text-light)]">Dates</p>
                            <p className="font-medium">{booking.dates}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[var(--color-text-light)]">Guests</p>
                            <p className="font-medium">{booking.guests} {booking.guests > 1 ? 'guests' : 'guest'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[var(--color-text-light)]">Total</p>
                            <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex flex-row md:flex-col gap-2 md:w-32">
                        <Link 
                          href={`/property/${booking.id}`} 
                          className="btn btn-secondary text-sm px-3 py-1.5 flex-1 text-center"
                        >
                          View Property
                        </Link>
                        <button 
                          onClick={() => toggleBookingDetails(booking.id)}
                          className="btn bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50 text-sm px-3 py-1.5 flex-1 rounded-lg"
                        >
                          {expandedBooking === booking.id ? "Hide Details" : "View Details"}
                        </button>
                      </div>
                    </div>
                    
                    {/* Expanded booking details */}
                    {expandedBooking === booking.id && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Booking Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-[var(--color-text-light)]">Check-in</span>
                                <span>{new Date(booking.checkIn).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[var(--color-text-light)]">Check-out</span>
                                <span>{new Date(booking.checkOut).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[var(--color-text-light)]">Payment Status</span>
                                <span>{booking.paymentStatus}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[var(--color-text-light)]">Cancellation Policy</span>
                                <span>{booking.cancellationPolicy}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Host Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-[var(--color-text-light)]">Host Name</span>
                                <span>{booking.host.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[var(--color-text-light)]">Response Rate</span>
                                <span>{booking.host.responseRate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[var(--color-text-light)]">Rating</span>
                                <span>{booking.host.rating} ★</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* AI Trip Recommendations */}
                        <div className="mt-6 p-4 bg-[var(--color-primary)]/10 rounded-lg">
                          <div className="flex items-center mb-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 text-[var(--color-primary)]">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                              <line x1="9" y1="9" x2="9.01" y2="9"></line>
                              <line x1="15" y1="9" x2="15.01" y2="9"></line>
                            </svg>
                            <h4 className="font-semibold">AI Trip Recommendations</h4>
                          </div>
                          <p className="text-sm text-[var(--color-text-light)]">
                            {getAIRecommendation(booking)}
                          </p>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="mt-6 flex flex-wrap gap-3 justify-end">
                          {booking.status !== 'Completed' && (
                            <>
                              <button className="btn bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50 text-sm px-4 py-2 rounded-lg">
                                Contact Host
                              </button>
                              {booking.status === 'Confirmed' && (
                                <button className="btn bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-sm px-4 py-2 rounded-lg">
                                  Cancel Booking
                                </button>
                              )}
                            </>
                          )}
                          {booking.status === 'Completed' && (
                            <button className="btn bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20 text-sm px-4 py-2 rounded-lg">
                              Write a Review
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage; 