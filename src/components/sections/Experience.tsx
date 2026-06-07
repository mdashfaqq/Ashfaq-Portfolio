import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Experience"
          title="Professional background"
          description="Hands-on software engineering in production environments."
        />

        <div className="relative max-w-3xl mx-auto lg:mx-0">
          <div className="absolute left-[7px] sm:left-[9px] top-3 bottom-3 w-px bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-transparent" />

          {experience.map((exp, i) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-7 sm:pl-10 pb-8 sm:pb-10 last:pb-0"
            >
              <div className="absolute left-0 top-2 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border-2 border-white/20 bg-[#09090b] ring-4 ring-[#09090b]" />

              <div className="surface-card p-5 sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-0.5">{exp.company}</p>
                  </div>
                  <span className="inline-flex w-fit shrink-0 px-3 py-1 rounded-md text-xs text-[var(--muted)] border border-white/[0.06] bg-white/[0.02]">
                    {exp.duration}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-[var(--muted)] leading-relaxed"
                    >
                      <span className="text-white/20 shrink-0 mt-0.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
