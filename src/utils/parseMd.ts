import type { Update } from '../types';

/**
 * Parses a YAML frontmatter block from a raw markdown string.
 * Returns the key-value metadata and the body (markdown without frontmatter).
 * Exported for unit testing.
 */
export function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      meta[key] = value;
    }
  }
  return { meta, body: match[2] };
}

/** Converts a raw markdown string + filename slug into an Update object. */
export function parseUpdate(slug: string, raw: string): Update {
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug,
    title: meta['title'] ?? slug,
    date: meta['date'] ?? '',
    summary: meta['summary'] ?? '',
    content: body,
  };
}

/**
 * Loads all markdown files from src/content/updates/ using Vite's import.meta.glob,
 * parses their frontmatter, and returns them sorted newest-first.
 */
export function loadUpdates(): Update[] {
  const modules = import.meta.glob('../content/updates/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>;

  return Object.entries(modules)
    .map(([path, raw]) => {
      const filename = path.split('/').at(-1) ?? '';
      const slug = filename.replace(/\.md$/, '');
      return parseUpdate(slug, raw);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
