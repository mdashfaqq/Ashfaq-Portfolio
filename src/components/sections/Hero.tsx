import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/profile";
import { heroShowcaseProjects } from "@/data/hero";
import { getPlatformLabel } from "@/data/projects";
import { TypingHeadline } from "@/components/ui/TypingHeadline";
import { Character3D } from "@/components/effects/3DCharacter";

export function Hero() {
  const [activeIndex] = useState(0);
  const [hoverIndex] = useState<number | null>(null);

  const displayIndex = hoverIndex ?? activeIndex;
  const previewProject = heroShowcaseProjects[displayIndex];

  return (
    <section className="relative min-h-screen lg:min-h-[100dvh] flex items-center overflow-x-clip mesh-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(24,24,27,0.8),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 box-border">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center min-w-0">
          <div className="w-full min-w-0 max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 sm:px-3.5 sm:py-1.5 mb-5 sm:mb-8 max-w-full"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--muted)] leading-snug break-words">
                Open to Opportunities • {profile.location}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-5 sm:mb-8 w-full min-w-0 max-w-full"
            >
              <TypingHeadline />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="w-full min-w-0 max-w-full text-sm sm:text-base md:text-lg text-[var(--muted)] leading-relaxed mb-5 sm:mb-8 break-words [overflow-wrap:anywhere]"
            >
              {profile.specialization}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="w-full min-w-0 max-w-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 sm:p-5 mb-5 sm:mb-9"
            >
              <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2.5">
                {hoverIndex !== null ? "Previewing" : "Featured product"}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewProject.id}
                  initial={{ opacity: 0, x: hoverIndex !== null ? 8 : 0, y: 6 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -8, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-0"
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2">
                    <p className="text-sm sm:text-base font-semibold text-white break-words min-w-0">
                      {previewProject.title}
                    </p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/[0.08] text-white/50 break-words max-w-full shrink-0">
                      {getPlatformLabel(previewProject)}
                    </span>
                    {previewProject.live && (
                      <span className="text-[10px] text-emerald-400 font-medium shrink-0">
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed break-words [overflow-wrap:anywhere]">
                    {previewProject.impact ?? previewProject.highlight}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {previewProject.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-white/45 border border-white/[0.05] break-words"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-col gap-3 mb-7 sm:mb-10 w-full min-w-0"
            >
              <a
                href="#projects"
                className="btn-primary w-full min-h-[44px] justify-center"
              >
                See all products
                <span className="opacity-60">→</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="btn-secondary w-full min-h-[44px] justify-center"
              >
                <HiOutlineMail size={16} className="shrink-0" />
                Contact
              </a>
            </motion.div>

            <div className="flex gap-3 mt-2 lg:hidden">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center min-h-[44px] rounded-xl border border-white/[0.08] text-[var(--muted)] hover:text-white hover:border-white/[0.14] transition-colors touch-manipulation"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center min-h-[44px] rounded-xl border border-white/[0.08] text-[var(--muted)] hover:text-white hover:border-white/[0.14] transition-colors touch-manipulation"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative w-full min-w-0 max-w-full lg:pt-2 overflow-hidden"
          >
            <Suspense
              fallback={
                <div className="w-full max-w-full aspect-[4/3] sm:min-h-[300px] rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
              }
            >
              <div className="relative w-full aspect-[4/3] sm:min-h-[400px] lg:min-h-[500px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-purple-900/20 to-blue-900/20 overflow-hidden">
                <Character3D />
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Interactive hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                  Move to interact
                </div>
              </div>
            </Suspense>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-[var(--muted)]"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <HiArrowDown size={16} className="opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
