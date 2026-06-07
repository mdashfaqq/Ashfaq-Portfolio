import type { ProjectCategory } from "@/data/projects";

export const categoryStyles: Record<
  ProjectCategory,
  { badge: string; glow: string }
> = {
  mobile: {
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/20",
    glow: "from-violet-500/15",
  },
  web: {
    badge: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    glow: "from-blue-500/15",
  },
  fullstack: {
    badge: "text-sky-300 bg-sky-500/10 border-sky-500/20",
    glow: "from-sky-500/15",
  },
  business: {
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    glow: "from-amber-500/15",
  },
};
