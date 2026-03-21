# Feature Specification: Search Box

**Feature Branch**: `002-search-box`  
**Created**: 2025-07-14  
**Status**: Draft  
**Input**: User description: "Create the search box for this project, can search anything info in this webpage."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Filter Updates by Keyword (Priority: P1)

A visitor on the New Updates page wants to find a specific post quickly without scrolling through all updates. They type a word or phrase into a search input above the update cards. The list of cards updates in real time, showing only updates whose title or summary contains the typed text. If no updates match, a friendly "no results" message appears. Clearing the input restores all cards.

**Why this priority**: Updates is the primary content area with growing entries. Filtering here delivers immediate, standalone value and is the most direct interpretation of "search anything in this webpage."

**Independent Test**: Navigate to `/new-updates`, type a known keyword from an update title (e.g., "GitOps") — only matching cards appear. Type a nonsense string — empty state message shows. Clear the input — all cards return.

### User Story 2 - Filter Skills by Name or Category (Priority: P2)

A visitor on the Home page wants to find a specific skill quickly. They type a skill name (e.g., "Terraform") or a category keyword (e.g., "Cloud") into a search input above the Skills section. The skill cards update in real time, showing only skills whose name or category contains the typed text. The existing Blade category filter and the search box coexist — selecting a Blade category narrows the pool first, then the search filters within that pool.

**Why this priority**: Skills are the second content-rich section. Adding search here fulfils the "anything in this webpage" intent without requiring a cross-page infrastructure. It is independently valuable and testable on the Home page alone.

**Independent Test**: On the Home page, type "terra" into the skills search input — only the "Terraform" card shows. Select "Cloud" Blade filter then type "azure" — only the Azure skill shows. Clear the input — all Cloud skills return.

### User Story 3 - Global Topbar Search (Priority: P3)

A visitor browsing any page of the portfolio sees a single search input in the topbar. They type a keyword and are shown a unified list of matching results — combining updates and skills — without needing to navigate to a specific page first. From the results they can jump directly to a matching update post or scroll to a matching skill on the Home page.

**Why this priority**: This delivers the fullest interpretation of "search anything in this webpage" in one place. It is a more complex undertaking than per-page search (US1 + US2), so it is P3 — valuable but not a prerequisite for the P1/P2 MVP.

**Independent Test**: From the System Design page, open the topbar search, type "GitOps" — results show the GitOps update post and the GitOps skill card. Click the update result — navigate to the matching update detail page. Clear the input — results panel closes.

---

### Edge Cases

- **Empty input**: Restoring all items when the user clears the search field must be instant with no flicker.
- **Special characters**: Input containing regex characters (`.`, `*`, `?`, `(`, `)`) must not cause errors — they are treated as plain text.
- **Single update / single skill**: Pages with only one content item still show the search box and respond correctly.
- **All items filtered out**: An empty state message is shown; it must not look like a loading or error state.
- **Category + search combo (Skills)**: Switching the Blade category while a search term is active should re-filter against the new category pool without clearing the search term.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The search input on the Updates page MUST filter update cards in real time on every keystroke, matching against each update's title and summary text.
- **FR-002**: The search input on the Home Skills section MUST filter skill cards in real time on every keystroke, matching against each skill's name and category.
- **FR-003**: Matching MUST be case-insensitive so that "gitops", "GitOps", and "GITOPS" all return the same results.
- **FR-004**: When the search input is empty, ALL content items for that section MUST be displayed.
- **FR-005**: When no items match the current search term, a human-readable empty-state message MUST appear (e.g., "No updates found for "xyz"").
- **FR-006**: The Blade category filter on the Home page MUST continue to work when the skills search is active; the search filters within whatever category is currently selected.
- **FR-007**: Each search input MUST have an accessible label (visible placeholder text and an `aria-label`) so that screen readers can identify the field's purpose.
- **FR-008**: Special characters entered in the search field MUST be treated as literal text and MUST NOT cause errors or unexpected filtering behaviour.
- **FR-009**: No network requests MUST be made as a result of the search interaction; all filtering is client-side against already-loaded data.
- **FR-010**: The global topbar search MUST aggregate results from both the updates list and the skills list, displaying them in a unified results panel grouped by content type (e.g., "Updates" and "Skills" headings).
- **FR-011**: Selecting a result from the global search MUST navigate the visitor to the relevant page or section (update detail page for updates; Home Skills section for skills).
- **FR-012**: The global search results panel MUST close when the visitor clears the input, presses Escape, or clicks outside the panel.

### Key Entities

- **Update card**: A content item on the Updates page — has a title, a summary, and a date. The title and summary are the searchable fields.
- **Skill card**: A content item in the Home Skills section — has a name and a category. Both fields are searchable.
- **Search query**: A string entered by the visitor that determines which content items are shown or hidden.

### Assumptions

- The full list of updates is already loaded in the browser when the visitor visits the Updates page; no pagination or lazy-loading is in scope.
- The complete skills list is already in the browser bundle via `profile.ts`; it does not change at runtime.
- Debouncing is not required at this scale (< 100 items); real-time filtering on every keystroke is acceptable.
- Browser history / URL query-param syncing for search state is out of scope.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can locate a specific update post by typing 3–5 characters in under 2 seconds from their first keystroke.
- **SC-002**: Filtering 50 skill cards produces a visible result within 100 ms of the last keystroke, with no perceptible lag on a standard laptop.
- **SC-003**: The empty-state message is visible and clearly distinguishable from the normal "no updates yet" placeholder on first load.
- **SC-004**: Both search inputs pass automated accessibility checks (WCAG 2.1 AA) — labelled inputs, sufficient colour contrast for placeholder text.
- **SC-005**: All existing unit tests continue to pass with the search feature added (zero test regressions).
