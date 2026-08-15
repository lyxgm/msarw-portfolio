'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor, built so a client never "loses" their pointer:
 * - The native OS cursor stays visible the entire time (`cursor: auto`
 *   in globals.css). We only ever ADD a decorative ring + dot on top.
 * - We hide the native cursor (via the `cursor-ready` class on <body>)
 *   only after this component has mounted AND confirmed we're on a
 *   fine-pointer (mouse) device. If JS is slow, blocked, or this is a
 *   touch device, the native arrow simply stays on screen.
 * - The ring/dot are solid, high-contrast white with a soft glow so
 *   they always read clearly against the dark background.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reduceMotion) return;

    setEnabled(true);
    document.body.classList.add('cursor-ready');

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let raf = 0;

    function handleMove(e: PointerEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top = my + 'px';
      }
    }

    function tick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      raf = requestAnimationFrame(tick);
    }

    function handleOver(e: Event) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-hover]')) {
        ringRef.current?.classList.add('hovering');
      }
    }
    function handleOut(e: Event) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-hover]')) {
        ringRef.current?.classList.remove('hovering');
      }
    }
    function handleLeaveWindow() {
      // If the pointer leaves the viewport, fall back to the native
      // cursor so it's never ambiguous where the pointer went.
      document.body.classList.remove('cursor-ready');
    }
    function handleEnterWindow() {
      document.body.classList.add('cursor-ready');
    }

    window.addEventListener('pointermove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleLeaveWindow);
    document.addEventListener('mouseenter', handleEnterWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      document.removeEventListener('mouseenter', handleEnterWindow);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-ready');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 z-[100] pointer-events-none rounded-full"
        style={{
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          border: '1.5px solid rgba(226,226,228,0.85)',
          boxShadow: '0 0 12px rgba(226,226,228,0.25)',
          transition: 'width .25s ease, height .25s ease, margin .25s ease, border-color .25s ease, background .25s ease',
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-ivory"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          boxShadow: '0 0 6px rgba(226,226,228,0.7)',
        }}
      />
      <style jsx global>{`
        .cursor-ring.hovering {
          width: 76px !important;
          height: 76px !important;
          margin-left: -38px !important;
          margin-top: -38px !important;
          background: rgba(11, 111, 234, 0.12);
          border-color: #0b6fea !important;
          box-shadow: 0 0 20px rgba(11, 111, 234, 0.35);
        }
      `}</style>
    </>
  );
}
