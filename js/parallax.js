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
  // iOS 13+ requer permissao explicita
  let giroscopioAtivo = false;

  function ativarGiroscopio() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            giroscopioAtivo = true;
            window.addEventListener('deviceorientation', atualizarGiroscopio);
          }
        })
        .catch(console.error);
    } else {
      // Android e outros navegadores
      giroscopioAtivo = true;
      window.addEventListener('deviceorientation', atualizarGiroscopio);
    }
  }

  function atualizarGiroscopio(e) {
    if (giroscopioAtivo && e.gamma !== null && e.beta !== null) {
      alvoX = 50 + e.gamma * 0.8; // lateral
      alvoY = 50 + (e.beta - 45) * 0.8; // frente/tras
    }
  }

  // Detecta se eh iOS
  const ehIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (ehIOS) {
    // Cria botao discreto para pedir permissao
    const btnPermissao = document.createElement('button');
    btnPermissao.textContent = 'Ativar Giroscópio';
    btnPermissao.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
      padding: 8px 12px;
      background: rgba(0, 255, 0, 0.2);
      border: 1px solid rgba(0, 255, 0, 0.5);
      color: #0f0;
      border-radius: 4px;
      cursor: pointer;
      font-family: monospace;
      font-size: 12px;
      opacity: 0.7;
      transition: opacity 0.3s;
    `;
    btnPermissao.addEventListener('click', function () {
      ativarGiroscopio();
      btnPermissao.style.display = 'none';
    });
    btnPermissao.addEventListener('mouseenter', () => btnPermissao.style.opacity = '1');
    btnPermissao.addEventListener('mouseleave', () => btnPermissao.style.opacity = '0.7');
    document.body.appendChild(btnPermissao);
  } else {
    // Android ativa giroscopio direto
    ativarGiroscopio();
  }

  animar();
})();