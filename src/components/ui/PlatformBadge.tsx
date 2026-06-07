import { categoryLabels, getPlatformLabel, type Project, type ProjectCategory } from "@/data/projects";
import { categoryStyles } from "@/utils/projectStyles";

export function PlatformBadge({
  category,
  label,
  className = "",
}: {
  category: ProjectCategory;
  label?: string;
  className?: string;
}) {
  const text = label ?? categoryLabels[category];
  return (
    <span
      className={`inline-flex text-[10px] sm:text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md border ${categoryStyles[category].badge} ${className}`}
    >
      {text}
    </span>
  );
}

export function ProjectPlatformBadge({
  project,
  className = "",
}: {
  project: Pick<Project, "category" | "platformLabel">;
  className?: string;
}) {
  return (
    <PlatformBadge
      category={project.category}
      label={getPlatformLabel(project)}
      className={className}
    />
  );
}
