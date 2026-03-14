# Tasks: Responsive Portfolio UI — React Best-Practice Restructure

**Feature**: `001-responsive-portfolio` | **Branch**: `001-responsive-portfolio` | **Date**: 2026-03-14  
**Input**: [plan.md](plan.md), [spec.md](spec.md), [data-model.md](data-model.md), [research.md](research.md), [quickstart.md](quickstart.md)  
**Reference**: [React JS Advance Folder Structure](https://github.com/ahsan-chy/React-JS-Advance-Folder-Structure)

## Format: `[ID] [P?] [Story?] Description (file path)`

- **[P]**: Can run in parallel (different files, no unresolved dependencies)
- **[US#]**: Which user story this task belongs to
- Test tasks are included per constitution §IV (all components MUST have unit tests)

---

## Phase 1: Setup — React Best-Practice Folder Structure

**Purpose**: Scaffold the full recommended directory tree before extracting any code.  
All directories must exist before component files are created in later phases.

- [X] T001 Create React best-practice src/ directory tree: `src/components/`, `src/pages/`, `src/layouts/`, `src/context/`, `src/hooks/`, `src/data/`, `src/types/`, `src/utils/`, `src/styles/`
- [X] T002 [P] Move `src/App.css` → `src/styles/app.css` and update import in `src/App.tsx`
- [X] T003 [P] Move `src/index.css` → `src/styles/index.css` and update import in `src/main.tsx`

---

## Phase 2: Foundational — Data, Types, and Hooks Extraction

**Purpose**: Extract all non-UI logic from `src/App.tsx` so components can import them without circular dependencies. Must complete before component extraction in Phase 3.

**⚠️ CRITICAL**: No component file may be created until this phase is complete; every component depends on these modules.

- [X] T004 Extract `Skill` and `ProfileData` TypeScript interfaces from `src/App.tsx` into `src/types/index.ts`
- [X] T005 [P] Extract `PROFILE` constant from `src/App.tsx` into `src/data/profile.ts` (imports types from `src/types/index.ts`)
- [X] T006 [P] Extract `getInitials(name)` helper from `src/App.tsx` into `src/utils/helpers.ts`
- [X] T007 Create `ThemeContext` (context + provider + `useTheme` hook) in `src/context/ThemeContext.tsx`, moving theme `useState`, `toggleTheme`, and `localStorage` logic out of `App`
- [X] T008 [P] Create `src/hooks/useTheme.ts` — re-exports `useTheme` from `src/context/ThemeContext.tsx` as a stable public API

**Checkpoint**: `src/types/`, `src/data/`, `src/utils/`, `src/context/`, and `src/hooks/` are populated and independently importable.

---

## Phase 3: User Story 1 — Component Extraction & App Shell (Priority: P1) 🎯 MVP

**Goal**: Decompose the monolithic `src/App.tsx` into individual, co-located component files and a layout shell, matching React advanced folder-structure conventions.

**Independent Test**: Start `npm run dev`, navigate to `/` and `/system-design` — all content renders correctly; theme toggle still works; no import errors in browser console.

### Tests for User Story 1 — Write FIRST, must FAIL before implementation

> **Testing stack**: Vitest + React Testing Library.  
> Install if not present: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`  
> Configure `vite.config.ts` with `test: { environment: 'jsdom', setupFiles: ['./src/test-setup.ts'] }` and create `src/test-setup.ts` with `import '@testing-library/jest-dom'`.

- [X] T040 [P] [US1] Unit test for `Avatar` in `src/components/Avatar/Avatar.test.tsx` — assert initials fallback renders when `src` is empty; assert `<img>` renders when `src` is provided
- [X] T041 [P] [US1] Unit test for `ThemeToggle` in `src/components/ThemeToggle/ThemeToggle.test.tsx` — assert sun icon in light mode; assert moon icon in dark mode; assert `onToggle` called on click
- [X] T042 [P] [US1] Unit test for `Blade` in `src/components/Blade/Blade.test.tsx` — assert all category tabs render; assert active tab has `aria-selected="true"`; assert `onSelect` fires on click
- [X] T043 [P] [US1] Unit test for `SkillCard` in `src/components/SkillCard/SkillCard.test.tsx` — assert skill name text is rendered
- [X] T044 [P] [US1] Unit test for `useTheme` hook / `ThemeContext` in `src/context/ThemeContext.test.tsx` — assert initial theme is `"light"` or `"dark"`; assert toggle switches value; assert `document.documentElement` `data-theme` attribute is updated

### Implementation for User Story 1

- [X] T009 [P] [US1] Create `Avatar` component in `src/components/Avatar/Avatar.tsx` (imports `getInitials` from `src/utils/helpers.ts`)
- [X] T010 [P] [US1] Create `ThemeToggle` component in `src/components/ThemeToggle/ThemeToggle.tsx` (imports `useTheme` from `src/hooks/useTheme.ts`)
- [X] T011 [P] [US1] Create `Blade` component in `src/components/Blade/Blade.tsx`
- [X] T012 [P] [US1] Create `SkillCard` component in `src/components/SkillCard/SkillCard.tsx`
- [X] T013 [US1] Create `AppShell` layout in `src/layouts/AppShell.tsx` — contains topbar (brand + nav + `ThemeToggle`), `<main>`, and `<footer>`; consumes `ThemeContext` (imports `useTheme`)
- [X] T014 [US1] Create `Home` page in `src/pages/Home/Home.tsx` — imports `Avatar`, `Blade`, `SkillCard` from components; reads `PROFILE` from `src/data/profile.ts`
- [X] T015 [P] [US1] Create `SystemDesign` page in `src/pages/SystemDesign/SystemDesign.tsx`
- [X] T016 [US1] Rewrite `src/App.tsx` as the root composition root: wraps `<ThemeProvider>`, `<Router>`, `<AppShell>`, and `<Routes>` — no inline component definitions remain

**Checkpoint**: `src/App.tsx` is ≤ 30 lines. All business logic lives in dedicated modules. `npm run build` succeeds with zero errors. All 5 unit test files (T040–T044) exist and `npm test` reports them passing.

---

## Phase 4: User Story 2 — Responsive Layout & Typography (Priority: P2)

**Goal**: Implement mobile-first CSS so the layout reflows without horizontal scrolling on any viewport from 375 px to 1440 px (FR-1, FR-5).

**Independent Test**: Open DevTools → 375 px width → no horizontal scrollbar; headings and body text are legible; layout columns collapse correctly.

### Implementation for User Story 2

- [X] T017 [US2] Rewrite `src/styles/index.css` with mobile-first CSS custom properties (colours, spacing, typography tokens) — preserve existing `--bg`, `--text`, `--accent` tokens; add `--font-size-*` scale tokens
- [X] T018 [US2] Add responsive typography rules to `src/styles/app.css` using `clamp()` or media-query font-size overrides for `h1`, `h2`, and body text (FR-5)
- [X] T019 [US2] Apply responsive `.shell`, `.content`, and `.page` layout rules in `src/styles/app.css`: `max-width`, auto side margins, fluid padding (FR-1) *(see T056 for final state of `.content`)*
- [X] T020 [P] [US2] Validate responsive layout at all quickstart.md breakpoints (375 px / 425 px / 768 px / 1024 px / 1440 px) using DevTools — document any issues found

**Checkpoint**: Portfolio home page renders without horizontal scroll at 375 px, 768 px, and 1440 px.

---

## Phase 5: User Story 3 — Responsive Header, Nav & Theme Toggle (Priority: P3)

**Goal**: Header reflows on narrow viewports; theme toggle is in-flow (not `position: fixed`); nav links remain accessible on mobile (FR-2, FR-7).

**Independent Test**: Resize to 375 px — header is single-row or gracefully stacked; toggle button is visible and clickable without overlapping hero content.

### Implementation for User Story 3

- [X] T021 [US3] Verify `.theme-toggle` in `src/styles/app.css` has `flex-shrink: 0` and **no** `position: fixed` — if `position: fixed` is present, remove it; if the property is absent the in-flow placement from the topbar flex container is already correct and no change is needed (Research Decision 6 — FR-7)
- [X] T022 [US3] Add responsive `.topbar` rules in `src/styles/app.css`: reduce padding, shrink font sizes, wrap brand + nav + toggle gracefully below 768 px breakpoint (FR-2)
- [X] T023 [P] [US3] Update `src/layouts/AppShell.tsx` to ensure `ThemeToggle` is rendered as the last flex child of `.topbar` (in-flow, no absolute/fixed positioning)

**Checkpoint**: Theme toggle is accessible on 375 px without covering content; header never triggers horizontal scroll.

---

## Phase 6: User Story 4 — Category Blade Horizontal Scroll (Priority: P4)

**Goal**: Category blade is horizontally scrollable on mobile so all categories remain accessible without wrapping (FR-3).

**Independent Test**: At 375 px, tap/drag the category blade — all category tabs are reachable via scroll; no tab wraps to a second row.

### Implementation for User Story 4

- [X] T024 [US4] Apply `overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch` to `.blade` in `src/styles/app.css` (Research Decision 4)
- [X] T025 [P] [US4] Add `::-webkit-scrollbar { display: none }` to `.blade` for a clean look on WebKit browsers, with `scrollbar-width: none` for Firefox
- [X] T026 [P] [US4] Update `src/components/Blade/Blade.tsx` CSS class names if needed to align with the new scroll rules

**Checkpoint**: All category tabs visible via horizontal swipe on a 375 px viewport; no layout overflow.

---

## Phase 7: User Story 5 — Responsive Skill Cards Grid (Priority: P5)

**Goal**: Skill cards display in a multi-column grid on desktop and collapse to a single column on mobile (FR-6).

**Independent Test**: At 1024 px, skill cards form at least 3 columns; at 375 px, they collapse to a single full-width column.

### Implementation for User Story 5

- [X] T027 [US5] Replace existing `.skill-grid` CSS with `display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))` in `src/styles/app.css` (Research Decision 5 — FR-6)
- [X] T028 [P] [US5] Update `.skill-card` styles in `src/styles/app.css` for consistent padding, border-radius, and hover/focus states on all viewports

**Checkpoint**: At 375 px → 1 column; at 1440 px → 3+ columns; auto-fill collapses without any media query breakpoints.

---

## Phase 8: User Story 6 — Responsive Avatar & Hero (Priority: P6)

**Goal**: Avatar/initials placeholder is appropriately sized on all viewports — larger on desktop, smaller on mobile (FR-4).

**Independent Test**: At 375 px, avatar width is ≤ 80 px and visually balanced with name/title text; at 1440 px, avatar is ≥ 120 px.

### Implementation for User Story 6

- [X] T029 [US6] Add responsive `.avatar` size rules to `src/styles/app.css` using `clamp()` or a media-query override: `width/height` scales from 72 px (mobile) to 128 px (desktop) (FR-4)
- [X] T030 [US6] Apply responsive `.hero` section layout in `src/styles/app.css`: column-stack on mobile (`flex-direction: column; align-items: center`), row on desktop (`flex-direction: row`) (FR-1)
- [X] T031 [P] [US6] Update font sizes for `.hero__name` and `.hero__title` in `src/styles/app.css` to scale with viewport using `clamp()` (FR-5)

**Checkpoint**: Hero section is visually balanced at 375 px (stacked) and 1440 px (side-by-side); avatar has correct proportions at every DevTools preset.

---

## Phase 9: User Story 7 — System Design Page Responsive (Priority: P7)

**Goal**: System Design private page is fully responsive (FR-8).

**Independent Test**: Navigate to `/system-design` at 375 px — content fills viewport without overflow; Back link is tappable.

### Implementation for User Story 7

- [ ] T032 [US7] Audit `src/pages/SystemDesign/SystemDesign.tsx` and its shared CSS — confirm `.page`, `.section`, and `.link-button` styles apply correctly at 375 px (FR-8)
- [ ] T033 [P] [US7] Add any System Design–specific responsive overrides in `src/styles/app.css` if audit reveals gaps

**Checkpoint**: `/system-design` renders correctly at all five DevTools breakpoints from quickstart.md.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance, and final validation across all stories.

- [X] T034 [P] Add visible `:focus-visible` styles to all interactive elements (`.blade__tab`, `.theme-toggle`, `.sidebar__link`, `.sidebar__group-btn`, `.topbar__hamburger`, `.link-button`) in `src/styles/app.css` (NFR-2 — WCAG AA)
- [ ] T035 [P] Audit colour contrast in both `[data-theme="light"]` and `[data-theme="dark"]` using browser DevTools Accessibility panel — verify ≥ 4.5:1 ratio for normal text (NFR-2)
- [X] T036 Verify ARIA attributes on `Blade` (`role="tablist"`, `aria-selected`, `role="tab"`) are preserved after component extraction (NFR-2)
- [X] T037 [P] Run `npm run build` and confirm FCP < 2 s on simulated 4G in Chrome DevTools Lighthouse (NFR-1)
- [ ] T038 Run quickstart.md viewport matrix validation at all 5 presets (375 px / 425 px / 768 px / 1024 px / 1440 px) — check no horizontal scroll, no overlapping elements (NFR-1, FR-1)
- [X] T039 [P] Update `src/data/profile.ts` JSDoc comment with instructions for customising profile data (mirrors quickstart.md "Customising Profile Data" section)

---

## Phase 11: Post-MVP Enhancements

**Purpose**: Features added after the initial MVP implementation — skill icons, marquee animation, design polish, left sidebar navigation, and fixed-layout scroll behaviour. All tasks in this phase are **complete**.

### Sub-phase A: Skill Icons

- [X] T045 Install `developer-icons` package — run `npm install developer-icons` and verify in `package.json`
- [X] T046 [P] Create `src/utils/iconMap.tsx` — maps skill names (`Kubernetes`, `Docker`, `Terraform`, `AWS`, `Azure`, `GCP`, `CI/CD Pipelines`, `GitOps`, `Observability`, `Helm`) to their developer-icon SVG components
- [X] T047 [P] Update `src/components/SkillCard/SkillCard.tsx` — render icon above skill label using icon component from `iconMap.tsx`; add `.skill-card__icon` wrapper (40 × 40 px) in `src/styles/app.css`

### Sub-phase B: Skill Marquee Animation

- [X] T048 Update `src/pages/Home/Home.tsx` — "All" tab renders a `<div className="skill-marquee">` with the skill list duplicated for seamless infinite scroll; filtered tabs render `<div className="skill-grid">` static grid
- [X] T049 [P] Add `.skill-marquee`, `.skill-marquee__track`, and `@keyframes scroll-left` CSS to `src/styles/app.css` — 35 s linear infinite right-to-left animation; mask fade at edges; no pause-on-hover

### Sub-phase C: Colour Palette & Background Depth

- [X] T050 Apply updated colour palette tokens to `src/styles/index.css` — Primary `#FFFFFF`, Secondary `#64748B`, Accent `#F59E0B` (`--accent`), Highlight `#3B82F6` (`--highlight`), Text `#0F172A` (`--text-h`) for both light and dark schemes
- [X] T051 [P] Update `src/styles/app.css` — `body` background uses `--bg-subtle` (`#F8FAFC`); `.content` card gets `background: var(--bg)`, `border-radius: 16px`, `border: 1px solid var(--border)`, `box-shadow: var(--shadow)`; `.topbar` uses frosted glass `rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)` *(card styling on `.content` later removed by T056 — fixed-layout refactor)*

