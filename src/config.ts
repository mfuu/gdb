import IconMail from './assets/icons/IconMail.svg';
import IconGitHub from './assets/icons/IconGitHub.svg';
import IconBrandX from './assets/icons/IconBrandX.svg';
import IconWhatsapp from './assets/icons/IconWhatsapp.svg';
import IconFacebook from './assets/icons/IconFacebook.svg';
import IconTelegram from './assets/icons/IconTelegram.svg';
import IconPinterest from './assets/icons/IconPinterest.svg';

export default {
  site: 'https://mfuu.github.io/',
  base: 'gdb',
  author: 'mfuu',
  description: 'A minimal, responsive and SEO-friendly Astro blog theme.',
  title: 'GDB',
  ogImage: 'og.jpg',
  lightAndDarkMode: true,
  postPageSize: 5,
  dynamicOgImage: true,
  dir: 'ltr', // "rtl" | "auto"
  lang: 'en', // html lang code. Set this empty and default will be "en"
  timezone: 'Asia/Shanghai', // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

  socials: [
    {
      name: 'Github',
      href: 'https://github.com/mfuu/gdb',
      linkTitle: `GDB on Github`,
      icon: IconGitHub,
    },
  ],

  shareLinks: [
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
  ],
};
