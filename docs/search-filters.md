# Search & Filters UI (Stayvillow)

This document describes the search and filters UI, built for Stayvillow. All logic is UI-only and ready to connect to your backend or search API.

## Features
- Search results page: `/search`
- Search bar (location, dates, guests, keyword)
- Filter sidebar (price range, amenities, sort by)
- Grid of property cards (mock data)
- Responsive, mobile-friendly layout

## How It Works
- The search page uses mock data for demo purposes.
- Filters and sorting update UI state only (no backend logic).
- The property grid displays mock property cards.

## Extending the UI
- Replace mock data with real property data from your backend or API.
- Connect the search bar and filters to your backend for real search results.
- Add more filters or sorting options as needed (e.g., property type, rating, etc.).
- Add loading states, error handling, and pagination as needed.

## Next Steps
- Connect the UI to your backend for real search and filtering.
- Add validation, accessibility, and advanced features as needed. 