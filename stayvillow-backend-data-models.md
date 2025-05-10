# Stayvillow Data Models

This document outlines the core data models for the Stayvillow backend, designed for MongoDB with Mongoose ODM.

## User Model

```typescript
interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string; // Hashed
  phone: string;
  userType: 'traveler' | 'host' | 'admin';
  profileImage?: string;
  verified: boolean;
  verificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  
  // Traveler specific fields
  travelPreferences?: {
    preferredLocations: string[];
    preferredPropertyTypes: string[];
    preferredAmenities: string[];
    priceRange: {
      min: number;
      max: number;
    };
    travelStyle: string[];
  };
  
  // Host specific fields
  hostInfo?: {
    description: string;
    responseRate: number;
    responseTime: number;
    isSuperhost: boolean;
    verified: boolean;
    joinedDate: Date;
  };
  
  // Common fields
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  paymentMethods?: [{
    type: string;
    lastFour?: string;
    expiryDate?: string;
    isDefault: boolean;
  }];
  
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  
  savedProperties: ObjectId[]; // References to Property
  
  createdAt: Date;
  updatedAt: Date;
}
```

## Property Model

```typescript
interface Property {
  _id: ObjectId;
  host: ObjectId; // Reference to User
  title: string;
  description: string;
  propertyType: string; // villa, apartment, cabin, etc.
  
  location: {
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    },
    coordinates: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    },
    showExactLocation: boolean;
  };
  
  details: {
    bedrooms: number;
    beds: number;
    bathrooms: number;
    maxGuests: number;
    area: number; // in sq. ft or sq. meters
  };
  
  amenities: string[]; // List of amenity codes
  
  images: [{
    url: string;
    caption?: string;
    isPrimary: boolean;
  }];
  
  pricing: {
    basePrice: number; // per night in INR
    cleaningFee: number;
    serviceFee: number;
    taxRate: number;
    weeklyDiscount?: number; // percentage
    monthlyDiscount?: number; // percentage
    refundableDeposit?: number;
    currencyCode: string; // Default: INR
  };
  
  availability: {
    minStay: number;
    maxStay?: number;
    instantBooking: boolean;
    blockedDates: Date[];
    seasonalPricing?: [{
      startDate: Date;
      endDate: Date;
      priceMultiplier: number;
    }];
  };
  
  rules: {
    houseRules: string[];
    cancellationPolicy: string; // flexible, moderate, strict
    checkInTime: string;
    checkOutTime: string;
    allowPets: boolean;
    allowEvents: boolean;
    allowSmoking: boolean;
  };
  
  virtualTour?: {
    url: string;
    type: string;
  };
  
  status: 'draft' | 'published' | 'under_review' | 'suspended';
  isVerified: boolean;
  verificationComment?: string;
  
  // Analytics and metrics
  metrics: {
    views: number;
    bookmarks: number;
    viewsLastMonth: number;
    conversionRate: number;
    avgRating: number;
  };
  
  createdAt: Date;
  updatedAt: Date;
}
```

## Booking Model

```typescript
interface Booking {
  _id: ObjectId;
  property: ObjectId; // Reference to Property
  guest: ObjectId; // Reference to User (traveler)
  host: ObjectId; // Reference to User (host)
  
  dates: {
    checkIn: Date;
    checkOut: Date;
    numberOfNights: number;
  };
  
  guests: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
  
  pricing: {
    nightlyRate: number;
    numberOfNights: number;
    basePriceTotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    discount?: number;
    refundableDeposit?: number;
    totalAmount: number;
    currencyCode: string; // Default: INR
  };
  
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  cancellationReason?: string;
  cancellationDate?: Date;
  cancelledBy?: ObjectId; // Reference to User
  
  paymentStatus: 'pending' | 'partially_paid' | 'paid' | 'refunded';
  payments: [{
    amount: number;
    method: string;
    status: string;
    transactionId: string;
    timestamp: Date;
  }];
  
  specialRequests?: string;
  guestItinerary?: {
    arrivalTime?: string;
    departureTime?: string;
    specialNeeds?: string;
    travelMethod?: string;
  };
  
  hostResponse?: {
    accepted: boolean;
    message?: string;
    responseTime: Date;
  };
  
  // For seasonal tips and recommendations
  seasonalContext?: {
    season: string;
    localEvents: string[];
    weatherForecast: string;
    travelTips: string[];
  };
  
  reviewId?: ObjectId; // Reference to Review if guest left one
  
  createdAt: Date;
  updatedAt: Date;
}
```

