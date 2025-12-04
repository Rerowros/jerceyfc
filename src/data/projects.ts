// src/data/projects.ts

export interface Project {
  id: string;
  title: { ru: string; en: string };
  description: { ru: string; en: string };
  tags: string[];
  imageUrl: string;
  demoUrl?: string;        // Ссылка на демо/live сайт
  codeUrl?: string;        // Ссылка на GitHub/GitLab
  caseStudyUrl?: string;   // Ссылка на страницу с подробностями
  featured?: boolean;      // Избранный проект
  screenshots?: string[];  // Массив скриншотов для галереи
  year?: number;           // Год создания
  status?: 'completed' | 'in-progress' | 'archived'; // Статус проекта
}

export const projects: Project[] = [
  {
    id: 'telegram-stars',
    title: { ru: 'Telegram Stars: покупка звёзд', en: 'Telegram Stars: Buy Stars' },
    description: {
      ru: 'Веб-сервис для быстрой покупки Telegram Stars — внутренней валюты Telegram для оплаты цифровых товаров и услуг в ботах и мини-приложениях. Мгновенная доставка, поддержка криптовалюты, удобные тарифы, поддержка 24/7.',
      en: 'Web service for fast purchase of Telegram Stars — the internal currency for digital goods and services in Telegram bots and mini-apps. Instant delivery, crypto support, flexible pricing, 24/7 support.'
    },
    tags: ['Next.js', 'TypeScript', 'Telegram', 'E-commerce', 'Crypto', 'Web'],
    imageUrl: '/project/telegram-stars.png',
    demoUrl: 'https://7245927860.vercel.app/',
    codeUrl: 'https://github.com/Rerowros/7245927860',
    featured: true,
    year: 2024,
    status: 'completed',
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
    caseStudyUrl: '/projects/hotel-winui',
    featured: true,
    year: 2024,
    status: 'completed',
    screenshots: ['/project/hotel1.png', '/project/hotel2.png', '/project/hotel3.png'],
  },
  {
    id: 'tsc',
    title: { ru: 'ServerControlBot: Telegram SSH бот', en: 'ServerControlBot: Telegram SSH Bot' },
    description: {
      ru: 'Telegram-бот для удаленного управления Linux-серверами через SSH. Позволяет подключаться к серверу, выполнять команды, сохранять данные серверов, управлять сессиями и использовать базовое меню.',
      en: 'Telegram bot for remote Linux server management via SSH. Supports connecting to servers, executing commands, saving server data, session management, and a basic control menu.'
    },
    tags: ['Python', 'Telegram', 'SSH', 'Bot', 'Linux', 'AsyncIO', 'Telethon'],
    codeUrl: 'https://github.com/Rerowros/LiteForce',
    imageUrl: '/project/liteforce1.png',
    year: 2024,
    status: 'in-progress',
  },
  {
    id: 'liteforce',
    title: { ru: 'LiteForce: стресс-тест ПК', en: 'LiteForce: PC Stress Test' },
    description: {
      ru: 'LiteForce — легковесный инструмент для стресс-тестирования ПК на Python. Поддерживает многопроцессорные тесты CPU, стресс-тест памяти, интенсивное хеширование и мониторинг ресурсов.',
      en: 'LiteForce is a lightweight Python tool for PC stress testing. Supports multiprocessor CPU tests, memory stress, intensive hashing, and real-time resource monitoring.'
    },
    tags: ['Python', 'Stress Test', 'NumPy', 'Numba', 'psutil', 'CLI'],
    codeUrl: 'https://github.com/Rerowros/LiteForce',
    imageUrl: '/project/TSC1.png',
    year: 2024,
    status: 'completed',
  },
  {
    id: 'alphapawn',
    title: { ru: 'AlphaPawn: нейросеть для шахмат', en: 'AlphaPawn: Chess Neural Network' },
    description: {
      ru: 'AlphaPawn — базовая нейросеть для игры в шахматы с использованием MCTS (Monte Carlo Tree Search) и обучения через self-play. Проект реализует слабую сеть, которую можно дообучать и развивать.',
      en: 'AlphaPawn is a basic chess neural network using MCTS (Monte Carlo Tree Search) and self-play for training. The project implements a weak network, designed for further development.'
    },
    tags: ['Python', 'PyTorch', 'Chess', 'MCTS', 'Self-Play', 'Reinforcement Learning', 'Stockfish'],
    imageUrl: 'https://via.placeholder.com/600x400/0f172a/ffffff?text=AlphaPawn',
    codeUrl: 'https://github.com/Rerowros/AlphaPawn',
    year: 2023,
    status: 'archived',
  },
  {
    id: 'review-imdb-r',
    title: { ru: 'Классификация отзывов IMDB', en: 'IMDB Review Sentiment Classifier' },
    description: {
      ru: 'Модель на PyTorch для анализа тональности отзывов IMDB. Использует TF-IDF векторизацию, несколько архитектур нейросетей, сравнение точности и визуализацию с помощью LIME.',
      en: 'PyTorch-based sentiment analysis for IMDB reviews. Uses TF-IDF vectorization, multiple neural architectures, accuracy comparison, and LIME visualization.'
    },
    tags: ['Python', 'PyTorch', 'NLP', 'TF-IDF', 'LIME', 'IMDB', 'Sentiment Analysis'],
    imageUrl: 'https://via.placeholder.com/600x400/64748b/ffffff?text=IMDB+Review',
    codeUrl: 'https://github.com/Rerowros/review_imdb_r',
    year: 2023,
    status: 'completed',
  },
];