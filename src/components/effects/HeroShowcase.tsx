import { useEffect, useCallback, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HiExternalLink, HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { heroShowcaseProjects } from "@/data/hero";
import { getPlatformLabel, type Project, type ProjectCategory } from "@/data/projects";

const ROTATE_MS = 6500;
const SWIPE_THRESHOLD = 48;

const slideEase = [0.22, 1, 0.36, 1] as const;

const categoryAccent: Record<ProjectCategory, { badge: string; glow: string }> = {
  mobile: {
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    glow: "from-violet-500/15",
  },
  web: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    glow: "from-blue-500/15",
  },
  fullstack: {
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    glow: "from-sky-500/15",
  },
  business: {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    glow: "from-amber-500/15",
  },
};

function projectUrl(project: Project) {
  if (project.live) {
    try {
      return new URL(project.live).hostname;
    } catch {
      return "production.app";
    }
  }
  return `ashfaq.dev/${project.id}`;
}

function preloadImages(urls: string[]) {
  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function useCanParallax() {
  const [canParallax, setCanParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const update = () => setCanParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canParallax;
}

export interface HeroShowcaseProps {
  activeIndex: number;
  displayIndex: number;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
  isPaused: boolean;
  onPauseChange: (paused: boolean) => void;
}

export function HeroShowcase({
  activeIndex,
  displayIndex,
  onSelect,
  onHover,
  isPaused,
  onPauseChange,
}: HeroShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const prevDisplayRef = useRef(displayIndex);
  const [direction, setDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);
  const reduceMotion = useReducedMotion();
  const canParallax = useCanParallax();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-3, 3]);
  const phoneX = useTransform(springX, [-0.5, 0.5], [3, -3]);
  const phoneY = useTransform(springY, [-0.5, 0.5], [2, -2]);

  const project = heroShowcaseProjects[displayIndex];
  const accent = categoryAccent[project.category];
  const showPhone =
  ["coredine", "edutenant"].includes(project.id);
  const platformLabel = getPlatformLabel(project);

  useEffect(() => {
    const prev = prevDisplayRef.current;
    if (displayIndex !== prev) {
      setDirection(displayIndex > prev ? 1 : -1);
      prevDisplayRef.current = displayIndex;
      setProgressKey((k) => k + 1);
    }
  }, [displayIndex]);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % heroShowcaseProjects.length;
    onSelect(next);
  }, [activeIndex, onSelect]);

  const goPrev = useCallback(() => {
    const prev =
      (activeIndex - 1 + heroShowcaseProjects.length) % heroShowcaseProjects.length;
    onSelect(prev);
  }, [activeIndex, onSelect]);

