"use client";

import { Bus, Clock, MapPin, Navigation, Phone, Accessibility } from "lucide-react";
import { CONTACT, DAY_NAMES, DEPARTMENTS, DEPT_HOURS, fmtRange, type DayWindow } from "@/lib/data";
import { getDeptStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

function windowCell(w: DayWindow) {
  switch (w.kind) {
    case "open":
      return <span className="text-ink-soft">{fmtRange(w.open, w.close)}</span>;
    case "emergency-only":
      return <span className="font-semibold text-ember">Emergency only</span>;
    case "house-calls":
      return <span className="font-semibold text-gold-deep">House calls</span>;
    case "on-call":
      return <span className="font-semibold text-gold-deep">On call</span>;
    default:
      return <span className="font-semibold text-ink-soft/70">{w.label ?? "Closed"}</span>;
  }
}

export function Locations() {
  const todayIdx = getDeptStatus("gp").dayIndex;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Kamiti Road, Zimmerman, Nairobi")}`;

  return (
    <section id="locations" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Find us"
          title={
            <>
              On Kamiti Road, <em className="text-leaf italic">one minute from Success Stage</em>
            </>
          }
          lead="Our main clinical hub sits in the Zimmerman transit corridor, with consultation offices in the CBD, Umoja and Meru."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Main branch */}
          <Reveal>
            <article className="flex h-full flex-col rounded-[1.8rem] bg-forest p-7 text-cream shadow-lift sm:p-9">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-xs font-bold text-gold">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> Main clinical hub
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">Afyamax — Zimmerman</h3>
              <p className="mt-2.5 max-w-md leading-relaxed text-cream/80">{CONTACT.address}</p>

              <div className="mt-6 space-y-3 text-sm">
                <p className="flex items-start gap-3 text-cream/85">
                  <Bus className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" aria-hidden />
                  Matatu 44 or 45 from the CBD, Ngara or Kasarani — alight at Success or Base Stage and walk in.
                </p>
                <p className="flex items-start gap-3 text-cream/85">
                  <Accessibility className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" aria-hidden />
                  Ground-level, barrier-free access for wheelchairs, elderly patients and emergency arrivals, with street-level drop-off.
                </p>
                <p className="flex items-start gap-3 text-cream/85">
                  <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" aria-hidden />
                  {CONTACT.mainPhoneDisplay} · {CONTACT.receptionDisplay}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-gold-deep hover:text-white"
                >
                  <Navigation className="h-4 w-4" aria-hidden /> Get directions
                </a>
                <a
                  href={`tel:${CONTACT.emergencyPhone}`}
                  className="flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 font-bold text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <Phone className="h-4 w-4" aria-hidden /> Call the hub
                </a>
              </div>
            </article>
          </Reveal>

          {/* Other branches */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { name: "Nairobi CBD Office", address: "Pioneer House, Kenyatta Avenue, Room 110", phones: [CONTACT.receptionDisplay, CONTACT.cbdDisplay], tags: "Consultations · dispensing" },
              { name: "Umoja / Embakasi Office", address: "Umoja Estate, Embakasi Constituency", phones: [CONTACT.umojaDisplay], tags: "Consultations" },
              { name: "Meru County Branch Clinic", address: "Ntima East, Imenti North, Meru County", phones: [CONTACT.mainPhoneDisplay], tags: "Outreach clinic" },
            ].map((b, i) => (
              <Reveal key={b.name} delay={i * 0.07}>
                <article className="h-full rounded-3xl border border-line bg-white/80 p-6 transition-all hover:-translate-y-0.5 hover:border-leaf/40 hover:shadow-lift">
                  <h3 className="font-display text-lg font-semibold text-forest">{b.name}</h3>
                  <p className="mt-1.5 flex items-start gap-2 text-sm text-ink-soft">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
                    {b.address}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-forest">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                    {b.phones.join(" · ")}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">{b.tags}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Weekly hours */}
        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-[1.8rem] border border-line bg-white shadow-soft">
            <div className="flex items-center gap-2.5 border-b border-line bg-linen/70 px-6 py-4">
              <Clock className="h-4.5 w-4.5 text-forest" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-forest">Opening hours — all departments</h3>
              <span className="ml-auto hidden items-center gap-1.5 text-xs font-bold text-ink-soft sm:flex">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" aria-hidden /> today
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="bg-white text-left">
                    <th scope="col" className="sticky left-0 bg-white px-6 py-3.5 font-bold text-forest">Department</th>
                    {DAY_NAMES.map((d, i) => (
                      <th
                        key={d}
                        scope="col"
                        className={cn("px-4 py-3.5 font-bold", i === todayIdx ? "bg-gold-soft/60 text-forest" : "text-ink-soft")}
                      >
                        {d.slice(0, 3)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEPARTMENTS.map((dept) => {
                    const st = getDeptStatus(dept.key);
                    return (
                      <tr key={dept.key} className="border-t border-line/70">
                        <th scope="row" className="sticky left-0 bg-white px-6 py-3.5 text-left font-bold text-forest">
                          {dept.short}
                          {st.isOpen && (
                            <span className="ml-2.5 inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-pine">
                              <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden /> open
                            </span>
                          )}
                        </th>
                        {DEPT_HOURS[dept.key].map((w, i) => (
                          <td
                            key={i}
                            className={cn("px-4 py-3.5 text-[13px] whitespace-nowrap", i === todayIdx ? "bg-gold-soft/60 font-semibold text-forest" : "text-ink-soft")}
                          >
                            {windowCell(w)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr className="border-t border-line/70 bg-linen/50">
                    <th scope="row" className="sticky left-0 bg-linen/50 px-6 py-3.5 text-left font-bold text-forest">
                      Emergency triage line
                    </th>
                    {DAY_NAMES.map((d) => (
                      <td key={d} className="px-4 py-3.5 text-[13px] font-bold whitespace-nowrap text-leaf">
                        On call · 24/7
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
