/**
 * Afyamax Medical & Dental Centre — site content
 * All facts sourced from research.md (institutional & clinical analysis).
 */

export const CONTACT = {
  emergencyPhoneDisplay: "+254 762 280 670",
  emergencyPhone: "+254762280670",
  mainPhoneDisplay: "+254 794 401 528",
  mainPhone: "+254794401528",
  receptionDisplay: "+254 745 044 729",
  reception: "+254745044729",
  cbdDisplay: "+254 780 170 953",
  cbd: "+254780170953",
  cbdAltDisplay: "+254 720 991 992",
  cbdAlt: "+254720991992",
  umojaDisplay: "+254 740 750 605",
  umoja: "+254740750605",
  email: "info@afyamax.co.ke",
  whatsapp: "254762280670",
  address:
    "Kamiti Road, off Thika Superhighway, next to Success Stage, behind Abundant Worship Center — Zimmerman, Nairobi 00609",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "#departments", label: "Departments" },
  { href: "#phyto", label: "Natural Care" },
  { href: "#visit", label: "Your Visit" },
  { href: "#about", label: "About" },
  { href: "#locations", label: "Locations" },
  { href: "#faq", label: "FAQ" },
] as const;

/* ── Departments ─────────────────────────────────────────── */

export type DeptKey = "gp" | "dental" | "surgery" | "physio" | "phyto";

export interface Department {
  key: DeptKey;
  name: string;
  short: string;
  tagline: string;
  description: string;
  services: string[];
  image: string;
}

export const DEPARTMENTS: Department[] = [
  {
    key: "gp",
    name: "General Outpatient & Primary Care",
    short: "General Practice",
    tagline: "Your first point of care, every time",
    description:
      "From acute fevers to long-term chronic conditions, our clinical officers deliver thorough consultations, laboratory diagnostics and continuous treatment plans for every member of the family.",
    services: [
      "Outpatient consultations & routine check-ups",
      "Diagnostic blood work & disease screening",
      "Chronic care — 'pressure' & 'sukari' management",
      "Infectious disease treatment",
      "Referrals & specialist coordination",
    ],
    image: "/images/dept-gp.png",
  },
  {
    key: "dental",
    name: "Dental Care Department",
    short: "Dental Care",
    tagline: "Confident, healthy smiles",
    description:
      "Preventive, restorative and surgical oral health under strict infection-control protocols — from routine scaling to acute dental pain relief, for children and adults alike.",
    services: [
      "Comprehensive oral examinations",
      "Scaling & polishing",
      "Composite fillings & root canal therapy",
      "Tooth extractions",
      "Pediatric dental consultations",
      "Emergency dental pain & facial trauma",
    ],
    image: "/images/dept-dental.png",
  },
  {
    key: "surgery",
    name: "Minor Surgery & Circumcision Centre",
    short: "Minor Surgery",
    tagline: "Safe, sterile, same-day procedures",
    description:
      "A dedicated outpatient procedure centre focused on elective male circumcision for all ages, lesion excisions and wound care — with full pre- and post-operative support.",
    services: [
      "Elective male circumcision (children, adolescents & adults)",
      "Lesion & cyst excisions",
      "Post-operative wound care & dressing changes",
      "Suture monitoring",
      "Infection prevention & follow-up",
    ],
    image: "/images/dept-surgery.png",
  },
  {
    key: "physio",
    name: "Physiotherapy & Physical Rehabilitation",
    short: "Physiotherapy",
    tagline: "Strength restored, step by step",
    description:
      "Hands-on rehabilitation for stroke recovery, joint injuries and chronic arthritis — in our therapy suite or in the comfort of your home through structured house-call visits.",
    services: [
      "Stroke (CVA) rehabilitation",
      "Joint mobilization & manual therapy",
      "'Rumatizim' & arthritis management",
      "Neuromuscular re-education",
      "Nerve compression therapy",
      "Home-based physiotherapy house calls",
    ],
    image: "/images/dept-physio.png",
  },
  {
    key: "phyto",
    name: "Organic Phytomedicine — Afya Uhai Division",
    short: "Phytotherapy",
    tagline: "Nature and science, together",
    description:
      "Our research division formulates, tests and dispenses organic botanical treatments that complement conventional care — developed in-house under the Afya Uhai Health Care Center identity.",
    services: [
      "AFYA 1 organic cardiovascular support",
      "B-17 immune & supportive oncology care",
      "S2 organic ocular solution",
      "Male reproductive health formulations",
      "Systemic herbal regimens & lifestyle coaching",
    ],
    image: "/images/dept-phyto.png",
  },
];

