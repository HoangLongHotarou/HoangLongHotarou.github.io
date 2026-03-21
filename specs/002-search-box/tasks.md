---

description: "Task list for 002-search-box"
---

# Tasks: Search Box

**Input**: Design documents from `/specs/002-search-box/`
**Branch**: `002-search-box`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/components.md ✅, quickstart.md ✅

**Tests**: Per constitution §IV, unit tests are **REQUIRED** for every React component and custom hook (Vitest + React Testing Library, co-located with the component). TDD order applies: write test → confirm it fails → implement → confirm it passes.

**Tech stack**: TypeScript 5 + React 19 + Vite · React Router DOM v6 · Lucide React (already installed) · Vitest + RTL

---

> **Change Request (2026-03-21)**: Two requirement changes applied on top of the completed v1 implementation:
> 1. **Remove** the per-page Filter Skills input on the Home page (Skills section).
> 2. **Update** the global topbar `SearchBox` to search only **pages** (static navigation targets) and **categories** (skill categories from `PROFILE`), instead of individual update posts and skills.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the `SearchResult` type that all three user stories depend on. No user story work can begin until T001 is done.

- [x] T001 Add `SearchResult` interface to `src/types/index.ts`

**Checkpoint**: Type is available to all downstream files — user story phases can begin.

---

## Phase 2: User Story 1 — Filter Updates by Keyword (Priority: P1) 🎯 MVP

**Goal**: A search input above the update card list filters cards in real time by title/summary. An empty-state message shows when there are no matches. Clearing restores all cards.

**Independent Test**: Navigate to `/new-updates`, type "GitOps" → only matching cards visible. Type "xyzxyz" → empty-state message. Clear input → all cards return.

### Tests for User Story 1 (write first — must fail before T005)

- [x] T002 [US1] Write failing tests for Updates filter behaviour in `src/pages/Updates/Updates.test.tsx` — cover: input renders, filters by title, filters by summary, empty-state message, clearing restores all cards

### Implementation for User Story 1

- [x] T003 [US1] Add `query` state and `filteredUpdates` derived value to `src/pages/Updates/Updates.tsx`
- [x] T004 [US1] Render filter `<input>` (type `search`, `aria-label="Filter updates"`, placeholder `"Filter updates…"`) above the update list in `src/pages/Updates/Updates.tsx`
- [x] T005 [US1] Add empty-state message `No updates match "{query}".` when `filteredUpdates.length === 0 && query` in `src/pages/Updates/Updates.tsx`
- [x] T006 [US1] Add CSS for the filter input (`.update-search` block) to `src/styles/app.css`

**Checkpoint**: US1 fully functional and all US1 tests passing. `/new-updates` is the MVP — deliverable on its own.

---

## Phase 3: User Story 2 — Filter Skills by Name or Category (Priority: P2)

**Goal**: A search input above the Home Skills section filters skill cards in real time by name or category, working alongside the existing Blade category filter (category first, then text search). Switching the Blade clears the text query.

**Independent Test**: On Home page, type "terra" → only Terraform card. Select "Cloud" blade → type "azure" → only Azure. Clear → all Cloud skills return.

### Tests for User Story 2 (write first — must fail before T010)

- [x] T007 [US2] Create `src/pages/Home/Home.test.tsx` with failing tests — cover: skills filter input renders, filters by name, filters by category keyword, empty-state message, clearing restores skills, changing Blade clears query

### Implementation for User Story 2

- [x] T008 [US2] Add `skillQuery` state to `src/pages/Home/Home.tsx`; add `setSkillQuery('')` call inside the Blade `onSelect` handler; build `filteredSkills` pipeline (category → text)
- [x] T009 [US2] Render skills filter `<input>` (type `search`, `aria-label="Filter skills"`, placeholder `"Filter skills…"`) above the skills grid/marquee in `src/pages/Home/Home.tsx`; when `skillQuery` is non-empty and `activeCategory === 'All'`, render `skill-grid` instead of marquee
- [x] T010 [US2] Add empty-state message `No skills match "{skillQuery}".` when `filteredSkills.length === 0 && skillQuery` in `src/pages/Home/Home.tsx`
- [x] T011 [P] [US2] Add CSS for the skills filter input (`.skills-search` block) to `src/styles/app.css`

