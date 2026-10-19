import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import siteConfig from '@/site.config';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  base: siteConfig.base,
  build: {
    assets: 'assets',
  },
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: page => siteConfig.navs.some(item => page.endsWith(item.path)),
    }),
    pagefind(),
  ],
  markdown: {
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: 'min-light', dark: 'one-dark-pro' },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: 'v3' }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  fonts: [
    {
      name: 'Google Sans Code',
      cssVariable: '--font-google-sans-code',
      provider: fontProviders.google(),
      fallbacks: ['monospace'],
      weights: [300, 400, 500, 600, 700],
      styles: ['normal', 'italic'],
      formats: ['woff', 'ttf'],
    },
  ],
});