/* ── Opening hours (minutes from midnight, Mon → Sun) ─────── */

export type DayWindow =
  | { kind: "open"; open: number; close: number; note?: string }
  | { kind: "on-call"; label: string }
  | { kind: "emergency-only" }
  | { kind: "house-calls" }
  | { kind: "closed"; label?: string };

const T = (h: number, m = 0) => h * 60 + m;

export const DEPT_HOURS: Record<DeptKey, DayWindow[]> = {
  gp: [
    { kind: "open", open: T(8), close: T(18) },
    { kind: "open", open: T(8), close: T(18) },
    { kind: "open", open: T(8), close: T(18) },
    { kind: "open", open: T(8), close: T(18) },
    { kind: "open", open: T(8), close: T(18) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(9), close: T(17), note: "Weekend duty cover" },
  ],
  dental: [
    { kind: "open", open: T(8, 30), close: T(17) },
    { kind: "open", open: T(8, 30), close: T(17) },
    { kind: "open", open: T(8, 30), close: T(17) },
    { kind: "open", open: T(8, 30), close: T(17) },
    { kind: "open", open: T(8, 30), close: T(17) },
    { kind: "open", open: T(9), close: T(16) },
    { kind: "emergency-only" },
  ],
  surgery: [
    { kind: "open", open: T(8), close: T(17), note: "By appointment" },
    { kind: "open", open: T(8), close: T(17), note: "By appointment" },
    { kind: "open", open: T(8), close: T(17), note: "By appointment" },
    { kind: "open", open: T(8), close: T(17), note: "By appointment" },
    { kind: "open", open: T(8), close: T(17), note: "By appointment" },
    { kind: "open", open: T(8), close: T(14), note: "By appointment" },
    { kind: "closed", label: "Closed · triage line open" },
  ],
  physio: [
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(16) },
    { kind: "house-calls" },
  ],
  phyto: [
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(17) },
    { kind: "open", open: T(8), close: T(16) },
    { kind: "closed", label: "Closed · special booking only" },
  ],
};

