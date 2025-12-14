// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss({
        config: {
          darkMode: 'class',
          content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
          theme: {
            extend: { 
              // Оставляем только кастомный градиент, так как он создает новую утилиту.
              backgroundImage: {
                'theme-gradient': `radial-gradient(at 20% 10%, hsl(var(--primary-hsl)/.1), transparent 50%),
                                   radial-gradient(at 80% 20%, hsl(var(--muted-hsl)/.1), transparent 50%),
                                   radial-gradient(at 50% 80%, hsl(var(--primary-hsl)/.05), transparent 50%)`,
              }
            }
          },
          plugins: [],
        }
      })
    ]
  },

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false, 
    },
  },
  site: 'https://rerowros.ru',
  integrations: [sitemap(), react()],
});