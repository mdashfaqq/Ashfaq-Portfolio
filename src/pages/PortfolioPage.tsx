import { lazy, Suspense } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({
    default: m.Projects,
  }))
);

const Experience = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({
    default: m.Experience,
  }))
);

const About = lazy(() =>
  import("@/components/sections/About").then((m) => ({
    default: m.About,
  }))
);

const Certifications = lazy(() =>
  import("@/components/sections/Certifications").then((m) => ({
    default: m.Certifications,
  }))
);

const Services = lazy(() =>
  import("@/components/sections/Services").then((m) => ({
    default: m.Services,
  }))
);

const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({
    default: m.Contact,
  }))
);

export function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-[#09090b]">
      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={null}>
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
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}