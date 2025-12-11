// src/scripts/background.ts

export function initBackgroundAnimation() {
  const container = document.getElementById("particles-container");
  if (!container) return;
  
  // Очищаем, чтобы не дублировать частицы при навигации
  container.innerHTML = "";

  const particleCount = 20;

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
  
  // Убираем проверку window.innerWidth, чтобы работало и на мобильных
  if (follower) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    // Логика для мыши
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 200; 
      targetY = e.clientY - 200;
    };

    // Логика для тача (НОВОЕ)
    const onTouchMove = (e: TouchEvent) => {
       if (e.touches.length > 0) {
         targetX = e.touches[0].clientX - 200;
         targetY = e.touches[0].clientY - 200;
       }
    };
    
    document.addEventListener("mousemove", onMouseMove);
    // Добавляем слушатель касаний с passive: true для производительности скролла
    document.addEventListener("touchmove", onTouchMove, { passive: true });

    function animate() {
      if (!document.getElementById("mouse-follower")) return;
      
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      follower.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }
}
