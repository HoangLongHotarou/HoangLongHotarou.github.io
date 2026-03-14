# Feature Spec: Responsive Portfolio UI

**Branch**: `001-responsive-portfolio` | **Date**: 2026-03-14

## Overview

Make the portfolio website fully responsive and clean across laptop (1024px+) and mobile (375px–767px) viewports, with a user-friendly layout that follows the existing design system (light/dark modes, accent colours, category blade).

---

## Actors

- **Visitor** — anyone viewing the portfolio on any device.

---

## Functional Requirements

### FR-1 — Responsive Layout
The layout MUST reflow without horizontal scrolling on any viewport from 375px to 1440px wide.

### FR-2 — Mobile Navigation
On viewports < 768px the navigation (if present) MUST be collapsed / accessible without cluttering the header.

### FR-3 — Category Blade (Horizontal Scroll)
The category blade MUST be horizontally scrollable on mobile so all categories remain accessible without wrapping.

### FR-4 — Responsive Avatar
The avatar / initials placeholder MUST be appropriately sized on all viewports (larger on desktop, smaller on mobile).

### FR-5 — Typography Scale
All headings and body text MUST scale down gracefully on small screens using responsive font sizes.

### FR-6 — Skill Cards
Skills MUST display in a multi-column grid on desktop and single column on mobile.

### FR-7 — Theme Toggle Placement
The theme toggle MUST remain accessible on mobile without overlapping page content.

### FR-8 — System Design Page Responsive
The System Design private page MUST also be fully responsive.

### FR-9 — Left Sidebar Navigation
The portfolio MUST provide a persistent left sidebar containing: a **Home** link and a collapsible **Categories** group (System Design, DevOps Tools, New Updates). On viewports < 768 px the sidebar MUST be hidden by default and toggled via a hamburger button in the topbar; tapping an overlay outside the sidebar MUST close it.

### FR-10 — Skill Icons
Each skill card MUST display a recognisable icon above the skill label, sourced from the `developer-icons` package. Skills without a mapped icon MUST degrade gracefully (label-only).

### FR-11 — Skill Marquee Animation
When the "All" category is selected, skills MUST scroll in a continuous right-to-left marquee animation. When a specific category is selected, skills MUST display in a static grid with no animation.

### FR-12 — Fixed Chrome / Content-Only Scroll
The topbar and sidebar MUST remain fixed (non-scrolling) at all times. Only the main content area MUST scroll independently.

---

## User Stories

### US8 — Visitor navigates between portfolio sections via sidebar
**As a** Visitor, **I want** a persistent sidebar with named sections, **so that** I can quickly navigate to System Design, DevOps Tools, or other areas without hunting for links.

**Acceptance criteria:**
1. Sidebar is always visible on desktop (≥ 768 px).
2. Sidebar slides in from the left on mobile and is dismissed by tapping the overlay or a nav link.
3. The active route is highlighted in the sidebar.
4. Collapsible *Categories* group expands/collapses via a chevron button.

---

## Non-Functional Requirements

### NFR-1 — Performance
First Contentful Paint < 2 s on a 4G connection. No layout shifts (CLS < 0.1).

### NFR-2 — Accessibility
Colour contrast ratio MUST meet WCAG AA (4.5:1 for normal text) in both light and dark modes. Interactive elements MUST have visible focus states.

### NFR-3 — Browser Support
Latest 2 versions of Chrome, Firefox, Safari, Edge.

---

## Out of Scope

- Server-side rendering
- Authentication / login for System Design page
- CMS or dynamic data fetching
