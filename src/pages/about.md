---
layout: ../layouts/AboutLayout.astro
title: "About"
---

**What is gdb**

gdb(github discussion blog), host blog content on GitHub, using GitHub Discussions as CMS for our Markdown content and then eventually using GitHub API to retrieve the content.

## GitHub Discussion

### Setup

- Enabled discussion feature in my repository.
- Deleted all default labels.
- Deleted all default categories and sections.
- Created new section named “Articles”.
- Created two new categories with type “Announcement”, named “Release” and “Drafts” respective to release and draft posts.

### Fetch script

Now for the fetching part, I had to add and extra build step for Astro, and here’s how it goes:

```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "fetch": "node scripts/fetch-discussions.mjs",
  "build": "astro check && astro build && jampack ./dist",
  "preview": "astro preview",
  "sync": "astro sync",
  "astro": "astro",
},
```

For the script, you can found in `/scripts/fetch-discussions.mjs`

## Deploy

Automatic synchronization with Gitubb Wokflow, detail in `.github/workflows/discussions.yml`

## Others

My blog theme source: [AstroPaper](https://github.com/satnaing/astro-paper), of course, you can freely adjust it to the theme you want.
