# Stayvillow Sidebar Design Guidelines

This document outlines the design principles and guidelines for implementing the sidebar enhancements.

## Visual Principles

### Color Scheme
- Use the existing color variables (`--color-primary`, `--color-text-light`, etc.)
- Maintain the aqua theme for active states (`aqua-shadow`, `aqua-border`)
- Use opacity variants for hover and active states (e.g., `bg-[var(--color-primary)]/10`)

### Typography
- Section headers: Text-xs, uppercase, font-semibold, text-[var(--color-text-light)]
- Menu items: Text-sm, font-medium
- Status indicators and counters: Text-xs

### Spacing
- Consistent padding: px-3 py-2.5 for clickable items
- Section spacing: space-y-8 between major sections
- Item spacing: space-y-1 between items in the same category

## Component Guidelines

### Navigation Items
- All items should include an icon (20x20px) and label
- Active state should use `bg-[var(--color-primary)]/10 text-[var(--color-primary)] aqua-shadow`
- Hover state should use `hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]`

### Profile Section
- Avatar should be 32x32px for main profile, 20x20px for compact displays
- Use single-letter fallback when avatar image is unavailable
- Progress bars should be 4px height with rounded corners

### Badges & Indicators
- Notification badges: Small circular badges with minimal padding
- Progress indicators: Use consistent styling across profile and rewards sections
- Verification badges: Simple checkmark or icon with consistent color scheme

### Buttons & Interactive Elements
- Toggles should have visible state indicators
- Dropdowns should use consistent expansion indicators
- Main CTAs should use filled background (`bg-[var(--color-primary)]`)
- Secondary actions should use outline or ghost styling

## Accessibility Guidelines

- Maintain minimum contrast ratio of 4.5:1 for all text
- Ensure all interactive elements have focus states
- Use `aria-current="page"` for active navigation items
- Include appropriate `aria-label` attributes for icon-only controls
- Ensure the sidebar is fully navigable via keyboard

## Responsive Behavior

- Define collapsible behavior for smaller viewports
- Ensure touch targets are at least 44x44px on touch devices
- Plan for graceful degradation of advanced features on mobile

## Animation Guidelines

- Use subtle transitions for hover/active states (150-200ms)
- Employ consistent easing functions (recommend: cubic-bezier(0.4, 0, 0.2, 1))
- Ensure animations can be disabled via prefers-reduced-motion media query 