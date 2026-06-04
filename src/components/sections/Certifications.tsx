import { motion } from "framer-motion";
import {
  HiShieldCheck,
  HiOutlineDocumentText,
  HiBadgeCheck,
} from "react-icons/hi";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Certifications"
          title="Verified Credentials"
          description="Industry-recognized certifications validating expertise in cybersecurity, networking, programming, and modern software development."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-500 hover:border-[var(--primary)]/30 hover:bg-white/[0.05]"
            >
              {/* Glow Effects */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />
              </div>

              {/* Top Border Glow */}
              <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex gap-5">
                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15"
                >
                  <HiShieldCheck
                    size={28}
                    className="text-[var(--primary)]"
                  />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-white leading-snug">
                      {cert.title}
                    </h3>

                    <div className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1">
                      <HiBadgeCheck
                        size={14}
                        className="text-emerald-400"
                      />
                      <span className="text-[10px] font-medium text-emerald-400">
                        VERIFIED
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {cert.issuer}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">
                      {cert.year}
                    </span>

                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-white/[0.05] hover:text-[var(--primary)]"
                      >
                        <HiOutlineDocumentText size={14} />
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 flex justify-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-xl">
            <p className="text-sm text-[var(--muted)]">
              <span className="font-semibold text-white">
                {certifications.length}
              </span>{" "}
              certifications earned and verified.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}