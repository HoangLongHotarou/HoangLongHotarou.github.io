<!--
  SYNC IMPACT REPORT (auto-generated 2026-03-14)
  ─────────────────────────────────────────────
  Version change: 1.0.0 → 1.1.0 (MINOR — Governance section materially expanded)

  Modified principles:
    II. Modularity            → clarified: references advanced folder-structure convention
    IV. Testing               → clarified: MUST language, framework specified (Vitest + RTL), co-location rule added
    V.  Observability         → scoped: restricted to static-SPA context; logging/monitoring applies only to server services

  Added sections:
    Governance › Amendment Procedure
    Governance › Versioning Policy
    Governance › Compliance Review

  Removed sections: none

  Templates updated:
    ✅ .specify/templates/tasks-template.md — "Tests are OPTIONAL" note updated to reflect §IV MUST requirement
    ✅ .specify/memory/constitution.md      — this file

  Follow-up TODOs: none (no placeholders deferred)
-->

# Portfolio Project Constitution

## Core Principles

### I. Simplicity
Every feature MUST prioritise simplicity in design and implementation.
- Introduce the minimum code and dependencies required to meet the requirement.
- Reject external libraries or abstractions when native platform features suffice.
- YAGNI: do not build for hypothetical future requirements.

**Rationale**: A portfolio is maintained by one person. Complexity compounds over time; simplicity keeps it approachable.

### II. Modularity
The project MUST be structured into modular, independently testable units following the advanced React folder-structure convention:
`src/components/`, `src/pages/`, `src/layouts/`, `src/context/`, `src/hooks/`, `src/data/`, `src/types/`, `src/utils/`, `src/styles/`.
- Each component MUST live in its own folder alongside its test file.
- No component, hook, or utility may import from a sibling at a higher scope than its own layer.

**Rationale**: Modular structure enables parallel development, isolated testing, and future extraction of components into a design system.

### III. User Experience
The portfolio MUST provide an intuitive, visually appealing, and accessible interface.
- All interactive elements MUST have visible focus states.
- Colour contrast MUST meet WCAG AA (≥ 4.5:1 for normal text) in both light and dark themes.
- The layout MUST be fully responsive from 375 px to 1440 px with no horizontal scroll.

**Rationale**: The portfolio is a professional showcase; poor UX or inaccessible design directly damages credibility.

### IV. Testing
Every React component and custom hook MUST have co-located unit tests.
- Test framework: **Vitest** with **React Testing Library** (`@testing-library/react`) and `@testing-library/jest-dom`.
- Test files MUST be co-located: `src/components/Avatar/Avatar.test.tsx`, etc.
- Tests MUST be written before implementation (TDD — write → fail → implement → pass).
- CI MUST run `npm test` and MUST NOT pass a build with failing tests.

**Exception**: Pure CSS changes and static data files (e.g., `src/data/profile.ts`) do not require dedicated test files; they are covered indirectly by component tests.

**Rationale**: Unit tests prevent regressions during refactors and provide executable documentation of component contracts.

### V. Observability
For this static SPA, observability means:
- The browser console MUST be clean at runtime (zero errors, zero unhandled promise rejections) in both light and dark modes.
- `npm run build` MUST complete with zero TypeScript or ESLint errors.
- Performance: First Contentful Paint MUST be < 2 s on a simulated 4G connection (Lighthouse audit).

**Note**: Server-side logging and monitoring infrastructure is out of scope for a static SPA hosted on GitHub Pages. If a server-side component is added in future, structured logging MUST be introduced at that point.

**Rationale**: A static SPA has no server runtime to monitor; clean console output and fast load times are the equivalent observable quality signals.

## Constraints

- The project MUST use **React 19** and **Vite** as the core technology stack.
- Testing MUST use **Vitest** and **React Testing Library**. No additional UI test framework may be introduced without a constitution amendment.
- Deployment MUST be done via **GitHub Pages**. No server-side runtime may be introduced without a constitution amendment.
- The design MUST support both **light and dark modes** using CSS custom properties; no inline styles for theme tokens.
- No external CSS framework (e.g., Tailwind, Bootstrap) may be introduced. CSS custom properties + BEM-like class naming MUST be used.

## Development Workflow

- All changes MUST go through a pull request and code review before merging to `main`.
- Feature branches MUST follow the naming convention `###-feature-name` (e.g., `001-responsive-portfolio`).
- CI MUST run `npm run build` and `npm test` on every PR. A PR MUST NOT be merged if either fails.
- Every feature MUST have a corresponding spec in `specs/###-feature-name/` before implementation begins.

## Governance

### Amendment Procedure

1. Open a PR with the proposed change to `.specify/memory/constitution.md`.
2. State the reason for the change, the principle or section affected, and the version bump type (MAJOR / MINOR / PATCH).
3. Update `LAST_AMENDED_DATE` and `CONSTITUTION_VERSION` in the version line.
4. Produce a Sync Impact Report (HTML comment at top of the file) listing affected templates and follow-up tasks.
5. Merge only after at least one review approval confirming no regressions against active feature specs.

### Versioning Policy

Follows semantic versioning:
- **MAJOR**: Backward-incompatible governance change — principle removal, redefinition that invalidates existing code, or stack replacement.
- **MINOR**: New principle or section added, or material expansion of existing guidance.
- **PATCH**: Clarification, wording improvement, typo fix, or non-semantic refinement.

### Compliance Review

- Every PR description MUST include a Constitution Check table (see `plan-template.md` for format).
- The plan.md for each feature MUST be re-checked against the current constitution version before implementation starts.
- Any violation detected MUST be resolved (fix the code or amend the constitution) before the PR is merged.

**The constitution supersedes all other practices. When in conflict, the constitution wins.**

**Version**: 1.1.0 | **Ratified**: 2026-03-14 | **Last Amended**: 2026-03-14