### Sub-phase D: Left Sidebar Navigation

- [X] T052 Rewrite `src/layouts/AppShell.tsx` — replace topbar nav links with a collapsible left sidebar; add hamburger button (`topbar__hamburger`) for mobile; sidebar contains `Home` link and `Categories` group (System Design, DevOps Tools, New Updates) with chevron-animated expand/collapse via `useState`; overlay closes sidebar on mobile tap-outside
- [X] T053 [P] Add sidebar layout CSS to `src/styles/app.css` — `.body-row` (flex row wrapper), `.sidebar` (220 px, `position: sticky`, `height: calc(100dvh - 56px)`), `.sidebar--open` mobile slide-in (`position: fixed`, `left: 0`), `.sidebar-overlay`, `.sidebar__list`, `.sidebar__link`, `.sidebar__link--active`, `.sidebar__link--sub`, `.sidebar__group-btn`, `.sidebar__chevron`, `.sidebar__chevron--open`, `.topbar__hamburger` (hidden ≥ 768 px, visible < 768 px)
- [X] T054 [P] Create `src/pages/ComingSoon/ComingSoon.tsx` — generic placeholder page accepting a `title` prop; rendered for `/devops-tools` and `/new-updates` routes
- [X] T055 Add `/devops-tools` and `/new-updates` routes to `src/App.tsx` — import `ComingSoon` and wire both routes inside the `<AppShell>` outlet

