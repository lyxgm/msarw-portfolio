'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function formatTC(frame: number) {
  const f = frame % 24;
  const s = Math.floor(frame / 24) % 60;
  const m = Math.floor(frame / 1440);
  return `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
}

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const interval = setInterval(() => {
      setFrame((f) => {
        const next = f + 3;
        return next > 60 ? f : next;
      });
    }, 40);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setVisible(false);
      document.body.style.overflow = '';
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-bg flex items-center justify-center flex-col"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <div className="relative w-[120px] h-[120px] rounded-full border border-ivory/20 flex items-center justify-center mb-8">
            <div className="absolute inset-[14px] rounded-full border border-ember2/50" />
          </div>
          <div className="font-mono text-xs tracking-[0.3em] text-mute mb-2">LOADING SEQUENCE</div>
          <div className="font-mono text-2xl text-ivory">{formatTC(frame)}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
