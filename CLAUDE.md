# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog/portfolio site for albelfio.com. Built with Remix, SST (Serverless Stack), and Tailwind CSS. Content is written in Markdown and converted to HTML client-side.

## Commands

```bash
# Development (with SST hot reload)
npx sst dev --stage dev

# Development (Remix only, no SST)
npm run remix

# Build
npm run build

# Type check
npm run typecheck

# Lint
npm run lint

# Deploy
npx sst deploy --stage alfredo  # staging
npx sst deploy --stage prod     # production (albelfio.com)
```

## Architecture

### Directory Structure
- `app/` - Remix routes and entry points
- `@/` - Shared code: components, hooks, lib utilities, and content
- `@/blogs/` - Blog posts as Markdown files
- `@/projects/` - Project descriptions as Markdown files
- `@/components/` - React components (uses shadcn/ui pattern with Radix)
- `@/hooks/` - Custom hooks including `useMarkdown` for content loading

### Key Patterns

**Path Aliases:**
- `~/` maps to `./app/` (Remix convention)
- `@/` maps to `./@/` (shared code and content)

**Content System:**
- Markdown files in `@/blogs/` and `@/projects/` are loaded via Vite's `import.meta.glob`
- The `useMarkdown` hook (`@/hooks/useMarkdown.ts`) parses markdown using `marked` library
- First `# heading` becomes title, second `# heading` becomes description
- Date is auto-appended by git pre-commit hook (YYYY-MM-DD at end of file)

**Routes:**
- `/` - Home page with About, Projects, Blogs, Contact sections
- `/blog/:blogId` - Individual blog post (blogId = filename without .md)
- `/project/:projectId` - Individual project page

### Infrastructure (SST)
- Deploys as Remix site to AWS
- Production uses Cloudflare DNS for albelfio.com
- Stage-based deployment: `prod` for production, others for dev/staging
<br />
2026-01-18
