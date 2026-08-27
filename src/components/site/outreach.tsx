import Image from "next/image";
import { Building, Church } from "lucide-react";
import { PARTNERS } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Outreach() {
  return (
    <section id="outreach" className="relative bg-linen/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Beyond our walls"
              title={
                <>
                  Health camps that <em className="text-leaf italic">travel to the people</em>
                </>
              }
              lead="From ministry headquarters to parish grounds, our mobile teams deliver free screenings, preventive-health education and phytotherapeutic training across Kenya."
            />
            <Reveal delay={0.08} className="mt-8">
              <div className="overflow-hidden rounded-[1.8rem] shadow-lift">
                <Image
                  src="/images/outreach.png"
                  alt="A free Afyamax community health camp screening villagers under canopy tents"
                  width={1152}
                  height={864}
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal delay={0.06}>
              <div>
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-gold-deep">
                  <Building className="h-4 w-4" aria-hidden /> Government & institutions
                </p>
                <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
                  {PARTNERS.gov.map((p) => (
                    <li key={p} className="rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm font-semibold text-forest shadow-soft">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-gold-deep">
                  <Church className="h-4 w-4" aria-hidden /> Faith & community
                </p>
                <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
                  {PARTNERS.faith.map((p) => (
                    <li key={p} className="rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm font-semibold text-forest shadow-soft">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="rounded-2xl bg-forest p-5 text-sm leading-relaxed text-cream/85">
                Hosting a wellness day or screening camp for your institution or congregation?{" "}
                <a href={`mailto:info@afyamax.co.ke`} className="font-bold text-gold underline decoration-gold/50 underline-offset-2">
                  Write to us
                </a>{" "}
                — we will design a programme around your people.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
