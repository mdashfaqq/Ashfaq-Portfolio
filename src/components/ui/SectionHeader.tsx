import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-16 max-w-2xl"
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)] mb-4">
        <span className="w-8 h-px bg-[var(--primary)]" />
        {label}
      </span>
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-[var(--muted)] text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