useEffect(() => {
  const nextImages = [
    heroShowcaseProjects[0]?.image,
    heroShowcaseProjects[1]?.image,
  ].filter(Boolean);

  preloadImages(nextImages as string[]);
}, []);

  useEffect(() => {
    if (reduceMotion || isPaused) return;
    const interval = setInterval(goNext, ROTATE_MS);
    return () => clearInterval(interval);
  }, [reduceMotion, isPaused, goNext]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canParallax || reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetParallax = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    onPauseChange(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
    }
    onPauseChange(false);
  };

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * 20,
      scale: reduceMotion ? 1 : 0.98,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * -20,
      scale: reduceMotion ? 1 : 0.99,
    }),
  };

  const enableMotion = canParallax && !reduceMotion;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-w-0 max-w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => {
        resetParallax();
        onPauseChange(false);
        onHover(null);
      }}
      role="region"
      aria-label="Interactive project showcase"
      aria-roledescription="carousel"
    >
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] max-w-xs h-[40%] rounded-full bg-gradient-to-br ${accent.glow} to-transparent blur-[40px]
sm:blur-[60px] opacity-40 sm:opacity-45 transition-colors duration-700 pointer-events-none`}
      />

      <motion.div
        style={enableMotion ? { x: parallaxX, y: parallaxY } : undefined}
        className="relative w-full min-w-0 max-w-full mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: slideEase }}
          className="relative w-full max-w-full rounded-2xl border border-white/[0.09] bg-[#111113] shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:shadow-[0_24px_64px_rgba(0,0,0,0.4)] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-2.5 border-b border-white/[0.06] bg-[#0c0c0e] min-w-0">
            <div className="flex gap-1 sm:gap-1.5 shrink-0">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.span
                  key={project.id + "-url"}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: slideEase }}
                  className="block text-[9px] sm:text-[11px] text-[var(--muted)] truncate font-mono px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-white/[0.03] border border-white/[0.05] w-full max-w-full"
                >
                  {projectUrl(project)}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className="p-2 sm:p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <HiChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className="p-2 sm:p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
              >
                <HiChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-[16/10] bg-[#0a0a0c] overflow-hidden p-2 sm:p-3">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={project.id}
                src={project.image}
                alt={project.title}
                  width={1600}
  height={900}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: slideEase }}
                className="absolute inset-2 sm:inset-3 m-auto max-w-full max-h-full w-full h-full object-contain object-center"
               loading={displayIndex === 0 ? "eager" : "lazy"}
fetchPriority={displayIndex === 0 ? "high" : "auto"}
                decoding="async"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/85 via-transparent to-transparent pointer-events-none" />

            {project.live && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-black/45 backdrop-blur-md border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-medium text-emerald-300">Live</span>
              </div>
            )}
          </div>

          <div className="px-2.5 sm:px-4 py-2.5 sm:py-3.5 border-t border-white/[0.06] bg-[#0c0c0e] min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 sm:mb-2.5 min-w-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={project.id + "-meta"}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: slideEase }}
                  className="min-w-0 flex-1"
                >
                  <h3 className="text-[13px] sm:text-[15px] font-semibold text-white break-words leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[var(--muted)] mt-0.5 line-clamp-2 leading-relaxed break-words">
                    {project.highlight}
                  </p>
                </motion.div>
              </AnimatePresence>
              <span
                className={`self-start shrink-0 max-w-full text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-md border break-words leading-tight ${accent.badge}`}
              >
                {platformLabel}
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id + "-tech"}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.26, ease: slideEase }}
                className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3"
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/[0.05] break-words"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-white/60 hover:text-white transition-colors touch-manipulation min-h-[36px]"
                >
                  <HiExternalLink size={12} className="shrink-0" />
                  Visit
                </a>
              )}
              <a
                href="#projects"
                className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-white/80 hover:text-white transition-colors group ml-auto touch-manipulation min-h-[36px]"
              >
                Case study
                <HiArrowRight
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform shrink-0"
                />
              </a>
            </div>
          </div>

          {!reduceMotion && !isPaused && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
              <motion.div
                key={progressKey}
                className="h-full bg-white/35 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {showPhone && (
            <motion.div
              key={`phone-${project.id}`}
              style={enableMotion ? { x: phoneX, y: phoneY } : undefined}
              initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: slideEase }}
              className="hidden sm:block absolute right-0 sm:-right-2 md:-right-3 -bottom-4 sm:-bottom-6 z-10 w-[64px] sm:w-[88px] md:w-[100px] pointer-events-none max-w-[28%]"
            >
              <div className="rounded-[1rem] sm:rounded-[1.15rem] border-[2px] sm:border-[2.5px] border-[#2a2a2e] bg-[#0a0a0c] shadow-[0_12px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                <div className="h-2.5 sm:h-3.5 flex justify-center items-end pb-0.5 bg-[#0a0a0c]">
                  <div className="w-5 sm:w-7 h-0.5 rounded-full bg-[#2a2a2e]" />
                </div>
                <div className="aspect-[9/16] overflow-hidden flex items-center justify-center bg-[#0a0a0c] p-0.5">
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-contain object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="h-2 sm:h-2.5 bg-[#0a0a0c]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div
        className="mt-3 sm:mt-5 w-full max-w-full overflow-x-auto overscroll-x-contain pb-1 scrollbar-none snap-x snap-mandatory"
        role="tablist"
        aria-label="Select project"
      >
        <div className="flex gap-2 w-max max-w-none pr-1">
          {heroShowcaseProjects.map((item, i) => {
            const isActive = i === activeIndex;
            const isPreview = i === displayIndex && displayIndex !== activeIndex;

            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(i)}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
                className={`relative flex-shrink-0 snap-start flex items-center gap-2 rounded-xl border px-2 py-2 min-h-[44px] max-w-[min(100%,200px)] transition-all duration-200 touch-manipulation ${
                  isActive
                    ? "border-white/[0.16] bg-white/[0.07] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                    : isPreview
                      ? "border-white/[0.11] bg-white/[0.05]"
                      : "border-white/[0.06] bg-white/[0.02] active:bg-white/[0.05]"
                }`}
              >
                <div
                  className={`w-10 h-7 sm:w-11 sm:h-8 shrink-0 rounded-md overflow-hidden bg-[#0f0f12] border transition-colors flex items-center justify-center p-0.5 ${
                    isActive ? "border-white/[0.14]" : "border-white/[0.06]"
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="max-w-full max-h-full object-contain object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <p
                    className={`text-[11px] font-medium truncate ${
                      isActive || isPreview ? "text-white" : "text-white/55"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="text-[9px] text-[var(--muted)] truncate hidden sm:block">
                    {getPlatformLabel(item)}
                  </p>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="hero-showcase-active"
                    className="absolute inset-0 rounded-xl border border-white/[0.12] pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
