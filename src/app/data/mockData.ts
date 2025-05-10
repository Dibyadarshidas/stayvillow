// Central mock data file
// Re-exports all mock data and helper functions from individual files

// Properties data
import { 
  properties, 
  getFeaturedProperties, 
  getPropertyById, 
  getPropertiesByLocation,
  getPropertiesByAmenity,
  getPropertiesByType 
} from './properties';

// Locations data
import {
  locations,
  getFeaturedLocations,
  getLocationById,
  getLocationByName,
  getSeasonalRecommendations
} from './locations';

// Users data
import {
  users,
  getHosts,
  getTravelers,
  getUserById,
  getUserByEmail
} from './users';

// Bookings data
import {
  bookings,
  getUserBookings,
  getHostBookings,
  getPropertyBookings,
  getBookingById,
  getBookingsByStatus
} from './bookings';

// Reviews data
import {
  reviews,
  getPropertyReviews,
  getHostReviews,
  getUserReviews,
  getReviewById,
  getAverageRating
} from './reviews';

// Export all data and helper functions
export {
  // Raw data collections
  properties,
  locations,
  users,
  bookings,
  reviews,
  
  // Property helper functions
  getFeaturedProperties,
  getPropertyById,
  getPropertiesByLocation,
  getPropertiesByAmenity,
  getPropertiesByType,
  
  // Location helper functions
  getFeaturedLocations,
  getLocationById,
  getLocationByName,
  getSeasonalRecommendations,
  
  // User helper functions
  getHosts,
  getTravelers,
  getUserById,
  getUserByEmail,
  
  // Booking helper functions
  getUserBookings,
  getHostBookings,
  getPropertyBookings,
  getBookingById,
  getBookingsByStatus,
  
  // Review helper functions
  getPropertyReviews,
  getHostReviews,
  getUserReviews,
  getReviewById,
  getAverageRating
};

// Convenience function to get all data at once (useful for debugging)
export const getAllMockData = () => {
  return {
    properties,
    locations,
    users,
    bookings,
    reviews
  };
}; 