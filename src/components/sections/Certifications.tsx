import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiBadgeCheck,
  HiShieldCheck,
  HiAcademicCap,
  HiArrowRight,
} from "react-icons/hi";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DocumentViewer } from "@/components/ui/DocumentViewer";
import { CredentialMeta } from "@/components/ui/IssuerLogo";
import { certifications, type Certification } from "@/data/certifications";

const verificationStyles: Record<
  Certification["verificationLevel"],
  { badge: string; icon: typeof HiShieldCheck }
> = {
  industry: {
    badge: "text-blue-300/80 bg-blue-500/[0.08] border-blue-500/15",
    icon: HiShieldCheck,
  },
  verified: {
    badge: "text-emerald-300/80 bg-emerald-500/[0.08] border-emerald-500/15",
    icon: HiBadgeCheck,
  },
  professional: {
    badge: "text-violet-300/80 bg-violet-500/[0.08] border-violet-500/15",
    icon: HiAcademicCap,
  },
};

const certButtonClass =
  "w-full inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-sm font-medium touch-manipulation border border-white/[0.1] bg-white/[0.03] text-white/75 transition-[background-color,border-color,color,transform] duration-200 ease-out hover:bg-white/[0.07] hover:border-white/[0.2] hover:text-white/90 active:scale-[0.99] group/btn";

function CredentialCard({
  cert,
  onView,
  index,
}: {
  cert: Certification;
  onView: () => void;
  index: number;
}) {
  const isFeatured = cert.featured;
  const vStyle = verificationStyles[cert.verificationLevel];
  const VerifyIcon = vStyle.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`group relative flex h-full flex-col rounded-2xl border bg-[#0c0c0e] overflow-hidden transition-all duration-300 min-w-0 ${
        isFeatured
          ? "border-white/[0.22] shadow-[0_6px_32px_rgba(0,0,0,0.48)]"
          : "border-white/[0.08]"
      }`}
    >
      {isFeatured && (
        <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-blue-500/45 hidden sm:block" />
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {isFeatured && (
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/50 border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 rounded">
              Featured
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border ${vStyle.badge}`}
          >
            <VerifyIcon size={10} />
            {cert.verificationLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col min-w-0">
          <div className="mb-2.5 min-w-0">
            <h3
              className={`font-semibold text-white leading-tight break-words tracking-tight ${
                isFeatured
                  ? "text-xl sm:text-2xl"
                  : "text-lg sm:text-xl"
              }`}
            >
              {cert.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/40 leading-snug break-words">
              {cert.fullTitle}
            </p>
          </div>

          <CredentialMeta
            issuer={cert.issuer}
            category={cert.issuerCategory}
            year={cert.year}
            credentialType={cert.credentialType}
            className="mb-2.5 pb-2.5 border-b border-white/[0.05]"
          />

          <p className="mb-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed break-words">
            {cert.summary}
          </p>

          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1.5">
              Skills validated
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] leading-none px-2.5 py-1.5 rounded-md border border-white/[0.1] bg-white/[0.05] text-white/65 break-words"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-white/[0.06]">
          <button type="button" onClick={onView} className={certButtonClass}>
            <HiOutlineDocumentText
              size={16}
              className="text-white/45 transition-colors duration-200 group-hover/btn:text-white/55"
            />
            View credential
            <HiArrowRight
              size={14}
              className="text-white/35 transition-transform duration-200 ease-out group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

const footerItems = [
  `${certifications.length} Verified Certifications`,
  "Industry Recognized",
  "Available for Verification",
];

export function Certifications() {
  const [viewing, setViewing] = useState<Certification | null>(null);

  const sorted = [...certifications].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section
      id="certifications"
      className="px-5 sm:px-8 lg:px-16 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-14 md:pb-16 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto min-w-0">
        <SectionHeader
          label="Professional Credentials"
          title="Verified technical certifications"
          description="Industry-validated credentials reflecting continuous learning in enterprise systems administration, programming fundamentals, and production engineering practices."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.015] px-3 py-2.5 mb-5 sm:mb-6 max-w-3xl"
        >
          <HiShieldCheck size={15} className="text-emerald-400/70 shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed">
            Credentials issued by recognized industry organizations. All certificates are
            available for employer review and verification.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 min-w-0 items-stretch">
          {sorted.map((cert, i) => (
            <CredentialCard
              key={cert.id}
              cert={cert}
              index={i}
              onView={() => setViewing(cert)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center min-w-0"
        >
          {footerItems.map((item, i) => (
            <span key={item} className="inline-flex items-center gap-2 sm:gap-3">
              {i > 0 && (
                <span
                  className="hidden sm:inline text-white/15 select-none"
                  aria-hidden="true"
                >
                  |
                </span>
              )}
              <span className="text-xs sm:text-sm font-medium text-white/50 tracking-wide">
                {item}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {viewing && (
          <DocumentViewer
            url={viewing.certificateUrl}
            title={viewing.fullTitle}
            documentType={viewing.documentType}
            issuer={viewing.issuer}
            year={viewing.year}
            onClose={() => setViewing(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