**Checkpoint**: US2 fully functional and all US2 tests passing. US1 and US2 work independently.

---

## Phase 4: User Story 3 — Global Topbar Search (Priority: P3)

**Goal**: A single `SearchBox` component in the topbar searches across all updates and skills from any page, shows grouped results, navigates on selection, and dismisses on Escape / outside click.

**Independent Test**: From System Design page, type "GitOps" in topbar → results show GitOps update + GitOps skill (if present). Click update result → navigates to `/new-updates/…`. Press Escape → panel closes.

### Foundational hook (blocking US3 implementation)

- [x] T012 [US3] Create `src/hooks/useSearch.test.ts` with failing tests — cover: empty query returns empty arrays, filters updates by title, filters updates by summary, filters skills by name, filters skills by category, case-insensitivity, special chars treated as plain text
- [x] T013 [US3] Implement `src/hooks/useSearch.ts` — accepts `query: string`, returns `{ updateResults: SearchResult[], skillResults: SearchResult[] }` using `.toLowerCase().includes()`; maps to `SearchResult` with correct `to` paths

### SearchBox component

- [x] T014 [US3] Create failing tests in `src/components/SearchBox/SearchBox.test.tsx` — cover: input renders with aria-label, results panel hidden on empty query, results panel shows on non-empty query, update result visible, skill result visible, Escape closes panel, clicking result navigates, clicking outside closes panel
- [x] T015 [US3] Implement `src/components/SearchBox/SearchBox.tsx` — controlled input, calls `useSearch`, renders grouped results panel (`role="listbox"`, `role="option"`), handles Escape via `onKeyDown`, handles outside-click via `useEffect` + `mousedown` listener on `document`, calls `useNavigate(result.to)` on selection
- [x] T016 [US3] Add CSS for `SearchBox` and results panel (`.search-box`, `.search-box__input`, `.search-box__panel`, `.search-box__group-heading`, `.search-box__item`, `.search-box__item--skill`) to `src/styles/app.css`; must work in both light and dark themes

### Wire into AppShell

- [x] T017 [US3] Import and render `<SearchBox />` between the brand link and `<ThemeToggle />` in `src/layouts/AppShell.tsx`
- [x] T018 [US3] Update `src/layouts/AppShell.test.tsx` to assert `<SearchBox />` is present in the rendered topbar

### URL param pre-fill (links global → per-page)

- [x] T019 [US3] Read `?q` URL param via `useSearchParams()` on mount in `src/pages/Home/Home.tsx` and initialise `skillQuery` from it; update `Home.test.tsx` to cover this behaviour

**Checkpoint**: US3 fully functional. Global search navigates to US1 detail pages and pre-fills US2 skills filter via URL param.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, accessibility pass, and build verification.

- [x] T020 [P] Verify all search inputs have visible focus rings in both light and dark theme (CSS custom properties `--focus-ring` or equivalent) in `src/styles/app.css`
- [x] T021 [P] Run `npm test` — confirm all tests pass (zero regressions, SC-005)
- [x] T022 Run `npm run build` — confirm zero TypeScript and ESLint errors
- [x] T023 Smoke-test quickstart.md scenarios: add a new md file to `src/content/updates/`, verify it appears in Updates filter and global search without code changes; add a skill to `profile.ts`, verify it appears in skills filter and global search

---

## Dependencies & Execution Order

### Phase Dependencies

```
T001 (types)
  └── Phase 2 (US1): T002 → T003 → T004 → T005 → T006
  └── Phase 3 (US2): T007 → T008 → T009 → T010 → T011
  └── Phase 4 (US3): T012 → T013 → T014 → T015 → T016
                                                       └── T017 → T018
                                              US2 done └── T019
Phase 5: T020,T021 [P] → T022 → T023
```

### User Story Dependencies

