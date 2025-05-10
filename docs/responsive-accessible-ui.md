# Responsive & Accessible UI (Stayvillow)

This document describes the approach and best practices for building and maintaining a responsive, accessible UI in Stayvillow.

## Responsive Design
- All pages and components use Tailwind CSS utility classes for responsive layouts.
- Layouts adapt to mobile, tablet, and desktop using `sm:`, `md:`, `lg:`, and `xl:` breakpoints.
- Font sizes, paddings, and grid/column layouts adjust for smaller screens.
- Navigation, forms, and cards are tested for usability on all device sizes.
- Images use `object-cover` and responsive widths/heights.

## Accessibility
- All interactive elements (buttons, links, forms) have clear focus states and visible outlines.
- ARIA labels and roles are added to icons, buttons, and custom controls (e.g., Save, Notifications, review stars).
- Semantic HTML is used: headings (`<h1>`, `<h2>`), lists (`<ul>`, `<li>`), forms, and nav.
- Keyboard navigation is supported for all interactive elements (tab, enter, space).
- Color contrast is checked for readability.
- Form fields have `placeholder` and `aria-label` where needed.

## How to Maintain & Extend
- Use Tailwind's responsive utilities for all new components.
- Test new features on mobile, tablet, and desktop.
- Use semantic HTML and add ARIA attributes for custom controls.
- Always provide visible focus states for accessibility.
- Use tools like Lighthouse, axe, or browser dev tools to audit accessibility.

## Next Steps
- Continue to test and improve responsiveness and accessibility as new features are added.
- Encourage contributions to follow these best practices. 