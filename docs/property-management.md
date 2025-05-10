# Property Management Component (Stayvillow)

This document describes the Property Management component, which is part of the Stayvillow host dashboard. This component allows hosts to view and manage their property listings, track performance metrics, and manage bookings.

## Overview

The Property Management component provides hosts with a comprehensive interface to manage their property portfolio. Key features include:

- Visual display of all property listings
- Performance metrics for each property
- Booking management interface
- Quick access to property editing tools

## Features

### Property Listing Display

- **Property Cards**
  - Visual representation of each property with image thumbnail
  - Property title and location prominently displayed
  - Current nightly rate in INR (₹) format
  - Clean, modern card design with consistent styling

- **Property Details**
  - Property location with city and state/province
  - Current nightly rate with "/night" indicator
  - Responsive design that adapts to different screen sizes
  - Consistent information hierarchy across all property cards

### Performance Metrics

- **Occupancy Rate**
  - Current occupancy percentage for each property
  - Comparison with previous period
  - Trend indicator (up/down arrow)
  - Percentage change calculation

- **Earnings**
  - Current earnings in INR (₹) format
  - Comparison with previous period
  - Trend indicator (up/down arrow)
  - Percentage change calculation

- **Guest Ratings**
  - Average rating (out of 5 stars)
  - Total number of reviews
  - Visual star indicator

### Booking Management

- **Booking Toggle**
  - Expandable section for each property
  - Show/hide bookings functionality
  - Clean transition between states

- **Booking Table**
  - Guest name
  - Booking dates
  - Booking amount in INR (₹)
  - Status indicator (Confirmed, Pending)
  - Color-coded status badges

- **Empty State**
  - Friendly message when no bookings are available
  - Clean, consistent styling

### Property Actions

- **Edit Property**
  - Quick access to property editing interface
  - Link to dedicated edit page with property ID
  - Consistent button styling

- **View Bookings**
  - Toggle to show/hide booking details
  - Interactive button with state change
  - Consistent button styling

- **Add New Property**
  - Prominent button to add new property
  - Link to property creation form
  - Positioned for easy access

## Technical Implementation

The Property Management component is built with the following technologies:
- React functional component with hooks
- TypeScript for type safety
- Next.js Image component for optimized image loading
- CSS variables for theming with aqua-themed UI
- Responsive design for all device sizes

### Key Functions

- `setShowBookings`: Manages the visibility state of booking details
- Property mapping and rendering
- Conditional rendering based on booking availability
- Responsive layout adjustments

### Data Structure

The component works with the following data structure:
```typescript
interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  bookings: {
    guest: string;
    dates: string;
    status: "Confirmed" | "Pending";
    amount: number;
  }[];
  stats: {
    occupancyRate: {
      current: number;
      previous: number;
      trend: "up" | "down";
    };
    earnings: {
      current: number;
      previous: number;
      trend: "up" | "down";
    };
    reviews: {
      count: number;
      average: number;
    };
  };
}
```

## Usage

The Property Management component is accessible from the host dashboard under the "Property Management" tab:

1. Navigate to the Host Dashboard
2. Click on the "Property Management" tab
3. View all properties in the portfolio
4. Click "Bookings" on any property to view its booking details
5. Click "Edit" to modify property details
6. Click "Add New Property" to create a new listing

## Integration Points

- The component can be connected to a real property database
- The booking management can be integrated with a reservation system
- Edit functionality can be connected to a property editing form
- Add New Property button can be linked to a property creation form

## Future Enhancements

- **Bulk Actions**: Allow hosts to perform actions on multiple properties at once
- **Sorting and Filtering**: Add ability to sort and filter properties by various criteria
- **Calendar View**: Add a calendar view of all bookings across properties
- **Guest Communication**: Add direct messaging with guests from the property management interface
- **Performance Comparison**: Add ability to compare performance between properties
- **Maintenance Tracking**: Add functionality to track and schedule property maintenance
- **Availability Management**: Add calendar-based availability management
- **Pricing Rules**: Add ability to set and manage dynamic pricing rules 