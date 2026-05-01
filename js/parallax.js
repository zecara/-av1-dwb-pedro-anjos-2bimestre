// =============================================
// parallax.js — Fundo interativo com parallax
// =============================================

(function () {
  const bg = document.getElementById('bg-parallax');
  if (!bg) return;

  // Intensidade do movimento (quanto menor, mais sutil)
  const INTENSIDADE = 18;

  // Posicao central inicial
  let alvoX = 50;
  let alvoY = 50;
  let atualX = 50;
  let atualY = 50;

  // Suavizacao do movimento
  function animar() {
    atualX += (alvoX - atualX) * 0.05;
    atualY += (alvoY - atualY) * 0.05;

    const moveX = (atualX - 50) / INTENSIDADE;
    const moveY = (atualY - 50) / INTENSIDADE;

    bg.style.transform = `scale(1.1) translate(${moveX}%, ${moveY}%)`;

    requestAnimationFrame(animar);
  }

  // Atualiza alvo conforme o mouse se move
  document.addEventListener('mousemove', function (e) {
    alvoX = (e.clientX / window.innerWidth) * 100;
    alvoY = (e.clientY / window.innerHeight) * 100;
  });

  // Em mobile, usa o giroscopio se disponivel
  window.addEventListener('deviceorientation', function (e) {
    if (e.gamma !== null && e.beta !== null) {
      alvoX = 50 + e.gamma * 0.8; // lateral
      alvoY = 50 + (e.beta - 45) * 0.8; // frente/tras
    }
  });

  animar();
})();