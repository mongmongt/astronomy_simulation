(() => {
  if (document.querySelector('.space-atmosphere')) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'space-atmosphere';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let seed = 92026;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  function draw() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    seed = 92026;

    const space = ctx.createLinearGradient(0, 0, width, height);
    space.addColorStop(0, '#050714');
    space.addColorStop(.48, '#090d25');
    space.addColorStop(1, '#04050e');
    ctx.fillStyle = space;
    ctx.fillRect(0, 0, width, height);

    const nebulae = [
      [width * .87, height * .15, Math.max(width, height) * .56, '82,64,164'],
      [width * .18, height * .72, Math.max(width, height) * .46, '28,84,148'],
      [width * .62, height * .92, Math.max(width, height) * .36, '127,48,112']
    ];
    nebulae.forEach(([x, y, radius, color]) => {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, `rgba(${color},.17)`);
      glow.addColorStop(.42, `rgba(${color},.055)`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    });

    const count = Math.min(420, Math.round((width * height) / 5200));
    for (let i = 0; i < count; i += 1) {
      const x = random() * width;
      const y = random() * height;
      const size = random() < .08 ? 1.7 : random() < .24 ? 1 : .55;
      const alpha = .2 + random() * .68;
      const color = random() < .18 ? '158,190,255' : random() < .1 ? '255,212,158' : '238,244,255';
      ctx.fillStyle = `rgba(${color},${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  draw();
  window.addEventListener('resize', draw, { passive: true });
})();
