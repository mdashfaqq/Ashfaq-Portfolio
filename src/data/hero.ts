import { projects } from "./projects";

export const heroShowcaseProjects = projects.filter((p) => p.featured).slice(0, 4);

export const heroIntro = "Hello, I'm Mohamed Ashfaq.";

export const heroTypingRoles = [
  "Full Stack Developer.",
  "Mobile App Developer.",
  "Web Application Developer.",
  "Building production-ready software.",
];
