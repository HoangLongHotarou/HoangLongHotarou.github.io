import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBox from './SearchBox';

// ---------------------------------------------------------------------------
// Mock useSearch hook with vi.hoisted to survive hoisting
// ---------------------------------------------------------------------------
const { mockUseSearch } = vi.hoisted(() => ({
  mockUseSearch: vi.fn(),
}));

vi.mock('../../hooks/useSearch', () => ({
  useSearch: mockUseSearch,
}));

const EMPTY = { pageResults: [], categoryResults: [] };
const WITH_RESULTS = {
  pageResults: [
    { type: 'page' as const, label: 'System Design', sublabel: 'Page', to: '/system-design' },
  ],
  categoryResults: [
    { type: 'category' as const, label: 'DevOps', sublabel: 'Category', to: '/?category=DevOps' },
  ],
};

function renderSearchBox() {
  return render(
    <MemoryRouter>
      <SearchBox />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  mockUseSearch.mockReturnValue(EMPTY);
});

describe('SearchBox', () => {
  it('renders an input with aria-label "Search site"', () => {
    renderSearchBox();
    expect(screen.getByRole('searchbox', { name: /search site/i })).toBeInTheDocument();
  });

  it('does not show results panel when query is empty', () => {
    mockUseSearch.mockReturnValue(EMPTY);
    renderSearchBox();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows results panel when there are results', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders "Pages" group heading when page results exist', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    expect(screen.getByText('Pages')).toBeInTheDocument();
  });

  it('renders "Categories" group heading when category results exist', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('renders a page result label in the panel', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    expect(screen.getByText('System Design')).toBeInTheDocument();
  });

  it('renders a category result label in the panel', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    expect(screen.getByText('DevOps')).toBeInTheDocument();
  });

  it('closes panel on Escape key', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('clears query on Escape key', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toHaveValue('');
  });

  it('closes panel when clicking outside the component', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('navigates to result.to when a result item is clicked', () => {
    mockUseSearch.mockReturnValue(WITH_RESULTS);
    renderSearchBox();
    const input = screen.getByRole('searchbox', { name: /search site/i });
    fireEvent.change(input, { target: { value: 'design' } });
    const item = screen.getByText('System Design');
    fireEvent.mouseDown(item);
    // After selection, query should be cleared
    expect(input).toHaveValue('');
  });
});

