import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Experience"
          title="Professional journey"
          description="Building production software in real-world environments."
        />

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-transparent" />

          {experience.map((exp, i) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
            >
              <div className="absolute left-2 md:left-6 top-2 w-4 h-4 rounded-full bg-[var(--primary)] ring-4 ring-[#020617] shadow-[0_0_20px_var(--glow)]" />

              <div className="glass-strong rounded-3xl p-8 md:p-10 hover:border-[var(--primary)]/25 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-[var(--primary)] font-medium">{exp.company}</p>
                  </div>
                  <span className="inline-flex w-fit px-4 py-1.5 rounded-full text-sm glass text-[var(--secondary)]">
                    {exp.duration}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-[var(--muted)]">
                      <span className="text-[var(--primary)] mt-1.5 shrink-0">▸</span>
                      {item}
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
