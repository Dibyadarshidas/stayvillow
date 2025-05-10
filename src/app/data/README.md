# Stayvillow Mock Data Structure

This directory contains all the mock data used in the Stayvillow application. The data is organized into separate files for different entity types, and centralized through the `mockData.ts` file.

## Data Organization

- **mockData.ts** - Central file that imports and re-exports all mock data and helper functions
- **properties.ts** - Property listings and property-related helper functions
- **locations.ts** - Location data and location-related helper functions
- **users.ts** - User profiles (hosts and travelers) and user-related helper functions
- **bookings.ts** - Booking information and booking-related helper functions
- **reviews.ts** - Property reviews and rating-related helper functions

## How to Use

### Import All Data from the Central File

To use the mock data in your components, you can import from the central `mockData.ts` file:

```typescript
import { 
  properties, 
  locations, 
  users, 
  bookings, 
  reviews,
  // Or any of the helper functions
  getPropertyById,
  getFeaturedLocations,
  getUserById,
  // etc.
} from './data/mockData';
```

### Using Helper Functions

Each data type comes with helper functions for common operations:

```typescript
// Get a specific property by ID
const property = getPropertyById(1);

// Get properties in a specific location
const goaProperties = getPropertiesByLocation('Goa');

// Get all featured locations
const featuredLocations = getFeaturedLocations();

// Get seasonal recommendations based on current month
const recommendations = getSeasonalRecommendations();

// Get a user's bookings
const userBookings = getUserBookings(4);

// Get all reviews for a property
const propertyReviews = getPropertyReviews(2);
```

### Get All Data at Once

For debugging purposes, you can get all data at once:

```typescript
import { getAllMockData } from './data/mockData';

const allData = getAllMockData();
console.log(allData.properties);
console.log(allData.users);
// etc.
```

## Data Structure

Each data file follows a consistent pattern:
1. A main array containing all the records of that type
2. Helper functions to filter, search, and manipulate the data

## Extending the Data

To add new mock data:
1. Add the new records to the appropriate file
2. If needed, add new helper functions in that file
3. Export the new data or functions from the `mockData.ts` file

This centralized structure makes it easy to manage and expand the mock data as the application grows. 