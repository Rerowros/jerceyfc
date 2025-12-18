// src/utils/projectStyles.ts

interface ProjectStyle {
  gradient: string; // Классы градиента (Tailwind)
  iconColor: string; // Цвет иконки
  label: string; // Текст на фоне (водяной знак)
}

// Базовые градиенты (анимированные классы добавляются в компоненте)
const GRADIENTS = {
  blue: 'from-blue-900 via-indigo-800 to-slate-900',
  purple: 'from-purple-900 via-fuchsia-800 to-slate-900',
  green: 'from-emerald-900 via-green-800 to-slate-900',
  orange: 'from-orange-900 via-amber-800 to-slate-900',
  cyan: 'from-cyan-900 via-sky-800 to-slate-900',
  gold: 'from-yellow-700 via-amber-600 to-yellow-900',
  dark: 'from-gray-900 via-slate-800 to-black',
  pink: 'from-pink-900 via-rose-800 to-slate-900',
  // Специальный для крипты/web3
  crypto: 'from-indigo-900 via-purple-900 to-cyan-900',
};

export function getProjectStyle(tags: string[], type: string): ProjectStyle {
  // 1. ПРОВЕРКА КОМБИНАЦИЙ (Самый высокий приоритет)
  const tagSet = new Set(tags);

  if (
    (tagSet.has('Next.js') || tagSet.has('React')) &&
    (tagSet.has('Crypto') || tagSet.has('Web3'))
  ) {
    return {
      gradient: GRADIENTS.crypto,
      iconColor: 'text-indigo-300',
      label: 'WEB3',
    };
  }

  if (tagSet.has('Python') && tagSet.has('AI')) {
    return {
      gradient: 'from-blue-900 via-yellow-900 to-slate-900', // Python colors mix
      iconColor: 'text-yellow-400',
      label: 'AI PY',
    };
  }

  // 2. ПРОВЕРКА ПО КОНКРЕТНОМУ ТЕГУ (Средний приоритет)
  // Ищем первый тег, для которого у нас есть уникальный стиль
  for (const tag of tags) {
    switch (tag) {
      case 'React':
      case 'Next.js':
        return { gradient: GRADIENTS.cyan, iconColor: 'text-cyan-400', label: 'REACT' };
      case 'Vue':
        return { gradient: GRADIENTS.green, iconColor: 'text-emerald-400', label: 'VUE' };
      case 'Astro':
        return { gradient: GRADIENTS.orange, iconColor: 'text-orange-400', label: 'ASTRO' };
      case 'Python':
        return {
          gradient: 'from-blue-900 via-slate-800 to-yellow-900',
          iconColor: 'text-yellow-400',
          label: 'PYTHON',
        };
      case 'C#':
      case 'WinUI 3':
        return { gradient: GRADIENTS.purple, iconColor: 'text-purple-400', label: 'C#' };
      case 'Go':
        return {
          gradient: 'from-cyan-900 via-blue-900 to-slate-900',
          iconColor: 'text-cyan-300',
          label: 'GO',
        };
      case 'Rust':
        return {
          gradient: 'from-orange-900 via-red-900 to-slate-900',
          iconColor: 'text-orange-400',
          label: 'RUST',
        };
      case 'Docker':
      case 'DevOps':
        return {
          gradient: 'from-blue-900 via-sky-900 to-slate-900',
          iconColor: 'text-blue-300',
          label: 'DEVOPS',
        };
    }
  }

  // 3. ФОЛЛБЭК ПО ТИПУ ПРОЕКТА (Низкий приоритет)
  switch (type) {
    case 'bot':
      return { gradient: GRADIENTS.gold, iconColor: 'text-amber-400', label: 'BOT' };
    case 'ml':
      return { gradient: GRADIENTS.pink, iconColor: 'text-pink-400', label: 'AI/ML' };
    case 'desktop':
      return { gradient: GRADIENTS.green, iconColor: 'text-emerald-400', label: 'APP' };
    case 'library':
      return { gradient: GRADIENTS.dark, iconColor: 'text-gray-400', label: 'LIB' };
    default:
      // Web по умолчанию
      return { gradient: GRADIENTS.blue, iconColor: 'text-blue-400', label: 'WEB' };
  }
}
