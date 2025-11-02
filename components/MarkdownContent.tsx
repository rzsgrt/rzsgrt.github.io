import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import React from 'react';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[[rehypeKatex as any, { strict: false }]]}
      components={{
        code(props: any) {
          const {children, className, node, ...rest} = props;
          
          // If children is a React element (not a string), it's likely from KaTeX, so just render it
          if (typeof children === 'object' && React.isValidElement(children)) {
            return <code {...rest} className={className}>{children}</code>;
          }
          
          // Check for language-specific code blocks
          const match = /language-(\w+)/.exec(className || '');
          
          if (match) {
            return (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={dracula}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          
          // For everything else (inline code, etc.)
          return <code {...rest} className={className}>{children}</code>;
        },
        img(props: any) {
          const {node, ...rest} = props;
          return (
            <img 
              {...rest} 
              style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '1rem 0' }} 
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
