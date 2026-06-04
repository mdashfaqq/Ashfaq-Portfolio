import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";

export function About() {
  const paragraphs = profile.about.split("\n\n");

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="About"
          title="Engineering secure, scalable products"
          description="Full-stack development with a cybersecurity mindset."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[var(--muted)] leading-relaxed text-lg">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 neon-glow"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Tech Stack</h3>
            <div className="space-y-6">
              {Object.entries(profile.techStack).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs uppercase tracking-widest text-[var(--primary)] mb-3">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/90 border border-white/5 hover:border-[var(--primary)]/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
