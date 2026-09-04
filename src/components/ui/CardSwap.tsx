import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import "./CardSwap.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card-swap-card ${customClass ?? ""} ${className ?? ""}`.trim()}
    />
  ),
);
Card.displayName = "CardSwapCard";

interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

const makeSlot = (index: number, distanceX: number, distanceY: number, total: number) => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.5,
  zIndex: total - index,
});

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 4,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const childArray = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArray.map(() => ({ current: null } as React.MutableRefObject<HTMLDivElement | null>)),
    [childArray.length],
  );
  const order = useRef(Array.from({ length: childArray.length }, (_, index) => index));
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const interval = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    if (total < 1) return;

    const config = easing === "elastic"
      ? { ease: "elastic.out(0.6,0.9)", drop: 1.3, move: 1.3, back: 1.3 }
      : { ease: "power1.inOut", drop: 0.7, move: 0.7, back: 0.7 };

    refs.forEach((ref, index) => {
      const element = ref.current;
      if (!element) return;
      const slot = makeSlot(index, cardDistance, verticalDistance, total);
      gsap.set(element, {
        ...slot,
        xPercent: -50,
        yPercent: -50,
        skewY: skewAmount,
        transformOrigin: "center center",
        force3D: true,
      });
    });

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const frontElement = refs[front].current;
      if (!frontElement) return;

      const nextTimeline = gsap.timeline();
      timeline.current = nextTimeline;
      nextTimeline.to(frontElement, { y: "+=500", duration: config.drop, ease: config.ease });
      nextTimeline.addLabel("promote", `-=${config.drop * 0.7}`);

      rest.forEach((index, position) => {
        const element = refs[index].current;
        if (!element) return;
        const slot = makeSlot(position, cardDistance, verticalDistance, total);
        nextTimeline.set(element, { zIndex: slot.zIndex }, "promote");
        nextTimeline.to(element, { ...slot, duration: config.move, ease: config.ease }, `promote+=${position * 0.1}`);
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      nextTimeline.to(frontElement, { ...backSlot, duration: config.back, ease: config.ease }, "promote+=0.2");
      nextTimeline.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    interval.current = window.setInterval(swap, delay);

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        timeline.current?.pause();
        if (interval.current !== undefined) window.clearInterval(interval.current);
      };
      const resume = () => {
        timeline.current?.play();
        interval.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (interval.current !== undefined) window.clearInterval(interval.current);
        timeline.current?.kill();
      };
    }

    return () => {
      if (interval.current !== undefined) window.clearInterval(interval.current);
      timeline.current?.kill();
    };
  }, [cardDistance, delay, easing, pauseOnHover, refs, skewAmount, verticalDistance]);

  const rendered = childArray.map((child, index) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child, {
      key: index,
      ref: refs[index],
      style: { width, height, ...(child.props.style as CSSProperties | undefined) },
      onClick: (event: React.MouseEvent<HTMLDivElement>) => {
        child.props.onClick?.(event);
        onCardClick?.(index);
      },
    });
  });

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
}
