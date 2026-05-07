

(function () {
  const canvas = document.getElementById('bg-parallax');
  if (!canvas || canvas.tagName !== 'CANVAS') return;

  const ctx = canvas.getContext('2d');
  
  // Configurar canvas
  function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  redimensionar();
  window.addEventListener('resize', redimensionar);

  // Partículas
  const particulas = [];
  const NUM_PARTICULAS = 60;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  class Particula {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    atualizar() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce nas bordas
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Manter dentro da tela
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));

      // Atração pelo mouse
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distancia = Math.sqrt(dx * dx + dy * dy);
      const maxDistancia = 150;

      if (distancia < maxDistancia) {
        const força = (1 - distancia / maxDistancia) * 0.5;
        this.vx += (dx / distancia) * força;
        this.vy += (dy / distancia) * força;
      }

      // Damping (diminuir velocidade)
      this.vx *= 0.98;
      this.vy *= 0.98;
    }

    desenhar() {
      ctx.fillStyle = `rgba(76, 175, 112, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Inicializar partículas
  for (let i = 0; i < NUM_PARTICULAS; i++) {
    particulas.push(new Particula());
  }

  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animação
  function animar() {
    // Fundo
    ctx.fillStyle = '#060f08';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Overlay sutil
    ctx.fillStyle = 'rgba(10, 61, 47, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar partículas
    particulas.forEach((p) => {
      p.atualizar();
      p.desenhar();
    });

    // Desenhar conexões entre partículas próximas
    for (let i = 0; i < particulas.length; i++) {
      for (let j = i + 1; j < particulas.length; j++) {
        const dx = particulas[i].x - particulas[j].x;
        const dy = particulas[i].y - particulas[j].y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < 100) {
          ctx.strokeStyle = `rgba(76, 175, 112, ${0.1 * (1 - distancia / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particulas[i].x, particulas[i].y);
          ctx.lineTo(particulas[j].x, particulas[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animar);
  }

  animar();
})();
