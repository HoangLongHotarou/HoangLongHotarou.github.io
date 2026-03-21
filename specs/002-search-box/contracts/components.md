# Component Contracts: Search Box

**Feature**: 002-search-box | **Date**: 2026-03-15

> This SPA exposes no external HTTP API. Component contracts document the public interfaces between React components introduced by this feature — the props each component accepts and the behaviours callers can rely on.

---

## Component: `SearchBox`

**File**: `src/components/SearchBox/SearchBox.tsx`  
**Purpose**: Global site search input rendered in the topbar. Loads all searchable content internally, renders a results panel, and navigates on selection.

### Props

| Prop | Type | Required | Default | Notes |
|------|------|----------|---------|-------|
| `placeholder` | `string` | No | `"Search…"` | Input placeholder text |
| `className` | `string` | No | `undefined` | Additional CSS class on the root container |

### Behaviour Contract

- **Self-contained data loading**: `SearchBox` imports `loadUpdates()` and `PROFILE.skills` directly. The caller does not pass data.
- **Results panel**: Rendered when `query.length > 0`. Hidden when query is empty, Escape is pressed, or a result is clicked.
- **Grouping**: Results are split into "Updates" and "Skills" groups. A group is omitted if it has zero matches.
- **Navigation**: Clicking a result calls `useNavigate(result.to)` from React Router and clears `query`.
- **Outside click**: Clicking anywhere outside the component container closes the panel without navigating.
- **Accessibility**: Input has `aria-label="Search site"`. Panel has `role="listbox"`. Each result item has `role="option"`.

### Usage

```tsx
// In AppShell.tsx topbar — no props required
<SearchBox />

// With customisation
<SearchBox placeholder="Find anything…" className="topbar__search" />
```

---

## Hook: `useSearch`

**File**: `src/hooks/useSearch.ts`  
**Purpose**: Derives `SearchResult[]` for updates and skills from a query string.

### Signature

```ts
function useSearch(query: string): {
  updateResults: SearchResult[];
  skillResults: SearchResult[];
}
```

### Behaviour Contract

- Returns empty arrays when `query` is an empty string.
- Matching is **case-insensitive** using `.toLowerCase().includes()`.
- Special characters in `query` are treated as **plain text** (no regex interpretation).
- `updateResults` maps matching `Update` objects to `SearchResult` with `type: 'update'`.
- `skillResults` maps matching `Skill` objects to `SearchResult` with `type: 'skill'`.
- The hook is **pure**: given the same `query`, it always returns the same results (updates and skills are bundled constants).
- **No side effects**: no network calls, no `localStorage` reads.

### SearchResult type

```ts
interface SearchResult {
  type: 'update' | 'skill';
  label: string;      // update title or skill name
  sublabel: string;   // update date or skill category
  to: string;         // React Router destination path
}
```

---

## Page Integration: `Updates` (modified)

**File**: `src/pages/Updates/Updates.tsx`  
**Change**: Adds a controlled `<input>` above the update card list. No new public interface — the component remains a default export with no props.

**Behaviour addition**:
- Input type `search`, `aria-label="Filter updates"`, placeholder `"Filter updates…"`.
- `onChange` updates local `query` state.
- Empty state message when `filteredUpdates.length === 0 && query.length > 0`: `No updates match "{ query }".`

---

## Page Integration: `Home` (modified)

**File**: `src/pages/Home/Home.tsx`  
**Change**: Adds a controlled `<input>` above the skill grid, reads `?q` URL param on mount to pre-fill from global search navigation. No new public interface.

**Behaviour addition**:
- Input type `search`, `aria-label="Filter skills"`, placeholder `"Filter skills…"`.
- On mount: reads `useSearchParams()` for `q` param; if present, sets `skillQuery` to that value.
- `onChange` updates local `skillQuery` state.
- Changing the Blade category clears `skillQuery`.
- Empty state message when `filteredSkills.length === 0 && skillQuery.length > 0`: `No skills match "{ skillQuery }".`
- When `activeCategory === 'All'` **and** `skillQuery` is non-empty, the marquee is **not** rendered; instead a `skill-grid` is rendered with `filteredSkills` (so the filter result is visible without the marquee looping animation masking it).
