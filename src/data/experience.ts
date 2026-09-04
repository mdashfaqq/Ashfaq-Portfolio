export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Development Engineer Intern",
    company: "DaaSoft IT Solutions",
    duration: "December 2025 – May 2026",
    responsibilities: [
      "Developed 3+ web and mobile applications using Flutter, PHP, MySQL, and JavaScript.",
      "Built and secured REST APIs with JWT authentication and role-based access control.",
      "Implemented multi-tenant data isolation across 4+ client modules.",
      "Optimized frontend performance, reducing load times by 30%.",
      "Worked with a 5-member Agile/Scrum team using Git, Postman, and Burp Suite.",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Cognivo-Future Technologies",
    duration: "May 2026 – August 2026",
    responsibilities: [
      "Developed full-stack application features using React, TypeScript, Node.js, and Python.",
      "Built REST APIs and backend services using Express.js, FastAPI, Supabase, and PostgreSQL.",
      "Developed configurable application workflows using React Flow.",
      "Worked on authentication, authorization, API testing, debugging, and database integration.",
      "Contributed to product research, feature development, and iterative software delivery.",
    ],
  },
];
