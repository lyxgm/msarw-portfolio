'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { processSteps } from '@/lib/content';

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 70%'],
  });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="px-6 md:px-10 py-28 md:py-40 max-w-5xl mx-auto">
      <Reveal className="section-eyebrow mb-6">HOW A PROJECT MOVES</Reveal>
      <Reveal>
        <h2 className="font-display font-medium text-4xl md:text-6xl mb-20">From Brief to Broadcast.</h2>
      </Reveal>

      <div ref={ref} className="relative pl-10 md:pl-16">
        <div className="absolute left-[3px] md:left-[7px] top-2 bottom-2 w-px bg-line">
          <motion.div className="absolute top-0 left-0 w-full bg-ember2" style={{ height }} />
        </div>

        {processSteps.map((step, i) => (
          <Reveal key={step.step} className={`relative ${i === processSteps.length - 1 ? '' : 'pb-16'}`}>
            <div className="absolute -left-10 md:-left-16 top-1 w-2 h-2 rounded-full bg-ember2" />
            <div className="font-mono text-xs text-ember2 mb-2">
              {step.step} / {step.label.toUpperCase()}
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-2">{step.title}</h3>
            <p className="text-mute text-sm max-w-lg">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
