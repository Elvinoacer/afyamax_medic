import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustMarquee } from "@/components/site/trust-marquee";
import { Departments } from "@/components/site/departments";
import { Glossary } from "@/components/site/glossary";
import { Phyto } from "@/components/site/phyto";
import { Journey } from "@/components/site/journey";
import { About } from "@/components/site/about";
import { Booking } from "@/components/site/booking";
import { Payments } from "@/components/site/payments";
import { Team } from "@/components/site/team";
import { Outreach } from "@/components/site/outreach";
import { Locations } from "@/components/site/locations";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { EmergencyBand } from "@/components/site/emergency-band";
import { Footer } from "@/components/site/footer";
import { MobileDock } from "@/components/site/mobile-dock";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col pb-[76px] lg:pb-0">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustMarquee />
        <Departments />
        <Glossary />
        <Journey />
        <Phyto />
        <About />
        <Booking />
        <Payments />
        <Team />
        <Outreach />
        <Locations />
        <Faq />
        <Contact />
        <EmergencyBand />
      </main>
      <Footer />
      <MobileDock />
    </div>
  );
}
