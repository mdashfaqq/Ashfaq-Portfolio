import * as React from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SpecularButton } from "@/components/ui/SpecularButton";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
  github?: string;
  live?: string;
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  label?: string;
  className?: string;
  cardClassName?: string;
  onSelect?: (index: number) => void;
  onCardClick?: (index: number) => void;
}

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "min(560px, calc(100vw - 2rem))",
  gap = 0.05,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  autoPlay = true,
  autoPlayInterval = 4500,
  label = "Products carousel",
  className,
  cardClassName,
  onSelect,
  onCardClick,
}: CoverflowCarouselProps) {
  const count = slides.length;
  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    velocity: number;
    time: number;
  } | null>(null);
  const [selected, setSelected] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const indexAt = React.useCallback(
    (pos: number) => (count ? ((Math.round(pos) % count) + count) % count : 0),
    [count],
  );

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width || !count) return;

    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
      card.style.pointerEvents = "auto";
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (!count) return;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      const nextIndex = indexAt(target);
      setSelected(nextIndex);
      onSelect?.(nextIndex);

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [count, indexAt, onSelect, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      if (!count) return;
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (amount: number) => settle(clamp(Math.round(targetRef.current) + amount)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!count) return;
    setIsHovered(true);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      velocity: 0,
      time: performance.now(),
      startX: event.clientX,
      isDragging: false,
    } as any;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current as any;
    if (!drag || drag.id !== event.pointerId) return;

    const deltaX = Math.abs(event.clientX - drag.startX);
    if (!drag.isDragging && deltaX > 6) {
      drag.isDragging = true;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {}
    }

    if (!drag.isDragging) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.velocity = ((posRef.current - previous) / Math.max(now - drag.time, 1)) * 1000;
    drag.time = now;
    setSelected(indexAt(posRef.current));
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current as any;
    if (!drag || drag.id !== event.pointerId) return;
    const wasDragging = drag.isDragging;
    dragRef.current = null;
    setIsHovered(false);

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {}
    }

    if (wasDragging) {
      const carried = Math.max(-2, Math.min(2, drag.velocity * 0.18));
      settle(clamp(Math.round(posRef.current + carried)));
    }
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame || !count) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [count, paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  React.useEffect(() => {
    if (!autoPlay || isHovered || count < 2) return;

    const timer = window.setInterval(() => nudge(1), autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, count, isHovered, nudge]);

  if (!count) return null;
  const active = slides[selected];

  return (
    <div
      className={cn("w-full", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-visible rounded-2xl py-6 sm:py-8 outline-none ring-[var(--foreground)] focus-visible:ring-2 active:cursor-grabbing"
          style={{ perspective: `calc(var(--cf-card) * ${perspective})`, touchAction: "pan-y" }}
        >
          <div
            className="relative mx-auto select-none"
            style={{ height: "calc(var(--cf-card) * 9 / 16)", transformStyle: "preserve-3d" }}
          >
            {slides.map((slide, index) => (
              <button
                key={`${slide.src}-${index}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                type="button"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${slide.title ?? slide.alt}`}
                onClick={() => {
                  goTo(index);
                  onCardClick?.(index);
                }}
                className={cn(
                  "absolute left-1/2 top-0 aspect-video overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0f0f12] shadow-[0_18px_50px_rgba(0,0,0,0.45)] will-change-transform",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  loading="lazy"
                  className="h-full w-full select-none object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous product"
              onClick={() => nudge(-1)}
              className="absolute left-1 sm:left-2 top-1/2 z-[200] -translate-y-1/2 rounded-full border border-white/[0.12] bg-[#0c0c0c]/80 p-1.5 sm:p-2 text-[var(--foreground)] backdrop-blur transition hover:bg-[#0c0c0c] touch-manipulation"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              type="button"
              aria-label="Next product"
              onClick={() => nudge(1)}
              className="absolute right-1 sm:right-2 top-1/2 z-[200] -translate-y-1/2 rounded-full border border-white/[0.12] bg-[#0c0c0c]/80 p-1.5 sm:p-2 text-[var(--foreground)] backdrop-blur transition hover:bg-[#0c0c0c] touch-manipulation"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </>
        )}
      </div>

      {showCaption && active?.title && (
        <div key={selected} className="mt-3 flex flex-col items-center px-4 text-center">
          <p className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {active.title}
          </p>
          {active.subtitle && (
            <p className="mt-1 text-sm text-[var(--muted)]">{active.subtitle}</p>
          )}
          {active.meta && active.meta.length > 0 && (
            <dl className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-[var(--muted)]">
              {active.meta.map((row) => (
                <div key={row.label} className="flex gap-1">
                  <dt>{row.label}:</dt>
                  <dd className="font-medium text-[var(--foreground)]">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {(active.github || active.live) && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 relative z-30">
              {active.github && (
                <SpecularButton
                  as="a"
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e: any) => e.stopPropagation()}
                  size="sm"
                  radius={12}
                  tint="#d8c5a3"
                  tintOpacity={0.06}
                  blur={8}
                  textColor="#d8c5a3"
                  lineColor="#e8d5b5"
                  baseColor="#3a3227"
                  intensity={1.1}
                  followMouse
                  autoAnimate
                  speed={0.4}
                >
                  <FaGithub size={13} />
                  <span>GitHub</span>
                </SpecularButton>
              )}
              {active.live && (
                <SpecularButton
                  as="a"
                  href={active.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e: any) => e.stopPropagation()}
                  size="sm"
                  radius={12}
                  tint="#d8c5a3"
                  tintOpacity={0.16}
                  blur={8}
                  textColor="#f5e6cc"
                  lineColor="#f3e5cb"
                  baseColor="#735d3d"
                  intensity={1.4}
                  followMouse
                  autoAnimate
                  speed={0.45}
                >
                  <ExternalLink size={13} />
                  <span>Live Site</span>
                </SpecularButton>
              )}
            </div>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={`${slide.src}-pagination`}
              type="button"
              aria-label={`Go to ${slide.title ?? `product ${index + 1}`}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full bg-[var(--foreground)] transition-all",
                index === selected ? "w-7 opacity-100" : "w-1.5 opacity-30",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
