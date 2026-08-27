import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afyamax.co.ke"),
  title: {
    default: "Afyamax Medical & Dental Centre — Afya Uhai: Health is Wealth",
    template: "%s · Afyamax Medical & Dental Centre",
  },
  description:
    "KMPDC-registered private clinic in Zimmerman, Nairobi offering general outpatient care, dentistry, minor surgery, physiotherapy and organic phytotherapy. Book online, walk in, or tap to call — emergency triage line open 24/7.",
  keywords: [
    "Afyamax",
    "clinic Zimmerman",
    "medical centre Nairobi",
    "dental clinic Kasarani",
    "physiotherapy Nairobi",
    "herbal medicine Kenya",
    "SHA NHIF clinic",
    "Kamiti Road clinic",
  ],
  openGraph: {
    title: "Afyamax Medical & Dental Centre",
    description:
      "Compassionate, accessible healthcare on Kamiti Road, Zimmerman — general medicine, dental, minor surgery, physiotherapy and organic phytotherapy under one roof.",
    url: "https://afyamax.co.ke",
    siteName: "Afyamax Medical & Dental Centre",
    locale: "en_KE",
    type: "website",
    images: [{ url: "/images/hero-doctor.png", width: 864, height: 1152, alt: "Afyamax clinician" }],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0c3b2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${jakarta.variable} antialiased bg-cream text-ink`}>
        {children}
        <Toaster position="top-center" richColors toastOptions={{ style: { fontFamily: "var(--font-jakarta)" } }} />
      </body>
    </html>
  );
}
