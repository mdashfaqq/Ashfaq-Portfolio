import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiDart,
  SiCplusplus,
  SiPostgresql,
  SiReact,
  SiFlutter,
  SiTailwindcss,
  SiCapacitor,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiJsonwebtokens,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiOwasp,
  SiPostman,
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: IconType;
  color: string;
  isPrimary?: boolean;
}

interface TechRow {
  id: string;
  label: string;
  direction: "left-to-right" | "right-to-left";
  speedSeconds: number;
  items: TechItem[];
}

const techRows: TechRow[] = [
  {
    id: "row-1",
    label: "ROW 01 // LANGUAGES",
    direction: "left-to-right",
    speedSeconds: 32,
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB", isPrimary: true },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", isPrimary: true },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", isPrimary: true },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", isPrimary: true },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
      { name: "Python", icon: SiPython, color: "#3776AB", isPrimary: true },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", isPrimary: true },
    ],
  },
  {
    id: "row-2",
    label: "ROW 02 // ENGINEERING & ARCHITECTURE",
    direction: "right-to-left",
    speedSeconds: 36,
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB", isPrimary: true },
      { name: "FastAPI", icon: SiFastapi, color: "#009688", isPrimary: true },
      { name: "Docker", icon: SiDocker, color: "#2496ED", isPrimary: true },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Express.js", icon: SiExpress, color: "#E5E7EB" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },
      { name: "REST APIs", icon: SiPostman, color: "#FF6C37" },
      { name: "Capacitor", icon: SiCapacitor, color: "#119EFF" },
    ],
  },
  {
    id: "row-3",
    label: "ROW 03 // DATA, AI & SYSTEMS",
    direction: "left-to-right",
    speedSeconds: 34,
    items: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", isPrimary: true },
      { name: "Linux", icon: SiLinux, color: "#FCC624", isPrimary: true },
      { name: "Git", icon: SiGit, color: "#F05032", isPrimary: true },
      { name: "Pandas", icon: SiPandas, color: "#E70488" },
      { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
      { name: "OWASP", icon: SiOwasp, color: "#FFFFFF" },
      { name: "GitHub", icon: SiGithub, color: "#F0F6FC" },
    ],
  },
];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative px-5 sm:px-8 lg:px-12 py-20 sm:py-24 md:py-28 overflow-hidden bg-[#09090b] text-[#f4f1ea]"
    >
      {/* Dynamic Keyframes for Ultra-Smooth Slow Infinite Marquee */}
      <style>{`
        @keyframes techMarqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes techMarqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .tech-stream-ltr {
          animation: techMarqueeRight var(--marquee-duration, 30s) linear infinite;
        }
        .tech-stream-rtl {
          animation: techMarqueeLeft var(--marquee-duration, 32s) linear infinite;
        }
        .tech-stream-row:hover .tech-stream-inner {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Subtle Noise / Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto min-w-0 relative">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12">
          {/* Top-Left: Tag + Heading + Supporting Description */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="font-mono text-xs sm:text-[13px] tracking-widest text-[#8e8677] uppercase font-medium">
                03 // TECH STACK
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-black font-sans tracking-tighter text-[#f4f1ea] leading-[0.92] uppercase"
            >
              TOOLS I
              <br />
              <span className="text-[#8e8677]/60">BUILD WITH.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-sm text-[#8e8677] mt-4 max-w-md font-sans leading-relaxed"
            >
              A practical stack across software engineering, data, AI and application security.
            </motion.p>
          </div>

          {/* Top-Right: Metadata Counts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex md:flex-col items-start md:items-end gap-3 md:gap-1 text-left md:text-right font-mono text-xs sm:text-[13px] text-[#8e8677] tracking-wider uppercase shrink-0"
          >
            <span className="text-[#f4f1ea] font-semibold">40+ TECHNOLOGIES</span>
            <span className="text-[#8e8677]/60">08 DOMAINS</span>
          </motion.div>
        </div>

        {/* Thin Horizontal Drawing Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="w-full h-[1px] bg-white/[0.12] mb-6 sm:mb-8"
        />

        {/* Signature Status Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex items-center justify-between px-1 mb-8 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8e8677]"
        >
          {/* Far Left: STACK // ACTIVE with red pulsing indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]" />
            </span>
            <span className="text-[#ef4444] font-semibold">STACK // ACTIVE</span>
          </div>

          {/* Far Right: END OF STACK indicator */}
          <div className="text-[#8e8677]/60 tracking-wider">
            END OF STACK →
          </div>
        </motion.div>

        {/* ================= MAIN VISUAL: 3 HORIZONTAL STREAMS ================= */}
        <div className="space-y-6 sm:space-y-8 relative">
          {/* Subtle Left & Right Edge Vignette Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#09090b] to-transparent z-10" />

          {techRows.map((row, rowIdx) => {
            const isLtr = row.direction === "left-to-right";
            // Duplicate the array once for seamless infinite loop
            const duplicatedItems = [...row.items, ...row.items];

            return (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: isLtr ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.25 + rowIdx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="tech-stream-row group/row relative overflow-hidden py-2"
              >
                {/* Tiny Category Label Header for each row */}
                <div className="flex items-center gap-2 mb-3.5 px-1">
                  <span className="w-1 h-1 rounded-full bg-[#8e8677]/40" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#8e8677]/80 uppercase tracking-widest font-medium">
                    {row.label}
                  </span>
                </div>

                {/* Animated Marquee Stream */}
                <div
                  className="flex w-fit overflow-hidden"
                  style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
                >
                  <div
                    className={`tech-stream-inner flex items-center gap-8 sm:gap-14 md:gap-16 shrink-0 will-change-transform ${
                      isLtr ? "tech-stream-ltr" : "tech-stream-rtl"
                    }`}
                    style={
                      {
                        "--marquee-duration": `${row.speedSeconds}s`,
                      } as React.CSSProperties
                    }
                  >
                    {duplicatedItems.map((tech, itemIdx) => {
                      const Icon = tech.icon;
                      return (
                        <div
                          key={`${row.id}-${tech.name}-${itemIdx}`}
                          className="group/item flex flex-col items-center justify-center gap-2 cursor-default select-none shrink-0 py-2 transition-all duration-200"
                        >
                          {/* Technology Icon with genuine brand color (No cards, no square container) */}
                          <div className="transition-transform duration-200 ease-out group-hover/item:scale-[1.08]">
                            <Icon
                              size={tech.isPrimary ? 34 : 28}
                              style={{ color: tech.color }}
                              className={`transition-opacity duration-200 ${
                                tech.isPrimary
                                  ? "opacity-95 group-hover/item:opacity-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                                  : "opacity-75 group-hover/item:opacity-100"
                              }`}
                            />
                          </div>

                          {/* Technology Name */}
                          <div className="flex items-center gap-1.5 transition-colors duration-150">
                            {/* Tiny red hover dot indicator (● PYTHON) */}
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] opacity-0 group-hover/item:opacity-100 transition-opacity duration-150" />

                            <span
                              className={`uppercase tracking-wider transition-all duration-150 ${
                                tech.isPrimary
                                  ? "text-xs sm:text-sm font-semibold text-[#f4f1ea] group-hover/item:text-white"
                                  : "text-[11px] sm:text-xs font-medium text-[#8e8677] group-hover/item:text-[#f4f1ea]"
                              }`}
                            >
                              {tech.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subtle row separator line */}
                <div className="w-full h-[1px] bg-white/[0.05] mt-5" />
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM METADATA ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#8e8677] font-mono text-[11px] sm:text-xs uppercase tracking-widest border-t border-white/[0.06]"
        >
          <div>
            FULL-STACK // DATA // SECURITY
          </div>
          <div className="text-[#8e8677]/60">
            HOVER ROW TO PAUSE STREAM
          </div>
        </motion.div>
      </div>
    </section>
  );
}
