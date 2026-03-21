import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import AppShell from './AppShell';
import { describe, expect, it } from 'vitest';

// lucide-react renders real SVG elements in jsdom — no mock needed.

function renderShell() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe('AppShell', () => {
  it('sidebar does not have sidebar--open class on initial render', () => {
    renderShell();
    const sidebar = document.querySelector('.sidebar');
    expect(sidebar).not.toHaveClass('sidebar--open');
  });

  it('clicking the hamburger button opens the sidebar', async () => {
    renderShell();
    const hamburger = screen.getByRole('button', { name: /toggle sidebar/i });
    fireEvent.click(hamburger);
    const sidebar = document.querySelector('.sidebar');
    expect(sidebar).toHaveClass('sidebar--open');
  });

  it('hamburger aria-expanded reflects sidebar state', async () => {
    renderShell();
    const hamburger = screen.getByRole('button', { name: /toggle sidebar/i });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking the overlay closes the sidebar', async () => {
    renderShell();
    const hamburger = screen.getByRole('button', { name: /toggle sidebar/i });
    fireEvent.click(hamburger);
    const overlay = document.querySelector('.sidebar-overlay') as HTMLElement;
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);
    const sidebar = document.querySelector('.sidebar');
    expect(sidebar).not.toHaveClass('sidebar--open');
  });

  it('Categories group is expanded by default', () => {
    renderShell();
    const groupBtn = screen.getByRole('button', { name: /categories/i });
    expect(groupBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('System Design')).toBeInTheDocument();
  });

  it('clicking the Categories group button collapses it', async () => {
    renderShell();
    const groupBtn = screen.getByRole('button', { name: /categories/i });
    fireEvent.click(groupBtn);
    expect(groupBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('System Design')).not.toBeInTheDocument();
  });

  it('Home link contains an SVG icon', () => {
    renderShell();
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink.querySelector('svg')).toBeInTheDocument();
  });

  it('System Design child link contains an SVG icon', () => {
    renderShell();
    const sdLink = screen.getByRole('link', { name: /system design/i });
    expect(sdLink.querySelector('svg')).toBeInTheDocument();
  });

  it('Categories group button contains an SVG icon', () => {
    renderShell();
    const groupBtn = screen.getByRole('button', { name: /categories/i });
    expect(groupBtn.querySelector('svg')).toBeInTheDocument();
  });

  it('topbar contains a SearchBox input', () => {
    renderShell();
    expect(screen.getByRole('searchbox', { name: /search pages and categories/i })).toBeInTheDocument();
  });
});
