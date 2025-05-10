# Stayvillow Backend API Specification

## Authentication & User APIs

### Register User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Creates new user account
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "userType": "traveler | host",
    "profileImage": "File (optional)"
  }
  ```
- **Response:** User object with JWT token

### Login User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticates user and returns token
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** User object with JWT token

### Get User Profile
- **Endpoint:** `GET /api/users/profile`
- **Description:** Returns the current user's profile information
- **Auth Required:** Yes
- **Response:** Full user profile object

### Update User Profile
- **Endpoint:** `PUT /api/users/profile`
- **Description:** Updates user profile information
- **Auth Required:** Yes
- **Request Body:** User profile fields to update
- **Response:** Updated user object

### Reset Password
- **Endpoint:** `POST /api/auth/reset-password`
- **Description:** Initiates password reset flow
- **Request Body:** `{ "email": "string" }`
- **Response:** Success message

## Property APIs

### Create Property
- **Endpoint:** `POST /api/properties`
- **Description:** Creates a new property listing
- **Auth Required:** Yes (Host only)
- **Request Body:** Complete property details
- **Response:** Created property object

### Get Properties
- **Endpoint:** `GET /api/properties`
- **Description:** Returns paginated list of properties
- **Query Parameters:** Various filters (location, dates, guests, amenities, etc.)
- **Response:** Array of property objects with pagination metadata

### Get Property Details
- **Endpoint:** `GET /api/properties/:id`
- **Description:** Returns detailed information about a property
- **Response:** Complete property object with availability, reviews, etc.

### Update Property
- **Endpoint:** `PUT /api/properties/:id`
- **Description:** Updates a property listing
- **Auth Required:** Yes (Property owner only)
- **Request Body:** Property fields to update
- **Response:** Updated property object

### Delete Property
- **Endpoint:** `DELETE /api/properties/:id`
- **Description:** Removes a property listing
- **Auth Required:** Yes (Property owner only)
- **Response:** Success message

### Upload Property Images
- **Endpoint:** `POST /api/properties/:id/images`
- **Description:** Uploads images for a property
- **Auth Required:** Yes (Property owner only)
- **Request Body:** Multipart form with images
- **Response:** Array of image URLs

### Get Property Availability
- **Endpoint:** `GET /api/properties/:id/availability`
- **Description:** Returns availability calendar for a property
- **Query Parameters:** `startDate`, `endDate`
- **Response:** Object with available/blocked dates

### Update Property Availability
- **Endpoint:** `PUT /api/properties/:id/availability`
- **Description:** Updates availability for a property
- **Auth Required:** Yes (Property owner only)
- **Request Body:** Dates to block/unblock
- **Response:** Updated availability object

## Search APIs

### Search Properties
- **Endpoint:** `GET /api/search`
- **Description:** Advanced property search
- **Query Parameters:**
  ```
  location, checkIn, checkOut, guests, priceMin, priceMax, 
  amenities[], propertyType, instant, bedrooms, bathrooms
  ```
- **Response:** Array of matching properties with pagination metadata

### Featured Properties
- **Endpoint:** `GET /api/properties/featured`
- **Description:** Returns featured properties for homepage
- **Query Parameters:** `limit`, `page`
- **Response:** Array of featured properties

### Properties By Location
- **Endpoint:** `GET /api/properties/by-location`
- **Description:** Returns properties grouped by popular locations
- **Response:** Object with location keys and property arrays

### Trending Properties
- **Endpoint:** `GET /api/properties/trending`
- **Description:** Returns trending/popular properties
- **Response:** Array of trending properties

## Booking APIs

### Create Booking
- **Endpoint:** `POST /api/bookings`
- **Description:** Creates a new booking request
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "propertyId": "string",
    "checkIn": "date",
    "checkOut": "date",
    "guests": "number",
    "totalAmount": "number",
    "specialRequests": "string (optional)"
  }
  ```
- **Response:** Booking object with status

### Get User Bookings
- **Endpoint:** `GET /api/bookings`
- **Description:** Returns user's bookings (as guest)
- **Auth Required:** Yes
- **Query Parameters:** `status`, `page`, `limit`
- **Response:** Array of booking objects with pagination

