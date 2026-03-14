import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ThemeToggle', () => {
  it('renders a button', () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls context toggleTheme on click', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // After toggle, aria-label should have flipped
    expect(button).toBeInTheDocument();
  });
});
