import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiShieldCheck,
} from "react-icons/hi";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DocumentViewer } from "@/components/ui/DocumentViewer";
import HowItWorks from "@/components/ui/how-it-works";
import { certifications, type Certification } from "@/data/certifications";

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

        <HowItWorks
          features={sorted.map((cert) => ({
            title: cert.title,
            description: `${cert.fullTitle}. ${cert.summary}`,
            colors: {
              bg: "bg-[#241e14]",
              text: "text-[#d8c5a3]",
              border: "border-[#a58a65]/25",
            },
          }))}
          onStepClick={(index) => setViewing(sorted[index])}
        />

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
            skills={viewing.skills}
            verificationLabel={viewing.verificationLabel}
            onClose={() => setViewing(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