### Get Host Bookings
- **Endpoint:** `GET /api/host/bookings`
- **Description:** Returns bookings for host's properties
- **Auth Required:** Yes (Host only)
- **Query Parameters:** `status`, `propertyId`, `page`, `limit`
- **Response:** Array of booking objects with pagination

### Get Booking Details
- **Endpoint:** `GET /api/bookings/:id`
- **Description:** Returns detailed information about a booking
- **Auth Required:** Yes (Booking guest or property owner)
- **Response:** Complete booking object

### Update Booking Status
- **Endpoint:** `PUT /api/bookings/:id/status`
- **Description:** Updates booking status (confirm, reject, cancel)
- **Auth Required:** Yes (Different permissions based on status change)
- **Request Body:** `{ "status": "confirmed | rejected | cancelled", "reason": "string (optional)" }`
- **Response:** Updated booking object

### Get Booking Calendar
- **Endpoint:** `GET /api/host/calendar`
- **Description:** Returns calendar with all bookings for host properties
- **Auth Required:** Yes (Host only)
- **Query Parameters:** `startDate`, `endDate`, `propertyId`
- **Response:** Calendar object with bookings

## Review APIs

### Create Review
- **Endpoint:** `POST /api/reviews`
- **Description:** Submits a review for a completed stay
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "bookingId": "string",
    "propertyId": "string",
    "rating": "number (1-5)",
    "comment": "string",
    "tags": ["array of strings (optional)"]
  }
  ```
- **Response:** Created review object

### Get Property Reviews
- **Endpoint:** `GET /api/properties/:id/reviews`
- **Description:** Returns reviews for a property
- **Query Parameters:** `page`, `limit`, `sort`
- **Response:** Array of review objects with pagination

### Host Response to Review
- **Endpoint:** `POST /api/reviews/:id/response`
- **Description:** Allows host to respond to a review
- **Auth Required:** Yes (Property owner only)
- **Request Body:** `{ "response": "string" }`
- **Response:** Updated review with host response

## Host Dashboard APIs

### Get Host Properties
- **Endpoint:** `GET /api/host/properties`
- **Description:** Returns all properties owned by the host
- **Auth Required:** Yes (Host only)
- **Query Parameters:** `status`, `page`, `limit`
- **Response:** Array of property objects with pagination

### Get Property Performance
- **Endpoint:** `GET /api/host/properties/:id/performance`
- **Description:** Returns performance metrics for a property
- **Auth Required:** Yes (Property owner only)
- **Query Parameters:** `period` (30days, 90days, year)
- **Response:** Performance metrics (occupancy, earnings, etc.)

### Get Revenue Forecast
- **Endpoint:** `GET /api/host/forecast`
- **Description:** Returns revenue forecast for host properties
- **Auth Required:** Yes (Host only)
- **Query Parameters:** `propertyId` (optional), `months` (default: 6)
- **Response:** Forecast data with monthly projections

### Get Competitive Analysis
- **Endpoint:** `GET /api/host/competitive-analysis`
- **Description:** Returns market analysis for host properties
- **Auth Required:** Yes (Host only)
- **Query Parameters:** `propertyId`, `radius` (km)
- **Response:** Analysis data (avg prices, occupancy, etc.)

### Get Host Dashboard Summary
- **Endpoint:** `GET /api/host/dashboard`
- **Description:** Returns summary stats for host dashboard
- **Auth Required:** Yes (Host only)
- **Query Parameters:** `period` (30days, 90days, year)
- **Response:** Dashboard summary data

## Virtual Tour APIs

### Create Virtual Tour
- **Endpoint:** `POST /api/properties/:id/virtual-tour`
- **Description:** Uploads and creates a virtual tour for a property
- **Auth Required:** Yes (Property owner only)
- **Request Body:** Virtual tour data
- **Response:** Virtual tour object

### Get Virtual Tour
- **Endpoint:** `GET /api/properties/:id/virtual-tour`
- **Description:** Returns virtual tour data for a property
- **Response:** Virtual tour object with media URLs

## Messaging APIs

### Get Conversations
- **Endpoint:** `GET /api/messages/conversations`
- **Description:** Returns user's conversations
- **Auth Required:** Yes
- **Query Parameters:** `page`, `limit`
- **Response:** Array of conversation objects

### Get Conversation Messages
- **Endpoint:** `GET /api/messages/conversations/:id`
- **Description:** Returns messages for a conversation
- **Auth Required:** Yes (Conversation participant only)
- **Query Parameters:** `page`, `limit`
- **Response:** Array of message objects with pagination

### Send Message
- **Endpoint:** `POST /api/messages`
- **Description:** Sends a message
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "conversationId": "string (optional - if continuing conversation)",
    "recipientId": "string (required if no conversationId)",
    "propertyId": "string (optional - if related to property)",
    "bookingId": "string (optional - if related to booking)",
    "content": "string",
    "attachments": ["array of file paths (optional)"]
  }
  ```
