// src/scripts/background.ts

export function initBackgroundAnimation() {
  // Cleanup previous run (important with ClientRouter navigation)
  const w = window as unknown as {
    __bgCleanup?: () => void;
  };
  w.__bgCleanup?.();

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  const isCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;

  // На мобильных/в reduced-motion отключаем «живой» follower и частицы.
  if (prefersReducedMotion || isCoarsePointer) {
    const container = document.getElementById('particles-container');
    if (container) container.innerHTML = '';
    const follower = document.getElementById('mouse-follower');
    if (follower) follower.style.display = 'none';
    w.__bgCleanup = undefined;
    return;
  }

  const container = document.getElementById("particles-container");
  if (!container) return;
  
  // Очищаем, чтобы не дублировать частицы при навигации
  container.innerHTML = "";

  const particleCount = 12;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
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


  const follower = document.getElementById("mouse-follower");

  if (follower) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    // Логика для мыши
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 200; 
      targetY = e.clientY - 200;
    };

    document.addEventListener("mousemove", onMouseMove);

    let rafId = 0;
    function animate() {
      if (!document.getElementById("mouse-follower")) return;
      
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      follower.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(animate);
    }
    animate();

    w.__bgCleanup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      // Восстанавливаем display, если понадобится
      follower.style.display = '';
    };
  }
}
