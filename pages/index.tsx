import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getAllPosts } from '@/lib/posts';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Reverie</title>
        <meta name="description" content="An elegant blog theme" />
      </Head>
      <main>
        {posts.map((post) => (
          <article key={post.slug} className="post-preview">
            {post.title && (
              <Link href={`/posts/${post.slug}`}>
                <h2 className="post-title">{post.title}</h2>
              </Link>
            )}
            {post.date && <span className="post-date">{post.date}</span>}
            {post.excerpt && (
              <div className="post-excerpt">
                <p>{post.excerpt}</p>
              </div>
            )}
            <Link href={`/posts/${post.slug}`}>
              <span className="read-more">Read More</span>
            </Link>
          </article>
        ))}
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

