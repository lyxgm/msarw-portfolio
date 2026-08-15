'use client';

import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import MagneticLink from './MagneticLink';
import { site } from '@/lib/content';

const maskVariants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 1.1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-end">
      <HeroCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/40 to-bg pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/70 pointer-events-none" />

      <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-20">
        <motion.div
          className="section-eyebrow mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {site.eyebrow}
        </motion.div>

        <h1 className="font-display font-semibold leading-[0.95] text-[13vw] md:text-[7.2vw]">
          <span className="block overflow-hidden">
            <motion.span className="block" custom={0} variants={maskVariants} initial="hidden" animate="visible">
              {site.taglineLine1}
            </motion.span>
          </span>
          <span className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-ember2 to-ember22">
            <motion.span className="block" custom={1} variants={maskVariants} initial="hidden" animate="visible">
              {site.taglineLine2}
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <MagneticLink href="#work" className="px-8 py-4 bg-ember2 text-bg font-medium rounded-full text-sm tracking-wide inline-block">
            View Portfolio
          </MagneticLink>
          <MagneticLink href="#contact" className="px-8 py-4 border border-ivory/25 rounded-full text-sm tracking-wide hover:border-ivory/60 transition-colors inline-block">
            Let&rsquo;s Work Together
          </MagneticLink>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 z-10 font-mono text-xs text-mute flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ember2 animate-pulse" /> REC — SHOWREEL 2026
      </div>
    </section>
  );
}
