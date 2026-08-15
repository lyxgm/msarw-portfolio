/* Deep-Ocean Instrument Panel: flowing particle-and-wave field with pointer parallax, scroll color modulation, and accessible motion fallback. */
import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; size: number; speed: number; phase: number; alpha: number };

export default function InteractiveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    let scrollProgress = 0;
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: Math.min(130, Math.max(68, Math.round(width / 10))) }, (_, index) => ({
        x: (index * 83) % Math.max(1, width),
        y: (index * 47) % Math.max(1, height),
        size: 0.5 + ((index * 17) % 10) / 10,
        speed: 0.05 + ((index * 13) % 10) / 120,
        phase: (index * 1.73) % (Math.PI * 2),
        alpha: 0.2 + ((index * 19) % 65) / 100,
      }));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.x = event.clientX / Math.max(1, width) - 0.5;
      pointerTarget.y = event.clientY / Math.max(1, height) - 0.5;
    };
    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const drawWave = (time: number, offset: number, amplitude: number, color: string, lineWidth: number, speed: number) => {
      context.beginPath();
      for (let x = -40; x <= width + 40; x += 12) {
        const normalized = x / Math.max(1, width);
        const y = height * (0.28 + offset) + Math.sin(normalized * 8 + time * speed + pointer.x * 2) * amplitude + Math.sin(normalized * 19 - time * speed * 0.7) * amplitude * 0.34 + pointer.y * amplitude * 1.5;
        if (x === -40) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.stroke();
    };

    const draw = (time: number) => {
      pointer.x += (pointerTarget.x - pointer.x) * 0.06;
      pointer.y += (pointerTarget.y - pointer.y) * 0.06;
      const hue = scrollProgress * 28;
      const background = context.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, `hsl(${194 + hue}, 46%, 3%)`);
      background.addColorStop(0.52, `hsl(${202 + hue}, 58%, 6%)`);
      background.addColorStop(1, `hsl(${214 + hue}, 64%, 10%)`);
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * (0.7 + pointer.x * 0.18), height * (0.18 + pointer.y * 0.12), 0, width * 0.7, height * 0.18, width * 0.72);
      glow.addColorStop(0, `hsla(${190 + hue}, 92%, 62%, .2)`);
      glow.addColorStop(0.45, `hsla(${205 + hue}, 88%, 42%, .08)`);
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(pointer.x * 28, pointer.y * 20);
      drawWave(time, 0.04, height * 0.035, `hsla(${190 + hue}, 92%, 62%, .42)`, 1.1, 0.00045);
      drawWave(time, 0.17, height * 0.052, `hsla(${202 + hue}, 86%, 50%, .23)`, 1.5, -0.00034);
      drawWave(time, 0.31, height * 0.075, `hsla(${218 + hue}, 86%, 58%, .16)`, 1.2, 0.00025);
      context.restore();

      for (const particle of particles) {
        const drift = Math.sin(time * particle.speed + particle.phase) * 12;
        const x = particle.x + drift + pointer.x * (18 + particle.size * 16);
        const y = ((particle.y - time * particle.speed * 7) % (height + 30)) + pointer.y * (10 + particle.size * 10);
        const alpha = particle.alpha * (0.65 + Math.sin(time * 0.001 + particle.phase) * 0.25);
        context.beginPath();
        context.fillStyle = `hsla(${185 + hue + particle.size * 18}, 90%, 76%, ${Math.max(0.04, alpha)})`;
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      const vignette = context.createRadialGradient(width / 2, height / 2, height * 0.18, width / 2, height / 2, height * 0.8);
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(2,2,4,.78)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const animate = (time: number) => {
      draw(motionQuery.matches ? 1200 : time);
      if (!motionQuery.matches) frame = requestAnimationFrame(animate);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    motionQuery.addEventListener("change", resize);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      motionQuery.removeEventListener("change", resize);
    };
  }, []);

  return <div className="interactive-backdrop" aria-hidden="true"><canvas ref={canvasRef} className="backdrop-canvas" /></div>;
}
