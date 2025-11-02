import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex as any, rehypeRaw]}
      components={{
        pre({ children, ...props }: any) {
          // Check if this is a KaTeX element by checking children
          if (children && typeof children === 'object') {
            // If children is a React element with katex class, skip syntax highlighting
            if (children.props?.className?.includes('katex')) {
              return <pre {...props}>{children}</pre>;
            }
            // Check if it's a code element with language class (actual code block)
            if (children.props?.className?.startsWith('language-')) {
              const match = /language-(\w+)/.exec(children.props.className);
              if (match) {
                return (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children.props.children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              }
            }
          }
          return <pre {...props}>{children}</pre>;
        },
        code({ node, inline, className, children, ...props }: any) {
          // Don't interfere with KaTeX
          if (className && className.includes('katex')) {
            return <code className={className} {...props}>{children}</code>;
          }
          // Regular code handling
          return <code className={className} {...props}>{children}</code>;
        },
        img: ({ src, alt }) => (
          <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

