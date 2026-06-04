import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiCode } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, type Project } from "@/data/projects";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onSelect(project)}
     className="
group
relative
overflow-hidden
rounded-3xl
bg-[#070B17]
border
border-white/[0.06]
cursor-pointer
transition-all
duration-500
hover:-translate-y-1
hover:border-white/[0.12]
hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
flex
flex-col
"
    >
<div className="relative aspect-video overflow-hidden bg-[#0f172a] border-b border-white/5">
<div className="relative overflow-hidden bg-slate-900">
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-auto"
  />
</div>
</div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--secondary)] border border-[var(--primary)]/15"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="text-[var(--muted)] text-sm line-clamp-2 mb-4 flex-1">{project.description}</p>
        <div className="flex gap-3">
          {project.github && (
            <span className="text-xs text-[var(--muted)] flex items-center gap-1">
              <FaGithub /> Source
            </span>
          )}
          <span className="text-xs text-[var(--primary)] ml-auto group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 neon-glow"
      >
        {project.image && (
          <div className="mb-6 -mx-2 sm:-mx-4 -mt-2 sm:-mt-4 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-auto max-h-[28rem] object-contain object-top"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-xs bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-[var(--muted)] leading-relaxed mb-6">{project.description}</p>

        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Features</h4>
        <ul className="grid sm:grid-cols-2 gap-2 mb-6">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2 text-sm text-[var(--muted)]">
              <span className="text-[var(--accent)]">✓</span> {f}
            </li>
          ))}
        </ul>

        {project.architecture && (
          <>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Architecture</h4>
            <ul className="space-y-1 mb-6">
              {project.architecture.map((a) => (
                <li key={a} className="text-sm text-[var(--muted)] flex gap-2">
                  <span className="text-[var(--primary)]">→</span> {a}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white hover:border-[var(--primary)]/40"
            >
              <HiCode /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--primary)] text-[#020617] font-semibold"
            >
              <HiExternalLink /> Live Demo
            </a>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 text-sm text-[var(--muted)] hover:text-white transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          label="Projects"
          title="Featured work"
          description="Production business applications shipped end-to-end."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
