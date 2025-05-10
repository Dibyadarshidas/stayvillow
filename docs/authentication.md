# Authentication UI (Stayvillow)

This app includes a modern authentication UI with mock state management, ready to connect to your backend or NextAuth.js.

## Features
- Sign In and Sign Up pages (email/password and Google button)
- Profile page with editable fields (name, email, avatar)
- Navbar shows Sign In or user dropdown based on auth state
- Mock AuthProvider for demoing authentication state
- Protected route UI (show sign-in prompt if not authenticated)

## How It Works
- The `AuthProvider` in `src/app/components/AuthProvider.tsx` manages a mock user state.
- Use the `useAuth()` hook to access `user`, `signIn`, and `signOut` in any component.
- The UI updates automatically based on the mock auth state.

## Protecting Routes (UI Only)
- To protect a page, check if `user` is null from `useAuth()`. If so, show a sign-in prompt or redirect to `/signin`.

## Connecting to a Real Backend
- Replace the mock `signIn` and `signOut` logic in `AuthProvider` with real API calls or NextAuth.js logic.
- For NextAuth.js, wrap your app with its provider and use its hooks instead of the mock context.
- Update the sign-in and sign-up forms to call your backend endpoints.

## Customization
- Update the UI in `/signin`, `/signup`, and `/profile` as needed.
- Add more fields or providers (GitHub, Facebook, etc.) as your backend supports them.

## Next Steps
- Once your backend is ready, connect the UI forms and context to real authentication logic.
- Remove or replace the mock AuthProvider. 