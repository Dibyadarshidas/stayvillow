# Reviews, Favorites & Notifications UI (Stayvillow)

This document describes the reviews, favorites, and notifications UI, built for Stayvillow. All logic is UI-only and ready to connect to your backend or notification system.

## Features
- Add review form (rating, comment) on property detail page (UI only)
- Show user's own review if submitted (mock)
- 'Save' (heart) button on property cards and detail page (UI only, mock state)
- Favorites list in user profile (UI only, mock data)
- Notification bell in navbar (UI only, mock state)
- Dropdown for notifications (booking confirmed, review received, etc., mock data)

## How It Works
- The review form and save button update UI state only (no backend logic).
- The favorites list in the profile page uses mock data.
- The notification bell shows a badge for unread notifications and a dropdown with mock notifications.

## Extending the UI
- Connect the review form and save button to your backend for real reviews and favorites.
- Replace mock favorites and notifications with real data from your backend or API.
- Add more notification types and in-app notification features as needed.

## Next Steps
- Connect the UI to your backend for reviews, favorites, and notifications.
- Add validation, accessibility, and advanced features as needed. 