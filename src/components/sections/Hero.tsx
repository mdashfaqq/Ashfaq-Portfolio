import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { HiArrowDown, HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/profile";


const HeroScene = lazy(() =>
  import("@/components/effects/HeroScene").then((m) => ({ default: m.HeroScene })),
);

const floatingTech = ["React", "Flutter", "PHP", "MySQL", "JWT", "Linux"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <div className="noise-overlay absolute inset-0 z-[1]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[120px]" />

      <Suspense fallback={null}>
        <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full opacity-80 lg:opacity-100">
          <HeroScene />
        </div>
      </Suspense>

      {floatingTech.map((tech, i) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.5 + i * 0.1 },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute hidden xl:block glass px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--secondary)]"
          style={{
            top: `${20 + i * 12}%`,
            right: `${15 + (i % 3) * 8}%`,
          }}
        >
          {tech}
        </motion.span>
      ))}

      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm text-[var(--muted)]">
              Available for opportunities · {profile.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-[var(--secondary)] font-medium mb-4"
          >
            {profile.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#projects"
              className="group px-8 py-4 rounded-full bg-[var(--primary)] text-[#020617] font-semibold hover:neon-glow transition-all flex items-center gap-2"
            >
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass px-8 py-4 rounded-full font-semibold text-white hover:border-[var(--primary)]/40 transition-all flex items-center gap-2"
            >
              <HiOutlineMail size={20} />
              Contact Me
            </a>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 sm:p-5">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div> */}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <HiArrowDown className="animate-bounce" size={20} />
        </motion.div>

        <div className="flex gap-4 mt-8 lg:hidden">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-[var(--muted)] hover:text-white">
            <FaGithub size={22} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-[var(--muted)] hover:text-white">
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
