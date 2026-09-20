export interface SkillItem {
  name: string;
  level?: number;
  category: "languages" | "frameworks" | "tools" | "security" | "core";
}

export const skills: SkillItem[] = [
  ...["Java", "Python", "JavaScript", "TypeScript", "SQL", "Dart", "C++"].map((name) => ({ name, category: "languages" as const })),
  ...["React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "Node.js", "Express.js", "PHP", "FastAPI", "REST APIs", "Flutter", "Capacitor"].map((name) => ({ name, category: "frameworks" as const })),
  ...["MySQL", "PostgreSQL", "Supabase", "Linux", "Git", "GitHub", "Docker", "Nginx", "GitHub Copilot", "Cursor", "Claude Code", "Antigravity"].map((name) => ({ name, category: "tools" as const })),
  ...["OWASP", "JWT", "RBAC", "Burp Suite", "Wireshark", "Nmap", "Metasploit"].map((name) => ({ name, category: "security" as const })),
  ...["Data Structures and Algorithms", "OOP", "DBMS", "Computer Networks", "Operating Systems"].map((name) => ({ name, category: "core" as const })),
];

