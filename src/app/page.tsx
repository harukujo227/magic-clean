import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Intro,
  ServiceHighlights,
  Transformation,
  WhyUs,
  StatsBand,
  Areas,
  CtaBanner,
} from "@/components/Sections";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AmbientMusic } from "@/components/AmbientMusic";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <div id="top">
        <Header />
        <main id="main">
          <Hero />
          <Intro />
          <ServiceHighlights />
          <Transformation />
          <WhyUs />
          <StatsBand />
          <Areas />
          <CtaBanner />
          <Contact />
        </main>
        <Footer />
        <AmbientMusic />
      </div>
    </>
  );
}
