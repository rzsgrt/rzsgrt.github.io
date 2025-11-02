import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const basePath = process.env.NODE_ENV === 'production' ? '/newblog' : '';

  return (
    <div className="container">
      <header className="site-header">
        <div className="site-title">
          <Link href={`${basePath}/`}>Reverie</Link>
        </div>
        <nav className="site-nav">
          <Link href={`${basePath}/`}>Home</Link>
          <Link href={`${basePath}/about`}>About</Link>
        </nav>
      </header>
      <div className="wrap">
        {children}
      </div>
      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Reverie. An elegant blog theme.</p>
        </div>
      </footer>
    </div>
  );
}

