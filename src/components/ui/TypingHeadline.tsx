import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroIntro, heroTypingRoles } from "@/data/hero";

const BASE_TYPE_MS = 36;
const BASE_DELETE_MS = 20;
const PAUSE_MS = 2400;
const INTRO_PAUSE_MS = 700;
const ROLE_GAP_MS = 280;

function typeDelay(char: string, prevChar: string | undefined): number {
  if (prevChar === "." || prevChar === ",") return BASE_TYPE_MS + 160;
  if (char === "." || char === ",") return BASE_TYPE_MS + 90;
  if (char === " ") return BASE_TYPE_MS + 35;
  return BASE_TYPE_MS + ((char.charCodeAt(0) * 7) % 14);
}

function deleteDelay(index: number, total: number): number {
  const progress = total > 0 ? index / total : 0;
  return BASE_DELETE_MS + progress * 16;
}

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export function TypingHeadline() {
  const reduceMotion = useReducedMotion();
  const [introText, setIntroText] = useState("");
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "roles">("intro");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleReady, setRoleReady] = useState(false);

  const currentRole = useMemo(
    () => heroTypingRoles[roleIndex],
    [roleIndex],
  );

  useEffect(() => {
    if (reduceMotion) {
      setIntroText(heroIntro);
      setRoleText(heroTypingRoles[0]);
      setRoleReady(true);
      return;
    }

    if (phase === "intro") {
      if (introText.length < heroIntro.length) {
        const prev = introText.at(-1);
        const next = heroIntro[introText.length];
        const t = setTimeout(
          () => setIntroText(heroIntro.slice(0, introText.length + 1)),
          typeDelay(next, prev),
        );
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => {
        setPhase("roles");
        setRoleReady(true);
      }, INTRO_PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (!roleReady) return;

    if (!isDeleting) {
      if (roleText.length < currentRole.length) {
        const prev = roleText.at(-1);
        const next = currentRole[roleText.length];
        const t = setTimeout(
          () => setRoleText(currentRole.slice(0, roleText.length + 1)),
          typeDelay(next, prev),
        );
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => setIsDeleting(true), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (roleText.length > 0) {
      const t = setTimeout(() => {
        setRoleText(roleText.slice(0, -1));
      }, deleteDelay(roleText.length, currentRole.length));
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % heroTypingRoles.length);
    }, ROLE_GAP_MS);
    return () => clearTimeout(t);
  }, [
    reduceMotion,
    phase,
    introText,
    roleText,
    roleIndex,
    isDeleting,
    currentRole,
    roleReady,
  ]);

  const roleFade =
    isDeleting && roleText.length <= Math.ceil(currentRole.length * 0.25);

  return (
    <div className="w-full max-w-full min-w-0" aria-live="polite">
      <h1 className="w-full max-w-full font-semibold tracking-tight text-white [overflow-wrap:anywhere]">
<span
  className="
    block
    mt-1
    sm:mt-2
    text-[clamp(1.0625rem,3.8vw+0.35rem,2.25rem)]
    leading-[1.1]
    sm:leading-[1.2]
  "
  style={{ minHeight: "1.4em" }}
>
          {introText}
          {phase === "intro" && !reduceMotion && (
            <span className="typing-cursor" aria-hidden="true" />
          )}
        </span>

        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{
            opacity: roleReady || reduceMotion ? 1 : 0,
            y: roleReady || reduceMotion ? 0 : 8,
          }}
          transition={{ duration: 0.5, ease: easeSmooth }}
          className="block mt-2 sm:mt-3 text-white/75 text-[clamp(1.0625rem,3.8vw+0.35rem,2.25rem)] leading-[1.25] sm:leading-[1.2] break-words"
          style={{ minHeight: "1.6em" }}
        >
          <motion.span
            animate={{ opacity: roleFade ? 0.55 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline"
          >
            <span className="text-gradient-accent">{roleText}</span>
          </motion.span>
          {(phase === "roles" || reduceMotion) && (
            <span
              className={`typing-cursor ${reduceMotion ? "typing-cursor-static" : ""}`}
              aria-hidden="true"
            />
          )}
        </motion.span>
      </h1>
    </div>
  );
}
