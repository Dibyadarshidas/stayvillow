# Admin Panel UI (Stayvillow)

This document describes the admin panel UI, built for Stayvillow. All logic is UI-only and ready to connect to your backend or admin API.

## Features
- Admin dashboard: `/admin/dashboard` with overview cards (users, properties, bookings)
- User management: `/admin/users` (view, block/unblock, delete users)
- Property management: `/admin/properties` (view, approve/reject, delete properties)
- Booking management: `/admin/bookings` (view, cancel, mark as complete)
- All actions are UI-only, using mock data

## How It Works
- The admin panel uses mock data for demo purposes.
- Actions (block, approve, delete, etc.) update UI state only (no backend logic).
- Tables are responsive and accessible.

## Extending the UI
- Replace mock data with real data from your backend or API.
- Connect actions to your backend for real admin management.
- Add more features as needed (e.g., analytics, logs, advanced filters).

## Next Steps
- Connect the UI to your backend for real admin management.
- Add validation, accessibility, and advanced features as needed. 