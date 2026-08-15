import Hero from '@/components/Hero';
import WhoIAm from '@/components/WhoIAm';
import FeaturedWork from '@/components/FeaturedWork';
import Process from '@/components/Process';
import BeforeAfter from '@/components/BeforeAfter';
import Services from '@/components/Services';
import Toolset from '@/components/Toolset';
import Skillset from '@/components/Skillset';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import NavOverlay from '@/components/NavOverlay';

export default function Home() {
  return (
    <>
      <NavOverlay />
      <main id="top">
        <Hero />
        <WhoIAm />
        <Skillset />
        <FeaturedWork />
        <Process />
        <BeforeAfter />
        <Services />
        <Toolset />
        <Results />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
