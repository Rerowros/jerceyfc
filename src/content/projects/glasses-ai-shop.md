---
title:
  ru: "AI-Примерка: E-commerce платформа"
  en: "AI Virtual Try-On E-commerce"
description:
  ru: "Интернет-магазин с функцией виртуальной примерки очков на базе Gemini и Face-API."
  en: "E-commerce platform featuring AI-powered virtual eyewear try-on using Gemini and Face-API."
details:
  ru: "Разработал не просто интернет-магазин, а инструмент повышения конверсии через AI-примерку. Вместо скучного каталога пользователь получает интерактивный опыт: загружает фото и видит, как очки сидят на лице с учетом поворота и масштаба. Реализовал сложный пайплайн: face-api.js детектит 68 ключевых точек лица прямо в браузере для мгновенного фидбека, а тяжелая артиллерия в виде Gemini 2.5 Flash доводит картинку до фотореализма на сервере. \n\n С технической стороны это монолит на Astro (SSR), выжимающий максимум производительности. Для безопасности платежей внедрил HMAC-подписи вебхуков CloudPayments и атомарную систему списания квот. Чтобы не хранить тонны мусора, настроил автоматическую конвертацию изображений в WebP через sharp. Это решение закрывает главную боль онлайн-ритейла — неопределенность при выборе оправы."
  en: "Engineered a next-gen e-commerce platform that solves the biggest pain point in online eyewear retail: 'Will it fit?'. Instead of static images, I built a sophisticated Virtual Try-On system. The frontend leverages face-api.js for real-time detection of 68 facial landmarks to position glasses accurately, while the backend utilizes Gemini 2.5 Flash to generate photorealistic composites. \n\n Under the hood, it’s a high-performance Astro (SSR) application. I implemented a robust security layer using HMAC-SHA256 signatures for CloudPayments webhooks to prevent fraud. The system also features a custom resource management engine that handles AI quotas per user session. This isn't just a shop; it's a conversion-focused tech product."
tags: ["Astro", "Tailwind", "AI", "TensorFlow.js", "Gemini API", "Node.js"]
pubDate: 2024-03-01
featured: true
status: "completed"
type: "web"
---
