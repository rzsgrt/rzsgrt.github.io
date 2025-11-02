import Head from 'next/head';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <article className="about-page">
        <div className="post-content">
          <h2>Hi, I'm Reza! 👋</h2>
          <p>
            This blog is like my digital notebook, a place where I document everything I find interesting or useful, 
            whether it's a one-line Linux command that saved my day or a deep dive into a machine learning paper.
          </p>
          <p>
            I also like to explore film photography as another creative outlet I enjoy alongside working with data and AI.
          </p>
          <p>
            If you find something helpful here, awesome! Want to chat about AI, tech, or film photography? Feel free to reach out:
          </p>
          <ul>
            <li><a href="https://www.linkedin.com/in/reza-sugiarto/">LinkedIn</a></li>
            <li><a href="mailto:reza16.sugiarto@gmail.com">Email</a></li>
          </ul>
          <p>
            If you're interested in collaborating professionally, check out my resume:
          </p>
          <ul>
            <li><a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume (PDF)</a></li>
          </ul>
          <p>Thanks for stopping by!</p>
        </div>
      </article>
    </Layout>
  );
}

