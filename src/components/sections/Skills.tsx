import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/data/skills";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
  security: "Security",
};

export function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          label="Skills"
          title="Technical proficiency"
          description="Measured by real-world project delivery and production experience."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="surface-card p-5 sm:p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs text-[var(--muted)]">
                    {categoryLabels[skill.category]}
                  </span>
                </div>
                <span className="text-lg font-bold text-gradient">{skill.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.03, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
