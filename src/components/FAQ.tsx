'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { faq } from '@/lib/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-10 py-28 md:py-40 max-w-4xl mx-auto">
      <Reveal className="section-eyebrow mb-6">COMMON QUESTIONS</Reveal>
      <Reveal>
        <h2 className="font-display font-medium text-4xl md:text-6xl mb-16">Before You Reach Out.</h2>
      </Reveal>

      <Reveal>
        <div className="divide-y divide-line border-t border-b border-line">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="py-2">
                <button
                  data-hover
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="font-display text-xl md:text-2xl pr-8">{item.question}</span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-lg transition-transform duration-400"
                    style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0 }}
                  transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-mute pb-6 pr-10 leading-relaxed">{item.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
