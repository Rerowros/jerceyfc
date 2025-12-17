// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// Импорт плагинов для Markdown/MDX
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://rerowros.ru',

  // Настройка i18n (оставляем вашу)
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false, 
    },
  },

  // Настройка Markdown и MDX
  markdown: {
    // Поддержка GFM (таблицы, чекбоксы и т.д.)
    remarkPlugins: [remarkGfm],
    // Плагины для обработки HTML (ID для заголовков + ссылки)
    rehypePlugins: [
      rehypeSlug, 
      [
        rehypeAutolinkHeadings, 
        { behavior: 'wrap' } // Оборачивает заголовок в ссылку
      ]
    ],
    // Подсветка кода
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  },

  integrations: [
    mdx(), // Включаем поддержку .mdx файлов
    sitemap(), 
    react()
  ],

  // Ваша конфигурация Vite + Tailwind
  vite: {
    plugins: [
      tailwindcss({
        config: {
          darkMode: 'class',
          content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
          theme: {
            extend: { 
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
});