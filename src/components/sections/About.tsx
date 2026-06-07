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
          title="Building software that works in production"
          description="Full-stack development focused on real-world business outcomes."
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 space-y-4"
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[var(--muted)] leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            {profile.capabilities.map((cap) => (
              <div
                key={cap.label}
                className="surface-card px-4 py-3.5"
              >
                <p className="text-sm font-medium text-white">{cap.label}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{cap.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
