import { ShieldCheck } from "lucide-react";
import { TRUST_ITEMS } from "@/lib/data";

export function TrustMarquee() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <section aria-label="Facility credentials" className="border-y border-forest/10 bg-forest py-4">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-cream/90">
              <ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
