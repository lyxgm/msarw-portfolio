'use client';

import { useEffect, useRef, useState } from 'react';

function formatTC(pct: number) {
  const totalFrames = Math.floor(pct * 3600); // fake runtime @24fps
  const f = totalFrames % 24;
  const s = Math.floor(totalFrames / 24) % 60;
  const m = Math.floor(totalFrames / 1440);

  return `00:${String(m).padStart(2, '0')}:${String(s).padStart(
    2,
    '0'
  )}:${String(f).padStart(2, '0')}`;
}

export default function TimelineBar() {
  const [pct, setPct] = useState(0);
  const [dragging, setDragging] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);

  const updateFromScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    setPct(maxScroll > 0 ? scrollTop / maxScroll : 0);
  };

  const setScrollFromClientX = (clientX: number) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const progress = x / rect.width;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: progress * maxScroll,
      behavior: 'auto',
    });
  };

  useEffect(() => {
    updateFromScroll();

    window.addEventListener('scroll', updateFromScroll, {
      passive: true,
    });

    window.addEventListener('resize', updateFromScroll);

    return () => {
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, []);

  useEffect(() => {
    function move(e: MouseEvent) {
      if (!dragging) return;
      setScrollFromClientX(e.clientX);
    }

    function up() {
      setDragging(false);
    }

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [dragging]);

  const ticks = Array.from({ length: 32 });

  return (
    <div className="fixed left-0 right-0 bottom-0 z-[90] flex h-[34px] items-center gap-4 border-t border-line bg-bg/85 px-[18px] backdrop-blur-md">
      <div className="hidden font-mono text-[11px] text-mute sm:block">
        TIMELINE
      </div>

      <div
        ref={timelineRef}
        className="relative flex h-4 flex-1 items-center cursor-pointer"
        onMouseDown={(e) => {
          setDragging(true);
          setScrollFromClientX(e.clientX);
        }}
      >
        {/* Base line */}
        <div className="absolute left-0 right-0 h-px bg-ivory/10" />

        {/* Progress */}
        <div
          className="absolute left-0 top-0 bottom-0 rounded-sm"
          style={{
            width: `${pct * 100}%`,
            background:
              'linear-gradient(90deg,#021e2e,#003d48,#0b6fea,#1592C8)',
          }}
        />

        {/* Ticks */}
        <div className="absolute inset-0 flex items-center justify-between px-px">
          {ticks.map((_, i) => (
            <span
              key={i}
              className="w-px"
              style={{
                height: i % 5 === 0 ? 10 : 6,
                background:
                  i % 5 === 0
                    ? 'rgba(226,226,228,.35)'
                    : 'rgba(226,226,228,.18)',
              }}
            />
          ))}
        </div>

        {/* Playhead */}
        <div
          className={`absolute top-1/2 h-[22px] w-[2px] -translate-y-1/2 bg-ivory transition-transform ${
            dragging ? 'scale-x-150' : ''
          }`}
          style={{
            left: `${pct * 100}%`,
            transform: 'translateX(-1px) translateY(-50%)',
            boxShadow: '0 0 8px rgba(11,111,234,.9)',
          }}
        >
          <div
            className="absolute left-1/2 -top-[5px]"
            style={{
              transform: 'translateX(-50%)',
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '5px solid #e2e2e4',
            }}
          />
        </div>
      </div>

      <div className="w-[92px] text-right font-mono text-[11px] text-ivory">
        {formatTC(pct)}
      </div>
    </div>
  );
}