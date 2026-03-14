import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

function wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('ThemeContext / useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('provides an initial theme of light or dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(['light', 'dark']).toContain(result.current.theme);
  });

  it('toggleTheme switches the theme value', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const initial = result.current.theme;
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe(initial === 'light' ? 'dark' : 'light');
  });

  it('syncs data-theme attribute on documentElement after toggle', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.toggleTheme());
    expect(document.documentElement.getAttribute('data-theme')).toBe(result.current.theme);
  });
});
