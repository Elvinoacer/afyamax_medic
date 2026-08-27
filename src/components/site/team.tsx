import Image from "next/image";
import { Award } from "lucide-react";
import { TEAM } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Team() {
  return (
    <section id="team" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The people behind the care"
              title={
                <>
                  Led by research, <em className="text-leaf italic">delivered with warmth</em>
                </>
              }
              lead="Executive direction sits with our founder, while a multidisciplinary clinical and technical team keeps the front desk, triage, theatre and pharmacy running safely every day."
            />

            {/* CEO card */}
            <Reveal delay={0.08} className="mt-8">
              <article className="flex flex-col gap-5 rounded-[1.8rem] border border-line bg-white/80 p-6 shadow-soft sm:flex-row sm:items-center">
                <div className="relative mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-3xl sm:mx-0 sm:h-36 sm:w-36">
                  <Image
                    src={TEAM.ceo.image}
                    alt={`Portrait of ${TEAM.ceo.name}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-deep">
                    <Award className="h-4 w-4" aria-hidden /> Leadership
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl font-semibold text-forest">{TEAM.ceo.name}</h3>
                  <p className="text-sm font-bold italic text-leaf">{TEAM.ceo.alias}</p>
                  <p className="mt-1 text-[13px] font-semibold text-ink-soft">{TEAM.ceo.role}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{TEAM.ceo.bio}</p>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Advisory */}
          <div>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[1.8rem] shadow-lift">
                <Image
                  src="/images/team.png"
                  alt="The Afyamax clinical team — doctors, nurses and dentists"
                  width={1344}
                  height={768}
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <h3 className="font-display text-xl font-semibold text-forest">Clinical advisory & care team</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{TEAM.advisoryNote}</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {TEAM.advisory.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2.5 rounded-full border border-line bg-white/80 py-2 pl-2 pr-5 shadow-soft"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest font-display text-sm font-semibold text-gold">
                      {name[0]}
                    </span>
                    <span className="text-sm font-bold text-forest">{name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
