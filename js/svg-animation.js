// =============================================
// svg-animation.js — Formas SVG que se adaptam ao movimento
// =============================================

(function () {
  const svgBg = document.getElementById('bg-parallax');
  if (!svgBg) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Rastrear mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Mover formas SVG
    const formas = document.querySelectorAll('circle, rect, polygon');
    formas.forEach((forma, index) => {
      const speed = (index + 1) * 0.02;
      const offsetX = (mouseX - window.innerWidth / 2) * speed;
      const offsetY = (mouseY - window.innerHeight / 2) * speed;
      forma.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  // Animação das formas
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse1 {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.1); opacity: 0.5; }
    }
    @keyframes pulse2 {
      0%, 100% { transform: scale(1); opacity: 0.2; }
      50% { transform: scale(0.9); opacity: 0.4; }
    }
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    circle:nth-child(1) { animation: pulse1 4s ease-in-out infinite; }
    circle:nth-child(2) { animation: pulse2 6s ease-in-out infinite; }
    circle:nth-child(3) { animation: pulse1 5s ease-in-out infinite; }
    rect { animation: pulse2 7s ease-in-out infinite; }
    polygon { animation: rotate 20s linear infinite; }
  `;
  document.head.appendChild(style);
})();
