export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Afyamax heart-leaf logo" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="15" fill="#0c3b2e" />
      <path
        d="M32 51.5 C 17.5 41.5 9.5 33 9.5 22.8 C 9.5 15.4 15 11 21.2 11 C 25.9 11 30 13.7 32 17.9 C 34 13.7 38.1 11 42.8 11 C 49 11 54.5 15.4 54.5 22.8 C 54.5 33 46.5 41.5 32 51.5 Z"
        fill="#1a9d72"
      />
      <path d="M32 21 C 32 30 32 39 32 49" stroke="#faf6ef" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path
        d="M32 29.5 C 28.4 27.8 25.6 24.9 24.6 21.2 M32 36.5 C 35.6 34.8 38.4 31.9 39.4 28.2"
        stroke="#d9a441"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="17.4" r="2.4" fill="#d9a441" />
    </svg>
  );
}

export function LogoWord({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span className="block font-display text-lg font-semibold tracking-tight text-forest">
          Afyamax
        </span>
        {!compact && (
          <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
            Medical &amp; Dental Centre
          </span>
        )}
      </span>
    </span>
  );
}
