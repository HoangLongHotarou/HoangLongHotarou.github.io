import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CodeBlock from './CodeBlock';

// react-syntax-highlighter uses dynamic imports for styles; mock the whole module
// so tests run without a DOM CSS parser.
vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, language, showLineNumbers }: { children: string; language: string; showLineNumbers: boolean }) => (
    <div data-testid="syntax-highlighter" data-language={language} data-line-numbers={String(showLineNumbers)}>
      {children}
    </div>
  ),
}));

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  oneDark: {},
}));

describe('CodeBlock', () => {
  it('renders SyntaxHighlighter for a yaml fenced block', () => {
    render(
      <CodeBlock className="language-yaml" inline={false}>
        {`key: value\n`}
      </CodeBlock>
    );
    const el = screen.getByTestId('syntax-highlighter');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('data-language', 'yaml');
  });

  it('shows line numbers for a yaml block', () => {
    render(
      <CodeBlock className="language-yaml" inline={false}>
        {`key: value\n`}
      </CodeBlock>
    );
    expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute('data-line-numbers', 'true');
  });

  it('renders SyntaxHighlighter with language bash', () => {
    render(
      <CodeBlock className="language-bash" inline={false}>
        {`echo hello\n`}
      </CodeBlock>
    );
    const el = screen.getByTestId('syntax-highlighter');
    expect(el).toHaveAttribute('data-language', 'bash');
  });

  it('falls back to plain <code> for an unknown / no language', () => {
    render(
      <CodeBlock className="" inline={false}>
        {`some text`}
      </CodeBlock>
    );
    expect(screen.queryByTestId('syntax-highlighter')).not.toBeInTheDocument();
    expect(screen.getByText('some text').tagName).toBe('CODE');
  });

  it('renders plain <code> for inline code (no pre/SyntaxHighlighter)', () => {
    render(
      <CodeBlock className="language-yaml" inline={true}>
        {`inline`}
      </CodeBlock>
    );
    expect(screen.queryByTestId('syntax-highlighter')).not.toBeInTheDocument();
    expect(screen.getByText('inline').tagName).toBe('CODE');
  });
});
