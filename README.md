# Afyamax Medical & Dental Centre — Website

Official website for Afyamax Medical & Dental Centre (Zimmerman, Nairobi) — built with
Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Prisma (SQLite).

> “Afya Uhai — Health is Wealth”

## Features

- **Single-page marketing site** with sticky glass navigation, scroll-reveal motion and a
  floating mobile action dock (Call / WhatsApp / Book).
- **Departments** — General practice, dental, minor surgery & circumcision, physiotherapy,
  and the Afya Uhai organic phytomedicine division, each with imagery and live
  *Open now* status computed against Nairobi opening hours.
- **Symptom translator** — culturally grounded health-literacy section mapping local terms
  (*pressure, sukari, kuumwa na viungo…*) to clinical names, plain explanations and the
  right department.
- **Appointment booking** (`/api/appointments`) — full intake per the facility's protocol:
  patient identity, estate, department, practitioner preference, date + time window,
  payment method (SHA/NHIF, insurance, cash, M-Pesa, corporate), visit notes and an
  **explicit, unchecked-by-default consent** per the Kenya Data Protection Act 2019.
  Bookings persist to SQLite and return a reference code (e.g. `AFY-7K2M9Q`) with a
  WhatsApp confirmation deep link. Server-side validation with Zod + honeypot spam trap.
- **First-contact inquiries** (`/api/inquiries`) — general questions, product,
  corporate and feedback messages, stored with the same consent standard.
- **Locations & hours** — all four branches plus a weekly hours table per department with
  today's column highlighted and live open/closed badges (Africa/Nairobi time).
- **Emergency interception** — prominent tap-to-call triage line (+254 762 280 670) in the
  header, hero, emergency band and mobile dock; web forms explicitly never presented for
  emergencies.
- **SEO & social** — metadata, Open Graph image, theme colour, custom SVG favicon
  (heart-leaf mark), semantic landmarks and accessible labels throughout.

## Getting started

```bash
npm install        # also runs `prisma generate` (postinstall)
npx prisma db push # creates db/afyamax.db from the schema (a ready db/ is included)
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx              # fonts (Fraunces + Plus Jakarta Sans), metadata, Toaster
    page.tsx                # section composition
    globals.css             # brand theme (emerald/gold/cream), utilities (glass, dot-grid)
    icon.svg                # heart-leaf favicon
    api/appointments/route.ts   # booking intake -> SQLite (Zod validated)
    api/inquiries/route.ts      # first-contact messages -> SQLite
  components/site/          # all page sections & UI primitives
  lib/
    data.ts                 # ALL editable content: departments, hours, products, team,
                            # branches, partners, FAQs, glossary, booking options
    hours.ts                # live open/closed logic (Africa/Nairobi)
    db.ts                   # Prisma client singleton
prisma/schema.prisma        # Appointment + Inquiry models
db/afyamax.db               # SQLite database (regenerate via `npx prisma db push`)
public/images/              # AI-generated site photography (replace with real photos)
```

## Customising

- **Content** — almost every word, phone number, hour, service and FAQ lives in
  `src/lib/data.ts`. Edit there first.
- **Photography** — current images are AI-generated placeholders in `public/images/`;
  swap the files (keep the same names) with real clinic photography.
- **Brand colours** — defined once in `src/app/globals.css` under `@theme inline`
  (`--color-forest`, `--color-gold`, `--color-cream`, …).
- **Booking records** — query `db/afyamax.db` (table `Appointment`, `Inquiry`) with any
  SQLite client, e.g. `npx prisma studio`.

## Notes

- Payments referenced: SHA/NHIF, private insurance, cash, M-Pesa, corporate billing.
- Data handling follows the Kenya Data Protection Act 2019 (explicit consent, sensitive
  data classification, ODPC registration referenced in the FAQ).
- The `.git` directory ships untouched — commit the new work when ready.
