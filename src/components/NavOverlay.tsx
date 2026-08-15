'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/lib/content';

const links = [
  { href: '#work', label: 'Featured Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function NavOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function toggle() {
      setOpen((o) => !o);
    }

    document.addEventListener('nav:toggle', toggle);

    return () => {
      document.removeEventListener('nav:toggle', toggle);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blurred background */}
          <motion.div
            className="fixed inset-0 z-[140] bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Navigation panel */}
          <motion.div
            className="fixed top-0 right-0 z-[150] w-full md:w-[200px] bg-bg/10 backdrop-blur-2xl border-l border-b border-white/10 rounded-bl-3xl px-8 md:px-10 pt-28 pb-8"
            initial={{
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
            }}
            animate={{
              clipPath: 'circle(150% at calc(100% - 40px) 40px)',
            }}
            exit={{
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
            }}
            transition={{
              duration: 0.6,
              ease: [0.75, 0, 0.15, 1],
            }}
          >
            <nav className="flex flex-col gap-4">
              {links.map((l, index) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  data-hover
                  onClick={() => setOpen(false)}
                  className="font-display text-base md:text-lg hover:text-ember2 transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25 + index * 0.06,
                    duration: 0.4,
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            {/* <div className="font-mono text-[10px] text-mute mt-12 tracking-widest">
              {site.email.toUpperCase()} — {site.instagram.toUpperCase()}
            </div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}