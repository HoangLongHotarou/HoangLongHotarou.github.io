import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Updates from './Updates';

vi.mock('../../utils/parseMd', () => ({
  loadUpdates: () => [
    {
      slug: '2026-03-14-kubernetes-patterns',
      title: 'Kubernetes Patterns',
      date: '2026-03-14',
      summary: 'A summary of k8s patterns.',
      content: '# Kubernetes Patterns\n\nBody text.',
    },
    {
      slug: '2026-03-01-gitops',
      title: 'GitOps with ArgoCD',
      date: '2026-03-01',
      summary: 'How to use ArgoCD.',
      content: '# GitOps\n\nBody text.',
    },
  ],
}));

function renderUpdates() {
  return render(
    <MemoryRouter>
      <Updates />
    </MemoryRouter>
  );
}

describe('Updates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a card for each update', () => {
    renderUpdates();
    expect(screen.getByText('Kubernetes Patterns')).toBeInTheDocument();
    expect(screen.getByText('GitOps with ArgoCD')).toBeInTheDocument();
  });

  it('shows date and summary on each card', () => {
    renderUpdates();
    expect(screen.getByText('2026-03-14')).toBeInTheDocument();
    expect(screen.getByText('A summary of k8s patterns.')).toBeInTheDocument();
  });

  it('each card links to the correct detail route', () => {
    renderUpdates();
    const link = screen.getByRole('link', { name: /Kubernetes Patterns/i });
    expect(link).toHaveAttribute('href', '/new-updates/2026-03-14-kubernetes-patterns');
  });

  it('renders a search input with aria-label', () => {
    renderUpdates();
    expect(screen.getByRole('searchbox', { name: /filter updates/i })).toBeInTheDocument();
  });

  it('filters cards by title as user types', () => {
    renderUpdates();
    const input = screen.getByRole('searchbox', { name: /filter updates/i });
    fireEvent.change(input, { target: { value: 'GitOps' } });
    expect(screen.getByText('GitOps with ArgoCD')).toBeInTheDocument();
    expect(screen.queryByText('Kubernetes Patterns')).not.toBeInTheDocument();
  });

  it('filters cards by summary as user types', () => {
    renderUpdates();
    const input = screen.getByRole('searchbox', { name: /filter updates/i });
    fireEvent.change(input, { target: { value: 'ArgoCD' } });
    expect(screen.getByText('GitOps with ArgoCD')).toBeInTheDocument();
    expect(screen.queryByText('Kubernetes Patterns')).not.toBeInTheDocument();
  });

  it('filter is case-insensitive', () => {
    renderUpdates();
    const input = screen.getByRole('searchbox', { name: /filter updates/i });
    fireEvent.change(input, { target: { value: 'gitops' } });
    expect(screen.getByText('GitOps with ArgoCD')).toBeInTheDocument();
  });

  it('shows empty-state message when no cards match', () => {
    renderUpdates();
    const input = screen.getByRole('searchbox', { name: /filter updates/i });
    fireEvent.change(input, { target: { value: 'xyzxyz' } });
    expect(screen.getByText(/no updates match/i)).toBeInTheDocument();
    expect(screen.queryByText('GitOps with ArgoCD')).not.toBeInTheDocument();
  });

  it('restores all cards when input is cleared', () => {
    renderUpdates();
    const input = screen.getByRole('searchbox', { name: /filter updates/i });
    fireEvent.change(input, { target: { value: 'GitOps' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Kubernetes Patterns')).toBeInTheDocument();
    expect(screen.getByText('GitOps with ArgoCD')).toBeInTheDocument();
  });
});
