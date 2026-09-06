import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

type NavigationAction = string | (() => void);
type TransitionTrigger = (destination: NavigationAction, label?: string) => void;

let globalTransitionTrigger: TransitionTrigger | null = null;

export const navigateWithTransition: TransitionTrigger = (destination, label) => {
  if (globalTransitionTrigger) {
    globalTransitionTrigger(destination, label);
  } else {
    if (typeof destination === "function") {
      destination();
    } else if (destination.startsWith("#")) {
      const el = document.querySelector(destination);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = destination;
    }
  }
};

export function PageTransitionOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const redLayerRef = useRef<HTMLDivElement>(null);
  const blackLayerRef = useRef<HTMLDivElement>(null);
  const pillShapeRef = useRef<HTMLDivElement>(null);
  const circleBadgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const isTransitioningRef = useRef<boolean>(false);
  const [activeLabel, setActiveLabel] = useState<string>("PORTFOLIO");

  const runTransition = useCallback(
    (destination: NavigationAction, label?: string) => {
      if (isTransitioningRef.current) return;

      // Accessibility: Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (typeof destination === "function") {
          destination();
        } else if (destination.startsWith("#")) {
          const el = document.querySelector(destination);
          if (el) el.scrollIntoView({ behavior: "auto" });
        } else {
          window.location.href = destination;
        }
        return;
      }

      isTransitioningRef.current = true;
      const displayLabel = label || (typeof destination === "string" ? destination.replace(/[\/#]/g, "").toUpperCase() || "PORTFOLIO" : "NAVIGATING");
      setActiveLabel(displayLabel);

      const container = containerRef.current;
      const redLayer = redLayerRef.current;
      const blackLayer = blackLayerRef.current;
      const pillShape = pillShapeRef.current;
      const circleBadge = circleBadgeRef.current;
      const title = titleRef.current;
      const meta = metaRef.current;

      if (!container || !redLayer || !blackLayer || !title) {
        if (typeof destination === "function") destination();
        else window.location.href = destination;
        isTransitioningRef.current = false;
        return;
      }

      gsap.set(container, { display: "block", pointerEvents: "auto" });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: "none", pointerEvents: "none" });
          isTransitioningRef.current = false;
        },
      });

      // Initial positions: enters from bottom-right / diagonal
      tl.set(redLayer, { xPercent: 105, yPercent: 50, rotation: 12 });
      tl.set(blackLayer, { xPercent: 105, yPercent: 50, rotation: 12 });
      if (pillShape) tl.set(pillShape, { scale: 0.4, rotation: -45, opacity: 0, x: 120 });
      if (circleBadge) tl.set(circleBadge, { scale: 0, rotation: -90, opacity: 0 });
      tl.set(title, { yPercent: 60, opacity: 0 });
      if (meta) tl.set(meta, { opacity: 0, y: -10 });

      // PHASE 1: Red and Black layers enter diagonally (0.0s - 0.45s)
      tl.to(redLayer, {
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        duration: 0.45,
        ease: "power4.inOut",
      })
        .to(
          blackLayer,
          {
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            duration: 0.45,
            ease: "power4.inOut",
          },
          "-=0.36"
        )
        .to(
          pillShape,
          {
            scale: 1,
            rotation: -35,
            opacity: 1,
            x: 0,
            duration: 0.38,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          circleBadge,
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.32,
            ease: "back.out(2)",
          },
          "-=0.28"
        )
        .to(
          title,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.32,
            ease: "power3.out",
          },
          "-=0.26"
        )
        .to(meta, { opacity: 1, y: 0, duration: 0.22 }, "-=0.2");

      // PHASE 2: Screen is 100% covered -> Perform Navigation Action
      tl.add(() => {
        if (typeof destination === "function") {
          destination();
        } else if (destination.startsWith("#")) {
          const el = document.querySelector(destination);
          if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
          history.pushState(null, "", destination);
        } else {
          window.location.href = destination;
        }
      });

      // Brief pause to allow target DOM to settle
      tl.to({}, { duration: 0.08 });

      // PHASE 3: Reveal Destination by sweeping away to the top-left (0.55s - 0.95s)
      tl.to(title, {
        yPercent: -40,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
      })
        .to(circleBadge, { scale: 0.5, opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.2")
        .to(pillShape, { scale: 1.15, x: -120, opacity: 0, duration: 0.26, ease: "power2.in" }, "-=0.2")
        .to(meta, { opacity: 0, duration: 0.18 }, "-=0.18")
        .to(
          blackLayer,
          {
            xPercent: -105,
            yPercent: -50,
            rotation: -8,
            duration: 0.44,
            ease: "power4.inOut",
          },
          "-=0.08"
        )
        .to(
          redLayer,
          {
            xPercent: -105,
            yPercent: -50,
            rotation: -8,
            duration: 0.42,
            ease: "power4.inOut",
          },
          "-=0.34"
        );
    },
    []
  );

  useEffect(() => {
    globalTransitionTrigger = runTransition;
    return () => {
      globalTransitionTrigger = null;
    };
  }, [runTransition]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] pointer-events-none hidden select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Ask Phill Deep Red (#D62F27) Angular Shutter */}
      <div
        ref={redLayerRef}
        className="absolute inset-[-20%] bg-[#D62F27] shadow-[0_0_120px_rgba(214,47,39,0.5)] will-change-transform"
      />

      {/* Layer 2: Black Main Stage (#0C0C0C) */}
      <div
        ref={blackLayerRef}
        className="absolute inset-[-20%] bg-[#0C0C0C] flex flex-col items-center justify-center overflow-hidden will-change-transform border-l border-white/10"
      >
        {/* Top Agency Metadata Bar */}
        <div
          ref={metaRef}
          className="absolute top-12 left-16 right-16 flex justify-between items-center z-30 pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D62F27] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FAFAFA] uppercase">
              ASHFAQ // EDITORIAL TRANSITION
            </span>
          </div>
          <span className="text-xs font-mono tracking-[0.2em] text-white/40 uppercase">
            SCENE CHANGE ↗
          </span>
        </div>

        {/* Ask Phill Geometric Pill (Red & Off-White) */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
          {/* Diagonal Red Pill Shape */}
          <div
            ref={pillShapeRef}
            className="absolute w-[440px] sm:w-[680px] md:w-[880px] h-[150px] sm:h-[190px] md:h-[240px] rounded-full bg-gradient-to-r from-[#D62F27] to-[#B91C1C] shadow-[0_20px_80px_rgba(214,47,39,0.35)] flex items-center justify-end pr-6 sm:pr-10 will-change-transform z-10"
            style={{ transformOrigin: "center center" }}
          >
            {/* White/Off-white toggle inner circle */}
            <div className="w-[110px] sm:w-[140px] md:w-[180px] h-[110px] sm:h-[140px] md:h-[180px] rounded-full bg-[#FAFAFA] flex items-center justify-center shadow-2xl">
              <span className="text-[#D62F27] text-4xl sm:text-5xl font-black">↗</span>
            </div>
          </div>

          {/* Overlapping Red Circular Plus Badge */}
          <div
            ref={circleBadgeRef}
            className="absolute left-[12%] sm:left-[22%] top-[24%] sm:top-[28%] w-18 sm:w-26 md:w-30 h-18 sm:h-26 md:h-30 rounded-full bg-[#D62F27] text-white flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-20 will-change-transform"
          >
            <span className="text-3xl sm:text-5xl font-black leading-none select-none">+</span>
          </div>

          {/* Oversized Typography */}
          <div className="relative z-30 pointer-events-none text-center px-4 max-w-full">
            <div className="text-xs font-mono tracking-[0.35em] text-[#D62F27] uppercase mb-2 font-bold">
              DESTINATION REVEAL
            </div>
            <h1
              ref={titleRef}
              className="text-[12vw] sm:text-[13vw] md:text-[11vw] font-black uppercase tracking-tighter leading-none text-[#FAFAFA] drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)] will-change-transform"
              style={{
                fontFamily: "'Kanit', sans-serif",
                textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              }}
            >
              {activeLabel}
            </h1>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="absolute bottom-12 left-16 right-16 flex justify-between items-center z-30 border-t border-white/[0.06] pt-4 pointer-events-none">
          <span className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase">
            MOHD ASHFAQ • 2026
          </span>
          <span className="text-xs font-mono tracking-[0.2em] text-[#D62F27] uppercase font-bold">
            PORTFOLIO DIRECTORY
          </span>
        </div>
      </div>
    </div>
  );
}
