/** @type {import("prettier").Config} */
export default {
  // --- Базовые настройки ---
  printWidth: 100, // Чуть шире стандарта (80), чтобы HTML-теги Astro не переносились слишком часто
  tabWidth: 2, // Стандартный отступ
  useTabs: false, // Использовать пробелы (надежнее для рендеринга везде)
  semi: true, // Точка с запятой в конце строк (безопаснее для TS)
  singleQuote: true, // Одинарные кавычки (чище визуально в JS/TS)
  quoteProps: 'as-needed', // Кавычки у ключей объектов только если нужно
  jsxSingleQuote: false, // В JSX/React (и Astro) атрибутах используем двойные: class="..."
  trailingComma: 'es5', // Запятые в массивах/объектах (удобно при добавлении новых строк)
  bracketSpacing: true, // Пробелы внутри фигурных скобок: { props }
  arrowParens: 'always', // Всегда скобки у стрелочных функций: (args) => ...
  endOfLine: 'lf', // Linux-style переносы (важно для git)

  // --- Плагины ---
  // Важен порядок: сначала Astro, потом Tailwind
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

  // --- Специфичные настройки для Astro ---
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx',
      },
    },
  ],
};
