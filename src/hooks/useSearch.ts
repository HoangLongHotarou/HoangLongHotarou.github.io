import { useMemo } from 'react';
import type { SearchResult } from '../types';
import { PROFILE } from '../data/profile';

const PAGES: SearchResult[] = [
  { type: 'page', label: 'Home', sublabel: 'Page', to: '/' },
  { type: 'page', label: 'New Updates', sublabel: 'Page', to: '/new-updates' },
  { type: 'page', label: 'System Design', sublabel: 'Page', to: '/system-design' },
];

export function useSearch(query: string): {
  pageResults: SearchResult[];
  categoryResults: SearchResult[];
} {
  return useMemo(() => {
    if (!query) return { pageResults: [], categoryResults: [] };

    const q = query.toLowerCase();

    const pageResults = PAGES.filter((p) => p.label.toLowerCase().includes(q));

    const categoryResults: SearchResult[] = PROFILE.categories
      .filter((cat) => cat !== 'All' && cat.toLowerCase().includes(q))
      .map((cat) => ({
        type: 'category',
        label: cat,
        sublabel: 'Category',
        to: `/?category=${encodeURIComponent(cat)}`,
      }));

    return { pageResults, categoryResults };
  }, [query]);
}

