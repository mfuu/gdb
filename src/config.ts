import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://mfuu.github.io",
  base: "gdb",
  author: "mfuu",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "GDB",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/mfuu/gdb",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:mfuu.me@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  }
];
