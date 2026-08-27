import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { CONTACT, DEPARTMENTS, NAV_LINKS } from "@/lib/data";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-forest-deep text-cream/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-11 w-11" />
              <div className="leading-tight">
                <p className="font-display text-xl font-semibold text-cream">Afyamax</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60">Medical &amp; Dental Centre</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
              “Afya Uhai — Health is Wealth”. Accessible, holistic primary care for Zimmerman, Githurai,
              Roysambu and beyond — combining conventional medicine with responsible organic phytotherapy.
            </p>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-cream/55">
              <ShieldCheck className="h-4 w-4 text-gold" aria-hidden />
              KMPDC registered · ODPC data-controller compliant
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#book" className="font-bold text-gold transition-colors hover:text-gold-soft">
                  Book appointment
                </a>
              </li>
            </ul>
          </nav>

          {/* Departments */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Departments</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {DEPARTMENTS.map((d) => (
                <li key={d.key}>
                  <a href="#departments" className="transition-colors hover:text-gold">
                    {d.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                Kamiti Road, next to Success Stage, behind Abundant Worship Center — Zimmerman, Nairobi 00609
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                <span>
                  <a href={`tel:${CONTACT.emergencyPhone}`} className="font-bold text-cream hover:text-gold">
                    {CONTACT.emergencyPhoneDisplay}
                  </a>{" "}
                  <span className="text-cream/50">· emergency, 24/7</span>
                  <br />
                  {CONTACT.mainPhoneDisplay} · {CONTACT.receptionDisplay}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                Mon–Fri 8:00 AM – 6:00 PM · Sat to 5:00 PM · weekend duty cover
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-7 text-xs text-cream/50 sm:flex-row">
          <p>© {year} Afyamax Medical &amp; Dental Centre. All rights reserved.</p>
          <p>
            Health data handled as sensitive personal data under the Kenya Data Protection Act, 2019 ·
            Nairobi · Meru
          </p>
        </div>
      </div>
    </footer>
  );
}