- **US1 (P1)**: Depends on T001 only. Independently testable. Can be delivered as the MVP.
- **US2 (P2)**: Depends on T001 only. Independent of US1. Can be developed in parallel with US1 after T001.
- **US3 (P3)**: Depends on T001. Needs US2 complete before T019 (URL param integration). `useSearch` hook (T012–T013) can start after T001 independently of US1/US2.

### Parallel Opportunities per Story

**US1 and US2 can run in parallel after T001:**
```
T001 done → start US1 (T002–T006) and US2 (T007–T011) simultaneously
```

**Within US3:**
```
T012 (tests) → T013 (hook)
                         └── T014 (component tests) → T015 (component) → T016 (CSS) → T017 → T018
```

---

## Implementation Strategy

1. **MVP first (US1)**: Implement the Updates page filter end-to-end (T001–T006). This alone satisfies the primary user request.
2. **Extend to US2**: Add skills filter on the Home page (T007–T011). The two per-page filters are independent.
3. **Complete with US3**: Build the global search on top of the already-working per-page data flows (T012–T019). US3 reuses the same matching logic via `useSearch`.
4. **Polish**: Accessibility and build checks (T020–T023).

**Suggested MVP scope**: T001 + Phase 2 (T002–T006) — delivers a working Updates filter in ~7 tasks.

---

## Format validation (v1)

All tasks follow the required checklist format: `- [ ] [ID] [P?] [Story?] Description with file path` ✅

| Check | Count |
|-------|-------|
| Total tasks | 23 |
| US1 tasks (P1) | 5 (T002–T006) |
| US2 tasks (P2) | 5 (T007–T011) |
| US3 tasks (P3) | 8 (T012–T019) |
| Setup tasks | 1 (T001) |
| Polish tasks | 4 (T020–T023) |
| Parallelisable [P] tasks | 3 (T011, T020, T021) |

---

---

# Change Request Tasks (2026-03-21)

**Context**: Two requirement changes on top of the completed v1 implementation.

---

## Phase 6: Remove Filter Skills Box (Change Request CR-001)

**Goal**: Remove the per-page text filter input from the Home Skills section. The Skills section will only use the Blade category filter for narrowing skill cards. The marquee always shows when "All" is selected; the static skill-grid shows for any specific category.

**Independent Test**: Navigate to `/`, verify no text input appears above the skills grid/marquee. Confirm the Blade category filter still works. Confirm no `skillQuery` state or `filteredSkills` logic remains in `Home.tsx`.

### Tests for CR-001 (update existing tests first)

- [x] T024 [CR1] Remove filter-input assertions from `src/pages/Home/Home.test.tsx` — delete tests covering: skills filter input renders, filters by name, filters by category keyword, empty-state message, clearing restores skills, changing Blade clears query

### Implementation for CR-001

- [x] T025 [CR1] Remove `skillQuery` state, `filteredSkills` pipeline, `showMarquee` variable, and filter `<input>` from `src/pages/Home/Home.tsx`; restore marquee condition to `activeCategory === 'All'`; remove `useSearchParams` import and `?q` param reading
- [x] T026 [CR1] Remove `.skills-search` and `.skills-search__input` CSS blocks from `src/styles/app.css`

**Checkpoint**: No filter input visible on Home Skills section. Blade filter still works. `Home.test.tsx` passes with updated assertions.

---

## Phase 7: Update Global Search to Pages & Categories (Change Request CR-002)

**Goal**: Replace the current `useSearch` behaviour (which searches individual update posts and skills by text) with a new behaviour that matches **pages** (static navigation targets) and **skill categories** from `PROFILE`. The global `SearchBox` results panel now shows two groups — "Pages" and "Categories" — instead of "Updates" and "Skills".

**New search behaviour**:
- **Pages group**: Static list of portfolio pages matched by their display name against the query. Results navigate to the page's route.
  - Home → `/`
  - New Updates → `/new-updates`
  - System Design → `/system-design`
- **Categories group**: Unique skill category values from `PROFILE.categories` matched by category name against the query. Results navigate to Home with `?category=<name>` URL param so the Blade pre-selects that category on mount.

