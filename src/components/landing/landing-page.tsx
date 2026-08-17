"use client";

import { ScrollToTop } from "@/components/scroll-to-top";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingCriteria } from "@/components/landing/landing-criteria";
import { LandingDeliverables } from "@/components/landing/landing-deliverables";
import { LandingFAQ } from "@/components/landing/landing-faq";
import { Team } from "@/components/team";
import { ClientsSlider } from "@/components/clients-slider";
import { Process } from "@/components/process";
import { ForDirector } from "@/components/for-director";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { getLanding } from "@/lib/landings";

export function LandingPage({ slug }: { slug: string }) {
  const L = getLanding(slug);

  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <LandingNavbar navItems={L.nav} />
      <main>
        <LandingHero hero={L.hero} />
        <LandingServices services={L.services} />
        <LandingCriteria criteria={L.criteria} />
        <LandingDeliverables deliverables={L.deliverables} />
        <Team />
        <ClientsSlider />
        <Process />
        <ForDirector />
        <ContactForm
          source={L.source}
          heading={L.form.heading}
          lead={L.form.lead}
          benefits={L.form.benefits}
        />
        <LandingFAQ faq={L.faq} />
      </main>
      <Footer />
    </>
  );
}
