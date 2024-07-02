# gdb

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![mdx](https://img.shields.io/badge/mdx-yellow?style=for-the-badge&logo=MDX&logoColor=white) ![giscus](https://img.shields.io/badge/giscus-%2319c37d?style=for-the-badge&logo=giscus&logoColor=white)

**What is gdb**

gdb(github discussion blog), host blog content on GitHub, using GitHub Discussions as CMS for our Markdown content and then eventually using GitHub API to retrieve the content.

## GitHub Discussion

### Setup

- Enabled discussion feature in my repository.
- Deleted all default labels.
- Deleted all default categories and sections.
- Created new section named “Articles”.
- Created new category with type “Announcement”, named “Release” respective to release posts.

> You can adjust the section and categories yourself.

### Fetch script

For the fetching part extra build step for Astro, and here’s how it goes:

```json
"scripts": {
  "fetch": "node scripts/fetch-discussions.mjs",
},
```

For the script, you can found in `/scripts/fetch-discussions.mjs`

## Config

Change your website config in `src/config.ts`, such as:

```ts
export const SITE: Site = {
  website: "",
  base: "",
  author: "",
  desc: "",
  title: "",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const ROUTES = []

...
```

## Giscus

By default, giscus is enabled. If necessary, please modify the `giscus.config.mjs` configuration yourself.

```ts
{
  repo: '',
  enable: true,
  lang: "zh-CN",
  theme: "transparent_dark",
  inputPosition: "bottom",
  emitMetadata: 0,
  reactionsEnabled: 1,
  lazyLoading: true,
}
```

For more configuration content, please go to [Giscus](https://giscus.app/).

> Please ensure that your repo has [installed](https://github.com/apps/giscus) the Giscus App.

## Deploy

Automatic synchronization with Gitubb Wokflow, detail in `.github/workflows/discussions.yml`

> If you have adjusted the category name of the Discussion, please modify the env variable too.

## Others

My blog theme source: [AstroPaper](https://github.com/satnaing/astro-paper), of course, you can freely adjust it to the theme you want.
