import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import "./FallingText.css";

export interface FallingTextProps {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  wordColors?: Record<string, string>;
  trigger?: "click" | "hover" | "auto" | "scroll";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  wordSpacing?: string;
}

const TECH_ITEMS = [
  { name: "Python", tier: "hero", offsetY: -16, rot: -2.0 },
  { name: "TypeScript", tier: "hero", offsetY: -10, rot: 1.6 },
  { name: "JavaScript", tier: "base", offsetY: -14, rot: -1.2 },
  { name: "React", tier: "hero", offsetY: -6, rot: 2.2 },
  { name: "Next.js", tier: "hero", offsetY: 2, rot: -1.6 },
  { name: "Node.js", tier: "mid", offsetY: 10, rot: 1.8 },
  { name: "Express", tier: "base", offsetY: 18, rot: -2.2 },
  { name: "Linux", tier: "hero", offsetY: 8, rot: 1.4 },
  { name: "Git", tier: "mid", offsetY: 22, rot: -1.5 },
  { name: "REST", tier: "mid", offsetY: 30, rot: 2.0 },
  { name: "JWT", tier: "mid", offsetY: -8, rot: -1.8 },
  { name: "CI/CD", tier: "mid", offsetY: -2, rot: 1.5 },
  { name: "Kubernetes", tier: "hero", offsetY: 6, rot: -2.1 },
  { name: "AWS", tier: "mid", offsetY: -4, rot: 1.7 },
  { name: "C++", tier: "base", offsetY: 12, rot: -1.4 },
  { name: "Dart", tier: "base", offsetY: 20, rot: 2.3 },
  { name: "Redis", tier: "mid", offsetY: 10, rot: -1.6 },
  { name: "MongoDB", tier: "mid", offsetY: 24, rot: 1.8 },
  { name: "GraphQL", tier: "mid", offsetY: 32, rot: -2.0 },
  { name: "PHP", tier: "base", offsetY: 38, rot: 1.5 },
  { name: "Flutter", tier: "hero", offsetY: 26, rot: -1.7 },
  { name: "Pandas", tier: "base", offsetY: 44, rot: 2.1 },
  { name: "Tailwind", tier: "mid", offsetY: -6, rot: 1.6 },
  { name: "FastAPI", tier: "hero", offsetY: 2, rot: -1.8 },
  { name: "PostgreSQL", tier: "hero", offsetY: 6, rot: 1.5 },
  { name: "Docker", tier: "hero", offsetY: 4, rot: -2.0 },
  { name: "NumPy", tier: "base", offsetY: 8, rot: 1.4 },
  { name: "TensorFlow", tier: "hero", offsetY: 5, rot: -1.6 },
  { name: "PyTorch", tier: "hero", offsetY: 6, rot: 2.0 },
  { name: "Scikit-learn", tier: "base", offsetY: 8, rot: -1.5 },
  { name: "OWASP", tier: "base", offsetY: 8, rot: 1.8 },
  { name: "Postman", tier: "base", offsetY: 7, rot: -1.3 },
];

