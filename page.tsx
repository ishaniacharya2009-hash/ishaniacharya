import { MotionProvider } from "@/components/ui/MotionProvider";
import { CaseStudyProvider } from "@/components/CaseStudyProvider";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Archive } from "@/components/Archive";
import { OnAir } from "@/components/OnAir";
import { Journey } from "@/components/Journey";
import { Skills } from "@/components/Skills";
import { Beyond } from "@/components/Beyond";
import { Journal } from "@/components/Journal";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * The page, in six parts:
 *   1. Hero                      4. Skills with evidence (+ Education)
 *   2. Experience Archive        5. Beyond Work
 *      (+ the podcast band)      6. Contact
 *   3. Journey
 * Case studies open full-screen from anywhere via CaseStudyProvider.
 * The Journal renders nothing until an article is published.
 */
export default function Home() {
  return (
    <MotionProvider>
      <CaseStudyProvider>
        <Nav />
        <main id="main">
          <Hero />
          <Archive />
          <OnAir />
          <Journey />
          <Skills />
          <Beyond />
          <Journal />
          <Contact />
        </main>
        <Footer />
      </CaseStudyProvider>
    </MotionProvider>
  );
}
