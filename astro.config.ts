import { defineConfig } from 'astro/config';
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
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: 'min-light', dark: 'night-owl' },
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
  },
});
