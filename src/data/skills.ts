export interface SkillItem {
  name: string;
  level: number;
  category: "frontend" | "backend" | "database" | "tools" | "security";
}

export const skills: SkillItem[] = [
  { name: "React", level: 88, category: "frontend" },
  { name: "Flutter", level: 90, category: "frontend" },
  { name: "PHP", level: 92, category: "backend" },
  { name: "JavaScript", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "MySQL", level: 88, category: "database" },
  { name: "Java", level: 78, category: "backend" },
  { name: "Python", level: 74, category: "backend" },
  { name: "Git", level: 90, category: "tools" },
  { name: "Linux", level: 82, category: "tools" },
  { name: "REST APIs", level: 92, category: "backend" },
  { name: "JWT Authentication", level: 88, category: "security" },
];
