import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { ComponentPropsWithoutRef } from 'react';

type CodeProps = ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
};

export default function CodeBlock({ inline, className, children, ...rest }: CodeProps) {
  const match = /language-(\w+)/.exec(className ?? '');
  const language = match ? match[1] : '';

  if (!inline && match) {
    return (
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        showLineNumbers
        wrapLongLines={false}
        PreTag="div"
        {...(rest as object)}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  }

  return (
    <code className={className} {...rest}>
      {children}
    </code>
  );
}
