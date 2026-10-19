import IconMail from './assets/icons/socials/mail.svg';
import IconGitHub from './assets/icons/socials/github.svg';
import IconWhatsapp from './assets/icons/socials/whatsapp.svg';
import IconFacebook from './assets/icons/socials/facebook.svg';
import IconTelegram from './assets/icons/socials/telegram.svg';
import IconPinterest from './assets/icons/socials/pinterest.svg';
import IconBrandX from './assets/icons/socials/brandx.svg';

export const config = {
  site: 'https://mfuu.github.io/',
  base: 'gdb',
  author: 'mfuu',
  description: 'GDB is a blog powered by GitHub Discussions and Astro.',
  title: 'GDB',
  postPageSize: 5,
  dir: 'ltr', // "rtl" | "auto"
  lang: 'en', // html lang code. Set this empty and default will be "en"
  timezone: 'Asia/Shanghai', // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  dateFormat: 'MMM D, YYYY',
  dateDetailFormat: 'YYYY-MM-DD HH:mm:ss',

  navs: [
    {
      label: 'Posts',
      path: '/posts',
    },
    {
      label: 'Tags',
      path: '/tags',
    },
    {
      label: 'Archives',
      path: '/archives',
    },
    {
      label: 'About',
      path: '/about',
    },
  ],
};

export const socialLinks = [
  {
    name: 'Github',
    href: 'https://github.com/mfuu/gdb',
    linkTitle: `GDB on Github`,
    icon: IconGitHub,
  },
];

export const shareLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/?text=',
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/sharer.php?u=',
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: 'X',
    href: 'https://x.com/intent/post?url=',
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/share/url?url=',
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com/pin/create/button/?url=',
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: 'Mail',
    href: 'mailto:?subject=See%20this%20post&body=',
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
];

export default config;