### Sub-phase E: Fixed Menu / Content-Only Scroll

- [X] T056 Update `src/styles/app.css` layout for fixed menu — `.shell { height: 100dvh; overflow: hidden }` locks viewport; `.body-row { overflow: hidden }` contains scroll; `.content { overflow-y: auto; padding: 40px }` is the sole scrollable region; remove card styling (`background`, `border`, `border-radius`, `box-shadow`, `margin`) from `.content`

**Checkpoint**: Build passes (`npm run build` 0 errors), sidebar navigation fully functional at all breakpoints, content scrolls independently while topbar and sidebar remain fixed.

### Sub-phase F: AppShell Unit Tests (constitution §IV compliance)

- [X] T057 Create `src/layouts/AppShell.test.tsx` — assert: (1) sidebar is hidden on initial render (`sidebar--open` class absent); (2) clicking the hamburger button adds `sidebar--open`; (3) clicking the overlay removes `sidebar--open`; (4) Categories group is expanded by default; (5) clicking the group button collapses it

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  └─► Phase 2 (Foundational: data/types/hooks) — BLOCKS all user stories
        └─► Phase 3 (US1: Component extraction) — BLOCKS layout phases
              ├─► Phase 4 (US2: Responsive layout)
              ├─► Phase 5 (US3: Header/nav/toggle)
              ├─► Phase 6 (US4: Blade scroll)          ← independent after Phase 3
              ├─► Phase 7 (US5: Skill cards grid)      ← independent after Phase 3
              ├─► Phase 8 (US6: Avatar & hero)         ← independent after Phase 3
              └─► Phase 9 (US7: System Design page)    ← independent after Phase 3
                    └─► Phase 10 (Polish)
                          └─► Phase 11 (Post-MVP enhancements)
