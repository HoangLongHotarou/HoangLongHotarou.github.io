# Quickstart: Responsive Portfolio

**Feature**: 001-responsive-portfolio | **Date**: 2026-03-14

## Prerequisites

- Node.js 18+
- npm 9+

## Running Locally

```bash
# Install dependencies (first time)
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
# Output is in dist/
```

## Responsive Testing

Use your browser's DevTools → Toggle device toolbar:

| Preset | Width |
|--------|-------|
| Mobile S | 375px |
| Mobile L | 425px |
| Tablet   | 768px |
| Laptop   | 1024px |
| Desktop  | 1440px |

## Customising Profile Data

Edit the `PROFILE` constant at the top of `src/App.tsx`:

```ts
const PROFILE = {
  name: 'Your Name',
  title: 'DevOps & Cloud Engineer',
  bio: 'Short about-me description.',
  avatarSrc: '', // URL to image, or empty for initials
  skills: [
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'Terraform', category: 'Cloud' },
    // ...
  ],
  categories: ['All', 'DevOps', 'Cloud', 'System Design'],
};
```

## Theme Toggle

Click the sun/moon icon in the top-right of the header to switch between light and dark mode.
