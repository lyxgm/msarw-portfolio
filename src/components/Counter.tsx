'use client';

import { useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export default function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);
  const started = useRef(false);

  if (isInView && !started.current && ref.current) {
    started.current = true;
    animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
  }

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
