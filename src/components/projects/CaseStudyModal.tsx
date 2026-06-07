import { useEffect } from "react";
import { motion } from "framer-motion";
import { HiX, HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/data/projects";
import type { CaseStudy } from "@/data/caseStudies";
import { ProjectPlatformBadge } from "@/components/ui/PlatformBadge";

interface CaseStudyModalProps {
  project: Project;
  caseStudy: CaseStudy;
  onClose: () => void;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 last:mb-0">
      <h4 className="text-[11px] font-medium uppercase tracking-widest text-[var(--muted)] mb-3">
        {title}
      </h4>
      {children}
    </section>
  );
}

export function CaseStudyModal({ project, caseStudy, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="surface-elevated w-full sm:max-w-3xl lg:max-w-4xl max-h-[94dvh] sm:max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden"
        >
          <div className="relative shrink-0">
            {project.image && (
              <div className="relative aspect-[21/9] sm:aspect-[2.4/1] max-h-[200px] sm:max-h-[240px] overflow-hidden bg-[#0f0f12]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/40 to-transparent" />
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 backdrop-blur-md text-white/80 hover:text-white border border-white/10 touch-manipulation"
              aria-label="Close case study"
            >
              <HiX size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain hide-scrollbar">
            <div className="px-5 sm:px-8 py-6 sm:py-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <ProjectPlatformBadge project={project} />
                {project.live && (
                  <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Live in production
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">{caseStudy.overview}</p>

              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-white/[0.06]">
                {caseStudy.techStack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Section title="Problem">
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  {caseStudy.problem}
                </p>
              </Section>

              <Section title="Solution">
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  {caseStudy.solution}
                </p>
              </Section>

              <Section title="Architecture">
                <ul className="space-y-2">
                  {caseStudy.architecture.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-[var(--muted)] leading-relaxed"
                    >
                      <span className="text-white/25 shrink-0 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Key Features">
                <ul className="grid sm:grid-cols-2 gap-2">
                  {caseStudy.keyFeatures.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm text-[var(--muted)] rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
                    >
                      <span className="text-white/30 shrink-0">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Challenges">
                <ul className="space-y-2">
                  {caseStudy.challenges.map((c) => (
                    <li key={c} className="text-sm text-[var(--muted)] leading-relaxed pl-4 border-l border-white/[0.08]">
                      {c}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Results">
                <ul className="space-y-2">
                  {caseStudy.results.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-sm text-white/75 leading-relaxed"
                    >
                      <span className="text-emerald-400 shrink-0">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Lessons Learned">
                <ul className="space-y-2">
                  {caseStudy.lessonsLearned.map((l) => (
                    <li key={l} className="text-sm text-[var(--muted)] leading-relaxed italic">
                      {l}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* {project.image && (
                <Section title="Screenshot">
                  <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-[#0f0f12]">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-auto object-contain max-h-[320px] mx-auto"
                      loading="lazy"
                    />
                  </div>
                </Section>
              )} */}
            </div>
          </div>

          <div className="shrink-0 flex flex-wrap gap-3 px-5 sm:px-8 py-4 border-t border-white/[0.08] bg-[#0c0c0e]/80">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2.5 flex-1 sm:flex-none justify-center"
              >
                <FaGithub size={14} /> GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 flex-1 sm:flex-none justify-center"
              >
                <HiExternalLink size={14} /> Live Demo
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs py-2.5 w-full sm:w-auto sm:ml-auto"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
  );
}
