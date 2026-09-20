export interface TechItem {
  name: string;
  isPrimary?: boolean;
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}

export const techStackGroups: TechGroup[] = [
  {
    category: "LANGUAGES",
    items: [
      { name: "Java" },
      { name: "Python", isPrimary: true },
      { name: "JavaScript", isPrimary: true },
      { name: "TypeScript", isPrimary: true },
      { name: "SQL", isPrimary: true },
      { name: "Dart" },
      { name: "C++" },
    ],
  },
  {
    category: "FRONTEND",
    items: [
      { name: "React", isPrimary: true },
      { name: "Next.js", isPrimary: true },
      { name: "Vite" },
      { name: "Tailwind CSS", isPrimary: true },
      { name: "shadcn/ui" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { name: "Node.js", isPrimary: true },
      { name: "Express.js" },
      { name: "PHP" },
      { name: "FastAPI", isPrimary: true },
      { name: "REST APIs", isPrimary: true },
    ],
  },
  {
    category: "MOBILE",
    items: [
      { name: "Flutter", isPrimary: true },
      { name: "Capacitor" },
    ],
  },
  {
    category: "DATABASE",
    items: [
      { name: "MySQL", isPrimary: true },
      { name: "PostgreSQL", isPrimary: true },
      { name: "Supabase", isPrimary: true },
    ],
  },
  {
    category: "SECURITY",
    items: [
      { name: "OWASP", isPrimary: true },
      { name: "JWT", isPrimary: true },
      { name: "RBAC", isPrimary: true },
      { name: "Burp Suite" },
      { name: "Wireshark" },
      { name: "Nmap" },
      { name: "Metasploit" },
    ],
  },
  {
    category: "TOOLS & SYSTEMS",
    items: [
      { name: "Linux", isPrimary: true },
      { name: "Git", isPrimary: true },
      { name: "GitHub", isPrimary: true },
      { name: "Docker", isPrimary: true },
      { name: "Nginx" },
    ],
  },
  {
    category: "AI-ASSISTED DEVELOPMENT",
    items: [
      { name: "GitHub Copilot", isPrimary: true },
      { name: "Cursor", isPrimary: true },
      { name: "Claude Code", isPrimary: true },
      { name: "Antigravity", isPrimary: true },
    ],
  },
];
