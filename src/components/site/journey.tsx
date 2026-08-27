import Image from "next/image";
import { ChevronDown, Route, ClipboardList } from "lucide-react";
import { JOURNEY, PREP } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Journey() {
  return (
    <section id="visit" className="relative bg-linen/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Your visit"
          title={
            <>
              From first contact to <em className="text-leaf italic">feeling better</em>
            </>
          }
          lead="No guesswork, no surprise queues. Here is exactly how a visit to Afyamax works — and what to bring along."
        />

        {/* Journey */}
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.step} delay={i * 0.08}>
              <li className="relative h-full rounded-3xl border border-line bg-white/80 p-6 pt-8">
                <span
                  className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-gold shadow-soft"
                  aria-hidden
                >
                  {j.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-forest">{j.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{j.text}</p>
                {i < JOURNEY.length - 1 && (
                  <span className="absolute -right-4 top-1/2 hidden h-px w-4 bg-gold lg:block" aria-hidden />
                )}
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Prep protocols */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-deep">
              <ClipboardList className="h-4 w-4" aria-hidden />
              Before you arrive
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-forest sm:text-3xl">
              Come prepared — it makes your visit faster
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              A few small preparations help our clinicians get to the bottom of things on day one. Find your
              service below and tick the list the night before. Always carry your National ID, and your
              SHA/NHIF card if you have one.
            </p>
            <div className="mt-6 overflow-hidden rounded-3xl">
              <Image
                src="/images/team.png"
                alt="The Afyamax medical team in the clinic lobby"
                width={1344}
                height={768}
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              {PREP.map((p, i) => (
                <details
                  key={p.title}
                  open={i === 0}
                  className="group overflow-hidden rounded-2xl border border-line bg-white/80 transition-colors open:border-leaf/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4.5 font-bold text-forest [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3">
                      <Route className="h-4.5 w-4.5 shrink-0 text-gold-deep" aria-hidden />
                      {p.title}
                    </span>
                    <ChevronDown className="h-4.5 w-4.5 shrink-0 text-ink-soft transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <ul className="space-y-2 px-6 pb-5 pl-[3.75rem]">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
