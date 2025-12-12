// src/scripts/language.ts

export function initLanguageControls() {
  const langToggle = document.getElementById("lang-toggle");
  const langToggleMobile = document.getElementById("lang-toggle-mobile");

  const switchLanguage = async () => {
    // 1. Находим все элементы с текстом, которые зависят от языка
    // Исключаем спойлеры и скрытые элементы для оптимизации
    const container = document.body;
    
    // Добавляем класс размытия на весь контейнер (или specific elements)
    container.classList.add("language-switching");

    // Ждем пока анимация размытия пройдет (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 2. Меняем язык
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === "ru" ? "en" : "ru";
    document.documentElement.lang = newLang;
    localStorage.setItem("lang", newLang);

    // 3. Убираем размытие, запуская анимацию появления
    container.classList.remove("language-switching");
  };

  if (langToggle) {
    langToggle.onclick = (e) => {
      e.preventDefault();
      switchLanguage();
    };
  }
  
  if (langToggleMobile) {
    langToggleMobile.onclick = (e) => {
      e.preventDefault();
      switchLanguage();
    };
  }
}