**Independent Test**: From any page, open the topbar search and type "design" → "System Design" page result appears. Type "dev" → any category containing "dev" (e.g. "DevOps") appears. Click a category result → navigate to `/?category=DevOps`. Confirm Home.tsx picks up the param and pre-selects the Blade.

### Foundational type update

- [x] T027 Update `SearchResult` interface in `src/types/index.ts` — change `type` union from `'update' | 'skill'` to `'page' | 'category'`

### Tests for CR-002 (write first — must fail before T029)

- [x] T028 [P] [CR2] Rewrite `src/hooks/useSearch.test.ts` — cover: empty query returns empty arrays, matches page by name (case-insensitive), matches category by name (case-insensitive), special chars treated as plain text, unmatched query returns empty, result `to` paths are correct
- [x] T029 [P] [CR2] Rewrite `src/components/SearchBox/SearchBox.test.tsx` — cover: input renders with aria-label, panel hidden on empty query, panel shows "Pages" heading when page results exist, panel shows "Categories" heading when category results exist, Escape closes panel, clicking result navigates, clicking outside closes panel

### Implementation for CR-002

- [x] T030 [CR2] Rewrite `src/hooks/useSearch.ts` — define static `PAGES` list; derive `categoryResults` from `PROFILE.categories`; filter both by `query.toLowerCase().includes()`; return `{ pageResults: SearchResult[], categoryResults: SearchResult[] }` (remove `updateResults` and `skillResults`)
- [x] T031 [CR2] Update `src/components/SearchBox/SearchBox.tsx` — destructure `{ pageResults, categoryResults }` from `useSearch`; rename result panel groups to "Pages" / "Categories"; update `hasResults` check; no changes to outside-click or Escape logic
- [x] T032 [CR2] Add `?category` URL param reading to `src/pages/Home/Home.tsx` — on mount read `searchParams.get('category')` and use it as the initial `activeCategory` (default `'All'`); add a `Home.test.tsx` test that verifies the Blade pre-selects the correct category when `?category=DevOps` is present in the URL

**Checkpoint**: Global search now shows pages and categories only. Home Blade pre-selects the category when navigated from global search. `useSearch.test.ts` and `SearchBox.test.tsx` pass.

---

## Phase 8: Polish & Validation (CR-001 + CR-002)

**Purpose**: Confirm the full build is green and the updated flows work end to end.

- [x] T033 [P] Run `npm test` — confirm all tests pass with zero regressions (SC-005)
- [x] T034 Run `npm run build` — confirm zero TypeScript and ESLint errors
- [ ] T035 Smoke-test: (1) Confirm no filter input on Home Skills. (2) Type "update" in topbar search → "New Updates" page result appears, click → navigates to `/new-updates`. (3) Type a category name → category result appears, click → Home Blade pre-selects that category.

---

## Dependencies & Execution Order (Change Request)

```
T027 (type update)
  └── T028 (useSearch tests) → T030 (useSearch impl)
      T029 (SearchBox tests) → T031 (SearchBox impl)
                                T030 done → T031
  └── T032 (Home ?category param)

T024 (remove Home tests) ─┐
T025 (remove Home impl)   ├─ can run in parallel
T026 (remove CSS)       ──┘

T031 + T032 done → T033, T034 [P] → T035
```

- **CR-001 (T024–T026)**: All three tasks are independent of each other and of CR-002.
- **CR-002 (T027–T032)**: T027 (type) must come first; then T028/T029 can run in parallel (different files); T030 depends on T028 being written; T031 depends on T029 + T030; T032 is independent of T030/T031.

---

## Format validation (Change Request tasks)

All tasks follow the required checklist format: `- [ ] [ID] [P?] [Story?] Description with file path` ✅

| Check | Count |
|-------|-------|
| CR-001 tasks | 3 (T024–T026) |
| CR-002 tasks | 6 (T027–T032) |
| Polish tasks | 3 (T033–T035) |
| Total new tasks | 12 |
| Parallelisable [P] tasks | 4 (T028, T029, T033, T025/T026) |
