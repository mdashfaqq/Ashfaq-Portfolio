import { useEffect, useRef, useState, Children, isValidElement, type ReactNode } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

export interface BounceCardsProps {
  className?: string;
  images?: string[];
  children?: ReactNode;
  containerWidth?: number;
  containerHeight?: number;
  cardWidth?: number;
  cardHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  pushDistance?: number;
  activeCardIndex?: number | null;
  onActiveCardChange?: (index: number | null) => void;
}

export default function BounceCards({
  className = "",
  images = [],
  children,
  containerWidth = 560,
  containerHeight = 360,
  cardWidth = 360,
  cardHeight = 260,
  animationDelay = 0.4,
  animationStagger = 0.08,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(-5deg) translate(-80px, 10px)",
    "rotate(0deg) translate(0px, -8px)",
    "rotate(5deg) translate(80px, 12px)"
  ],
  enableHover = true,
  pushDistance = 110,
  activeCardIndex,
  onActiveCardChange
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [internalActiveIdx, setInternalActiveIdx] = useState<number | null>(null);
  const activeIdx = activeCardIndex !== undefined ? activeCardIndex : internalActiveIdx;

  const childElements = children ? Children.toArray(children).filter(isValidElement) : [];
  const itemCount = childElements.length > 0 ? childElements.length : images.length;

  useEffect(() => {
    if (!containerRef.current || itemCount === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bounce-card",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay, itemCount]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px(?:,\s*([-0-9.]+)px)?\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const currentY = match[2] ? `, ${match[2]}px` : "";
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px${currentY})`);
    } else {
      return baseTransform === "none" ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    for (let i = 0; i < itemCount; i++) {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          scale: 1.04,
          zIndex: 25,
          duration: 0.38,
          ease: "back.out(1.4)",
          overwrite: "auto"
        });
      } else {
        const offsetX = i < hoveredIdx ? -pushDistance : pushDistance;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.04;

        gsap.to(target, {
          transform: pushedTransform,
          scale: 0.95,
          zIndex: i + 1,
          duration: 0.38,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto"
        });
      }
    }
  };

  const resetSiblings = () => {
    if (!containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    for (let i = 0; i < itemCount; i++) {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || "none";
      gsap.to(target, {
        transform: baseTransform,
        scale: 1,
        zIndex: i + 1,
        duration: 0.38,
        ease: "back.out(1.4)",
        overwrite: "auto"
      });
    }
  };

  useEffect(() => {
    if (activeIdx !== null && activeIdx !== undefined) {
      pushSiblings(activeIdx);
    } else {
      resetSiblings();
    }
  }, [activeIdx, transformStyles]);

  const handleCardClick = (idx: number) => {
    const nextIdx = activeIdx === idx ? null : idx;
    if (onActiveCardChange) {
      onActiveCardChange(nextIdx);
    } else {
      setInternalActiveIdx(nextIdx);
    }
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        maxWidth: "100%"
      }}
    >
      {childElements.length > 0
        ? childElements.map((child, idx) => (
            <div
              key={idx}
              className={`bounce-card bounce-card-content bounce-card-${idx}`}
              style={{
                transform: transformStyles[idx] ?? "none",
                width: cardWidth,
                height: cardHeight,
                zIndex: idx + 1
              }}
              onClick={() => handleCardClick(idx)}
              onMouseEnter={() => {
                if (enableHover && activeIdx === null) pushSiblings(idx);
              }}
              onMouseLeave={() => {
                if (enableHover && activeIdx === null) resetSiblings();
              }}
            >
              {child}
            </div>
          ))
        : images.map((src, idx) => (
            <div
              key={idx}
              className={`bounce-card card bounce-card-${idx}`}
              style={{
                transform: transformStyles[idx] ?? "none",
                zIndex: idx + 1
              }}
              onClick={() => handleCardClick(idx)}
              onMouseEnter={() => {
                if (enableHover && activeIdx === null) pushSiblings(idx);
              }}
              onMouseLeave={() => {
                if (enableHover && activeIdx === null) resetSiblings();
              }}
            >
              <img className="image" src={src} alt={`card-${idx}`} />
            </div>
          ))}
    </div>
  );
}
