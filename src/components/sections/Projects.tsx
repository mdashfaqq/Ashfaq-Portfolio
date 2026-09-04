import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectPlatformBadge } from "@/components/ui/PlatformBadge";
import { CaseStudyModal } from "@/components/projects/CaseStudyModal";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { projects, type Project } from "@/data/projects";
import { getCaseStudy, hasCaseStudy } from "@/data/caseStudies";

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
  className="w-full h-full object-contain object-center"
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
              <SpecularButton
                as="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                radius={12}
                tint="#d8c5a3"
                tintOpacity={0.06}
                blur={8}
                textColor="#d8c5a3"
                lineColor="#e8d5b5"
                baseColor="#3a3227"
                intensity={1.1}
                followMouse
              >
                <FaGithub size={14} />
                <span>GitHub</span>
              </SpecularButton>
            )}
            {project.live && (
              <SpecularButton
                as="a"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                radius={12}
                tint="#d8c5a3"
                tintOpacity={0.16}
                blur={8}
                textColor="#f5e6cc"
                lineColor="#f3e5cb"
                baseColor="#735d3d"
                intensity={1.4}
                followMouse
              >
                <HiExternalLink size={14} />
                <span>Live Demo</span>
              </SpecularButton>
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

  const handleOpen = (project: Project) => setSelected(project);

  const selectedCaseStudy = selected ? getCaseStudy(selected.id) : undefined;

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          label="Selected Work"
          title="Products I've shipped"
          description="End-to-end applications built for real businesses — with architecture, impact, and production outcomes."
        />

        <CoverflowCarousel
          slides={projects.map((project) => ({
            src: project.image ?? "/hero.png",
            alt: project.title,
            title: project.title,
            subtitle: project.impact ?? project.highlight,
            meta: [
              { label: "Type", value: project.platformLabel ?? project.category },
              { label: "Stack", value: project.tech.slice(0, 3).join(" · ") },
            ],
            github: project.github,
            live: project.live,
          }))}
          cardWidth="min(560px, calc(100vw - 2.5rem))"
          cardClassName="rounded-xl"
          onCardClick={(index) => handleOpen(projects[index])}
        />
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