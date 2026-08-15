'use client';

import { useRef, useState, PointerEvent } from 'react';
import Reveal from './Reveal';

const IMAGE = 'https://picsum.photos/id/1040/1400/800';

export default function BeforeAfter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  function setFromClientX(clientX: number) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let next = ((clientX - rect.left) / rect.width) * 100;
    next = Math.max(0, Math.min(100, next));
    setPct(next);
  }

  function onPointerDown(e: PointerEvent) {
    dragging.current = true;
    setFromClientX(e.clientX);
  }
  function onPointerMove(e: PointerEvent) {
    if (dragging.current) setFromClientX(e.clientX);
  }
  function stopDrag() {
    dragging.current = false;
  }

  return (
    <section className="px-6 md:px-10 py-28 md:py-40 max-w-6xl mx-auto">
      <Reveal className="section-eyebrow mb-6">THE TRANSFORMATION</Reveal>
      <Reveal>
        <h2 className="font-display font-medium text-4xl md:text-6xl mb-14">
          Same Footage.
          <br />
          Different Story.
        </h2>
      </Reveal>

      <Reveal>
        <div
          ref={wrapRef}
          className="relative rounded-2xl aspect-video overflow-hidden select-none touch-none cursor-ew-resize"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerLeave={stopDrag}
        >
          <img
            src={IMAGE}
            alt="Raw footage"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0.3) saturate(0.5) brightness(0.75) sepia(0.15) hue-rotate(160deg)' }}
          />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
            <img
              src={IMAGE}
              alt="Graded footage"
              className="h-full object-cover max-w-none"
              style={{ filter: 'saturate(1.35) contrast(1.15) brightness(1.05) sepia(0.08) hue-rotate(-8deg)', width: `${(100 / Math.max(pct, 1)) * 100}%` }}
            />
          </div>
          <div className="absolute top-0 bottom-0 w-0.5 bg-ivory" style={{ left: `${pct}%`, transform: 'translateX(-1px)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full bg-bg border border-ivory/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e2e2e4" strokeWidth={2}>
                <path d="M8 6L2 12L8 18" />
                <path d="M16 6L22 12L16 18" />
              </svg>
            </div>
          </div>
          <div className="absolute top-4 left-4 font-mono text-[11px] tracking-widest bg-bg/60 px-3 py-1.5 rounded-full backdrop-blur">RAW</div>
          <div className="absolute top-4 right-4 font-mono text-[11px] tracking-widest bg-bg/60 px-3 py-1.5 rounded-full backdrop-blur">GRADED</div>
        </div>
      </Reveal>
    </section>
  );
}
