import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { navigateToRoute } from "@/routes/AppRouter";

export type TransitionVariant =
  | "work"
  | "experience"
  | "about"
  | "credentials"
  | "resume"
  | "services"
  | "contact";

interface SectionConfig {
  label: string;
  number: string;
  variant: TransitionVariant;
  badge: string;
  themePhrase: string;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  "#home": {
    label: "HOME",
    number: "00",
    variant: "work",
    badge: "OVERVIEW",
    themePhrase: "MOHAMED ASHFAQ // FULL-STACK ARCHITECT",
  },
  "/": {
    label: "HOME",
    number: "00",
    variant: "work",
    badge: "OVERVIEW",
    themePhrase: "MOHAMED ASHFAQ // FULL-STACK ARCHITECT",
  },
  "home": {
    label: "HOME",
    number: "00",
    variant: "work",
    badge: "OVERVIEW",
    themePhrase: "MOHAMED ASHFAQ // FULL-STACK ARCHITECT",
  },
  "#hero": {
    label: "HOME",
    number: "00",
    variant: "work",
    badge: "OVERVIEW",
    themePhrase: "MOHAMED ASHFAQ // FULL-STACK ARCHITECT",
  },
  "#projects": {
    label: "SELECTED WORK",
    number: "01",
    variant: "work",
    badge: "PORTFOLIO & CASE STUDIES",
    themePhrase: "ENGINEERING DIGITAL PRODUCTS",
  },
  "#work": {
    label: "SELECTED WORK",
    number: "01",
    variant: "work",
    badge: "PORTFOLIO & CASE STUDIES",
    themePhrase: "ENGINEERING DIGITAL PRODUCTS",
  },
  "work": {
    label: "SELECTED WORK",
    number: "01",
    variant: "work",
    badge: "PORTFOLIO & CASE STUDIES",
    themePhrase: "ENGINEERING DIGITAL PRODUCTS",
  },
  "#experience": {
    label: "EXPERIENCE",
    number: "02",
    variant: "experience",
    badge: "CAREER TIMELINE",
    themePhrase: "PRODUCTION PROVEN ARCHITECTURE",
  },
  "experience": {
    label: "EXPERIENCE",
    number: "02",
    variant: "experience",
    badge: "CAREER TIMELINE",
    themePhrase: "PRODUCTION PROVEN ARCHITECTURE",
  },
  "#about": {
    label: "ABOUT ME",
    number: "03",
    variant: "about",
    badge: "BIOGRAPHY & MINDSET",
    themePhrase: "FULL-STACK DEVELOPER & DESIGNER",
  },
  "about": {
    label: "ABOUT ME",
    number: "03",
    variant: "about",
    badge: "BIOGRAPHY & MINDSET",
    themePhrase: "FULL-STACK DEVELOPER & DESIGNER",
  },
  "#certifications": {
    label: "CREDENTIALS",
    number: "04",
    variant: "credentials",
    badge: "ACCREDITED HONORS",
    themePhrase: "VERIFIED INDUSTRY SKILLS",
  },
  "#credentials": {
    label: "CREDENTIALS",
    number: "04",
    variant: "credentials",
    badge: "ACCREDITED HONORS",
    themePhrase: "VERIFIED INDUSTRY SKILLS",
  },
  "credentials": {
    label: "CREDENTIALS",
    number: "04",
    variant: "credentials",
    badge: "ACCREDITED HONORS",
    themePhrase: "VERIFIED INDUSTRY SKILLS",
  },
  "certifications": {
    label: "CREDENTIALS",
    number: "04",
    variant: "credentials",
    badge: "ACCREDITED HONORS",
    themePhrase: "VERIFIED INDUSTRY SKILLS",
  },
  "#resume": {
    label: "RESUME",
    number: "CV",
    variant: "resume",
    badge: "CURRICULUM VITAE",
    themePhrase: "FULL-STACK & APPLICATION SECURITY",
  },
  "/resume": {
    label: "RESUME",
    number: "CV",
    variant: "resume",
    badge: "CURRICULUM VITAE",
    themePhrase: "FULL-STACK & APPLICATION SECURITY",
  },
  "resume": {
    label: "RESUME",
    number: "CV",
    variant: "resume",
    badge: "CURRICULUM VITAE",
    themePhrase: "FULL-STACK & APPLICATION SECURITY",
  },
  "#services": {
    label: "SERVICES",
    number: "05",
    variant: "services",
    badge: "CORE CAPABILITIES",
    themePhrase: "END-TO-END SYSTEM ARCHITECTURE",
  },
  "services": {
    label: "SERVICES",
    number: "05",
    variant: "services",
    badge: "CORE CAPABILITIES",
    themePhrase: "END-TO-END SYSTEM ARCHITECTURE",
  },
  "#contact": {
    label: "GET IN TOUCH",
    number: "06",
    variant: "contact",
    badge: "TRANSMISSION & INQUIRY",
    themePhrase: "LET'S BUILD SOMETHING EXCEPTIONAL",
  },
  "/#contact": {
    label: "GET IN TOUCH",
    number: "06",
    variant: "contact",
    badge: "TRANSMISSION & INQUIRY",
    themePhrase: "LET'S BUILD SOMETHING EXCEPTIONAL",
  },
  "contact": {
    label: "GET IN TOUCH",
    number: "06",
    variant: "contact",
    badge: "TRANSMISSION & INQUIRY",
    themePhrase: "LET'S BUILD SOMETHING EXCEPTIONAL",
  },
};

type TransitionHandler = (target: string, label?: string) => void;
let globalTransitionHandler: TransitionHandler | null = null;

