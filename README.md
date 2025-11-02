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

## File Structure

### 📁 `pages/`
Next.js pages - each file becomes a route

- **`_app.tsx`** - Root component wrapper, imports global CSS and KaTeX styles
- **`index.tsx`** - Home page (`/`) - displays list of all blog posts
- **`about.tsx`** - About page (`/about`)
- **`posts/[slug].tsx`** - Dynamic route for individual posts (`/posts/sample/`)
- **`posts/*.md`** - Markdown blog posts (auto-converted to pages)

### 📁 `components/`
Reusable React components

- **`Layout.tsx`** - Site layout wrapper (header, navigation, footer)
- **`MarkdownContent.tsx`** - Renders markdown with LaTeX math, syntax highlighting, and images

### 📁 `lib/`
Utility functions

- **`posts.ts`** - Functions to read and parse markdown posts from filesystem

### 📁 `styles/`
CSS styling

- **`globals.css`** - Global styles for the entire site (typography, layout, colors)

### 📁 `public/`
Static assets served directly

- **`images/`** - Image files for blog posts (accessible at `/images/filename.png`)

### ⚙️ Config Files

- **`next.config.js`** - Next.js configuration (static export, image settings)
- **`tsconfig.json`** - TypeScript configuration
- **`package.json`** - Dependencies and npm scripts
- **`.gitignore`** - Files to exclude from git (node_modules, build output, etc.)
