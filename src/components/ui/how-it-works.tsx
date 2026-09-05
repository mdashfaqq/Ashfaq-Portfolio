import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface CredentialStep {
  title: string;
  description: string;
  number?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface HowItWorksProps {
  features: CredentialStep[];
  className?: string;
  onStepClick?: (index: number) => void;
}

const positions = [
  { className: "md:absolute md:top-0 md:left-[12%]", rotate: "rotate-3" },
  { className: "md:absolute md:top-[80px] md:right-[12%]", rotate: "-rotate-3" },
  { className: "md:absolute md:top-[420px] md:left-[28%]", rotate: "rotate-2" },
  { className: "md:absolute md:top-[640px] md:right-[10%]", rotate: "-rotate-3" },
  { className: "md:absolute md:top-[900px] md:left-[15%]", rotate: "rotate-3" },
];

function Pin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 3a1 1 0 0 1 .117 1.993l-.117.007v4.764l1.894 3.789a1 1 0 0 1 .1.331l.006.116v2a1 1 0 0 1-.883.993l-.117.007h-4v4a1 1 0 0 1-1.993.117l-.007-.117v-4h-4a1 1 0 0 1-.993-.883l-.007-.117v-2a1 1 0 0 1 .06-.34l.046-.107 1.894-3.791V5.007A1 1 0 0 1 8 3h8Z" />
    </svg>
  );
}

const defaultColors = {
  bg: "bg-[#241e14]",
  text: "text-[#d8c5a3]",
  border: "border-[#a58a65]/25",
};

export default function HowItWorks({ features, className, onStepClick }: HowItWorksProps) {
  const height = features.length > 2 ? 760 : features.length === 2 ? 390 : 260;

  return (
    <div className={`relative overflow-hidden px-2 py-8 sm:px-5 md:py-12 ${className ?? ""}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "linear-gradient(#d8c5a3 1px, transparent 1px)", backgroundSize: "100% 32px" }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          className="relative mx-auto flex max-w-[1000px] flex-col gap-6 md:block md:h-[var(--credentials-height)]"
          style={{ "--credentials-height": `${height}px` } as CSSProperties}
        >
          {features.length > 1 && (
            <svg
              className="pointer-events-none absolute left-0 top-0 hidden h-full w-full text-[#a58a65]/35 md:block"
              viewBox={`0 0 1000 ${height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M 290 150 C 500 150, 550 250, 710 250 C 860 250, 520 400, 320 520" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" />
            </svg>
          )}

          {features.map((step, index) => {
            const position = positions[index % positions.length];
            const colors = step.colors ?? defaultColors;
            const clickable = Boolean(onStepClick);

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className={`relative w-full md:w-[280px] ${position.className} ${position.rotate} transition-transform duration-300 hover:z-30 hover:scale-105 ${clickable ? "cursor-pointer" : ""}`}
                onClick={() => onStepClick?.(index)}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={(event) => {
                  if (clickable && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    onStepClick?.(index);
                  }
                }}
              >
                <div className="rounded-[25px] border border-white/[0.08] bg-[#111113] p-2 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                  <Pin className={`mx-auto mb-5 h-8 w-8 ${colors.text}`} />
                  <div className={`${colors.bg} rounded-[15px] border ${colors.border} p-4 text-left`}>
                    <span className={`mb-4 block text-4xl font-black ${colors.text}`}>{step.number ?? `0${index + 1}`}</span>
                    <h3 className="mb-2 text-2xl font-semibold leading-none text-[var(--foreground)]">{step.title}</h3>
                    <p className="text-sm leading-5 tracking-tight text-[var(--muted)]">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
