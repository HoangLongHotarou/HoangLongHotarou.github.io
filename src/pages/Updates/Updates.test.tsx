import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
