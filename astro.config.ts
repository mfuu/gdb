import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import config from './src/config';

// https://astro.build/config
export default defineConfig({
  site: config.site,
  base: config.base,
  build: {
    assets: 'assets',
  },
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: page => config.showArchives || !page.endsWith('/archives'),
    }),
  ],
  markdown: {
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: 'github-light-default', dark: 'one-dark-pro' },
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
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Google Sans Code",
        cssVariable: "--font-google-sans-code",
        provider: fontProviders.google(),
        fallbacks: ["monospace"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
    ],
  },
});
