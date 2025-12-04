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
      },
    },
  },
  plugins: [],
}