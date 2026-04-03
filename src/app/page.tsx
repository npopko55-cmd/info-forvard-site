import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { SystemApproach } from "@/components/system-approach";
import { Team } from "@/components/team";
import { ForDirector } from "@/components/for-director";
import { FAQ } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { ClientsSlider } from "@/components/clients-slider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <SystemApproach />
        <Team />
        <ClientsSlider />
        <ForDirector />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
