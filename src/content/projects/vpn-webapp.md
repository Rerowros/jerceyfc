---
title:
  ru: "VPN Manager: Telegram WebApp"
  en: "VPN Manager: Telegram WebApp"
description:
  ru: "Клиентское приложение для управления VPN-подпиской внутри Telegram."
  en: "Client-side application for managing VPN subscriptions within Telegram."
details:
  ru: "SPA на Next.js, интегрированное в Telegram. Zustand для стейта, TanStack Query для кэширования, оплата через YooKassa/Ozon Bank. UX уровня нативного приложения."
  en: "Next.js SPA integrated into Telegram. Zustand for state, TanStack Query for caching, YooKassa/Ozon Bank payments. Native-like app UX."
tags:
  [
    "Next.js",
    "Telegram WebApp",
    "Zustand",
    "TanStack Query",
    "Tailwind",
    "UX/UI",
  ]
pubDate: 2024-04-05
featured: true
status: "completed"
type: "web"
---

### RU

Превратил рутинную настройку VPN в однокликовый процесс внутри Telegram. Это **Next.js приложение**, которое ощущается как нативное благодаря агрессивному кэшированию через **TanStack Query** и оптимистичным обновлениям интерфейса. Пользователь видит актуальный статус подписки и трафика мгновенно, без спиннеров загрузки.

Реализовал сложный флоу оплаты: от выбора тарифа до интеграции с **YooKassa** и **Ozon Bank** (с генерацией QR-кодов). Использовал двунаправленную связь с Telegram WebApp SDK для управления темой и нативными кнопками (MainButton). Особое внимание уделил UX: анимированные переходы, "Debug Mode" по скрытому жесту и автоматическое обновление данных через Server Actions после успешной транзакции.

### EN

Transformed complex VPN configuration into a seamless one-click experience inside Telegram. Built with **Next.js**, the app mimics native performance using **TanStack Query** for aggressive caching and optimistic UI updates. Users get instant feedback on their subscription status and traffic usage without staring at loading screens.

I engineered a robust payment flow integrating **YooKassa** and **Ozon Bank**, handling redirects and status polling gracefully. Deep integration with the **Telegram WebApp SDK** allows the app to adapt to the user's theme and control native UI elements. Features include a hidden gesture-activated debug console and automated data revalidation via Server Actions post-payment.
