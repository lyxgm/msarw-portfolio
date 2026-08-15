import Reveal from "./Reveal";
import { testimonials } from "@/lib/content";

const looped = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 md:py-40 overflow-hidden">
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-14">
        <Reveal className="section-eyebrow mb-6">
          WHAT CLIENTS SAY
        </Reveal>

        <Reveal>
          <h2 className="font-display font-medium text-4xl md:text-6xl">
            Trusted by People
            <br />
            Who Notice Detail.
          </h2>
        </Reveal>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max animate-testimonials gap-6 px-6 md:px-10">
          {looped.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[85vw] max-w-[400px] md:w-[400px] shrink-0"
            >
              <article className="glass rounded-2xl p-5 h-full flex flex-col">

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-9 h-9 rounded-full object-cover footage"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-panel2 border border-line flex items-center justify-center text-sm font-semibold text-ivory">
                        {t.name.includes(" ")
                          ? t.name
                              .split(" ")
                              .map((word) => word[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()
                          : t.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h3 className="font-medium leading-none text-ivory">
                        {t.name.includes(" ")
                          ? t.name
                              .split(" ")
                              .map((word) => `${word[0]}.`)
                              .join(" ")
                          : `${t.name.charAt(0).toUpperCase()}***`}
                      </h3>

                      <p className="mt-1 text-xs text-mute/80">
                        <span className="text-mute/50">from </span>
                        {t.clientfrom}
                      </p>
                    </div>
                  </div>

                  <div className="pt-0.5 text-sm font-semibold">
                    <span className="text-mute">{t.rating.toFixed(1)}</span>{" "}
                    <span className="text-ember2/70">★</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[15px] md:text-base leading-7 italic text-ivory mb-4">
                  "{t.quote}"
                </blockquote>

                <div className="border-t border-ivory/5" />

                {/* Scores */}
                <div className="py-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-mute">Communication</span>
                    <span className="text-ember2/70">
                      {"★".repeat(t.scores.communication)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-mute">Quality of Delivery</span>
                    <span className="text-ember2/70">
                      {"★".repeat(t.scores.qualityOfDelivery)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-mute">Value of Delivery</span>
                    <span className="text-ember2/70">
                      {"★".repeat(t.scores.valueOfDelivery)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-ivory/5" />

                {/* What Went Well */}
                <div className="pt-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-mute mb-2">
                    CLIENT HIGHLIGHTS
                  </p>

                  <div className="flex flex-wrap gap-y-1 leading-6 text-[14px]">
                    {t.whatWentWell.map((item, index) => (
                      <span key={item}
                            className="whitespace-nowrap">
                        {item}
                        {index !== t.whatWentWell.length - 1 && (
                          <span className="mx-2 text-ivory/30">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}