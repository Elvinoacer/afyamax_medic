import { DEPT_HOURS, type DayWindow, type DeptKey } from "@/lib/data";

export interface DeptStatus {
  status: DayWindow;
  isOpen: boolean;
  dayIndex: number; // 0 = Monday … 6 = Sunday (Nairobi)
  minutesNow: number;
}

/** Current wall time in Nairobi (EAT, UTC+3 — no DST). */
export function nairobiNow(): { dayIndex: number; minutes: number } {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const h = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const m = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
  const map: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return { dayIndex: map[weekday] ?? 0, minutes: h * 60 + m };
}

export function getDeptStatus(dept: DeptKey): DeptStatus {
  const { dayIndex, minutes } = nairobiNow();
  const win = DEPT_HOURS[dept][dayIndex];
  const isOpen = win.kind === "open" && minutes >= win.open && minutes < win.close;
  return { status: win, isOpen, dayIndex, minutesNow: minutes };
}

export function nextOpening(dept: DeptKey): string | null {
  const { dayIndex, minutes } = nairobiNow();
  const f = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}${m ? `:${String(m).padStart(2, "0")}` : ""} ${ampm}`;
  };
  for (let add = 0; add < 7; add++) {
    const idx = (dayIndex + add) % 7;
    const win = DEPT_HOURS[dept][idx];
    if (win.kind !== "open") continue;
    if (add === 0 && minutes < win.open) return `today at ${f(win.open)}`;
    if (add > 0) return `${add === 1 ? "tomorrow" : "on " + ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][idx]} at ${f(win.open)}`;
  }
  return null;
}
