import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={`mb-10 sm:mb-14 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`.trim()}
    >
      <span className="inline-block text-xs font-medium uppercase tracking-[0.15em] text-[var(--muted)] mb-3">
        {label}
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--muted)] text-base leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
