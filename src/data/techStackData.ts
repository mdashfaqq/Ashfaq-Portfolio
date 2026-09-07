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
      { name: "Python", isPrimary: true },
      { name: "JavaScript", isPrimary: true },
      { name: "TypeScript", isPrimary: true },
      { name: "PHP" },
      { name: "Dart" },
      { name: "C++" },
      { name: "SQL" },
    ],
  },
  {
    category: "FRONTEND",
    items: [
      { name: "React", isPrimary: true },
      { name: "Flutter" },
      { name: "Tailwind CSS" },
      { name: "React Flow" },
      { name: "Capacitor" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI", isPrimary: true },
      { name: "REST APIs" },
      { name: "JWT" },
    ],
  },
  {
    category: "DATA / AI",
    items: [
      { name: "Python", isPrimary: true },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn" },
      { name: "XGBoost" },
      { name: "TensorFlow", isPrimary: true },
      { name: "LSTM" },
    ],
  },
  {
    category: "SECURITY + SYSTEMS",
    items: [
      { name: "OWASP" },
      { name: "RBAC" },
      { name: "API Security" },
      { name: "PostgreSQL RLS", isPrimary: true },
      { name: "Linux", isPrimary: true },
      { name: "Docker", isPrimary: true },
      { name: "Git", isPrimary: true },
      { name: "GitHub" },
      { name: "CI/CD" },
    ],
  },
];
