// Скрипт выполняет инициализацию темы, палитры, языка и режима для слабовидящих
(function(){
  function applyTheme() {
    var theme = localStorage.getItem('theme');
    var palette = localStorage.getItem('palette') || 'indigo';
    var view = localStorage.getItem('view');
    var lang = localStorage.getItem('lang') || 'ru';
    document.documentElement.lang = lang;
    if (view === 'gos') {
      document.documentElement.setAttribute('data-view', 'gos');
    } else {
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-theme', palette);
    }
  }
  applyTheme();
  document.addEventListener('astro:after-swap', applyTheme);
})();
