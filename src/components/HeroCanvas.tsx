'use client';

import { useEffect, useRef } from 'react';

// Ambient animated gradient + light-leak placeholder that stands in for
// an autoplaying showreel. Swap the whole <canvas> for a real <video>
// tag once a showreel export is ready — see README for the snippet.
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let raf = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width,
        h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const grd = ctx.createLinearGradient(0, 0, w, h);
      grd.addColorStop(0, '#020204');
      grd.addColorStop(0.5, '#021e2e');
      grd.addColorStop(1, '#003d48');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      const lx = w * 0.75 + Math.sin(t * 0.4) * 60;
      const ly = h * 0.3 + Math.cos(t * 0.3) * 40;
      const rg = ctx.createRadialGradient(lx, ly, 0, lx, ly, w * 0.4);
      rg.addColorStop(0, 'rgba(11,111,234,0.35)');
      rg.addColorStop(1, 'rgba(11,111,234,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);

      const lx2 = w * 0.2 + Math.cos(t * 0.25) * 50;
      const ly2 = h * 0.7 + Math.sin(t * 0.2) * 50;
      const rg2 = ctx.createRadialGradient(lx2, ly2, 0, lx2, ly2, w * 0.3);
      rg2.addColorStop(0, 'rgba(21,146,200,0.12)');
      rg2.addColorStop(1, 'rgba(21,146,200,0)');
      ctx.fillStyle = rg2;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = 0.05;
      for (let i = 0; i < 6; i++) {
        const y = ((t * 18 + i * 160) % (h + 160)) - 80;
        ctx.fillStyle = i % 2 === 0 ? '#e2e2e4' : '#0b6fea';
        ctx.fillRect(0, y, w, 2);
      }
      ctx.globalAlpha = 1;

      if (!reduceMotion) t += 0.008;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
