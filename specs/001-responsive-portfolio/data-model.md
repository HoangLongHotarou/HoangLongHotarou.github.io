# Data Model: Responsive Portfolio

**Feature**: 001-responsive-portfolio | **Date**: 2026-03-14

> This is a static front-end SPA — there is no persistent data store. The "data model" describes the shape of the in-memory UI state used by React components.

---

## Entity: ProfileData (static config)

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Full name, e.g. "John Doe" |
| `avatarSrc` | `string` | URL or empty string — empty triggers initials fallback |
| `title` | `string` | e.g. "DevOps & Cloud Engineer" |
| `bio` | `string` | Short about-me paragraph |
| `skills` | `Skill[]` | List of skill objects |
| `categories` | `string[]` | Category blade labels |

## Entity: Skill

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Skill name |
| `category` | `string` | Matches a `categories` entry |
| `icon` | `string?` | Optional emoji or icon identifier |

## Entity: AppState (React state)

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `theme` | `"light" \| "dark"` | `useState` | Controlled by toggle; synced to `data-theme` attribute |
| `activeCategory` | `string` | `useState` | Currently selected blade tab; `"All"` by default |

---

## State Transitions

```
theme: "light" ──toggle──► "dark" ──toggle──► "light"
activeCategory: "All" ──click blade──► category ──click All──► "All"
```
