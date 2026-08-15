import Reveal from "./Reveal";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section
      id="services"
      className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto"
    >
      <Reveal className="section-eyebrow mb-6">
        WHAT I OFFER
      </Reveal>

      <Reveal>
        <h2 className="font-display font-medium text-4xl md:text-6xl mb-16">
          Every Format.
          <br />
          One Standard.
        </h2>
      </Reveal>

      <Reveal>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="
                glass
                rounded-2xl
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-ember/40
                hover:shadow-[0_10px_30px_rgba(11,111,234,.12)]
              "
            >
              
              <h3 className="font-display text-xl mb-2">
                {s.title}
              </h3>

              <p className="text-sm text-mute leading-6">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}