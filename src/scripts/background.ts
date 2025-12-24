// src/scripts/background.ts

export function initBackgroundAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowPerfDevice =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    // @ts-ignore deviceMemory is not in all browsers
    (navigator.deviceMemory && navigator.deviceMemory <= 4);

  // Для слабых устройств или пользователей с reduce-motion оставляем фон статичным
  if (prefersReducedMotion) return;

  const container = document.getElementById('particles-container');
  if (!container) return;

  // ОПТИМИЗАЦИЯ: Если частицы уже есть (при возврате или SPA-навигации), не пересоздаём их
  if (container.children.length > 0) {
    return;
  }

  // Уменьшаем количество частиц на слабых ПК
  const particleCount = isLowPerfDevice ? 10 : 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = Math.random() < 0.3 ? 3 : 1;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;

    particle.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(particle);
  }

  const follower = document.getElementById('mouse-follower');

  // Отключаем «хвост» на слабых машинах, чтобы убрать лишний rAF
  if (isLowPerfDevice) return;

  // Инициализируем фолловер только один раз
  if (follower && !follower.dataset.init) {
    follower.dataset.init = 'true';

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let lastMoveTs = 0;

    const step = () => {
      // Если элемент удален из DOM — прекращаем цикл
      if (!document.getElementById('mouse-follower')) {
        rafId = null;
        return;
      }

      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      follower.style.transform = `translate(${currentX}px, ${currentY}px)`;

      const isSettled = Math.abs(targetX - currentX) < 0.5 && Math.abs(targetY - currentY) < 0.5;
      const idleTooLong = performance.now() - lastMoveTs > 200;

      if (isSettled && idleTooLong) {
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(step);
    };

    const ensureAnimation = () => {
      lastMoveTs = performance.now();
      if (rafId === null) {
        rafId = requestAnimationFrame(step);
      }
    };

    // Логика для мыши
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 200;
      targetY = e.clientY - 200;
      ensureAnimation();
    };

    // Логика для тача
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX - 200;
        targetY = e.touches[0].clientY - 200;
        ensureAnimation();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
  }
}
