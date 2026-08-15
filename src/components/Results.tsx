import Reveal from './Reveal';
import Counter from './Counter';
import { site } from '@/lib/content';

export default function Results() {
  return (
    <section className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
      <Reveal className="section-eyebrow mb-16">BY THE NUMBERS</Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {site.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <div className="font-display text-5xl md:text-6xl text-ember2">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="font-mono text-xs text-mute mt-3 tracking-widest">{stat.label.toUpperCase()}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
