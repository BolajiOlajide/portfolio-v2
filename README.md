# bolaji.de

Source code for the second version of my personal site, live at [bolaji.de](https://bolaji.de). It contains my blog, projects, music, the gear I use, recognitions, and the download page for [Tapestry](https://bolaji.de/tapestry), my multitap delay plugin.

Design and creative development by [lilpolymath](https://github.com/lilpolymath).

## Running it locally

You need Node 24 and pnpm 11 (the exact version is pinned in `package.json`, so `corepack enable` will pick it up).

```sh
pnpm install
pnpm dev
```

The site runs at http://localhost:3000. No environment variables are needed for local development.

| Command      | What it does                     |
| ------------ | -------------------------------- |
| `pnpm dev`   | Start the dev server             |
| `pnpm build` | Build for production             |
| `pnpm start` | Serve the production build       |

## Environment variables

The "now playing" widget reads my current Spotify track through [now-playing](https://github.com/BolajiOlajide/now-playing). Outside production, `/api/spotify` returns a placeholder track, so you only need these when running a production build:

```sh
cp .env.example .env.local
```

| Variable                | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `SPOTIFY_CLIENT_ID`     | Client ID of a Spotify developer app             |
| `SPOTIFY_CLIENT_SECRET` | Client secret of the same app                    |
| `SPOTIFY_REFRESH_TOKEN` | Refresh token for the account being displayed    |

## Where things live

```
app/
  page.tsx                  Home page
  blog/posts/               Blog posts, one .mdx file each
  projects/                 Projects page
  music/                    Music page
  uses/content.mdx          Gear and software I use
  recognitions/content.mdx  Publications, talks and awards
  tapestry/                 Tapestry plugin download page
  components/               Shared components, each with its own .module.scss
  api/spotify/              Now-playing endpoint
  og/                       Generated Open Graph images (/og?title=...)
  rss/                      RSS feed
  sitemap.ts                Sitemap (also holds the site's base URL)
misc/data.ts                Content for the projects and music pages
styles/                     Design tokens, mixins and global Sass
public/media/               Images used in posts and pages
```

### Writing a blog post

Add a `.mdx` file to `app/blog/posts/`. The file name becomes the URL slug, so `my-post.mdx` is served at `/blog/my-post`. Only `.mdx` files are picked up; `.md` files are ignored.

Each post starts with frontmatter:

```yaml
---
title: My post
date: 2026-01-15
summary: One line shown in post listings and link previews.
tags: JavaScript, Tooling
image: /media/my-post-cover.jpg
---
```

Keep every value on a single line. The frontmatter parser is a small line-by-line reader, not a full YAML parser, so multi-line values (such as `summary: >-`) won't be read correctly. `image` is optional, and the read time is calculated automatically.

### Updating projects or music

Edit the `PROJECTS` or `MUSIC` arrays in `misc/data.ts`. For the Uses and Recognitions pages, edit `app/uses/content.mdx` or `app/recognitions/content.mdx`. These files aren't rendered as-is: `misc/list-content.ts` parses them into grouped lists, so keep to the existing shape of `## Group`, optional `### Subgroup`, and list items written as `- **[Name](url)** — note, date`.

## Built with

- [Next.js 14](https://nextjs.org) (App Router) with MDX via `@next/mdx` and `next-mdx-remote`
- [Sass](https://sass-lang.com) with CSS Modules for styles
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [sugar-high](https://github.com/huozhi/sugar-high) for code highlighting
- [now-playing](https://github.com/BolajiOlajide/now-playing) for the Spotify widget
