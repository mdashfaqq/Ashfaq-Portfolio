import { motion } from "framer-motion";
import { useRef, useState, useEffect, type CSSProperties } from "react";

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
  { className: "md:absolute md:top-0 md:left-[12%]", rotate: "-rotate-1 md:rotate-3", mobileAlign: "self-start ml-1.5 sm:ml-4" },
  { className: "md:absolute md:top-[80px] md:right-[12%]", rotate: "rotate-2 md:-rotate-3", mobileAlign: "self-end mr-1.5 sm:mr-4" },
  { className: "md:absolute md:top-[420px] md:left-[28%]", rotate: "-rotate-1 md:rotate-2", mobileAlign: "self-start ml-2.5 sm:ml-5" },
  { className: "md:absolute md:top-[640px] md:right-[10%]", rotate: "rotate-2 md:-rotate-3", mobileAlign: "self-end mr-2.5 sm:mr-5" },
  { className: "md:absolute md:top-[900px] md:left-[15%]", rotate: "-rotate-1 md:rotate-3", mobileAlign: "self-start ml-1.5 sm:ml-4" },
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mobileWirePath, setMobileWirePath] = useState<string>("");

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || pinRefs.current.length < 2) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < features.length; i++) {
        const pinEl = pinRefs.current[i];
        if (!pinEl) continue;
        const rect = pinEl.getBoundingClientRect();
        points.push({
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      }

      if (points.length < 2) return;

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dy = p2.y - p1.y;
        const dx = p2.x - p1.x;
        // Hanging slack wire curve connecting the pins across the cards
        const offset = i % 2 === 0 ? 35 : -35;
        const cp1x = p1.x + dx * 0.25 + offset;
        const cp1y = p1.y + dy * 0.45;
        const cp2x = p1.x + dx * 0.75 + offset;
        const cp2y = p1.y + dy * 0.75;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }
      setMobileWirePath(d);
    };

    updatePath();
    const t1 = setTimeout(updatePath, 150);
    const t2 = setTimeout(updatePath, 500);

    const ro = new ResizeObserver(updatePath);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", updatePath);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [features.length]);

  return (
    <div className={`relative overflow-hidden px-2 py-8 sm:px-5 md:py-12 ${className ?? ""}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "linear-gradient(#d8c5a3 1px, transparent 1px)", backgroundSize: "100% 32px" }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          ref={containerRef}
          className="relative mx-auto flex max-w-[1000px] flex-col gap-8 md:gap-6 md:block md:h-[var(--credentials-height)]"
          style={{ "--credentials-height": `${height}px` } as CSSProperties}
        >
          {/* Desktop Wire */}
          {features.length > 1 && (
            <svg
              className="pointer-events-none absolute left-0 top-0 hidden h-full w-full text-[#a58a65]/35 md:block z-0"
              viewBox={`0 0 1000 ${height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M 290 150 C 500 150, 550 250, 710 250 C 860 250, 520 400, 320 520" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" />
            </svg>
          )}

          {/* Mobile Wire */}
          {mobileWirePath && (
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full text-[#a58a65]/40 md:hidden overflow-visible"
              aria-hidden="true"
            >
              <path
                d={mobileWirePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
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
                className={`relative z-10 w-[88%] max-w-[325px] md:w-[280px] ${position.className} ${position.mobileAlign} transition-transform duration-300 hover:z-30 hover:scale-105 ${clickable ? "cursor-pointer" : ""}`}
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
                <div className={`rounded-[25px] border border-white/[0.08] bg-[#111113] p-2 shadow-[0_10px_20px_rgba(0,0,0,0.3)] ${position.rotate}`}>
                  <div
                    ref={(el) => {
                      pinRefs.current[index] = el;
                    }}
                    className="relative z-20 flex justify-center"
                  >
                    <Pin className={`mx-auto mb-4 h-7 w-7 sm:h-8 sm:w-8 ${colors.text}`} />
                  </div>
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
