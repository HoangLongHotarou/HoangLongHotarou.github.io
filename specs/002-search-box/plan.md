# Implementation Plan: Search Box

**Branch**: `002-search-box` | **Date**: 2026-03-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-search-box/spec.md`

## Summary

Adds client-side search to the portfolio in three scopes: (1) a keyword filter on the Updates page, (2) a keyword filter in the Home Skills section, and (3) a global topbar search that aggregates results across both updates and skills and navigates to the matching page. All filtering is pure client-side using `String.prototype.includes()` — no network requests, no external search library.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode), React 19  
**Primary Dependencies**: React Router DOM v6 (`useNavigate`, `useSearchParams`), Lucide React (`Search` icon — already installed), existing `loadUpdates()` and `PROFILE` data  
**Storage**: N/A — static SPA, all data is in the browser bundle at load time  
**Testing**: Vitest + React Testing Library + @testing-library/jest-dom  
**Target Platform**: Browser (SPA hosted on GitHub Pages, Vite build)  
**Project Type**: Static web application (SPA)  
**Performance Goals**: Filter results visible within 100 ms of last keystroke (SC-002); FCP < 2 s unchanged  
**Constraints**: Client-side only, no network requests (FR-009), WCAG AA accessibility (SC-004), no external CSS framework  
**Scale/Scope**: ~20 updates, ~12 skills at build time; all data fits comfortably in memory

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Check | Status |
|-----------|-------|--------|
| I. Simplicity | No external search library; native `.includes()` + `useState`; no global state manager | ✅ PASS |
| II. Modularity | `SearchBox` → `src/components/SearchBox/`; `useSearch` → `src/hooks/`; per-page state stays in page components | ✅ PASS |
| III. UX | Focus states, WCAG AA contrast, Escape + click-outside dismiss, responsive layout | ✅ PASS |
| IV. Testing | `SearchBox.test.tsx`, `useSearch.test.ts`, updated `Updates.test.tsx`, `AppShell.test.tsx`; new `Home.test.tsx` (pre-existing gap addressed) | ✅ PASS |
| V. Observability | Build must pass zero TS/ESLint errors; console must be clean | ✅ PASS |
| Constraints | No Tailwind/Bootstrap; CSS custom properties + BEM naming; `light`/`dark` theme tokens respected | ✅ PASS |

**Constitution version checked**: 1.1.0  
**Gate result**: ✅ No violations — proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/002-search-box/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── components.md    ← Phase 1 output
├── checklists/
│   └── requirements.md  ← spec quality checklist
└── tasks.md             ← Phase 2 output (/speckit.tasks — NOT created by /speckit.plan)
```

### Source Code (affected files)

```text
src/
├── components/
│   └── SearchBox/
│       ├── SearchBox.tsx          NEW — global topbar search component
│       └── SearchBox.test.tsx     NEW — unit tests
├── hooks/
│   └── useSearch.ts               NEW — derives SearchResult[] from a query string
│   └── useSearch.test.ts          NEW — unit tests for hook
├── pages/
│   ├── Updates/
│   │   ├── Updates.tsx            MODIFIED — adds per-page filter input + state
│   │   └── Updates.test.tsx       MODIFIED — adds filter behaviour tests
│   └── Home/
│       ├── Home.tsx               MODIFIED — adds per-page skills filter + URL param read
│       └── Home.test.tsx          NEW — unit tests (pre-existing gap addressed)
├── layouts/
│   ├── AppShell.tsx               MODIFIED — renders <SearchBox /> in topbar
│   └── AppShell.test.tsx          MODIFIED — adds search presence test
├── types/
│   └── index.ts                   MODIFIED — adds SearchResult interface
└── styles/
    └── app.css                    MODIFIED — adds search input + results panel styles
```

## Complexity Tracking

> No constitution violations — this section is not required.

