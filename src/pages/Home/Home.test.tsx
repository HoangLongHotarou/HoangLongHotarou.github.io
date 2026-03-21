import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

function renderHome(initialSearch = '') {
  const url = initialSearch ? `/?category=${encodeURIComponent(initialSearch)}` : '/';
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Home />
    </MemoryRouter>,
  );
}

describe('Home – Skills section', () => {
  it('renders the Skills heading', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument();
  });

  it('renders skill cards in the marquee by default', () => {
    renderHome();
    // Marquee duplicates items — at least one Kubernetes card should exist
    expect(screen.getAllByText('Kubernetes').length).toBeGreaterThan(0);
  });

  it('does not render a skills filter text input', () => {
    renderHome();
    expect(screen.queryByRole('searchbox', { name: /filter skills/i })).not.toBeInTheDocument();
  });

  it('pre-selects Blade category from ?category URL param', () => {
    renderHome('DevOps');
    // The active Blade tab should reflect the pre-selected category
    expect(screen.getByRole('tab', { name: /^DevOps$/i })).toHaveAttribute('aria-selected', 'true');
  });
});
