# Stayvillow

Stayvillow is a modern vacation stay app inspired by StayVista. Book luxury villas, private pool stays, and unique getaways. Discover, list, or buy your dream vacation property with a beautiful, ultra-modern UI.

## Features
- Search and book vacation stays
- Explore destinations
- List or buy properties
- Host dashboard for property management
- Admin panel for site management
- Modern, responsive, and accessible design

---

This project is built with Next.js and Tailwind CSS.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## App Navigation & Page Access

### **Main User Flows**

- **Homepage:** `/`
  - Hero section, search bar, featured destinations, and navigation.

- **Sign In:** `/signin`
  - Sign in with email/password or Google (UI only).

- **Sign Up:** `/signup`
  - Register a new account (UI only).

- **Explore Stays:** `/explore`
  - Browse featured properties and destinations.

- **Search Results:** `/search`
  - Search for properties with filters and sorting.

- **Property Details:** `/property/[id]`
  - View property details, gallery, amenities, reviews, booking form, and save/favorite.
  - Example: `/property/1`

- **Buy a Property:** `/buy`
  - Browse properties available for purchase.

- **List a Property:** `/list`
  - Form for users to list their own property (UI only).

- **Profile:** `/profile`
  - View and edit user info, see bookings and saved properties.

### **Host Flows**

- **Host Dashboard:** `/host/dashboard`
  - Manage your listed properties, view bookings, edit/delete properties.

- **Add New Property:** `/host/new`
  - Form to add a new property (UI only).

- **Edit Property:** `/host/edit/[id]`
  - Edit an existing property (UI only).
  - Example: `/host/edit/1`

### **Admin Panel**

- **Admin Dashboard:** `/admin/dashboard`
  - Overview of users, properties, bookings, and navigation to management pages.

- **Manage Users:** `/admin/users`
  - View, block/unblock, and delete users (UI only).

- **Manage Properties:** `/admin/properties`
  - View, approve/reject, and delete properties (UI only).

- **Manage Bookings:** `/admin/bookings`
  - View, cancel, and mark bookings as complete (UI only).

## Notes
- All flows are UI-only and use mock data. Connect to your backend for real functionality.
- For more details on each feature and how to extend, see the `docs/` folder.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
