# Tasks: Markdown-Driven Updates Page

**Feature**: Markdown-Driven Updates Page  
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)  
**Generated**: 2026-03-14

---

## Phase 1 — Setup

- [x] T001 Install `react-markdown` dependency (`npm install react-markdown`)
- [x] T002 [P] Add `Update` interface to `src/types/index.ts`
- [x] T003 [P] Create `src/content/updates/` directory with sample markdown posts

---

## Phase 2 — Foundational

- [x] T004 Create `src/utils/parseMd.ts` — `parseFrontmatter`, `parseUpdate`, `loadUpdates` utilities
- [x] T005 Write unit tests for `parseFrontmatter` and `parseUpdate` in `src/utils/parseMd.test.ts`

---

## Phase 3 — User Story 1: Visitor browses updates list

**Story goal**: Visitor sees a sorted, card-based list of all updates with title, date, and summary.

**Independent test criteria**: Navigate to `/new-updates` → see cards for all `.md` files, sorted newest-first; empty state renders when list is empty.

- [x] T006 [P] [US1] Create `src/pages/Updates/Updates.tsx` — list page with `.update-list` and `.update-card` markup
- [x] T007 [P] [US1] Add `.update-list`, `.update-card`, `.update-card__date/title/summary` CSS to `src/styles/app.css`
- [x] T008 [US1] Wire `/new-updates` route in `src/App.tsx` to `<Updates />`
- [x] T009 [US1] Write tests for `Updates` component in `src/pages/Updates/Updates.test.tsx`

---

## Phase 4 — User Story 2: Visitor reads a full update

**Story goal**: Clicking a card renders the full markdown body at `/new-updates/:slug` with styled HTML and a back link.

**Independent test criteria**: Navigate to `/new-updates/<slug>` → see heading, rendered body, back link; unknown slug shows not-found message.

- [x] T010 [P] [US2] Create `src/pages/Updates/UpdateDetail.tsx` — detail page with `<ReactMarkdown>` rendering
- [x] T011 [P] [US2] Add `.update-detail__back/header/body` CSS to `src/styles/app.css`
- [x] T012 [US2] Wire `/new-updates/:slug` route in `src/App.tsx` to `<UpdateDetail />`
- [x] T013 [US2] Write tests for `UpdateDetail` component in `src/pages/Updates/UpdateDetail.test.tsx`

---

## Phase 5 — Polish & Cross-Cutting Concerns

- [x] T014 Run `npx vitest run` — confirm all tests pass (30/30)
- [x] T015 Run `npm run build` — confirm clean production build

---

## Enhancement: Syntax Highlighting with Line Numbers in Code Blocks

**Added**: 2026-03-15  
**User request**: Show line numbers and syntax colouring for fenced code blocks (yaml, bash, etc.) rendered inside the Updates detail page.

---

## Phase 6 — Setup: Syntax Highlighting Dependency

- [x] T016 Install `react-syntax-highlighter` and `@types/react-syntax-highlighter` (`npm install react-syntax-highlighter && npm install -D @types/react-syntax-highlighter`)

---

## Phase 7 — Foundational: CodeBlock Component

**Purpose**: Reusable component that wraps `react-syntax-highlighter/prism` — detects language, shows line numbers, and falls back to plain `<code>` for inline snippets.

- [x] T017 Create `src/components/CodeBlock/CodeBlock.tsx` — extract language from `className` prop (format `language-*`), render `<SyntaxHighlighter>` with `showLineNumbers` for fenced blocks, plain `<code>` for inline
- [x] T018 [P] Write tests for `CodeBlock` in `src/components/CodeBlock/CodeBlock.test.tsx` — cover yaml block with line numbers, bash block with line numbers, unknown language fallback, and inline code (no `<pre>`)

---

## Phase 8 — User Story 3: Visitor sees highlighted code blocks with line numbers

**Story goal**: Every fenced code block on the Update detail page renders with token-coloured syntax and a visible line-number gutter, for any language declared in the fence (yaml, bash, and others).

**Independent test criteria**: Navigate to `/new-updates/<slug>` on a post containing ```` ```yaml ```` and ```` ```bash ```` blocks → each block shows coloured tokens and a line-number column; inline `` `code` `` is unaffected.

- [x] T019 [US3] Wire `CodeBlock` as the `code` renderer in `<ReactMarkdown components={{ code: CodeBlock }}>` in `src/pages/Updates/UpdateDetail.tsx`
- [x] T020 [P] [US3] Override `.update-detail__body pre` and `.update-detail__body code` CSS in `src/styles/app.css` — reset `background`, `padding`, and `border-radius` on containers owned by the syntax highlighter to avoid double-styling
- [x] T021 [US3] Extend `src/pages/Updates/UpdateDetail.test.tsx` — add a test that mocks `CodeBlock` and verifies it is called when markdown contains a fenced code block

