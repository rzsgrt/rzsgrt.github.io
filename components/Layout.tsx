import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      <header className="site-header">
        <div className="site-title">
          <Link href="/">rzsgrt notes</Link>
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>
      <div className="wrap">
        {children}
      </div>
      <footer className="site-footer">
      </footer>
    </div>
  );
}

