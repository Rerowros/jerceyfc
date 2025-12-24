/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        cinzel: ['Unbounded', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: '#ffffff',
        },
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        border: 'var(--color-border)',
      },
      animation: {
        'blob-1': 'blob-1 20s infinite ease-in-out alternate',
        'blob-2': 'blob-2 25s infinite ease-in-out alternate-reverse',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'blob-1': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'blob-2': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-40px, 30px) scale(1.1)' },
          '66%': { transform: 'translate(20px, -20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              // Наследуем ваши глобальные переменные
              '--tw-prose-body': 'var(--color-muted-foreground)',
              '--tw-prose-headings': 'var(--color-foreground)',
              '--tw-prose-links': 'var(--color-primary)',
              '--tw-prose-bold': 'var(--color-foreground)',
              '--tw-prose-counters': 'var(--color-primary)',
              '--tw-prose-bullets': 'var(--color-primary)',
              '--tw-prose-hr': 'var(--color-border)',
              '--tw-prose-quotes': 'var(--color-foreground)',
              '--tw-prose-quote-borders': 'var(--color-primary)',
              '--tw-prose-code': 'var(--color-primary)',
              '--tw-prose-pre-bg': '#0f1117', // Темный фон для кода
              '--tw-prose-th-borders': 'var(--color-border)',
              '--tw-prose-td-borders': 'var(--color-border)',

              maxWidth: 'none', // Чтобы текст не был слишком узким
              fontSize: '1.125rem', // 18px base size для комфортного чтения
              lineHeight: '1.8',

              a: {
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s',
                '&:hover': {
                  borderBottomColor: 'var(--color-primary)',
                },
              },
              'h1, h2, h3, h4': {
                fontFamily: '"Unbounded", sans-serif', // Ваш шрифт заголовков
                scrollMarginTop: '100px', // Отступ при клике на якорь
              },
              img: {
                borderRadius: '1rem',
                border: '1px solid var(--color-border)',
              },
              code: {
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                padding: '0.2em 0.4em',
                borderRadius: '0.25rem',
                fontWeight: '600',
              },
              'code::before': { content: '""' },
              'code::after': { content: '""' },
            },
          },
        }),
      },
    },
    plugins: [
      typography, // Добавляем плагин
    ],
  },
};
