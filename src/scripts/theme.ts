// src/scripts/theme.ts

// 1. Применение начального состояния (запускается мгновенно)
export function applyTheme() {
  const theme = localStorage.getItem('theme');
  const palette = localStorage.getItem('palette') || 'indigo';
  const lang = localStorage.getItem('lang') || 'ru';
  
  document.documentElement.lang = lang;
  
  if (theme === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
  
  document.documentElement.setAttribute('data-theme', palette);
}

// 2. Инициализация контролов (кнопки переключения)
export function initThemeControls() {
  const w = window as unknown as {
    __paletteOutsideClick?: (e: MouseEvent) => void;
  };

  // Логика Темы (Dark/Light)
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.onclick = () => {
      const isLight = document.documentElement.classList.toggle("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      updateThemeIcons(isLight);
    };
    // Синхронизация иконки при загрузке
    updateThemeIcons(document.documentElement.classList.contains("light"));
  }

  // Логика Палитры (Выпадающее меню)
  const paletteToggle = document.getElementById("palette-toggle");
  const paletteMenu = document.getElementById("palette-menu");
  const paletteButtons = document.querySelectorAll<HTMLElement>("#palette-buttons button");

  if (paletteToggle && paletteMenu) {
    // Открытие/закрытие
    paletteToggle.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      paletteMenu.classList.toggle("menu-visible");
      paletteToggle.classList.toggle("text-[var(--color-primary)]");
    };

    // Закрытие при клике вне (один глобальный обработчик)
    if (w.__paletteOutsideClick) {
      document.removeEventListener('click', w.__paletteOutsideClick);
    }
    w.__paletteOutsideClick = (e: MouseEvent) => {
      if (!paletteMenu.contains(e.target as Node) && !paletteToggle.contains(e.target as Node)) {
        paletteMenu.classList.remove("menu-visible");
        paletteToggle.classList.remove("text-[var(--color-primary)]");
      }
    };
    document.addEventListener('click', w.__paletteOutsideClick);

    // Кнопки цветов
    const updateActiveColorButton = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "indigo";
      paletteButtons.forEach((btn) => {
        if (btn.dataset.theme === currentTheme) {
          btn.classList.add("color-btn-active");
        } else {
          btn.classList.remove("color-btn-active");
        }
      });
    };
    updateActiveColorButton();

    paletteButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const theme = (e.currentTarget as HTMLElement).dataset.theme;
        if (theme) {
          document.documentElement.setAttribute("data-theme", theme);
          localStorage.setItem("palette", theme);
          updateActiveColorButton();
        }
      };
    });
  }
}

// Вспомогательная функция для иконок
function updateThemeIcons(isLight: boolean) {
  const sunGroup = document.getElementById("sun-group");
  const moonGroup = document.getElementById("moon-group");
  if (sunGroup && moonGroup) {
    if (isLight) {
      sunGroup.classList.remove("opacity-0");
      moonGroup.classList.add("opacity-0");
    } else {
      sunGroup.classList.add("opacity-0");
      moonGroup.classList.remove("opacity-0");
    }
  }
}