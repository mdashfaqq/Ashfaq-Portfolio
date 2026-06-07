import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-[#09090b]">
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider max-w-7xl mx-auto" />
        <Projects />
        <div className="section-divider max-w-7xl mx-auto" />
        <Experience />
        <div className="section-divider max-w-7xl mx-auto" />
        <About />
        <div className="section-divider max-w-7xl mx-auto" />
        <Certifications />
        <div className="section-divider max-w-7xl mx-auto" />
        <Services />
        <div className="section-divider max-w-7xl mx-auto" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