- **Response:** Created message object

## Payment APIs

### Create Payment Intent
- **Endpoint:** `POST /api/payments/intent`
- **Description:** Creates payment intent for a booking
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "bookingId": "string",
    "amount": "number",
    "paymentMethod": "string (credit_card, upi, netbanking, etc.)"
  }
  ```
- **Response:** Payment intent details with client secret

### Confirm Payment
- **Endpoint:** `POST /api/payments/confirm`
- **Description:** Confirms a successful payment
- **Auth Required:** Yes
- **Request Body:** Payment confirmation details
- **Response:** Updated booking and payment objects

### Get Payment History
- **Endpoint:** `GET /api/payments/history`
- **Description:** Returns payment history for the user
- **Auth Required:** Yes
- **Query Parameters:** `type` (paid, received), `page`, `limit`
- **Response:** Array of payment objects with pagination

### Generate Invoice
- **Endpoint:** `GET /api/payments/:id/invoice`
- **Description:** Generates an invoice PDF for a payment
- **Auth Required:** Yes (Payment participant only)
- **Response:** Invoice PDF or download URL

## Miscellaneous APIs

### Get Locations
- **Endpoint:** `GET /api/locations`
- **Description:** Returns popular/featured locations
- **Response:** Array of location objects

### Get Amenities
- **Endpoint:** `GET /api/amenities`
- **Description:** Returns list of possible amenities
- **Response:** Array of amenity objects

### Get Property Types
- **Endpoint:** `GET /api/property-types`
- **Description:** Returns list of property types
- **Response:** Array of property type objects

### Get Seasonal Recommendations
- **Endpoint:** `GET /api/recommendations/seasonal`
- **Description:** Returns seasonal travel recommendations
- **Query Parameters:** `month` (optional - defaults to current)
- **Response:** Seasonal recommendation object

### Get Personalized Recommendations
- **Endpoint:** `GET /api/recommendations/personalized`
- **Description:** Returns personalized property recommendations for user
- **Auth Required:** Yes
- **Response:** Array of recommended properties with reasoning

## Admin APIs

### Get All Users
- **Endpoint:** `GET /api/admin/users`
- **Description:** Returns paginated list of all users
- **Auth Required:** Yes (Admin only)
- **Query Parameters:** Various filters
- **Response:** Array of user objects with pagination

### Get All Properties
- **Endpoint:** `GET /api/admin/properties`
- **Description:** Returns paginated list of all properties
- **Auth Required:** Yes (Admin only)
- **Query Parameters:** Various filters
- **Response:** Array of property objects with pagination

### Verify Property
- **Endpoint:** `PUT /api/admin/properties/:id/verify`
- **Description:** Verifies a property listing
- **Auth Required:** Yes (Admin only)
- **Request Body:** `{ "status": "verified | rejected", "comment": "string (optional)" }`
- **Response:** Updated property object

### Get Platform Statistics
- **Endpoint:** `GET /api/admin/stats`
- **Description:** Returns platform-wide statistics
- **Auth Required:** Yes (Admin only)
- **Response:** Platform statistics object

## Error Handling

All endpoints should return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

Error responses should follow this format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional additional details
  }
}
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- Public endpoints: 100 requests per IP per hour
- Authenticated endpoints: 1000 requests per user per hour

## Pagination

All list endpoints support pagination with these query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Paginated responses include metadata:
```json
{
  "data": [],
  "pagination": {
    "total": 100,
    "pages": 5,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

## Filtering and Sorting

List endpoints support filtering and sorting:
- Filtering: Add query parameters matching field names
- Sorting: Use `sort` parameter with field name (prefix with `-` for descending)

Example: `/api/properties?priceMin=5000&priceMax=10000&sort=-rating` 