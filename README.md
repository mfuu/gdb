# gdb

gdb(github discussion blog), host blog content on GitHub, using GitHub Discussions as CMS for our Markdown content and then eventually using GitHub API to retrieve the content.

## GitHub Discussion

### Setup

- Enabled discussion feature in your repository.
- Deleted all default categories and sections.
- Created new category with type "Announcement", named "Release" respective to release posts.

### Script

For the fetching part extra build step for Astro, and here’s how it goes:

```json
"scripts": {
  "fetch": "node scripts/fetch-discussions.mjs",
},
```

**Usage**

```shell
npm run fetch --repository "${{github.repository}}" # for example: npm run fetch --repository "mfuu/gdb"
```

## Config

Change your website config in `src/site.config.ts`

```ts
const config = {
  site: '', // your website url
  base: '', // your website base path
  author: '',
  description: '', // your website description
  title: '', // your website title
  postPageSize: 5, // post per page size
  dir: 'ltr', // "rtl" | "auto"
  lang: 'en', // html lang code. Set this empty and default will be "en"
  timezone: 'Asia/Shanghai', // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

  navs: [], // navigation links
};

const socials = []; // social links

const shareLinks = []; // post share links
```

## Giscus

By default, giscus is enabled. If necessary, please modify the `src/giscus.config.ts` configuration yourself.

```ts
giscus: {
  enable: true,
  repo: '',
  mapping: 'number',
  emitMetadata: 0,
  inputPosition: 'bottom',
  reactionsEnabled: 1,
  lang: 'zh-CN',
  loading: 'lazy',
  lightTheme: 'light',
  darkTheme: 'dark',
}
```

Please ensure that your repo has [installed](https://github.com/apps/giscus) the [Giscus](https://giscus.app/) App.

## Generate Blog

Automatic synchronization with GitHub Workflow, detail in `.github/workflows/generate-blog.yml`.

## Others

My blog theme source: [AstroPaper](https://github.com/satnaing/astro-paper). Of course you can freely adjust it to the theme you want.
