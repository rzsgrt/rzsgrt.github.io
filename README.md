Github page built with Next.js.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to GitHub Pages

Update `next.config.js` with your repository name if different from `newblog`:
```javascript
basePath: '/your-repo-name',
```

Then push to GitHub. GitHub Actions will automatically deploy on every push to `main`.

## Writing Posts

Create markdown files in `pages/posts/` with frontmatter:

```markdown
---
title: My Post
date: December 15, 2024
excerpt: Post summary
---

Content here. Use $inline$ or $$display$$ math.
```

Place images in `public/images/` and reference them:
```markdown
![Alt text](/images/filename.jpg)
```
