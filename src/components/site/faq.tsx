import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { FAQS, CONTACT } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Faq() {
  return (
    <section id="faq" className="relative bg-sage/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Questions, answered"
              title={
                <>
                  Everything patients <em className="text-leaf italic">ask us first</em>
                </>
              }
              lead="Insurance, booking, emergencies, data privacy — the honest answers, in one place."
            />
            <Reveal delay={0.1} className="mt-8">
              <div className="rounded-3xl border border-line bg-white/80 p-6">
                <p className="flex items-center gap-2 font-display text-lg font-semibold text-forest">
                  <MessageCircleQuestion className="h-5 w-5 text-leaf" aria-hidden />
                  Still unsure?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Ask us anything on WhatsApp — a human from the front desk replies, usually within minutes
                  during working hours.
                </p>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Afyamax, I have a question.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-full bg-leaf px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group overflow-hidden rounded-2xl border border-line bg-white/80 transition-colors open:border-leaf/40 open:shadow-soft"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4.5 font-bold text-forest [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-4.5 w-4.5 shrink-0 text-ink-soft transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