## Review Model

```typescript
interface Review {
  _id: ObjectId;
  property: ObjectId; // Reference to Property
  booking: ObjectId; // Reference to Booking
  reviewer: ObjectId; // Reference to User (guest)
  host: ObjectId; // Reference to User (host)
  
  rating: number; // 1-5
  comment: string;
  
  aspects: {
    cleanliness: number;
    communication: number;
    checkIn: number;
    accuracy: number;
    location: number;
    value: number;
  };
  
  tags?: string[]; // "great view", "comfortable bed", etc.
  images?: string[]; // URLs of review images
  
  hostResponse?: {
    comment: string;
    timestamp: Date;
  };
  
  helpful?: number; // Number of people who found review helpful
  reported?: boolean;
  
  status: 'pending' | 'published' | 'removed';
  
  createdAt: Date;
  updatedAt: Date;
}
```

## Message Model

```typescript
interface Message {
  _id: ObjectId;
  conversation: ObjectId; // Reference to Conversation
  sender: ObjectId; // Reference to User
  recipient: ObjectId; // Reference to User
  
  content: string;
  attachments?: [{
    url: string;
    type: string;
    name: string;
  }];
  
  relatedTo?: {
    propertyId?: ObjectId; // Reference to Property
    bookingId?: ObjectId; // Reference to Booking
  };
  
  readAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}
```

## Conversation Model

```typescript
interface Conversation {
  _id: ObjectId;
  participants: ObjectId[]; // References to Users
  
  lastMessage: {
    content: string;
    sender: ObjectId;
    timestamp: Date;
  };
  
  relatedTo?: {
    propertyId?: ObjectId; // Reference to Property
    bookingId?: ObjectId; // Reference to Booking
  };
  
  unreadCount: {
    [userId: string]: number;
  };
  
  status: 'active' | 'archived';
  
  createdAt: Date;
  updatedAt: Date;
}
```

## Payment Model

```typescript
interface Payment {
  _id: ObjectId;
  booking: ObjectId; // Reference to Booking
  payer: ObjectId; // Reference to User (guest)
  recipient: ObjectId; // Reference to User (host)
  
  amount: number;
  currencyCode: string; // Default: INR
  
  serviceFee: number;
  hostFee: number;
  
  method: string; // credit_card, debit_card, upi, netbanking, etc.
  gatewayDetails: {
    gatewayName: string; // razorpay, paytm, stripe, etc.
    paymentIntentId?: string;
    transactionId: string;
  };
  
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  
  refundDetails?: {
    amount: number;
    reason: string;
    initiatedBy: ObjectId; // Reference to User
    timestamp: Date;
  };
  
  billingDetails: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    },
    email: string;
    phone?: string;
  };
  
  invoiceId?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
```

## VirtualTour Model

```typescript
interface VirtualTour {
  _id: ObjectId;
  property: ObjectId; // Reference to Property
  
  type: 'panorama' | '3d_model' | 'video';
  
  media: [{
    url: string;
    type: string;
    position?: {
      order: number;
      coordinates?: { x: number, y: number, z: number };
    };
    title?: string;
  }];
  
  config: {
    startingPoint?: number; // Index of starting media
    allowUserControl: boolean;
    hotspots?: [{
      position: { x: number, y: number, z: number };
      linkTo: number; // Index of target media
      title?: string;
    }];
  };
  
  analytics: {
    views: number;
    averageDuration: number;
    completionRate: number; // Percentage of users who view the complete tour
  };
  
  createdAt: Date;
  updatedAt: Date;
}
```

