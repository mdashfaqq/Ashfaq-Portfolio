import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking with springs for fluid spotlight animation
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Letters of the giant half-text watermark
  const watermarkText = "ASHFAQ";

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#09090b] text-white pt-2 sm:pt-4 pb-0 select-none"
    >
      {/* Background Interactive Ambient Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) =>
              `radial-gradient(700px circle at ${(x as number) * 100}% ${
                (y as number) * 100
              }%, rgba(216, 197, 163, 0.12), rgba(214, 47, 39, 0.06), transparent 75%)`
          ),
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Minimal Copyright Bar */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.06] text-xs font-mono text-white/50">
          <span className="text-white/80 font-medium">
            © {currentYear} {profile.name}. All rights reserved.
          </span>
          <span className="text-white/30 text-[11px] hidden sm:inline">
            Full-Stack Developer & Cybersecurity Specialist
          </span>
        </div>

        {/* Half-Submerged Giant Text Watermark ("ASHFAQ") */}
        {/* Only top half is visible, clipped at container bottom edge */}
        <div className="relative w-full h-[95px] sm:h-[135px] md:h-[175px] lg:h-[205px] overflow-hidden flex items-start justify-center select-none pt-1">
          <div className="w-full flex items-center justify-center tracking-tighter leading-none font-black text-center cursor-default">
            {watermarkText.split("").map((letter, idx) => (
              <motion.span
                key={idx}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  color: "rgba(216, 197, 163, 0.4)",
                  textShadow: "0 0 40px rgba(216, 197, 163, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="inline-block uppercase text-white/[0.08] hover:text-white/[0.22] transition-colors duration-300"
                style={{
                  fontSize: "clamp(5rem, 21vw, 17.5rem)",
                  fontFamily: "'Kanit', sans-serif",
                  letterSpacing: "0.03em",
                  WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.04)",
                  lineHeight: "0.85",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
