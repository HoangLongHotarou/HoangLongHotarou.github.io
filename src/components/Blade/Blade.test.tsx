import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Blade from './Blade';

const CATEGORIES = ['All', 'DevOps', 'Cloud'];

describe('Blade', () => {
  it('renders all category tabs', () => {
    render(<Blade categories={CATEGORIES} active="All" onSelect={vi.fn()} />);
    CATEGORIES.forEach((cat) => {
      expect(screen.getByRole('tab', { name: cat })).toBeInTheDocument();
    });
  });

  it('marks the active tab with aria-selected="true"', () => {
    render(<Blade categories={CATEGORIES} active="DevOps" onSelect={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'DevOps' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onSelect with the clicked category', () => {
    const onSelect = vi.fn();
    render(<Blade categories={CATEGORIES} active="All" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Cloud' }));
    expect(onSelect).toHaveBeenCalledWith('Cloud');
  });
});
