# Data Model: Search Box

**Feature**: 002-search-box | **Date**: 2026-03-15

> This is a static front-end SPA — there is no persistent data store. The "data model" describes the shape of new in-memory UI state and the types introduced by this feature.

---

## New Entity: SearchResult

Represents a single item returned by the global topbar search.

| Field | Type | Notes |
|-------|------|-------|
| `type` | `'update' \| 'skill'` | Content category — used to group results in the panel |
| `label` | `string` | Primary display text (update title or skill name) |
| `sublabel` | `string` | Secondary display text (update date or skill category) |
| `to` | `string` | Destination path for `useNavigate()` — e.g. `/new-updates/2026-03-01-gitops-with-argocd` or `/?q=Terraform` |

---

## New State: Per-Page Query (Updates Page)

| Field | Type | Source | Scope | Notes |
|-------|------|--------|-------|-------|
| `query` | `string` | `useState('')` | `Updates` component | Drives real-time filter of the `UPDATES` array. Empty → show all. |

**Derived value** (no additional state):
```ts
const filteredUpdates = UPDATES.filter(u =>
  u.title.toLowerCase().includes(query.toLowerCase()) ||
  u.summary.toLowerCase().includes(query.toLowerCase())
);
```

---

## New State: Per-Page Query (Home Skills Section)

| Field | Type | Source | Scope | Notes |
|-------|------|--------|-------|-------|
| `skillQuery` | `string` | `useState('')` | `Home` component | Drives real-time filter within the already-active Blade category. Initialised from `?q` URL param on mount. |

**Filter pipeline** (order matters — category first, then text search):
```ts
const categoryFiltered =
  activeCategory === 'All' ? PROFILE.skills : PROFILE.skills.filter(s => s.category === activeCategory);

const filteredSkills = skillQuery
  ? categoryFiltered.filter(s =>
      s.name.toLowerCase().includes(skillQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(skillQuery.toLowerCase())
    )
  : categoryFiltered;
```

**State transition** — `skillQuery` clears when `activeCategory` changes:
```
user selects Blade category  →  setActiveCategory(cat)  +  setSkillQuery('')
```

---

## New State: Global SearchBox Component

| Field | Type | Source | Scope | Notes |
|-------|------|--------|-------|-------|
| `query` | `string` | `useState('')` | `SearchBox` component | Drives the global results panel. Empty → panel not rendered. |

**Derived values** (computed inside `useSearch` hook):
```ts
const updateResults: SearchResult[] = updates
  .filter(u =>
    u.title.toLowerCase().includes(q) || u.summary.toLowerCase().includes(q)
  )
  .map(u => ({ type: 'update', label: u.title, sublabel: u.date, to: `/new-updates/${u.slug}` }));

const skillResults: SearchResult[] = skills
  .filter(s =>
    s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  )
  .map(s => ({ type: 'skill', label: s.name, sublabel: s.category, to: `/?q=${encodeURIComponent(s.name)}` }));
```

---

## Updated Entity: AppState (additions only)

The existing `AppState` from `001-responsive-portfolio/data-model.md` is extended with:

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `query` (Updates) | `string` | `useState` in `Updates` | New — per-page |
| `skillQuery` (Home) | `string` | `useState` in `Home` | New — per-page |
| `searchQuery` (topbar) | `string` | `useState` in `SearchBox` | New — global |

---

## Unchanged Entities

`ProfileData`, `Skill`, `Update` — no schema changes required. The search feature reads existing fields only.

---

## State Transitions Summary

```
Updates page:
  query=''  ──type──►  query='git'  ──clear──►  query=''
  UPDATES.filter(...)  →  filteredUpdates  →  rendered cards

Home Skills:
  skillQuery=''  ──type──►  skillQuery='terra'  ──blade change──►  skillQuery=''
  (category → categoryFiltered) → (query → filteredSkills)

Global SearchBox:
  query=''  ──type──►  query='k8s'  ──Escape/outside click/select result──►  query=''
  useSearch(query) → { updateResults, skillResults }
  select result → useNavigate(result.to) → query=''
```
