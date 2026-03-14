# Research: Responsive Portfolio Design

**Feature**: 001-responsive-portfolio | **Date**: 2026-03-14

---

## Decision 1: CSS Layout Strategy

**Decision**: Mobile-first CSS using CSS Grid for skill cards and Flexbox for header/nav/blade.

**Rationale**: CSS Grid excels at 2D content areas (skill card grids). Flexbox is optimal for 1D flows (header, category blade). No external library needed — keeps bundle small and aligns with Principle I (Simplicity).

**Alternatives Considered**:
- Tailwind CSS — rejected; adds build complexity, unnecessary for this scale.
- CSS Modules — considered; pure global CSS with BEM-like naming is sufficient for a single-page portfolio.
- CSS-in-JS — rejected; runtime overhead, no SSR needed.

---

## Decision 2: Breakpoints

**Decision**: Two breakpoints — `768px` (tablet/mobile boundary) and `1024px` (desktop).

| Breakpoint | Target |
|------------|--------|
| < 768px    | Mobile (375px–767px) |
| 768px–1023px | Tablet |
| ≥ 1024px   | Desktop |

**Rationale**: Matches existing `@media (max-width: 1024px)` patterns already in `index.css`. Keeps overrides minimal.

---

## Decision 3: Navigation on Mobile

**Decision (revised)**: Left sidebar with hamburger toggle on mobile. ~~No hamburger menu needed.~~

**Rationale**: The original decision rejected a hamburger menu for a 2-route portfolio (Principle I — Simplicity). During implementation the route count grew to 4 and a persistent sidebar navigation pattern was adopted for better UX (FR-9). At 4+ categorised routes a sidebar clearly communicates structure. A hamburger button is shown only on viewports < 768 px where the sidebar is hidden by default; on desktop the sidebar is always visible with no extra affordance required.

**Alternatives reconsidered**:
- Inline header links — rejected at 4 routes; clutters the topbar and does not communicate hierarchy.
- Drawer overlay only (no sidebar on desktop) — rejected; sidebar provides persistent orientation on desktop without extra interaction cost.

---

## Decision 4: Category Blade on Mobile

**Decision**: `overflow-x: auto; white-space: nowrap` with flex children — horizontal scroll strip.

**Rationale**: Standard pattern for tab/chip rows on mobile. Keeps all categories visible without wrapping them into multiple rows.

---

## Decision 5: Skill Cards Grid

**Decision**: CSS Grid with `repeat(auto-fill, minmax(180px, 1fr))`.

**Rationale**: Automatically collapses to 1 column on narrow screens and expands to 2–3 columns on wider screens with zero media query breakpoints needed.

---

## Decision 6: Theme Toggle Placement

**Decision**: Move theme toggle from `position: fixed` to inside the header as a flex item aligned to the right.

**Rationale**: Fixed positioning on mobile overlaps content and can violate safe areas on iOS. In-flow placement is cleaner and predictable.

---

## NEEDS CLARIFICATION: None remaining.