---

## Phase 9 — Polish

- [x] T022 Run `npx vitest run` — confirm all tests pass
- [x] T023 Run `npm run build` — confirm clean production build

---

## Dependencies

```
Phase 1 (T001–T003) must complete before Phase 2
Phase 2 (T004–T005) must complete before Phase 3 and Phase 4
Phase 3 and Phase 4 are independent — can be executed in parallel
Phase 5 requires Phase 3 and Phase 4 to be complete

[Syntax Highlighting Enhancement]
Phase 6 (T016) must complete before Phase 7
Phase 7 (T017) must complete before Phase 8
T018 can be written in parallel with T017 (same component, TDD)
Phase 8 tasks: T019 depends on T017; T020 and T021 are independent of each other
Phase 9 requires Phase 8 to be complete
```

## Parallel Execution Examples

```
# Original feature
Worker A: T006 → T007 → T008 → T009   (US1: list page)
Worker B: T010 → T011 → T012 → T013   (US2: detail page)
# Both converge at Phase 5

# Syntax highlighting enhancement
T016 → T017 (+ T018 in parallel) → T019 → T021
                                 ↘ T020 (parallel with T019)
# Converge at Phase 9
```

## Implementation Strategy

**MVP**: US1 (browsable updates list) is independently deployable and usable on its own.  
**Increment**: US2 (detail page) builds on US1 using the same data source — no new setup required.  
**Phases 1–5**: All completed — base feature shipped.  
**Phases 6–9**: Syntax highlighting enhancement — completed.  
**Phases 10–13**: Sidebar navigation icons — start at T024.

---

## Enhancement: Sidebar Navigation Icons

**Added**: 2026-03-15  
**User request**: Show icons next to each sidebar (aside) navigation item — the Home link, the Categories group button, and each category child link (System Design, DevOps Tools, New Updates).

---

## Phase 10 — Setup: Icon Library

- [x] T024 Install `lucide-react` (`npm install lucide-react`)

---

## Phase 11 — Foundational: Icon Type Integration

**Purpose**: Extend the NAV type definitions so each NavLeaf and NavGroup can carry an optional Lucide icon component without any runtime cost.

- [x] T025 Add optional `icon?: LucideIcon` field to `NavLeaf` and `NavGroup` types in `src/layouts/AppShell.tsx`

---

## Phase 12 — User Story 4: Visitor sees icons in the sidebar

**Story goal**: Every sidebar navigation item (Home, Categories group, and all three category children) displays a recognisable icon to its left, giving the aside visual hierarchy and scannability.

**Independent test criteria**: Render `<AppShell>` → sidebar contains an SVG icon element alongside each nav label (Home, System Design, DevOps Tools, New Updates); Categories group button also shows an icon.

- [x] T026 [P] [US4] Assign icon values to NAV items in `src/layouts/AppShell.tsx`: Home→`HomeIcon`, Categories group→`Layers`, System Design→`GitBranch`, DevOps Tools→`Wrench`, New Updates→`Bell`
- [x] T027 [US4] Render `<Icon size={16} className="sidebar__icon" aria-hidden="true" />` inside each `<NavLink>` and inside the `<sidebar__group-btn>` label span in `src/layouts/AppShell.tsx`
- [x] T028 [P] [US4] Update `.sidebar__link` to `display: flex; align-items: center; gap: 0.5rem` and add `.sidebar__icon { flex-shrink: 0 }` in `src/styles/app.css`
- [x] T029 [US4] Extend `src/layouts/AppShell.test.tsx` — add tests that verify at least one SVG icon is rendered inside the Home link and inside the System Design child link

---

## Phase 13 — Polish

- [x] T030 Run `npx vitest run` — confirm all tests pass
- [x] T031 Run `npm run build` — confirm clean production build

---

## Dependencies (full)

```
[Sidebar Icons Enhancement]
Phase 10 (T024) must complete before Phase 11
Phase 11 (T025) must complete before Phase 12
Phase 12: T026 and T028 can run in parallel (different files)
         T027 depends on T026 (needs icons assigned before rendering)
         T029 can be written alongside T027 (TDD)
Phase 13 requires Phase 12 to be complete
```

## Parallel Execution Examples (sidebar icons)

```
T024 → T025 → T026 (+ T028 in parallel) → T027 → T029
# Converge at Phase 13
```
