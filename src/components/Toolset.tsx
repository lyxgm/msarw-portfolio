import Reveal from './Reveal';
import { toolset } from '@/lib/content';

export default function Toolset() {
  return (
    <section className="px-6 md:px-10 py-24 border-y border-line">
      <div className="max-w-7xl mx-auto">
        <Reveal className="section-eyebrow mb-10">THE TOOLSET</Reveal>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            {toolset.map((tool) => (
              <div
                key={tool}
                data-hover
                className="
                  relative overflow-hidden
                  px-7 py-4
                  rounded-full
                  border border-white/10

                  bg-[linear-gradient(115deg,transparent_38%,rgba(255,255,255,0.10)_50%,transparent_62%),linear-gradient(to_top_right,#020204_0%,#021e2e_55%,#003d48_92%,#1592C8_100%)]

                  backdrop-blur-xl

                  text-alabaster-grey
                  font-display text-lg

                  shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.2)]

                  transition-all duration-300
                  hover:border-white/20
                  hover:brightness-110
                "
              >
                {tool}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
