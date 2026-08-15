import Image from 'next/image';
import Reveal from './Reveal';
import { site } from '@/lib/content';

export default function WhoIAm() {
  return (
    <section className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
      <Reveal className="section-eyebrow mb-6">BEHIND THE CUT</Reveal>
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
        <div className="md:col-span-4 order-2 md:order-1">
          <Reveal>
            <div className="footage rounded-2xl overflow-hidden aspect-[4/5] relative">
              <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-mute text-sm leading-relaxed">{site.bio}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 order-1 md:order-2">
          <Reveal>
            <h2 className="font-display font-medium text-4xl md:text-6xl leading-[1.05]">
              I turn ordinary footage into <span className="text-ember2">unforgettable</span> stories.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