export default function FallingText({
  className = "",
  text = "",
  trigger = "scroll",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 0.5,
  mouseConstraintStiffness = 0.85,
  fontSize,
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const [resizeKey, setResizeKey] = useState(0);

  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setResizeKey((k) => k + 1);
      }, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    // Use curated TECH_ITEMS for exact typography hierarchy and cascading baseline
    const words = text ? text.split(" ").filter((w) => w.trim().length > 0) : [];
    const items = words.length > 0
      ? words.map((w) => {
          const match = TECH_ITEMS.find(
            (item) => item.name.toLowerCase() === w.trim().toLowerCase().replace(/^[·,.\s]+|[·,\s]+$/g, "")
          );
          return match || { name: w, tier: "base", offsetY: 0, rot: 0 };
        })
      : TECH_ITEMS;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    const newHTML = items
      .map((item, index) => {
        const tierClass = `word-tier-${item.tier}`;
        const offset = isMobile ? Math.round(item.offsetY * 0.5) : item.offsetY;
        return `<span class="word ${tierClass}" data-index="${index}" style="transform: translateY(${offset}px) rotate(${item.rot}deg);">${item.name}</span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;
  }, [text, resizeKey]);

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !containerRef.current || !textRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();
    const width = Math.max(containerRect.width, 240);
    const isMobile = width < 640;
    const height = Math.max(containerRect.height, textRect.height + 20, isMobile ? 240 : 135);

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current!,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const wallThickness = 250;
    const floor = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2 - 2,
      width * 4,
      wallThickness,
      boundaryOptions
    );
    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 4,
      boundaryOptions
    );
    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 4,
      boundaryOptions
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2 - 300,
      width * 4,
      wallThickness,
      boundaryOptions
    );

    // Physical collision buffer adapted for mobile and desktop screens
    const collisionPaddingX = isMobile ? 8 : 14;
    const collisionPaddingY = isMobile ? 6 : 8;

    const wordSpans = textRef.current.querySelectorAll<HTMLSpanElement>(".word");
    const wordBodies = [...wordSpans].map((elem, i) => {
      const rect = elem.getBoundingClientRect();

      const bodyWidth = rect.width + collisionPaddingX;
      const bodyHeight = rect.height + collisionPaddingY;

      const halfW = bodyWidth / 2;
      const targetX = Math.max(
        halfW + 4,
        Math.min(width - halfW - 4, rect.left - containerRect.left + rect.width / 2)
      );
      const targetY = Math.max(
        bodyHeight / 2 + 2,
        rect.top - containerRect.top + rect.height / 2
      );

      // Start high up at the top of the About section in a staggered cascade
      const startX = Math.max(
        halfW + 6,
        Math.min(width - halfW - 6, targetX + ((i % 5) - 2) * (isMobile ? 5 : 10))
      );
      const startY = - (80 + (i % 8) * 35 + Math.floor(i / 8) * (isMobile ? 40 : 70));

      // Restrained, intentional initial angle (-3° to +3°)
      const angleDeg = (((i * 7) % 9) - 4) * 0.7;
      const initialAngle = (angleDeg * Math.PI) / 180;

      const body = Bodies.rectangle(startX, startY, bodyWidth, bodyHeight, {
        render: { fillStyle: "transparent" },
        restitution: 0.16,
        frictionAir: 0.024,
        friction: 0.8,
        density: 0.0012,
        chamfer: { radius: 6 },
        angle: initialAngle,
      });

      // Downward velocity falling from top of section
      Matter.Body.setVelocity(body, {
        x: ((i % 5) - 2) * (isMobile ? 0.12 : 0.22),
        y: 2.0 + (i % 4) * 0.35,
      });
      Matter.Body.setAngularVelocity(body, ((i % 5) - 2) * 0.002);
      return { elem, body, rect, bodyWidth, bodyHeight, targetX, targetY };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
    });

    const mouse = Mouse.create(containerRef.current);
    if (mouse.element) {
      mouse.element.removeEventListener?.("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener?.("DOMMouseScroll", (mouse as any).mousewheel);
    }
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let animationFrameId: number;

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem, bodyWidth, bodyHeight, targetY }) => {
        const halfW = bodyWidth / 2;
        const halfH = bodyHeight / 2;

        // Soft settling guidance as the word arrives near its landing baseline
        if (body.position.y >= targetY - 35) {
          const dy = targetY - body.position.y;
          if (Math.abs(dy) > 1 && mouseConstraint.body !== body) {
            Matter.Body.applyForce(body, body.position, {
              x: 0,
              y: dy * 0.000055,
            });
          }
        }

        // Hard clamp inside walls
        if (body.position.x < halfW + 4) {
          Matter.Body.setPosition(body, { x: halfW + 4, y: body.position.y });
          if (body.velocity.x < 0) {
            Matter.Body.setVelocity(body, { x: -body.velocity.x * 0.2, y: body.velocity.y });
          }
        } else if (body.position.x > width - halfW - 4) {
          Matter.Body.setPosition(body, { x: width - halfW - 4, y: body.position.y });
          if (body.velocity.x > 0) {
            Matter.Body.setVelocity(body, { x: -body.velocity.x * 0.2, y: body.velocity.y });
          }
        }

        // Hard clamp floor so words settle directly onto divider line
        if (body.position.y > height - halfH - 1) {
          Matter.Body.setPosition(body, { x: body.position.x, y: height - halfH - 1 });
          if (body.velocity.y > 0) {
            Matter.Body.setVelocity(body, { x: body.velocity.x * 0.82, y: -body.velocity.y * 0.1 });
          }
        }

        // Maintain intentional readability: clamp rotation to subtle angle (-3.2° to +3.2°)
        const maxAngle = 0.056; // ~3.2 degrees
        if (body.angle > maxAngle) {
          Matter.Body.setAngle(body, maxAngle);
          Matter.Body.setAngularVelocity(body, -0.001);
        } else if (body.angle < -maxAngle) {
          Matter.Body.setAngle(body, -maxAngle);
          Matter.Body.setAngularVelocity(body, 0.001);
        }

        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      Render.stop(render);
      Runner.stop(runner);
      if (
        render.canvas &&
        canvasContainerRef.current &&
        canvasContainerRef.current.contains(render.canvas)
      ) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === "click" || trigger === "hover" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      onTouchStart={trigger === "hover" || trigger === "click" ? handleTrigger : undefined}
      style={{
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          lineHeight: 1.35,
          opacity: effectStarted ? 1 : 0,
          transition: "opacity 0.2s ease-in",
          ...(fontSize ? { fontSize } : {}),
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
      <div className="falling-text-floor-line" aria-hidden="true" />
    </div>
  );
}