```

### User Story Dependencies

| Story | Priority | Depends on Phases | Blocked by other US? |
|-------|----------|--------------------|----------------------|
| US1 — Component extraction | P1 | Phase 1, 2 | No |
| US2 — Responsive layout | P2 | Phase 1, 2, 3 | No |
| US3 — Header/nav/toggle | P3 | Phase 1, 2, 3 | No |
| US4 — Category blade | P4 | Phase 1, 2, 3 | No |
| US5 — Skill cards grid | P5 | Phase 1, 2, 3 | No |
| US6 — Avatar & hero | P6 | Phase 1, 2, 3 | No |
| US7 — System Design page | P7 | Phase 1, 2, 3 | No |

All user story phases (4–9) are **mutually independent** — after Phase 3 completes they can be worked in any order or in parallel.

### Parallel Opportunities Per Story

**Phase 1**: T002 and T003 can run in parallel  
**Phase 2**: T005, T006 can run in parallel after T004; T007 and T008 can run in parallel  
**Phase 3**: T009, T010, T011, T012, T015 can all run in parallel after T007/T008; T013 follows; T014 and T016 close the phase  
**Phases 4–9**: Each phase's [P]-marked tasks run in parallel within that phase  
**Phase 10**: T034, T035, T037, T039 can all run in parallel; T036, T038 are sequential validations  
**Phase 11 — Sub-A**: T046, T047 in parallel after T045  
**Phase 11 — Sub-B**: T048, T049 in parallel  
**Phase 11 — Sub-C**: T050, T051 in parallel  
**Phase 11 — Sub-D**: T052 first; T053, T054 in parallel; T055 after T054  
**Phase 11 — Sub-E**: T056 standalone (depends on Sub-D being complete)  

---

## Implementation Strategy

### MVP Scope (deliver in one session)

1. **Phases 1–3** (T001–T016): Full project restructure with working dev server  
2. **Phase 4** (T017–T020): Mobile-first base layout — eliminates the most critical responsive breakage

Phases 5–9 can follow in priority order. Phase 10 should run last as a final gate.

### Target File Tree After Completion

```
src/
├── assets/
├── components/
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   └── Avatar.test.tsx
│   ├── Blade/
│   │   ├── Blade.tsx
│   │   └── Blade.test.tsx
│   ├── SkillCard/
│   │   ├── SkillCard.tsx          ← renders icon + label
│   │   └── SkillCard.test.tsx
│   └── ThemeToggle/
│       ├── ThemeToggle.tsx
│       └── ThemeToggle.test.tsx
├── context/
│   ├── ThemeContext.tsx
│   └── ThemeContext.test.tsx
├── data/
│   └── profile.ts
├── hooks/
│   └── useTheme.ts
├── layouts/
│   └── AppShell.tsx              ← sidebar + hamburger + collapsible nav
├── pages/
│   ├── ComingSoon/
│   │   └── ComingSoon.tsx        ← placeholder for future routes
│   ├── Home/
│   │   └── Home.tsx              ← marquee (All) + grid (filtered)
│   └── SystemDesign/
│       └── SystemDesign.tsx
├── styles/
│   ├── app.css                   ← sidebar, marquee, palette, fixed-layout rules
│   └── index.css                 ← CSS tokens (updated palette)
├── types/
│   └── index.ts
├── utils/
│   ├── helpers.ts
│   └── iconMap.tsx               ← skill name → developer-icon SVG map
├── App.tsx                       ← 4 routes: /, /system-design, /devops-tools, /new-updates
└── main.tsx
```
