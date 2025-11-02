import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout';
import MarkdownContent from '@/components/MarkdownContent';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
      </Head>
      <article className="post">
        {post.title && <h1 className="post-title">{post.title}</h1>}
        {post.date && <span className="post-date">{post.date}</span>}
        <div className="post-content">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params!.slug as string);
  return {
    props: {
      post,
    },
  };
};

