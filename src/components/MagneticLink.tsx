'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, MouseEvent } from 'react';

export default function MagneticLink({
  href,
  children,
  className,
  onClick,
  as = 'a',
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  as?: 'a' | 'button';
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12 });
  const sy = useSpring(y, { stiffness: 150, damping: 12 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedProps = {
    onClick,
    'data-hover': true,
    className,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  } as const;

  if (as === 'button') {
    return (
      <motion.button type="submit" {...sharedProps}>
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a href={href} {...sharedProps}>
      {children}
    </motion.a>
  );
}
