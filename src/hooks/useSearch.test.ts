import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSearch } from './useSearch';

// ---------------------------------------------------------------------------
// Mock PROFILE so tests are stable regardless of profile.ts edits
// ---------------------------------------------------------------------------
vi.mock('../data/profile', () => ({
  PROFILE: {
    categories: ['All', 'DevOps', 'Cloud', 'System Design'],
    skills: [],
  },
}));

// ---------------------------------------------------------------------------

describe('useSearch', () => {
  it('returns empty arrays for an empty query', () => {
    const { result } = renderHook(() => useSearch(''));
    expect(result.current.pageResults).toEqual([]);
    expect(result.current.categoryResults).toEqual([]);
  });

  it('matches a page by name (case-insensitive)', () => {
    const { result } = renderHook(() => useSearch('design'));
    expect(result.current.pageResults).toHaveLength(1);
    expect(result.current.pageResults[0].label).toBe('System Design');
  });

  it('matches multiple pages when query is broad', () => {
    // "update" matches "New Updates"
    const { result } = renderHook(() => useSearch('update'));
    expect(result.current.pageResults.some((r) => r.label === 'New Updates')).toBe(true);
  });

  it('matches a category by name (case-insensitive)', () => {
    const { result } = renderHook(() => useSearch('dev'));
    expect(result.current.categoryResults).toHaveLength(1);
    expect(result.current.categoryResults[0].label).toBe('DevOps');
  });

  it('matches multiple categories', () => {
    // "o" is in DevOps, Cloud
    const { result } = renderHook(() => useSearch('o'));
    expect(result.current.categoryResults.length).toBeGreaterThanOrEqual(2);
  });

  it('does not include "All" in category results', () => {
    const { result } = renderHook(() => useSearch('all'));
    expect(result.current.categoryResults.every((r) => r.label !== 'All')).toBe(true);
  });

  it('treats special characters as plain text (no regex error)', () => {
    expect(() => renderHook(() => useSearch('(..+)'))).not.toThrow();
    const { result } = renderHook(() => useSearch('(..+)'));
    expect(result.current.pageResults).toEqual([]);
    expect(result.current.categoryResults).toEqual([]);
  });

  it('maps page results to correct SearchResult shape', () => {
    const { result } = renderHook(() => useSearch('home'));
    const r = result.current.pageResults.find((p) => p.label === 'Home');
    expect(r).toBeDefined();
    expect(r!.type).toBe('page');
    expect(r!.to).toBe('/');
  });

  it('maps category results to correct SearchResult shape', () => {
    const { result } = renderHook(() => useSearch('Cloud'));
    const r = result.current.categoryResults[0];
    expect(r.type).toBe('category');
    expect(r.label).toBe('Cloud');
    expect(r.to).toBe('/?category=Cloud');
  });

  it('returns empty results when nothing matches', () => {
    const { result } = renderHook(() => useSearch('xyzxyz'));
    expect(result.current.pageResults).toEqual([]);
    expect(result.current.categoryResults).toEqual([]);
  });
});

