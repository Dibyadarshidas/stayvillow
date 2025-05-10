# Property Details & Booking UI (Stayvillow)

This document describes the property detail and booking flow UI, built for Stayvillow. All logic is UI-only and ready to connect to your backend or booking/payment system.

## Features
- Dynamic property detail page: `/property/[id]`
- Image gallery (mock images)
- Property info: title, location, description, price, amenities
- Reviews section (mock data)
- Map placeholder
- Booking form: date pickers, guest selection, Book Now button
- Booking confirmation UI (mock)
- Booking history UI in profile

## How It Works
- The property detail page uses mock data for demo purposes.
- The booking form updates state and shows a confirmation message (no backend logic).
- Reviews and amenities are displayed from mock arrays.
- The map is a placeholder div (replace with a real map later).

## Extending the UI
- Replace mock data with real property data from your backend or API.
- Connect the booking form to your backend to create real bookings.
- Integrate a payment provider (Stripe, Razorpay, etc.) for real payments.
- Replace the map placeholder with a real map (Google Maps, Mapbox, etc.).
- Add more fields or features as needed (e.g., cancellation policy, more amenities, etc.).

## Booking History
- The profile page shows a mock booking history list.
- Replace with real user bookings from your backend.

## Next Steps
- Connect the UI to your backend for property data, bookings, and payments.
- Add error handling, loading states, and validation as needed. 