export const navigateToSection: TransitionHandler = (target, label) => {
  if (globalTransitionHandler) {
    globalTransitionHandler(target, label);
  } else {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

export function CinematicTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const currentTlRef = useRef<gsap.core.Timeline | null>(null);
  const failsafeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [activeConfig, setActiveConfig] = useState<SectionConfig>(
    SECTION_CONFIGS["#projects"]
  );

  // Common curtain layers
  const leadBladeRef = useRef<HTMLDivElement>(null);
  const mainStageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerMetaRef = useRef<HTMLDivElement>(null);
  const footerMetaRef = useRef<HTMLDivElement>(null);

  // Section Graphic Container Refs (always permanently mounted in DOM)
  const workContainerRef = useRef<HTMLDivElement>(null);
  const expContainerRef = useRef<HTMLDivElement>(null);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const credContainerRef = useRef<HTMLDivElement>(null);
  const resumeContainerRef = useRef<HTMLDivElement>(null);
  const serviceContainerRef = useRef<HTMLDivElement>(null);
  const contactContainerRef = useRef<HTMLDivElement>(null);

  // 1. WORK: Project preview cards stack refs
  const workCard1Ref = useRef<HTMLDivElement>(null);
  const workCard2Ref = useRef<HTMLDivElement>(null);
  const workCard3Ref = useRef<HTMLDivElement>(null);

  // 2. EXPERIENCE: Animated timeline track & nodes refs
  const expTrackRef = useRef<HTMLDivElement>(null);
  const expNodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3. ABOUT: Orbiting monogram disc & circular rings refs
  const aboutOrbitRef = useRef<HTMLDivElement>(null);
  const aboutMonogramRef = useRef<HTMLDivElement>(null);

  // 4. CREDENTIALS: Golden verified seal & ribbon refs
  const credSealRef = useRef<HTMLDivElement>(null);
  const credRibbonRef = useRef<HTMLDivElement>(null);

  // 5. SERVICES: Modular system building blocks refs
  const serviceBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 6. CONTACT: Live radar beacon & transmission prompt refs
  const contactBeaconRef = useRef<HTMLDivElement>(null);
  const contactPromptRef = useRef<HTMLDivElement>(null);

  // 7. RESUME: Dual document sheets & CV badge refs
  const resumeSheet1Ref = useRef<HTMLDivElement>(null);
  const resumeSheet2Ref = useRef<HTMLDivElement>(null);
  const resumeBadgeRef = useRef<HTMLDivElement>(null);

  // Full reset of all transition elements and GSAP transforms to clean initial state
  const resetAllTransitionElements = useCallback(() => {
    if (failsafeTimerRef.current) {
      clearTimeout(failsafeTimerRef.current);
      failsafeTimerRef.current = null;
    }
    if (currentTlRef.current) {
      currentTlRef.current.kill();
      currentTlRef.current = null;
    }

    const container = containerRef.current;
    const leadBlade = leadBladeRef.current;
    const mainStage = mainStageRef.current;
    const title = titleRef.current;
    const headerMeta = headerMetaRef.current;
    const footerMeta = footerMetaRef.current;

    const allAnimatedElements = [
      container,
      leadBlade,
      mainStage,
      title,
      headerMeta,
      footerMeta,
      workCard1Ref.current,
      workCard2Ref.current,
      workCard3Ref.current,
      expTrackRef.current,
      ...(expNodeRefs.current || []),
      aboutOrbitRef.current,
      aboutMonogramRef.current,
      credSealRef.current,
      credRibbonRef.current,
      resumeSheet1Ref.current,
      resumeSheet2Ref.current,
      resumeBadgeRef.current,
      ...(serviceBlockRefs.current || []),
      contactBeaconRef.current,
      contactPromptRef.current,
    ].filter(Boolean) as HTMLElement[];

    gsap.killTweensOf(allAnimatedElements);

    if (container) {
      gsap.set(container, { display: "none", pointerEvents: "none" });
    }

    if (leadBlade) {
      gsap.set(leadBlade, {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        scale: 1,
        opacity: 1,
        clearProps: "transform,opacity",
      });
    }

    if (mainStage) {
      gsap.set(mainStage, {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        scale: 1,
        opacity: 1,
        clearProps: "transform,opacity",
      });
    }

    if (title) {
      gsap.set(title, {
        xPercent: 0,
        yPercent: 40,
        opacity: 0,
        clearProps: "transform,opacity",
      });
    }

    if (headerMeta) {
      gsap.set(headerMeta, { opacity: 0, y: -10, clearProps: "transform,opacity" });
    }

    if (footerMeta) {
      gsap.set(footerMeta, { opacity: 0, y: 10, clearProps: "transform,opacity" });
    }

    // Hide all graphic variant containers
    const variantContainers = [
      workContainerRef.current,
      expContainerRef.current,
      aboutContainerRef.current,
      credContainerRef.current,
      resumeContainerRef.current,
      serviceContainerRef.current,
      contactContainerRef.current,
    ];
    variantContainers.forEach((el) => {
      if (el) el.style.display = "none";
    });

    // Reset all child elements in graphics
    const childGraphicElements = [
      workCard1Ref.current,
      workCard2Ref.current,
      workCard3Ref.current,
      expTrackRef.current,
      ...(expNodeRefs.current || []),
      aboutOrbitRef.current,
      aboutMonogramRef.current,
      credSealRef.current,
      credRibbonRef.current,
      resumeSheet1Ref.current,
      resumeSheet2Ref.current,
      resumeBadgeRef.current,
      ...(serviceBlockRefs.current || []),
      contactBeaconRef.current,
      contactPromptRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (childGraphicElements.length > 0) {
      gsap.set(childGraphicElements, { clearProps: "transform,opacity" });
    }
  }, []);

  const runTransition = useCallback((targetId: string, customLabel?: string) => {
    // Prevent double clicking during transition
    if (isTransitioningRef.current) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (targetId === "/resume" || targetId === "/resume/") {
        navigateToRoute("/resume");
      } else if (targetId === "#home" || targetId === "/" || targetId === "home" || targetId === "#hero") {
        window.scrollTo({ top: 0, behavior: "auto" });
        history.pushState(null, "", targetId.startsWith("#") ? targetId : `/${targetId}`);
      } else {
        const targetElement = document.querySelector(targetId.startsWith("#") ? targetId : `#${targetId}`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "auto" });
          history.pushState(null, "", targetId);
        }
      }
      return;
    }

    // Normalize target identifier
    const isResume = targetId === "/resume" || targetId === "/resume/" || targetId === "#resume" || targetId === "resume";
    const isContact = targetId === "#contact" || targetId === "/#contact" || targetId === "contact";
    const isHome = targetId === "#home" || targetId === "/" || targetId === "home" || targetId === "#hero";

    let lookupKey = targetId;
    if (isResume) {
      lookupKey = "/resume";
    } else if (isContact) {
      lookupKey = "#contact";
    } else if (isHome) {
      lookupKey = "#home";
    } else if (!targetId.startsWith("#") && !targetId.startsWith("/")) {
      lookupKey = `#${targetId}`;
    }

    const matchedConfig =
      SECTION_CONFIGS[lookupKey] ||
      SECTION_CONFIGS[targetId] ||
      SECTION_CONFIGS[`#${targetId.replace(/^[#/]+/, "")}`] || {
        label: customLabel || targetId.replace(/^[#/]+/, "").toUpperCase(),
        number: "00",
        variant: "work" as TransitionVariant,
        badge: "SECTION",
        themePhrase: "EXPLORE PORTFOLIO",
      };

    setActiveConfig(matchedConfig);

    // Reset all elements from any previous transition before starting new one
    resetAllTransitionElements();
    isTransitioningRef.current = true;

    const container = containerRef.current;
    const leadBlade = leadBladeRef.current;
    const mainStage = mainStageRef.current;
    const title = titleRef.current;
    const headerMeta = headerMetaRef.current;
    const footerMeta = footerMetaRef.current;

    if (!container || !leadBlade || !mainStage || !title) {
      if (isResume) {
        navigateToRoute("/resume");
      } else if (isHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetElement = document.querySelector(targetId.startsWith("#") ? targetId : `#${targetId}`);
        if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
      }
      isTransitioningRef.current = false;
      return;
    }

    const v = matchedConfig.variant;

    // Synchronously update transition labels in DOM
    if (title) title.textContent = matchedConfig.label;
    if (headerMeta) {
      const metaBadge = headerMeta.querySelector(".header-section-meta");
      if (metaBadge) metaBadge.textContent = `SECTION ${matchedConfig.number} // ${matchedConfig.badge}`;
      const metaPhrase = headerMeta.querySelector(".header-theme-phrase");
      if (metaPhrase) metaPhrase.textContent = matchedConfig.themePhrase;
    }

    // Synchronously toggle display on permanently mounted variant containers
    const containers = [
      { id: "work", el: workContainerRef.current },
      { id: "experience", el: expContainerRef.current },
      { id: "about", el: aboutContainerRef.current },
      { id: "credentials", el: credContainerRef.current },
      { id: "resume", el: resumeContainerRef.current },
      { id: "services", el: serviceContainerRef.current },
      { id: "contact", el: contactContainerRef.current },
    ];

    containers.forEach(({ id, el }) => {
      if (el) {
        el.style.display = id === v ? (id === "experience" ? "block" : "flex") : "none";
      }
    });

    // Activate transition container
    gsap.set(container, { display: "block", pointerEvents: "auto" });

    // Helper: Position browser or navigate route instantly while 100% occluded
    const performScroll = () => {
      if (isResume) {
        navigateToRoute("/resume");
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        return;
      }

      const onResumePage =
        window.location.pathname === "/resume" ||
        window.location.pathname === "/resume/" ||
        window.location.hash.includes("resume");

      if (isHome) {
        if (onResumePage) {
          navigateToRoute("/");
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
            history.pushState(null, "", "/");
          }, 20);
          return;
        }
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        history.pushState(null, "", "#home");
        return;
      }

      const sectionHash = targetId.startsWith("#")
        ? targetId
        : targetId.includes("#")
        ? targetId.substring(targetId.indexOf("#"))
        : `#${targetId.replace(/^\//, "")}`;

      if (onResumePage) {
        navigateToRoute("/");
        let attempts = 0;
        const scrollToTarget = () => {
          const el = document.querySelector(sectionHash);
          if (el) {
            const navbarOffset = 70;
            const top = el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
            window.scrollTo({ top: Math.max(0, top), behavior: "instant" as ScrollBehavior });
            history.pushState(null, "", sectionHash);
          } else if (attempts < 25) {
            attempts++;
            setTimeout(scrollToTarget, 40);
          }
        };
        setTimeout(scrollToTarget, 20);
        return;
      }

      const targetElement = document.querySelector(sectionHash);
      if (targetElement) {
        const html = document.documentElement;
        const prevBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";

        const navbarOffset = 70;
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: "instant" as ScrollBehavior,
        });

        html.style.scrollBehavior = prevBehavior;
        history.pushState(null, "", sectionHash);
      }
    };

    // Failsafe timer to unlock transition state in case anything unexpected happens
    failsafeTimerRef.current = setTimeout(() => {
      resetAllTransitionElements();
      isTransitioningRef.current = false;
    }, 1600);

    const tl = gsap.timeline({
      onComplete: () => {
        resetAllTransitionElements();
        isTransitioningRef.current = false;
      },
    });
    currentTlRef.current = tl;

    const safeMeta = [headerMeta, footerMeta].filter(Boolean) as HTMLElement[];

    // Reset common header & footer
    if (title) tl.set(title, { yPercent: 40, opacity: 0 });
    if (headerMeta) tl.set(headerMeta, { opacity: 0, y: -10 });
    if (footerMeta) tl.set(footerMeta, { opacity: 0, y: 10 });

    // =========================================================================
    // 1. WORK / HOME: Fanning Project Preview Cards & Launch Badge
    // =========================================================================
    if (v === "work") {
      const c1 = workCard1Ref.current;
      const c2 = workCard2Ref.current;
      const c3 = workCard3Ref.current;
      const cards = [c1, c2, c3].filter(Boolean) as HTMLElement[];

      tl.set(leadBlade, { xPercent: -101, yPercent: 0, skewX: -8, skewY: 0, opacity: 1 });
      tl.set(mainStage, { xPercent: -101, yPercent: 0, skewX: -8, skewY: 0, opacity: 1 });
      if (c1) tl.set(c1, { scale: 0.6, rotation: -18, opacity: 0, x: -60, y: 0 });
      if (c2) tl.set(c2, { scale: 0.6, rotation: 0, opacity: 0, x: 0, y: 40 });
      if (c3) tl.set(c3, { scale: 0.6, rotation: 18, opacity: 0, x: 60, y: 0 });

      // IN
      tl.to(leadBlade, { xPercent: 0, skewX: 0, duration: 0.36, ease: "power4.inOut" })
        .to(mainStage, { xPercent: 0, skewX: 0, duration: 0.38, ease: "power4.inOut" }, "-=0.32");

      if (cards.length > 0) {
        tl.to(cards, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          rotation: (i) => (i === 0 ? -6 : i === 1 ? 0 : 6),
          duration: 0.34,
          stagger: 0.05,
          ease: "back.out(1.8)",
        }, "-=0.22");
      }

      if (title) tl.to(title, { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, "-=0.25");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 1, y: 0, duration: 0.22 }, "-=0.2");

      // COVERED JUMP
      tl.add(performScroll);
      tl.to({}, { duration: 0.06 });

      // OUT
      if (cards.length > 0) {
        tl.to(cards, {
          scale: 1.15,
          opacity: 0,
          x: (i) => (i === 0 ? -80 : i === 1 ? 0 : 80),
          duration: 0.25,
          ease: "power2.in",
        });
      }
      if (title) tl.to(title, { yPercent: -40, opacity: 0, duration: 0.22, ease: "power2.in" }, "-=0.22");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 0, duration: 0.18 }, "-=0.18");
      tl.to(mainStage, { xPercent: 101, skewX: -8, duration: 0.38, ease: "power4.inOut" }, "-=0.08")
        .to(leadBlade, { xPercent: 101, skewX: -8, duration: 0.36, ease: "power4.inOut" }, "-=0.32");
    }

    // =========================================================================
    // 2. EXPERIENCE: Drawing Milestone Career Track & Nodes
    // =========================================================================
    else if (v === "experience") {
      const track = expTrackRef.current;
      const nodes = expNodeRefs.current.filter(Boolean) as HTMLElement[];

      tl.set(leadBlade, { xPercent: 0, yPercent: -101, skewX: 0, skewY: 0, opacity: 1 });
      tl.set(mainStage, { xPercent: 0, yPercent: -101, skewX: 0, skewY: 0, opacity: 1 });
      if (track) tl.set(track, { scaleX: 0, transformOrigin: "left center" });
      nodes.forEach((n) => tl.set(n, { scale: 0, opacity: 0 }));

      // IN
      tl.to(leadBlade, { yPercent: 0, duration: 0.34, ease: "power3.inOut" })
        .to(mainStage, { yPercent: 0, duration: 0.36, ease: "power3.inOut" }, "-=0.3");

      if (track) tl.to(track, { scaleX: 1, duration: 0.32, ease: "power2.out" }, "-=0.22");
      if (nodes.length > 0) tl.to(nodes, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.26, ease: "back.out(2)" }, "-=0.25");
      if (title) tl.to(title, { yPercent: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 1, y: 0, duration: 0.2 }, "-=0.18");

      // COVERED JUMP
      tl.add(performScroll);
      tl.to({}, { duration: 0.06 });

      // OUT
      if (nodes.length > 0) tl.to(nodes, { scale: 0, opacity: 0, duration: 0.2, stagger: 0.04, ease: "power2.in" });
      if (track) tl.to(track, { scaleX: 0, duration: 0.22, ease: "power2.in" }, "-=0.18");
      if (title) tl.to(title, { yPercent: 30, opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 0, duration: 0.16 }, "-=0.16");
      tl.to(mainStage, { yPercent: 101, duration: 0.36, ease: "power3.inOut" }, "-=0.08")
        .to(leadBlade, { yPercent: 101, duration: 0.34, ease: "power3.inOut" }, "-=0.3");
    }

    // =========================================================================
    // 3. ABOUT: Kinetic Orbit Ring & Monogram Disc
    // =========================================================================
    else if (v === "about") {
      const orbit = aboutOrbitRef.current;
      const monogram = aboutMonogramRef.current;

      tl.set(leadBlade, { xPercent: -101, yPercent: 0, skewX: 6, skewY: 0, opacity: 1 });
      tl.set(mainStage, { xPercent: -101, yPercent: 0, skewX: 6, skewY: 0, opacity: 1 });
      if (orbit) tl.set(orbit, { scale: 0.2, rotation: -90, opacity: 0 });
      if (monogram) tl.set(monogram, { scale: 0.5, opacity: 0 });

      // IN
      tl.to(leadBlade, { xPercent: 0, skewX: 0, duration: 0.36, ease: "power4.inOut" })
        .to(mainStage, { xPercent: 0, skewX: 0, duration: 0.38, ease: "power4.inOut" }, "-=0.32");

      if (orbit) tl.to(orbit, { scale: 1, rotation: 0, opacity: 1, duration: 0.35, ease: "expo.out" }, "-=0.24");
      if (monogram) tl.to(monogram, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.8)" }, "-=0.26");
      if (title) tl.to(title, { yPercent: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, "-=0.22");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 1, y: 0, duration: 0.2 }, "-=0.18");

      // COVERED JUMP
      tl.add(performScroll);
      tl.to({}, { duration: 0.06 });

      // OUT
      if (monogram) tl.to(monogram, { scale: 1.4, opacity: 0, duration: 0.22, ease: "power2.in" });
      if (orbit) tl.to(orbit, { scale: 1.8, rotation: 45, opacity: 0, duration: 0.26, ease: "power2.in" }, "-=0.2");
      if (title) tl.to(title, { yPercent: -30, opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 0, duration: 0.16 }, "-=0.16");
      tl.to(mainStage, { xPercent: 101, skewX: 6, duration: 0.38, ease: "power4.inOut" }, "-=0.08")
        .to(leadBlade, { xPercent: 101, skewX: 6, duration: 0.36, ease: "power4.inOut" }, "-=0.32");
    }

    // =========================================================================
    // 4. CREDENTIALS: Precision Verified Stamp & Seal
    // =========================================================================
    else if (v === "credentials") {
      const seal = credSealRef.current;
      const ribbon = credRibbonRef.current;

      tl.set(leadBlade, { xPercent: 101, yPercent: 0, skewX: -6, skewY: 0, opacity: 1 });
      tl.set(mainStage, { xPercent: 101, yPercent: 0, skewX: -6, skewY: 0, opacity: 1 });
      if (seal) tl.set(seal, { scale: 1.8, opacity: 0, rotation: 30 });
      if (ribbon) tl.set(ribbon, { scaleX: 0, opacity: 0 });

      // IN
      tl.to(leadBlade, { xPercent: 0, skewX: 0, duration: 0.36, ease: "power4.inOut" })
        .to(mainStage, { xPercent: 0, skewX: 0, duration: 0.38, ease: "power4.inOut" }, "-=0.32");

      if (seal) tl.to(seal, { scale: 1, opacity: 1, rotation: 0, duration: 0.32, ease: "back.out(2.2)" }, "-=0.22");
      if (ribbon) tl.to(ribbon, { scaleX: 1, opacity: 1, duration: 0.28, ease: "expo.out" }, "-=0.2");
      if (title) tl.to(title, { yPercent: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 1, y: 0, duration: 0.2 }, "-=0.18");

      // COVERED JUMP
      tl.add(performScroll);
      tl.to({}, { duration: 0.06 });

      // OUT
      const credOut = [seal, ribbon, title].filter(Boolean) as HTMLElement[];
      if (credOut.length > 0) tl.to(credOut, { opacity: 0, y: -20, duration: 0.22, ease: "power2.in" });
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 0, duration: 0.16 }, "-=0.18");
      tl.to(mainStage, { xPercent: -101, skewX: -6, duration: 0.38, ease: "power4.inOut" }, "-=0.08")
        .to(leadBlade, { xPercent: -101, skewX: -6, duration: 0.36, ease: "power4.inOut" }, "-=0.32");
    }

    // =========================================================================
    // RESUME: Dual Document Sheets & Official CV Badge
    // =========================================================================
    else if (v === "resume") {
      const s1 = resumeSheet1Ref.current;
      const s2 = resumeSheet2Ref.current;
      const badge = resumeBadgeRef.current;
      const sheets = [s1, s2].filter(Boolean) as HTMLElement[];

      tl.set(leadBlade, { xPercent: 101, yPercent: 0, skewX: -6, skewY: 0, opacity: 1 });
      tl.set(mainStage, { xPercent: 101, yPercent: 0, skewX: -6, skewY: 0, opacity: 1 });
      if (s1) tl.set(s1, { scale: 0.6, rotation: -16, opacity: 0, x: -70 });
      if (s2) tl.set(s2, { scale: 0.6, rotation: 16, opacity: 0, x: 70 });
      if (badge) tl.set(badge, { scale: 0, rotation: -45, opacity: 0 });

      // IN
      tl.to(leadBlade, { xPercent: 0, skewX: 0, duration: 0.36, ease: "power4.inOut" })
        .to(mainStage, { xPercent: 0, skewX: 0, duration: 0.38, ease: "power4.inOut" }, "-=0.32");

      if (sheets.length > 0) {
        tl.to(sheets, {
          scale: 1,
          opacity: 1,
          x: (i) => (i === 0 ? -16 : 16),
          rotation: (i) => (i === 0 ? -4 : 4),
          duration: 0.34,
          stagger: 0.05,
          ease: "back.out(1.8)",
        }, "-=0.22");
      }

      if (badge) tl.to(badge, { scale: 1, rotation: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.22");
      if (title) tl.to(title, { yPercent: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 1, y: 0, duration: 0.2 }, "-=0.18");

      // COVERED JUMP
      tl.add(performScroll);
      tl.to({}, { duration: 0.06 });

      // OUT
      if (sheets.length > 0) {
        tl.to(sheets, {
          scale: 1.15,
          opacity: 0,
          x: (i) => (i === 0 ? -90 : 90),
          duration: 0.22,
          ease: "power2.in",
        });
      }
      if (badge) tl.to(badge, { scale: 0.5, opacity: 0, duration: 0.2 }, "-=0.2");
      if (title) tl.to(title, { yPercent: -30, opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 0, duration: 0.16 }, "-=0.16");
      tl.to(mainStage, { xPercent: -101, skewX: -6, duration: 0.38, ease: "power4.inOut" }, "-=0.08")
        .to(leadBlade, { xPercent: -101, skewX: -6, duration: 0.36, ease: "power4.inOut" }, "-=0.32");
    }

    // =========================================================================
    // 5. SERVICES: Architecture Modular Building Blocks
    // =========================================================================
    else if (v === "services") {
      const blocks = serviceBlockRefs.current.filter(Boolean) as HTMLElement[];

      tl.set(leadBlade, { xPercent: 0, yPercent: 101, skewX: 0, skewY: 0, opacity: 1 });
      tl.set(mainStage, { xPercent: 0, yPercent: 101, skewX: 0, skewY: 0, opacity: 1 });
      if (blocks.length > 0) {
        blocks.forEach((b, i) => {
          tl.set(b, {
            y: i % 2 === 0 ? 50 : -50,
            opacity: 0,
            scale: 0.8,
          });
        });
      }

      // IN
      tl.to(leadBlade, { yPercent: 0, duration: 0.34, ease: "power3.inOut" })
        .to(mainStage, { yPercent: 0, duration: 0.36, ease: "power3.inOut" }, "-=0.3");

      if (blocks.length > 0) {
        tl.to(blocks, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.06,
          ease: "back.out(1.8)",
        }, "-=0.22");
      }

      if (title) tl.to(title, { yPercent: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, "-=0.22");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 1, y: 0, duration: 0.2 }, "-=0.18");

      // COVERED JUMP
      tl.add(performScroll);
      tl.to({}, { duration: 0.06 });

      // OUT
      if (blocks.length > 0) {
        tl.to(blocks, {
          opacity: 0,
          scale: 0.85,
          y: (i) => (i % 2 === 0 ? -40 : 40),
          duration: 0.2,
          stagger: 0.04,
          ease: "power2.in",
        });
      }
      if (title) tl.to(title, { yPercent: -30, opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 0, duration: 0.16 }, "-=0.16");
      tl.to(mainStage, { yPercent: -101, duration: 0.36, ease: "power3.inOut" }, "-=0.08")
        .to(leadBlade, { yPercent: -101, duration: 0.34, ease: "power3.inOut" }, "-=0.3");
    }

    // =========================================================================
    // 6. CONTACT: Transmission Signal & Active Terminal
    // =========================================================================
    else if (v === "contact") {
      const beacon = contactBeaconRef.current;
      const prompt = contactPromptRef.current;

      tl.set(leadBlade, { xPercent: -101, yPercent: 0, skewX: -6, skewY: 0, opacity: 1 });
      tl.set(mainStage, { xPercent: -101, yPercent: 0, skewX: -6, skewY: 0, opacity: 1 });
      if (beacon) tl.set(beacon, { scale: 0.3, opacity: 0 });
      if (prompt) tl.set(prompt, { y: 25, opacity: 0 });

      // IN
      tl.to(leadBlade, { xPercent: 0, skewX: 0, duration: 0.36, ease: "power4.inOut" })
        .to(mainStage, { xPercent: 0, skewX: 0, duration: 0.38, ease: "power4.inOut" }, "-=0.32");

      if (beacon) tl.to(beacon, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.24");
      if (prompt) tl.to(prompt, { y: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, "-=0.22");
      if (title) tl.to(title, { yPercent: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, "-=0.2");
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 1, y: 0, duration: 0.2 }, "-=0.18");

      // COVERED JUMP
      tl.add(performScroll);
      tl.to({}, { duration: 0.06 });

      // OUT
      const contactOut = [beacon, prompt, title].filter(Boolean) as HTMLElement[];
      if (contactOut.length > 0) tl.to(contactOut, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" });
      if (safeMeta.length > 0) tl.to(safeMeta, { opacity: 0, duration: 0.16 }, "-=0.16");
      tl.to(mainStage, { xPercent: 101, skewX: -6, duration: 0.38, ease: "power4.inOut" }, "-=0.08")
        .to(leadBlade, { xPercent: 101, skewX: -6, duration: 0.36, ease: "power4.inOut" }, "-=0.32");
    }
  }, [resetAllTransitionElements]);

  useEffect(() => {
    globalTransitionHandler = runTransition;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const isTarget =
        href === "/resume" ||
        href === "/resume/" ||
        href === "/" ||
        href === "/#contact" ||
        (href.startsWith("#") && href.length > 1);

      if (isTarget) {
        // If clicking external or download links, don't intercept
        if (anchor.getAttribute("download") || anchor.getAttribute("target") === "_blank") {
          return;
        }

        e.preventDefault();
        const textLabel = anchor.textContent?.trim() || undefined;
        runTransition(href, textLabel);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      globalTransitionHandler = null;
      document.removeEventListener("click", handleDocumentClick);
      resetAllTransitionElements();
      isTransitioningRef.current = false;
    };
  }, [runTransition, resetAllTransitionElements]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      {/* 1. Leading Gold Shutter Blade */}
      <div
        ref={leadBladeRef}
        className="absolute inset-0 bg-[#d8c5a3] shadow-2xl will-change-transform"
      />

      {/* 2. Main High-End Dark Stage */}
      <div
        ref={mainStageRef}
        className="absolute inset-0 bg-[#0C0C0C] flex flex-col justify-between overflow-hidden will-change-transform px-4 sm:px-12 py-6 sm:py-10"
      >
        {/* Subtle geometric grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#d8c5a3 1px, transparent 1px), linear-gradient(90deg, #d8c5a3 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ------------------------------------------------------------- */}
        {/* TOP EDITORIAL HEADER                                           */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={headerMetaRef}
          className="relative z-30 flex items-center justify-between border-b border-white/[0.06] pb-3 sm:pb-4 will-change-transform"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#d8c5a3] animate-pulse" />
            <span className="header-section-meta text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#d8c5a3] uppercase">
              SECTION {activeConfig.number} // {activeConfig.badge}
            </span>
          </div>
          <div className="header-theme-phrase hidden sm:block text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase">
            {activeConfig.themePhrase}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CENTER CONTENT WITH THEMATIC RELATED ANIMATION                */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 flex flex-col items-center justify-center my-auto text-center w-full px-2">
          {/* =========================================================== */}
          {/* 1. WORK ANIMATION: Project Card Previews Fan-Out             */}
          {/* =========================================================== */}
          <div
            ref={workContainerRef}
            className="relative w-full max-w-[280px] sm:max-w-[460px] h-18 sm:h-24 mb-3 sm:mb-4 items-center justify-center pointer-events-none"
            style={{ display: "none" }}
          >
            {/* Card 1 */}
            <div
              ref={workCard1Ref}
              className="absolute w-36 sm:w-56 h-14 sm:h-20 rounded-xl bg-[#18181b] border border-[#d8c5a3]/30 flex items-center justify-between px-3 sm:px-4 shadow-xl will-change-transform"
            >
              <div className="w-2 h-2 rounded-full bg-[#d8c5a3]" />
              <span className="text-[9px] sm:text-[10px] font-mono text-[#d8c5a3] tracking-widest uppercase">
                APP SYSTEM
              </span>
              <span className="text-white/30 text-xs font-mono">01</span>
            </div>
            {/* Card 2 (Center) */}
            <div
              ref={workCard2Ref}
              className="absolute w-40 sm:w-60 h-16 sm:h-22 rounded-xl bg-[#201d18] border-2 border-[#d8c5a3] flex items-center justify-between px-3.5 sm:px-5 shadow-2xl z-10 will-change-transform"
            >
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#d8c5a3] tracking-widest uppercase">
                CASE STUDY
              </span>
              <span className="text-sm font-black text-[#d8c5a3]">↗</span>
            </div>
            {/* Card 3 */}
            <div
              ref={workCard3Ref}
              className="absolute w-36 sm:w-56 h-14 sm:h-20 rounded-xl bg-[#18181b] border border-[#d8c5a3]/30 flex items-center justify-between px-3 sm:px-4 shadow-xl will-change-transform"
            >
              <span className="text-white/30 text-xs font-mono">03</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#d8c5a3] tracking-widest uppercase">
                WEB PLATFORM
              </span>
              <div className="w-2 h-2 rounded-full bg-[#d8c5a3]" />
            </div>
          </div>

          {/* =========================================================== */}
          {/* 2. EXPERIENCE ANIMATION: Career Timeline & Milestones Track  */}
          {/* =========================================================== */}
          <div
            ref={expContainerRef}
            className="w-full max-w-[280px] sm:max-w-[520px] mb-4 sm:mb-5 pointer-events-none"
            style={{ display: "none" }}
          >
            {/* Track Line */}
            <div
              ref={expTrackRef}
              className="w-full h-[2px] bg-gradient-to-r from-[#d8c5a3]/20 via-[#d8c5a3] to-[#d8c5a3]/20 relative flex items-center justify-between will-change-transform"
            >
              {[
                { yr: "FOUNDATION", label: "2023" },
                { yr: "FULL-STACK", label: "2024" },
                { yr: "LEAD ARCH", label: "PRESENT" },
              ].map((node, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    expNodeRefs.current[i] = el;
                  }}
                  className="flex flex-col items-center will-change-transform"
                >
                  <div className="w-3.5 sm:w-5 h-3.5 sm:h-5 rounded-full bg-[#0C0C0C] border-2 border-[#d8c5a3] flex items-center justify-center shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d8c5a3]" />
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider sm:tracking-widest text-[#d8c5a3] mt-1.5 sm:mt-2 whitespace-nowrap">
                    {node.yr}
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-mono text-white/30">{node.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================== */}
          {/* 3. ABOUT ANIMATION: Identity Orbit Ring & Monogram Disc     */}
          {/* =========================================================== */}
          <div
            ref={aboutContainerRef}
            className="relative w-24 sm:w-36 h-24 sm:h-36 mb-3 sm:mb-4 items-center justify-center pointer-events-none"
            style={{ display: "none" }}
          >
            {/* Outer Orbit Dashed Ring */}
            <div
              ref={aboutOrbitRef}
              className="absolute inset-0 rounded-full border border-dashed border-[#d8c5a3]/50 will-change-transform animate-[spin_12s_linear_infinite]"
            />
            {/* Central Monogram Badge */}
            <div
              ref={aboutMonogramRef}
              className="w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-gradient-to-br from-[#d8c5a3] to-[#a58a65] text-[#0C0C0C] flex flex-col items-center justify-center shadow-xl will-change-transform"
            >
              <span className="text-lg sm:text-2xl font-black tracking-tight leading-none">
                MA
              </span>
              <span className="text-[7px] sm:text-[8px] font-mono font-bold uppercase tracking-widest mt-0.5">
                DEV
              </span>
            </div>
          </div>

          {/* =========================================================== */}
          {/* 4. CREDENTIALS ANIMATION: Verified Stamp & Ribbon Seal       */}
          {/* =========================================================== */}
          <div
            ref={credContainerRef}
            className="flex-col items-center mb-3 sm:mb-4 pointer-events-none"
            style={{ display: "none" }}
          >
            {/* Verified Stamp Seal */}
            <div
              ref={credSealRef}
              className="w-16 sm:w-24 h-16 sm:h-24 rounded-xl sm:rounded-2xl bg-[#14120e] border-2 border-[#d8c5a3] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(216,197,163,0.2)] will-change-transform"
            >
              <span className="text-xl sm:text-3xl text-[#d8c5a3] mb-0.5">★</span>
              <span className="text-[7px] sm:text-[8px] font-mono font-bold tracking-[0.2em] text-[#d8c5a3] uppercase">
                VERIFIED
              </span>
            </div>
            {/* Ribbon bar */}
            <div
              ref={credRibbonRef}
              className="w-36 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#d8c5a3] to-transparent mt-2.5 sm:mt-3 will-change-transform"
            />
          </div>

          {/* =========================================================== */}
          {/* RESUME ANIMATION: Dual Document Sheets & Official CV Badge  */}
          {/* =========================================================== */}
          <div
            ref={resumeContainerRef}
            className="relative w-full max-w-[290px] sm:max-w-[480px] h-20 sm:h-28 mb-3 sm:mb-4 items-center justify-center pointer-events-none"
            style={{ display: "none" }}
          >
            {/* Document Sheet 1 */}
            <div
              ref={resumeSheet1Ref}
              className="absolute w-36 sm:w-56 h-16 sm:h-24 rounded-xl bg-[#14120e] border border-[#d8c5a3]/40 shadow-xl p-2.5 sm:p-3 flex flex-col justify-between will-change-transform"
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] sm:text-[9px] font-mono text-[#d8c5a3] font-bold">MOHAMED ASHFAQ</span>
                <span className="text-[7px] sm:text-[8px] font-mono text-white/30">PG 01</span>
              </div>
              <div className="w-full space-y-1">
                <div className="w-3/4 h-1 bg-[#d8c5a3]/30 rounded-full" />
                <div className="w-1/2 h-1 bg-[#d8c5a3]/20 rounded-full" />
              </div>
            </div>
            {/* Document Sheet 2 */}
            <div
              ref={resumeSheet2Ref}
              className="absolute w-36 sm:w-56 h-16 sm:h-24 rounded-xl bg-[#1c1a16] border-2 border-[#d8c5a3] shadow-2xl p-2.5 sm:p-3 flex flex-col justify-between z-10 will-change-transform"
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] sm:text-[9px] font-mono text-[#d8c5a3] font-bold">FULL-STACK & SECURITY</span>
                <span className="text-[7px] sm:text-[8px] font-mono text-[#d8c5a3]">PG 02</span>
              </div>
              <div className="w-full space-y-1">
                <div className="w-full h-1 bg-[#d8c5a3]/40 rounded-full" />
                <div className="w-2/3 h-1 bg-[#d8c5a3]/30 rounded-full" />
              </div>
            </div>
            {/* Official CV Badge */}
            <div
              ref={resumeBadgeRef}
              className="absolute -top-2.5 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-[#d8c5a3] text-[#0C0C0C] flex items-center justify-center font-black text-xs sm:text-sm shadow-xl z-20 will-change-transform"
            >
              CV
            </div>
          </div>

          {/* =========================================================== */}
          {/* 5. SERVICES ANIMATION: Architecture Modular Building Blocks  */}
          {/* =========================================================== */}
          <div
            ref={serviceContainerRef}
            className="flex-wrap items-center justify-center gap-1.5 sm:gap-3 max-w-[360px] sm:max-w-[420px] mb-3 sm:mb-4 pointer-events-none"
            style={{ display: "none" }}
          >
            {[
              { tag: "FULL-STACK WEB", icon: "⚡" },
              { tag: "MOBILE APPS", icon: "📱" },
              { tag: "CLOUD ARCH", icon: "☁" },
              { tag: "API SYSTEMS", icon: "✦" },
            ].map((blk, i) => (
              <div
                key={i}
                ref={(el) => {
                  serviceBlockRefs.current[i] = el;
                }}
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#18181b] border border-[#d8c5a3]/35 flex items-center gap-1.5 shadow-md will-change-transform"
              >
                <span className="text-[10px] sm:text-[11px] text-[#d8c5a3]">{blk.icon}</span>
                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-[#FAFAFA] tracking-wider uppercase">
                  {blk.tag}
                </span>
              </div>
            ))}
          </div>

          {/* =========================================================== */}
          {/* 6. CONTACT ANIMATION: Transmission Signal & Active Terminal */}
          {/* =========================================================== */}
          <div
            ref={contactContainerRef}
            className="flex-col items-center mb-3 sm:mb-4 pointer-events-none"
            style={{ display: "none" }}
          >
            {/* Transmission Beacon */}
            <div
              ref={contactBeaconRef}
              className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#18181b] border-2 border-[#d8c5a3] flex items-center justify-center shadow-[0_0_30px_rgba(216,197,163,0.25)] will-change-transform"
            >
              <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#d8c5a3] animate-ping" />
              <span className="absolute text-xs sm:text-sm font-black text-[#0C0C0C]">↗</span>
            </div>
            {/* Ready Prompt Terminal Pill */}
            <div
              ref={contactPromptRef}
              className="mt-2.5 sm:mt-3 px-3 sm:px-4 py-1 rounded-full bg-[#18181b] border border-[#d8c5a3]/30 flex items-center gap-1.5 sm:gap-2 will-change-transform"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest text-[#d8c5a3] uppercase">
                STATUS: READY TO COLLABORATE
              </span>
            </div>
          </div>

          {/* =========================================================== */}
          {/* MAIN EDITORIAL SECTION TITLE (Kanit bold typography)         */}
          {/* =========================================================== */}
          <h1
            ref={titleRef}
            className="text-[11vw] sm:text-[9vw] md:text-[7.5vw] font-black uppercase tracking-tight leading-none text-[#FAFAFA] will-change-transform drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {activeConfig.label}
          </h1>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM EDITORIAL FOOTER                                       */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={footerMetaRef}
          className="relative z-30 flex items-center justify-between border-t border-white/[0.06] pt-3 sm:pt-4 will-change-transform"
        >
          <span className="text-[9px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] text-white/30 uppercase truncate max-w-[50%]">
            MOHD ASHFAQ // PORTFOLIO
          </span>
          <span className="text-[9px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] text-[#d8c5a3] uppercase font-bold shrink-0">
            REVEALING SCENE ↗
          </span>
        </div>
      </div>
    </div>
  );
}
