# Quickstart: Search Box

**Feature**: 002-search-box | **Date**: 2026-03-15

---

## Using the Search Feature

### Global Search (Topbar)

Type in the search box in the top navigation bar to search across all content at once.

- Results appear grouped under **Updates** and **Skills**.
- Click any result to navigate directly to the matching page or skill.
- Press **Escape** or click anywhere outside the results panel to close it.

### Filtering Updates (`/new-updates`)

Use the filter input above the update cards to narrow the list by title or summary text.

- Type to filter in real time — only matching cards remain visible.
- Clear the input to restore all cards.

### Filtering Skills (Home Page — Skills Section)

Use the filter input above the skill grid to search by skill name or category.

- Works together with the category filter (Blade): first select a category, then type to narrow within it.
- Switching the category filter clears the text filter automatically.

---

## Adding New Content That Appears in Search

### New Updates

Add a Markdown file to `src/content/updates/`. The file must have YAML frontmatter:

```markdown
---
title: My New Post
date: 2026-04-01
summary: A short sentence describing this post.
---

# My New Post

Content here…
```

The `title` and `summary` fields are automatically indexed by both the Updates page filter and the global topbar search. No code changes are required.

### New Skills

Add an entry to the `skills` array in `src/data/profile.ts`:

```ts
{ name: 'Pulumi', category: 'DevOps' }
```

The `name` and `category` fields are automatically included in the skills filter on the Home page and the global topbar search. No code changes are required.

---

## Extending Search to a New Content Type

To add a new content type (e.g., a "Projects" section) to the global search:

1. Define the data shape and load function (e.g., `loadProjects()` in `src/utils/`).
2. Update `useSearch.ts` to import the new data and add a third result group (e.g., `projectResults`).
3. Add a new `SearchResult` mapping for the new type with an appropriate `to` path.
4. Update `SearchBox.tsx` to render the new group in the results panel.
5. Add tests for the new group in `useSearch.test.ts` and `SearchBox.test.tsx`.

No changes to `SearchResult` type definition are needed — the `type` field is a string union; add the new value there.
