import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import BounceCards from "@/components/ui/BounceCards";

const desktopTransforms = [
  "rotate(-5deg) translate(-75px, 8px)",
  "rotate(0deg) translate(0px, -4px)",
  "rotate(5deg) translate(75px, 12px)",
];

const mobileTransforms = [
  "rotate(-4deg) translate(-14px, -4px)",
  "rotate(0deg) translate(0px, 0px)",
  "rotate(4deg) translate(14px, 4px)",
];

const cardsData = [
  {
    tag: "BUILD",
    title: "Idea to live URL at terminal velocity.",
    desc: "React frontends, Linux servers, zero code review drama.",
    image: "/profile.jpg",
  },
  {
    tag: "SCALE",
    title: "Built so stable your on-call can sleep.",
    desc: "High-speed POS engines that never choke on peak traffic.",
    image: "/focus.gif",
  },
  {
    tag: "SECURE",
    title: "Protecting data like the company vault.",
    desc: "Multi-tenant isolation, zero leaks, verified uptime.",
    image: "/strength.jpg",
  },
];

const skillsRow1 = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "Docker",
  "PostgreSQL",
  "Flutter",
  "Tailwind CSS",
  "Linux",
  "Supabase",
  "Express.js",
  "MySQL",
  "Git",
];

const skillsRow2 = [
  "REST API Security",
  "OWASP Top 10",
  "JWT Authentication",
  "PostgreSQL RLS",
  "RBAC Architecture",
  "CI/CD Pipelines",
  "Redis",
  "Machine Learning",
  "Scikit-learn",
  "Burp Suite",
  "Containerization",
  "Full-Stack Systems",
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformStyles = isMobile ? mobileTransforms : desktopTransforms;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-5 sm:px-8 lg:px-12 pt-14 sm:pt-16 md:pt-20 pb-8 sm:pb-12 relative overflow-hidden bg-[#09090b] text-[#f4f1ea]"
    >
      <div className="max-w-[1240px] mx-auto min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start lg:items-center">
          {/* ================= LEFT COLUMN ================= */}
          <div className="text-left min-w-0">
            {/* Tag: ABOUT */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 sm:mb-4 flex items-center gap-2"
            >
              <span className="font-mono text-xs sm:text-[13px] tracking-widest text-[#8e8677] uppercase font-medium">
                ABOUT
              </span>
            </motion.div>

            {/* Dominant Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black font-sans tracking-tight text-[#f4f1ea] leading-[1.05] uppercase mb-4 sm:mb-5"
            >
              BUILDING SOFTWARE THAT WORKS IN PRODUCTION
            </motion.h2>

            {/* Rewritten Personal Story & Engineering Philosophy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-base sm:text-lg text-[#9c9485] leading-relaxed font-normal"
            >
              I'm <span className="text-[#f4f1ea] font-semibold">Mohamed Ashfaq</span>, a full-stack engineer and cybersecurity specialist based in Chennai. I engineer and deploy production-grade web applications, secure APIs, and cross-platform mobile platforms. By combining clean frontend execution with battle-tested backend architecture — including zero-trust auth, PostgreSQL row-level security, and anomaly detection — I build resilient software engineered to scale effortlessly under real-world traffic.
            </motion.p>
          </div>

          {/* ================= RIGHT COLUMN (HERO VISUAL CARDS) ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-end w-full overflow-visible py-1"
          >
            {/* Overlapping Hero Cards */}
            <BounceCards
              className="about-bounce-cards"
              containerWidth={isMobile ? 320 : 520}
              containerHeight={isMobile ? 260 : 330}
              cardWidth={isMobile ? 290 : 365}
              cardHeight={isMobile ? 220 : 260}
              animationDelay={0.2}
              animationStagger={0.06}
              easeType="power2.out"
              transformStyles={transformStyles}
              enableHover={true}
              pushDistance={isMobile ? 30 : 70}
            >
              {cardsData.map((card) => (
                <div
                  key={card.tag}
                  className="w-full h-full flex flex-col justify-between relative overflow-hidden rounded-[18px] border border-white/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
                >
                  <img
                    src={card.image}
                    alt={card.tag}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/30 pointer-events-none z-[5]" />
                  <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#d8c5a3] font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.1]">
                        {card.tag}
                      </span>
                      <h3 className="mt-2.5 sm:mt-3 text-base sm:text-lg lg:text-xl font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-white/80 mt-auto pt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </BounceCards>
          </motion.div>
        </div>

        {/* ================= CONTINUATION OF HERO: PRODUCTION TECH STREAM (RUNNING TEXT) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-14 w-full relative space-y-3"
        >
          {/* Subtle Category Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#8e8677] font-semibold">
              CORE TECHNOLOGIES & STACK
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.08] to-transparent" />
          </div>

          {/* Running Text Row 1: Core Technologies (Leftward Stream) */}
          <div className="w-full overflow-hidden select-none py-1 relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-3 w-max animate-[marquee-horizontal_32s_linear_infinite] hover:[animation-play-state:paused]">
              {[...skillsRow1, ...skillsRow1].map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm font-mono text-[#d8c5a3] whitespace-nowrap hover:border-[#d8c5a3]/50 hover:bg-white/[0.07] transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8c5a3]/70" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Running Text Row 2: Architecture & Security (Rightward Stream) */}
          <div className="w-full overflow-hidden select-none py-1 relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-3 w-max animate-[marquee-reverse_36s_linear_infinite] hover:[animation-play-state:paused]">
              {[...skillsRow2, ...skillsRow2].map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm font-mono text-white/70 whitespace-nowrap hover:border-white/20 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

