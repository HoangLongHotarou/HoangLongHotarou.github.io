# Feature Spec: Markdown-Driven Updates Page

**Branch**: `main` | **Date**: 2026-03-14

## Overview

Replace the `/new-updates` ComingSoon placeholder with a fully functional updates page that reads `.md` files from the repository, parses their frontmatter, and renders them as styled HTML — all at build time with zero backend or network requests.

---

## Actors

- **Visitor** — anyone viewing the portfolio.
- **Author** — the portfolio owner who adds new updates by dropping `.md` files into `src/content/updates/`.

---

## Functional Requirements

### FR-1 — Updates List
The `/new-updates` route MUST display a list of all updates, each showing: title, date, and a short summary.

### FR-2 — Markdown Source
Each update MUST be sourced from a `.md` file in `src/content/updates/`. Adding a new post requires only creating a new `.md` file — no code changes required.

### FR-3 — Frontmatter Metadata
Each markdown file MUST support YAML frontmatter with fields: `title`, `date` (YYYY-MM-DD), and `summary`.

### FR-4 — Sort Order
Updates MUST be displayed newest-first (sorted by `date` descending).

### FR-5 — Update Detail
Clicking an update card MUST navigate to `/new-updates/:slug` and render the full markdown body as styled HTML.

### FR-6 — Markdown Rendering
The detail page MUST render standard markdown: headings, paragraphs, bold/italic, inline code, fenced code blocks, ordered/unordered lists, blockquotes, and links.

### FR-7 — Back Navigation
The detail page MUST include a back link to `/new-updates`.

### FR-8 — Empty State
When no `.md` files exist in `src/content/updates/`, the list page MUST show a friendly empty-state message.

---

## User Stories

### US1 — Visitor browses updates list
**As a** Visitor, **I want** to see a list of all updates with title, date, and summary, **so that** I can quickly scan what's new without reading the full posts.

**Acceptance criteria:**
1. All `.md` files in `src/content/updates/` appear as cards.
2. Cards are sorted newest-first.
3. Each card shows title, formatted date, and summary.
4. Cards are keyboard-navigable with visible focus states.

### US2 — Visitor reads a full update
**As a** Visitor, **I want** to click an update card and read its full content rendered from markdown, **so that** I can consume the complete post in a readable format.

**Acceptance criteria:**
1. Navigating to `/new-updates/:slug` renders the full markdown body as HTML.
2. Headings, paragraphs, code blocks, and lists are visually styled.
3. A back link returns to the updates list.
4. An unknown slug shows a graceful "not found" message with a back link.

---

## Non-Functional Requirements

### NFR-1 — Static-Only
All markdown files are bundled at build time via Vite `import.meta.glob`. Zero runtime network requests.

### NFR-2 — Accessibility
All interactive elements MUST have visible focus states (WCAG AA).

### NFR-3 — Responsive
Both pages MUST be fully responsive from 375 px to 1440 px.

---

## Out of Scope

- Comments or reactions
- Search / filtering
- Pagination (< 20 posts expected)
- RSS feed
- MDX / custom components in markdown