## Location Model

```typescript
interface Location {
  _id: ObjectId;
  name: string;
  state: string;
  country: string;
  
  coordinates: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  
  description: string;
  images: string[];
  propertyCount: number;
  
  seasonality: [{
    season: string; // 'summer', 'winter', 'monsoon', 'spring'
    startMonth: number; // 0-11
    endMonth: number; // 0-11
    description: string;
    isRecommended: boolean;
    averagePricing: number; // Average property price during this season
  }];
  
  popularityScore: number;
  featured: boolean;
  
  travelTips: string[];
  localEvents: [{
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }];
  
  createdAt: Date;
  updatedAt: Date;
}
```

## PropertyAnalytics Model

```typescript
interface PropertyAnalytics {
  _id: ObjectId;
  property: ObjectId; // Reference to Property
  
  dailyMetrics: [{
    date: Date;
    views: number;
    bookings: number;
    revenue: number;
    conversionRate: number;
  }];
  
  competitiveMetrics: {
    averagePriceInArea: number;
    occupancyRateInArea: number;
    rankInArea: number;
    pricingPercentile: number;
  };
  
  forecast: [{
    month: number; // 0-11
    year: number;
    projectedOccupancy: number;
    projectedRevenue: number;
    seasonalFactor: number;
    recommendedPrice: number;
  }];
  
  performanceScores: {
    overall: number;
    pricing: number;
    photos: number;
    description: number;
    responsiveness: number;
    bookingFrequency: number;
  };
  
  lastUpdated: Date;
}
```

## Notification Model

```typescript
interface Notification {
  _id: ObjectId;
  recipient: ObjectId; // Reference to User
  
  type: string; // 'booking_request', 'booking_confirmed', 'new_message', etc.
  
  content: {
    title: string;
    body: string;
    image?: string;
  };
  
  relatedTo?: {
    propertyId?: ObjectId;
    bookingId?: ObjectId;
    messageId?: ObjectId;
    userId?: ObjectId;
  };
  
  status: 'unread' | 'read';
  readAt?: Date;
  
  channels: {
    inApp: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  
  deliveryStatus: {
    inApp?: 'pending' | 'sent' | 'failed';
    email?: 'pending' | 'sent' | 'failed';
    push?: 'pending' | 'sent' | 'failed';
    sms?: 'pending' | 'sent' | 'failed';
  };
  
  priority: 'low' | 'medium' | 'high';
  expiresAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}
```

## AmenityModel

```typescript
interface Amenity {
  _id: ObjectId;
  name: string;
  description?: string;
  icon: string;
  category: 'basic' | 'safety' | 'facilities' | 'accessibility' | 'outdoor' | 'entertainment' | 'kitchen';
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## PropertyTypeModel

```typescript
interface PropertyType {
  _id: ObjectId;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Database Indexes

### User Collection
- Index on `email` (unique)
- Index on `userType`
- Index on `savedProperties`

### Property Collection
- Geospatial index on `location.coordinates`
- Index on `host`
- Index on `propertyType`
- Index on `status`
- Compound index on `location.address.city` and `location.address.state`
- Text index on `title` and `description`

### Booking Collection
- Index on `property`
- Index on `guest`
- Index on `host`
- Index on `status`
- Index on `dates.checkIn` and `dates.checkOut`

### Review Collection
- Index on `property`
- Index on `booking`
- Index on `rating`

### Message Collection
- Index on `conversation`
- Index on `sender`
- Index on `recipient`
- Index on `readAt`

### Payment Collection
- Index on `booking`
- Index on `status`
- Index on `createdAt`

### Location Collection
- Geospatial index on `coordinates`
- Index on `state`
- Index on `popularity`
- Index on `featured` 