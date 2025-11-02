import Head from 'next/head';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - Reverie</title>
        <meta name="description" content="About page" />
      </Head>
      <article className="about-page">
        <h1 className="post-title">About</h1>
        <div className="post-content">
          <p>
            This is a beautifully crafted blog built with Next.js, inspired by
            the elegant Reverie Jekyll theme. It features support for markdown
            posts with LaTeX math rendering and images.
          </p>
          <p>
            The design focuses on readability and simplicity, letting your
            content shine.
          </p>
        </div>
      </article>
    </Layout>
  );
}

