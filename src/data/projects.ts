// src/data/projects.ts
export interface Project {
  id: string;
  title: { ru: string; en: string };
  description: { ru: string; en: string };
  tags: string[];
  imageUrl: string;
  demoUrl?: string; // Optional: for live demos
  codeUrl: string; // Link to GitHub/GitLab
  caseStudyUrl?: string; // Optional: link to a detailed write-up
}

export const projects: Project[] = [
    {
    id: 'telegram-stars',
    title: { ru: 'Telegram Stars: покупка звёзд', en: 'Telegram Stars: Buy Stars' },
    description: {
      ru: 'Веб-сервис для быстрой покупки Telegram Stars — внутренней валюты Telegram для оплаты цифровых товаров и услуг в ботах и мини-приложениях. Мгновенная доставка, поддержка криптовалюты, удобные тарифы, поддержка 24/7. Звёзды можно использовать для донатов авторам, оплаты эксклюзивного контента, подписок и других сервисов.',
      en: 'Web service for fast purchase of Telegram Stars — the internal currency for digital goods and services in Telegram bots and mini-apps. Instant delivery, crypto support, flexible pricing, 24/7 support. Stars can be used for donations, exclusive content, subscriptions, and more.'
    },
    tags: ['Next.js', 'TypeScript', 'Telegram', 'E-commerce', 'Crypto', 'Web'],
    imageUrl: '/project/telegram-stars.png',
    demoUrl: 'https://7245927860.vercel.app/',
    codeUrl: 'https://github.com/Rerowros/7245927860',
  },
    {
    id: 'hotel-winui',
    title: { ru: 'Гостиница (WinUI 3)', en: 'Hotel App (WinUI 3)' },
    description: {
      ru: 'Десктопное приложение для управления гостиницей, реализованное на WinUI 3. Включает управление номерами, бронирование, учет гостей и финансов. Современный интерфейс, быстрый отклик, поддержка Windows 10/11.',
      en: 'Desktop hotel management app built with WinUI 3. Features room management, booking, guest and finance tracking. Modern UI, fast response, Windows 10/11 support.'
    },
    tags: ['WinUI 3', 'C#', 'Desktop', 'Hotel', 'Windows'],
    imageUrl: '/project/hotel2.png',
    demoUrl: '',
    codeUrl: '',
    caseStudyUrl: '/projects/hotel-winui', // Кнопка "Подробнее" для скриншотов
  },
  {
    id: 'tsc',
    title: { ru: 'ServerControlBot: Telegram SSH бот', en: 'ServerControlBot: Telegram SSH Bot' },
    description: {
      ru: 'Telegram-бот для удаленного управления Linux-серверами через SSH. Позволяет подключаться к серверу, выполнять команды, сохранять данные серверов, управлять сессиями и использовать базовое меню. В разработке — мониторинг состояния, управление файлами, безопасность и перезагрузка.',
      en: 'Telegram bot for remote Linux server management via SSH. Supports connecting to servers, executing commands, saving server data, session management, and a basic control menu. Features in development: server monitoring, file management, security, and reboot.'
    },
    tags: ['Python', 'Telegram', 'SSH', 'Bot', 'Linux', 'AsyncIO', 'Telethon'],
    codeUrl: 'https://github.com/Rerowros/LiteForce',
    imageUrl: '/project/liteforce1.png',
  },
  {
    id: 'liteforce',
    title: { ru: 'LiteForce: стресс-тест ПК', en: 'LiteForce: PC Stress Test' },
    description: {
      ru: 'LiteForce — легковесный инструмент для стресс-тестирования ПК на Python. Поддерживает многопроцессорные тесты CPU, стресс-тест памяти, интенсивное хеширование и мониторинг ресурсов. Позволяет быстро оценить производительность и стабильность системы.',
      en: 'LiteForce is a lightweight Python tool for PC stress testing. Supports multiprocessor CPU tests, memory stress, intensive hashing, and real-time resource monitoring. Designed for quick assessment of system performance and stability.'
    },
    tags: ['Python', 'Stress Test', 'NumPy', 'Numba', 'psutil', 'CLI'],
    codeUrl: 'https://github.com/Rerowros/LiteForce',
    imageUrl: '/project/TSC1.png',
  },
  {
    id: 'alphapawn',
    title: { ru: 'AlphaPawn: нейросеть для шахмат', en: 'AlphaPawn: Chess Neural Network' },
    description: {
      ru: 'AlphaPawn — базовая нейросеть для игры в шахматы с использованием MCTS (Monte Carlo Tree Search) и обучения через self-play. Проект реализует слабую сеть, которую можно дообучать и развивать, интегрировать с шахматным движком Stockfish. Поддерживает визуализацию партии и обучение на собственных данных.',
      en: 'AlphaPawn is a basic chess neural network using MCTS (Monte Carlo Tree Search) and self-play for training. The project implements a weak network, designed for further development and integration with Stockfish. Supports game visualization and custom training.'
    },
    tags: ['Python', 'PyTorch', 'Chess', 'MCTS', 'Self-Play', 'Reinforcement Learning', 'Stockfish'],
    imageUrl: 'https://via.placeholder.com/600x400/0f172a/ffffff?text=AlphaPawn',
    codeUrl: 'https://github.com/Rerowros/AlphaPawn',
  },
    {
    id: 'review-imdb-r',
    title: { ru: 'Классификация отзывов IMDB', en: 'IMDB Review Sentiment Classifier' },
    description: {
      ru: 'Модель на PyTorch для анализа тональности отзывов IMDB. Использует TF-IDF векторизацию, несколько архитектур нейросетей, сравнение точности, сохранение лучшей модели и визуализацию с помощью LIME. Позволяет интерактивно анализировать текст и получать объяснения предсказаний.',
      en: 'PyTorch-based sentiment analysis for IMDB reviews. Uses TF-IDF vectorization, multiple neural architectures, accuracy comparison, best model saving, and LIME visualization. Enables interactive text analysis and prediction explanations.'
    },
    tags: ['Python', 'PyTorch', 'NLP', 'TF-IDF', 'LIME', 'IMDB', 'Sentiment Analysis'],
    imageUrl: 'https://via.placeholder.com/600x400/64748b/ffffff?text=IMDB+Review',
    codeUrl: 'https://github.com/Rerowros/review_imdb_r',
  },
];