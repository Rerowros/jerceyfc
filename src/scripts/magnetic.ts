// src/scripts/magnetic.ts

export function initMagneticButtons() {
  const isFinePointer = window.matchMedia?.('(pointer: fine)')?.matches ?? false;
  if (!isFinePointer) return;

  const buttons = document.querySelectorAll<HTMLElement>('.btn, .icon-btn, .magnetic');

  buttons.forEach(btn => {
    if (btn.dataset.magneticInit === '1') return;
    btn.dataset.magneticInit = '1';

    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      btn.style.transition = 'transform 0.1s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
  });
}