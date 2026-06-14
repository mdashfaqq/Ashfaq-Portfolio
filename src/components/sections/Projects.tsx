import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiArrowRight } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectPlatformBadge } from "@/components/ui/PlatformBadge";
import { CaseStudyModal } from "@/components/projects/CaseStudyModal";
import { projects, type Project } from "@/data/projects";
import { getCaseStudy, hasCaseStudy } from "@/data/caseStudies";

type CardSize = "flagship" | "large" | "standard";

function ProjectLinks({
  project,
  onCaseStudy,
  showCaseStudy,
}: {
  project: Project;
  onCaseStudy?: () => void;
  showCaseStudy?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {showCaseStudy && onCaseStudy && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCaseStudy();
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white hover:text-white/90 transition-colors touch-manipulation"
        >
          Case study
          <HiArrowRight size={14} className="opacity-70" />
        </button>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors touch-manipulation"
        >
          <HiExternalLink size={12} />
          Live
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-white transition-colors touch-manipulation"
        >
          <FaGithub size={12} />
          GitHub
        </a>
      )}
    </div>
  );
}

function ProductCard({
  project,
  size,
  index,
  onOpen,
}: {
  project: Project;
  size: CardSize;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const isFlagship = size === "flagship";
  const isLarge = size === "large";
  const caseStudyAvailable = hasCaseStudy(project.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(project)}
      className={`group relative cursor-pointer surface-card overflow-hidden touch-manipulation ${
        isFlagship ? "col-span-full" : ""
      }`}
    >
      <div
        className={
          isFlagship
            ? "grid lg:grid-cols-2 gap-0"
            : "flex flex-col h-full"
        }
      >
        <div
          className={`relative overflow-hidden bg-[#0f0f12] ${
            isFlagship
              ? "aspect-[16/10] lg:aspect-auto lg:min-h-[400px]"
              : isLarge
                ? "aspect-[16/10]"
                : "aspect-[16/10]"
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/70 via-transparent to-transparent lg:from-transparent lg:via-transparent lg:to-transparent" />
          {project.live && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/45 backdrop-blur-md border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-300">Live</span>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col ${
            isFlagship ? "p-6 sm:p-8 lg:p-10 justify-center" : "p-5 sm:p-6 flex-1"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
            <ProjectPlatformBadge project={project} />
          </div>

          <h3
            className={`font-semibold text-white mb-2 group-hover:text-white/90 transition-colors ${
              isFlagship ? "text-2xl sm:text-3xl lg:text-4xl" : isLarge ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
            }`}
          >
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4">
            {project.impact ?? project.highlight}
          </p>

          {project.outcomes && (
            <ul className="space-y-1.5 mb-5 sm:mb-6">
              {project.outcomes.slice(0, isFlagship ? 3 : 2).map((o) => (
                <li
                  key={o}
                  className="flex gap-2 text-xs sm:text-sm text-white/60 leading-relaxed"
                >
                  <span className="text-white/25 shrink-0">—</span>
                  {o}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/[0.04] text-white/50 border border-white/[0.06]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/[0.06]">
            <ProjectLinks
              project={project}
              showCaseStudy={caseStudyAvailable}
              onCaseStudy={() => onOpen(project)}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28 }}
        onClick={(e) => e.stopPropagation()}
      className="surface-elevated w-full sm:max-w-2xl max-h-[94dvh] overflow-y-auto hide-scrollbar rounded-t-2xl sm:rounded-2xl"
      >
        {project.image && (
          <div className="aspect-video bg-[#0f0f12] overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
        <div className="p-5 sm:p-8">
          <ProjectPlatformBadge project={project} className="mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-[var(--muted)] leading-relaxed mb-4">{project.description}</p>
          {project.outcomes && (
            <ul className="space-y-2 mb-6">
              {project.outcomes.map((o) => (
                <li key={o} className="text-sm text-white/70 flex gap-2">
                  <span className="text-emerald-400">✓</span> {o}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-[var(--muted)] border border-white/[0.06]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2.5">
                <FaGithub size={14} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2.5">
                <HiExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
          <button type="button" onClick={onClose} className="mt-4 w-full py-2.5 text-xs text-[var(--muted)] hover:text-white">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const flagship = projects[0];
  const featuredPair = projects.slice(1, 3);
  const rest = projects.slice(3);

  const handleOpen = (project: Project) => setSelected(project);

  const selectedCaseStudy = selected ? getCaseStudy(selected.id) : undefined;

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          label="Selected Work"
          title="Products I've shipped"
          description="End-to-end applications built for real businesses — with architecture, impact, and production outcomes."
        />

        <div className="space-y-6 sm:space-y-8">
          <ProductCard
            project={flagship}
            size="flagship"
            index={0}
            onOpen={handleOpen}
          />

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {featuredPair.map((project, i) => (
              <ProductCard
                key={project.id}
                project={project}
                size="large"
                index={i + 1}
                onOpen={handleOpen}
              />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {rest.map((project, i) => (
              <ProductCard
                key={project.id}
                project={project}
                size="standard"
                index={i + 3}
                onOpen={handleOpen}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && selectedCaseStudy && (
          <CaseStudyModal
            project={selected}
            caseStudy={selectedCaseStudy}
            onClose={() => setSelected(null)}
          />
        )}
        {selected && !selectedCaseStudy && (
          <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
