export interface SkillItem {
  name: string;
  level?: number;
  category: "languages" | "frameworks" | "tools" | "security" | "core";
}

export const skills: SkillItem[] = [
  ...["Java", "Python", "JavaScript", "TypeScript", "SQL", "Dart", "C++"].map((name) => ({ name, category: "languages" as const })),
  ...["React", "Flutter", "Node.js", "FastAPI", "Tailwind CSS", "Capacitor"].map((name) => ({ name, category: "frameworks" as const })),
  ...["Git", "GitHub", "Postman", "Docker", "Linux (RHEL, Ubuntu)", "Kali Linux", "CI/CD"].map((name) => ({ name, category: "tools" as const })),
  ...["OWASP Top 10", "JWT", "REST API Security", "RBAC", "Burp Suite", "Wireshark", "Nmap", "Nessus", "Metasploit"].map((name) => ({ name, category: "security" as const })),
  ...["Data Structures and Algorithms", "OOP", "DBMS", "Computer Networks", "Operating Systems"].map((name) => ({ name, category: "core" as const })),
];