export const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function fmtRange(open: number, close: number) {
  const f = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}${m ? `:${String(m).padStart(2, "0")}` : ""} ${ampm}`;
  };
  return `${f(open)} – ${f(close)}`;
}

/* ── Booking options ─────────────────────────────────────── */

export const TIME_WINDOWS = [
  { value: "morning", label: "Morning", hint: "08:00 – 11:00" },
  { value: "midday", label: "Midday", hint: "11:00 – 14:00" },
  { value: "afternoon", label: "Afternoon", hint: "14:00 – 18:00" },
] as const;

export const PAYMENT_METHODS = [
  { value: "sha", label: "SHA / NHIF card" },
  { value: "insurance", label: "Private insurance" },
  { value: "cash", label: "Cash (direct pay)" },
  { value: "mpesa", label: "M-Pesa" },
  { value: "corporate", label: "Corporate billing" },
] as const;

export const ESTATES = [
  "Zimmerman",
  "Githurai 44",
  "Githurai 45",
  "Roysambu",
  "Kahawa West",
  "Kasarani",
  "Nairobi CBD",
  "Kiambu",
  "Meru",
  "Other",
] as const;

/* ── Symptom translator (health-literacy glossary) ────────── */

export interface GlossaryEntry {
  local: string;
  clinical: string;
  plain: string;
  dept: DeptKey;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    local: "Pressure",
    clinical: "Essential Hypertension",
    plain: "Blood pushing too hard against your vessels, straining the heart over time.",
    dept: "gp",
  },
  {
    local: "Sukari",
    clinical: "Diabetes Mellitus",
    plain: "Too much sugar circulating in the blood — needs steady monitoring and care.",
    dept: "gp",
  },
  {
    local: "Kuumwa na viungo",
    clinical: "Osteoarthritis / Rheumatoid Arthritis",
    plain: "Wear, stiffness and inflammation in the joints — worse in the morning or cold.",
    dept: "physio",
  },
  {
    local: "Kushikana kifua",
    clinical: "Asthma / Pulmonary Fibrosis",
    plain: "Chest tightness that makes breathing hard — including old scars on the lungs.",
    dept: "phyto",
  },
  {
    local: "Macho kuwasha",
    clinical: "Eye Strain / Conjunctivitis",
    plain: "Itchy, red, burning eyes that keep tearing and irritating you.",
    dept: "phyto",
  },
  {
    local: "Nguvu za kiume",
    clinical: "Male Reproductive Dysfunction",
    plain: "Low sperm count or poor stamina — a common, treatable men's health issue.",
    dept: "phyto",
  },
  {
    local: "Kutahiri",
    clinical: "Male Circumcision",
    plain: "A safe, hygienic minor procedure done under sterile conditions at any age.",
    dept: "surgery",
  },
];

/* ── Phytotherapy products ───────────────────────────────── */

export const PRODUCTS = [
  {
    name: "AFYA 1 Organic Medicine",
    focus: "Hypertension & heart health",
    description:
      "A specialized botanical formulation that helps lower elevated blood pressure, enhance vascular tone and support long-term cardiovascular health.",
  },
  {
    name: "B-17 AFYAMAX Formulation",
    focus: "Immune & supportive oncology care",
    description:
      "A botanical preparation administered as supportive immunotherapy, designed to assist in oncology support protocols alongside conventional treatment.",
  },
  {
    name: "AFYAMAX S2 Ocular Solution",
    focus: "Eye strain & irritation",
    description:
      "An organic ophthalmic preparation that relieves persistent burning, itching and inflammatory irritation from screen strain and conjunctivitis.",
  },
  {
    name: "Male Reproductive Formulations",
    focus: "Fertility & vitality",
    description:
      "Botanical remedies that support sperm count and motility, hormonal balance and overall male reproductive wellness — discreetly and professionally managed.",
  },
  {
    name: "Systemic Phytotherapeutic Regimens",
    focus: "Whole-body restoration",
    description:
      "Targeted organic compounds that oxygenate the blood, help dissolve pulmonary scarring, calm joint inflammation, stabilize blood sugar and treat chronic skin conditions.",
  },
];

/* ── Patient journey & visit preparation ─────────────────── */

export const JOURNEY = [
  {
    step: "01",
    title: "Reach out",
    text: "Book online in under two minutes, send us a WhatsApp, or walk in. In an emergency, skip every form and tap to call — a triage nurse answers.",
  },
  {
    step: "02",
    title: "Confirm & prepare",
    text: "Our front desk confirms your slot by SMS or WhatsApp, tells you what to bring, and flags any preparation — like fasting for lab work.",
  },
  {
    step: "03",
    title: "Visit & get answers",
    text: "Arrive to a short queue, friendly triage, and clinicians who explain everything in plain language — English, Kiswahili ama Sheng.",
  },
  {
    step: "04",
    title: "Follow-up that follows you",
    text: "Chronic care reviews, medication reminders, physio house calls — we stay with you until you are well, then keep you well.",
  },
];

export const PREP: { dept: DeptKey; title: string; items: string[] }[] = [
  {
    dept: "gp",
    title: "General outpatient consult",
    items: ["Bring your National ID and SHA/NHIF card if you have one", "Carry all current prescription medicines", "Bring any previous laboratory records"],
  },
  {
    dept: "gp",
    title: "Laboratory diagnostics",
    items: ["Bring your clinician's lab requisition order", "Fast for 8–12 hours for blood sugar & lipid profiles", "Drink plain water unless told otherwise"],
  },
  {
    dept: "surgery",
    title: "Minor surgery / circumcision",
    items: ["Bring ID (guardian ID for minors) — consent forms are signed on arrival", "Fast for 4–6 hours before the procedure", "Wash the surgical site with antibacterial soap"],
  },
  {
    dept: "physio",
    title: "Physiotherapy session",
    items: ["Bring a referral letter and any X-rays or scans you have", "Wear loose, comfortable clothing", "Keep well hydrated before and after"],
  },
  {
    dept: "phyto",
    title: "Alternative medicine intake",
    items: ["Fill the comprehensive medical history sheet", "Disclose every conventional medicine & supplement you take", "Come with your questions — literacy in your own words is welcome"],
  },
];

/* ── Stats, team, branches, partners ─────────────────────── */

export const STATS = [
  { value: 5, suffix: "", label: "Clinical departments under one roof" },
  { value: 4, suffix: "", label: "Branches serving Nairobi & Meru" },
  { value: 24, suffix: "/7", label: "Emergency triage line, always on" },
  { value: 8, suffix: "+", label: "Institutions reached through health camps" },
];

export const TRUST_ITEMS = [
  "KMPDC Registered Facility",
  "SHA / NHIF Accredited",
  "M-Pesa Accepted",
  "General Practice",
  "Dental Care",
  "Minor Surgery",
  "Physiotherapy & Rehab",
  "Organic Phytomedicine",
  "Community Health Camps",
  "Home Physio House Calls",
];

export const TEAM = {
  ceo: {
    name: "Mr. Joseph Nduma",
    alias: "“Mr. Afyamax”",
    role: "Chief Executive Officer · Head of Innovations & Research",
    bio: "Directs institutional strategy and leads the Afya Uhai phytotherapeutic research programme, pairing conventional primary care with responsible botanical innovation.",
    image: "/images/ceo-portrait.png",
  },
  advisory: ["Aquinas", "Catherine", "Christine", "Juliet", "Silvia", "Judy", "Korir"],
  advisoryNote:
    "Our clinical advisory and technical team oversees outpatient triage, nursing care, dental assisting, physiotherapy, pharmacy dispensing and community outreach — operating under KMPDC general practice governance standards.",
};

export const BRANCHES = [
  {
    name: "Zimmerman — Main Clinical Hub",
    address: "Kamiti Road, next to Success Stage, behind Abundant Worship Center, Zimmerman",
    phones: [CONTACT.mainPhoneDisplay, CONTACT.receptionDisplay],
    tags: ["General practice", "Dental", "Minor surgery", "Physiotherapy", "Phytotherapy"],
    main: true,
  },
  {
    name: "Nairobi CBD Office",
    address: "Pioneer House, Kenyatta Avenue, Room 110",
    phones: [CONTACT.receptionDisplay, CONTACT.cbdDisplay],
    tags: ["Consultations", "Product dispensing"],
    main: false,
  },
  {
    name: "Umoja / Embakasi Office",
    address: "Umoja Estate, Embakasi Constituency",
    phones: [CONTACT.umojaDisplay],
    tags: ["Consultations"],
    main: false,
  },
  {
    name: "Meru County Branch Clinic",
    address: "Ntima East, Imenti North, Meru County",
    phones: [CONTACT.mainPhoneDisplay],
    tags: ["Outreach clinic"],
    main: false,
  },
];

export const PARTNERS = {
  gov: [
    "Ministry of Agriculture & Livestock Development",
    "Ministry of Interior & National Administration",
    "Kenya Prisons Service",
    "National Water Authority",
    "Ministry of Lands",
  ],
  faith: [
    "Ebulbul Catholic Parish — Ngong",
    "Don Bosco Upper Hill",
    "Resurrection Garden — Karen",
    "Holy Trinity — Kileleshwa",
    "St. Francis Xavier — Parklands",
    "Catholic Diocese of Murang'a",
  ],
};

export const FAQS = [
  {
    q: "Do you accept SHA / NHIF?",
    a: "Yes. Afyamax is an accredited facility for primary care consultations, outpatient diagnostics and basic procedures under the Social Health Authority (formerly NHIF) framework. Bring your card along with your National ID to speed up registration.",
  },
  {
    q: "How do I book an appointment?",
    a: "Three ways: use the booking form on this page, send us a WhatsApp on +254 762 280 670, or simply call. You will receive a confirmation with a reference number, and a reminder before your visit. Walk-ins are always welcome too.",
  },
  {
    q: "What should I do in an emergency?",
    a: "Do not fill any online form. Tap the emergency call button to reach +254 762 280 670 — a triage nurse performs phone triage, gives pre-arrival guidance and preps the treatment bay before you arrive. Emergency triage runs on-call 24/7.",
  },
  {
    q: "Where exactly are you located?",
    a: "Along Kamiti Road, immediately off Thika Superhighway — directly adjacent to Success Stage and behind Abundant Worship Center in Zimmerman. Matatu routes 44 and 45 from the CBD drop you a one-minute walk away. Ground-level access is barrier-free for wheelchairs and elderly patients.",
  },
  {
    q: "Do you offer home visits?",
    a: "Yes — our physiotherapy department runs structured house-call consultations for patients with severe mobility limitations, post-stroke recovery and elderly care. Call or WhatsApp to schedule a home session.",
  },
  {
    q: "Can I use herbal medicine alongside my regular medication?",
    a: "Only with full disclosure. During any alternative medicine intake you must tell us every conventional drug and supplement you currently take. Our clinicians check for interactions before recommending any Afya Uhai formulation.",
  },
  {
    q: "How is my personal health data protected?",
    a: "Your health records are classified as Sensitive Personal Data under the Kenya Data Protection Act 2019. We collect data only with your explicit consent, process it under ODPC registration requirements, and never sell or share it. You may withdraw consent at any time.",
  },
  {
    q: "What payment methods do you take?",
    a: "SHA/NHIF, private insurance, transparent cash rates, M-Pesa, and electronic bank transfer for corporate wellness contracts. General outpatient consultation fees are kept deliberately affordable for the Zimmerman community.",
  },
];
