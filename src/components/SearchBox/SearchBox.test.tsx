import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SearchBox from './SearchBox';

function renderSearchBox() {
  return render(
    <MemoryRouter>
      <SearchBox />
    </MemoryRouter>
  );
}

describe('SearchBox', () => {
  it('renders the search input', () => {
    renderSearchBox();
    expect(screen.getByRole('searchbox', { name: /search pages and categories/i })).toBeInTheDocument();
  });

  it('panel is not visible on initial render', () => {
    renderSearchBox();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('panel appears when user types a query', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'home' } });
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(document.querySelector('.search-box__panel')).toBeInTheDocument();
  });

  it('shows matching results for a query', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'system' } });
    expect(screen.getByText('System Design')).toBeInTheDocument();
  });

  it('shows group headings for matched results', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'system' } });
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('shows empty message when no results match', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'zzznomatch' } });
    expect(screen.getByText(/no results for/i)).toBeInTheDocument();
  });

  it('panel closes when a result link is clicked', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'home' } });
    const link = screen.getByRole('link', { name: /^home$/i });
    fireEvent.click(link);
    expect(document.querySelector('.search-box__panel')).not.toBeInTheDocument();
  });

  it('results panel has search-box__panel class', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'design' } });
    const panel = document.querySelector('.search-box__panel');
    expect(panel).toBeInTheDocument();
  });

  it('group heading has search-box__group-heading class', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'design' } });
    const heading = screen.getByText('Categories');
    expect(heading).toHaveClass('search-box__group-heading');
  });

  it('result items have search-box__item class', () => {
    renderSearchBox();
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'design' } });
    const item = screen.getByRole('link', { name: /system design/i });
    expect(item).toHaveClass('search-box__item');
  });
});
