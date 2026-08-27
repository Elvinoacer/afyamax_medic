import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("text-xs font-extrabold uppercase tracking-[0.22em]", dark ? "text-gold" : "text-gold-deep")}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-cream" : "text-forest"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-cream/75" : "text-ink-soft")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
