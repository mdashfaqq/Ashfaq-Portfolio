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
      "Contributed to full-stack web and mobile application development.",
      "Built scalable backend APIs and authentication systems.",
      "Worked on deployment and production-ready software delivery.",
      "Collaborated on frontend-backend integration and testing.",
      "Optimized applications and business workflows.",
    ],
  },
];
