import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UpdateDetail from './UpdateDetail';

vi.mock('../../utils/parseMd', () => ({
  loadUpdates: () => [
    {
      slug: '2026-03-14-kubernetes-patterns',
      title: 'Kubernetes Patterns',
      date: '2026-03-14',
      summary: 'A summary.',
      content: '# Kubernetes Patterns\n\nLearn about sidecar, ambassador, and adapter patterns.',
    },
    {
      slug: '2026-03-01-gitops-with-argocd',
      title: 'GitOps with ArgoCD',
      date: '2026-03-01',
      summary: 'GitOps summary.',
      content:
        '# GitOps\n\nSome text.\n\n```yaml\nkey: value\n```\n\n```bash\necho hello\n```',
    },
  ],
}));

vi.mock('../../components/CodeBlock/CodeBlock', () => ({
  default: ({ children, className }: { children: string; className?: string }) => (
    <div data-testid="code-block" data-classname={className ?? ''}>
      {children}
    </div>
  ),
}));

function renderDetail(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/new-updates/${slug}`]}>
      <Routes>
        <Route path="/new-updates/:slug" element={<UpdateDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('UpdateDetail', () => {
  it('renders the update title', () => {
    renderDetail('2026-03-14-kubernetes-patterns');
    const headings = screen.getAllByRole('heading', { name: 'Kubernetes Patterns' });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders the markdown body content', () => {
    renderDetail('2026-03-14-kubernetes-patterns');
    expect(screen.getByText(/sidecar, ambassador, and adapter/i)).toBeInTheDocument();
  });

  it('shows a back link to the updates list', () => {
    renderDetail('2026-03-14-kubernetes-patterns');
    const back = screen.getByRole('link', { name: /back to updates/i });
    expect(back).toHaveAttribute('href', '/new-updates');
  });

  it('shows a not-found message for an unknown slug', () => {
    renderDetail('does-not-exist');
    expect(screen.getByText(/update not found/i)).toBeInTheDocument();
  });

  it('invokes CodeBlock when the post contains a fenced code block', () => {
    renderDetail('2026-03-01-gitops-with-argocd');
    const codeBlocks = screen.getAllByTestId('code-block');
    expect(codeBlocks.length).toBeGreaterThan(0);
  });

  it('passes the language className to CodeBlock for yaml blocks', () => {
    renderDetail('2026-03-01-gitops-with-argocd');
    const yamlBlock = screen
      .getAllByTestId('code-block')
      .find((el) => el.getAttribute('data-classname')?.includes('yaml'));
    expect(yamlBlock).toBeTruthy();
  });
});
