# Research: Search Box

**Feature**: 002-search-box | **Date**: 2026-03-15

---

## Decision 1: Matching Strategy

**Decision**: Use `String.prototype.includes()` with `.toLowerCase()` on both the query and the target fields. No regex, no third-party library.

**Rationale**: The data sets are tiny at build time (< 20 updates, < 20 skills). Native string matching is O(n·m) but imperceptible at this scale, satisfies FR-003 (case-insensitivity), FR-008 (special characters treated as plain text — `.includes()` never interprets regex metacharacters), and FR-009 (no network requests). Aligns with Constitution Principle I (Simplicity): introduce the minimum code needed.

**Alternatives Considered**:
- **Fuse.js** (fuzzy matching) — rejected; adds ~25 KB dependency for no measurable benefit at < 20 items. Fuzzy results also feel odd on a portfolio where exact keyword matching is expected.
- **`String.prototype.match()` with regex** — rejected; requires escaping user input to prevent `RegExp` constructor errors, making FR-008 harder than it needs to be.
- **IndexedDB / search index** — rejected; entirely out of scope for a static client-side SPA.

---

## Decision 2: SearchBox Component Placement

**Decision**: A single `SearchBox` component lives in the topbar inside `AppShell.tsx`, rendered between the brand name link and the `ThemeToggle`. It owns its own query state and results panel.

**Rationale**: The topbar is the one element visible on every page, making it the natural home for global search (US3). The component is self-contained — it imports `loadUpdates()` and `PROFILE.skills` directly, calls `useSearch`, and uses `useNavigate` for result navigation. No prop drilling through `AppShell` is needed.

**Alternatives Considered**:
- **Context / global state (e.g., Zustand, Redux)** — rejected; overkill for a component that only needs to share state with itself. Violates Principle I.
- **SearchBox in sidebar** — rejected; sidebar is hidden on mobile by default, making the global search inaccessible without opening the sidebar first.
- **Command palette (⌘K modal)** — considered; richer UX but significantly more complexity. P3 feature; defer until the basic topbar pattern is verified.

---

## Decision 3: Per-Page Search State

**Decision**: The Updates page and the Home Skills section each manage their own `query` string via local `useState`. No shared hook or context is needed for per-page filtering.

**Rationale**: Each page's filter is entirely independent — there is no shared state between them. Local `useState` is the simplest correct solution (Principle I). The filtered list derivation (`UPDATES.filter(...)`, `skills.filter(...)`) is a computed value from `query` state — no `useEffect` or `useMemo` is required at this scale.

**Alternatives Considered**:
- **Custom `useFilter` hook** — considered; adds indirection for a two-line `.filter()` call. Rejected per Principle I (don't abstract one-time operations).
- **URL query param as primary state** — considered for bookmarkability, rejected as out-of-scope per spec Assumptions section.

---

## Decision 4: Home Page Skills Search + Blade Filter Interaction

**Decision**: The `query` state is cleared when the user changes the Blade category. The filter pipeline is: `PROFILE.skills → category filter → query filter`. This ensures FR-006 (search within selected category).

**Rationale**: Clearing `query` on category change avoids a confusing state where a user switches category and sees zero results because their previous search term has no match in the new category. It is the least-surprising UX. Alternatively, preserving the query and re-filtering is also acceptable — but clearing is simpler and avoids "why are there no results?" confusion.

**Alternatives Considered**:
- **Preserve query on category change** — considered; reasonable but potentially confusing. Clearing is more predictable.
- **Merge query and category into URL params** — rejected as out-of-scope per spec Assumptions.

---

## Decision 5: Global Search Results Navigation

**Decision**:
- Update results → `useNavigate("/new-updates/:slug")` — navigates directly to the detail page.
- Skill results → `useNavigate("/?q=:skillName")` — navigates to the Home page with a `q` query parameter; the Home page's skills search input reads this on mount via `useSearchParams()` and pre-fills its query state.

**Rationale**: Update detail pages already have a dedicated route. For skills, there is no dedicated "skill detail" page; instead, pre-filling the skills search via a URL param links the global search to the per-page search (US2). This reuses the already-specified per-page skill filtering without duplicating filtering logic. The URL also becomes shareable/bookmarkable for skills.

**Alternatives Considered**:
- **Navigate to `/` without pre-filling** — simplest, but the user would have to manually find the skill after navigation. Violates the spirit of FR-011 ("navigate to relevant section").
- **Scroll to `#skills` anchor** — cannot be combined with a React Router navigation in the same tick without extra coordination. Rejected for complexity.
- **Shared SearchContext that persists across navigation** — rejected; reaches into global state territory, contradicts Principle I.

---

## Decision 6: Results Panel Dismiss Behaviour

**Decision**: The global search results panel closes when:
1. The user presses `Escape` (handled via `onKeyDown` on the `<input>`).
2. The user clicks outside the SearchBox container (handled via a `useEffect` that attaches a `mousedown` listener to `document` and checks `ref.current.contains(event.target)`).
3. The user selects a result (navigate away → component unmounts → panel gone).
4. The user clears the input (empty query → no results → panel not rendered).

**Rationale**: These four cases cover FR-012 completely. The `mousedown` (not `click`) listener fires before `focus` changes, preventing race conditions with link navigation inside the panel. `ref.contains` is the standard React outside-click pattern, requiring no library.

**Alternatives Considered**:
- **`onBlur` on the input** — rejected; blurs before `mousedown` on a result link completes, causing the panel to close before the click registers, losing the navigation.
- **Floating UI / Popper.js** — rejected; adds a dependency for a simple dropdown. Violates Principle I.

---

## Decision 7: Accessibility Approach

**Decision**: The `SearchBox` input has an `aria-label="Search site"`. The results panel uses `role="listbox"` with `role="option"` for each item. `aria-expanded` on the input reflects whether the panel is open. Keyboard: `Escape` closes, `Enter` or `click` navigates.

**Rationale**: Satisfies FR-007 (accessible label) and SC-004 (WCAG 2.1 AA). A `listbox`/`option` pattern is the standard ARIA combobox-lite approach without requiring the full `combobox` role (which mandates additional keyboard interactions out of scope here).

**Alternatives Considered**:
- **Full ARIA combobox pattern** — considered; requires `aria-activedescendant`, arrow-key navigation, and `aria-selected` state. Deferred as an enhancement; not required by the spec's success criteria.
- **Plain `<div>` with no ARIA** — rejected; violates FR-007 and SC-004.
