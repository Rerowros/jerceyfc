---
title:
  ru: "AI Video Gen: Cross-Platform App"
  en: "AI Video Gen: Cross-Platform App"
description:
  ru: "Кроссплатформенное приложение (VK/Telegram) для генерации видео из фото."
  en: "Cross-platform app (VK/Telegram) for generating videos from static images."
details:
  ru: "Создал кроссплатформенный комбайн для монетизации AI-контента. Приложение работает одновременно как VK Mini App и Telegram Web App, используя единую кодовую базу с разделением бизнес-логики через абстракции. Это позволило запустить продукт на двух рынках сразу без раздувания бюджета. Основная фича — превращение статичных фото в видео (Image-to-Video) с AI-реставрацией. \n\n Бэкенд спроектирован под нагрузки: вместо хранения тяжелых файлов в базе, я реализовал прямую запись бинарных потоков в файловую систему, оставив в SQLite только метаданные. Для взаимодействия с нейросетями (Runware/Replicate) использовал асинхронную архитектуру с Long Polling на клиенте, что позволяет обрабатывать длительные генерации без обрывов соединения."
  en: "Built a unified cross-platform solution enabling users to generate AI videos from static images inside VK and Telegram. By architecting a shared codebase with platform-specific hooks, I delivered two apps for the price of one. The core value lies in the seamless pipeline: users upload photos, apply AI restoration, and generate videos using Runware models without leaving the messenger. \n\n Technically, I optimized the storage layer by writing streams directly to the file system to ensure zero overhead. The backend handles long-running AI tasks via an asynchronous job queue and a client-side polling mechanism, ensuring a responsive UI even during heavy rendering."
tags: ["React", "TypeScript", "VKUI", "Telegram SDK", "Node.js", "Replicate"]
coverImage: "../../assets/project/ai-video-gen1.png"
gallery:
  - "../../assets/project/ai-video-gen1.png"
  - "../../assets/project/ai-video-gen2.png"
pubDate: 2024-02-15
featured: true
status: "completed"
type: "web"
---
