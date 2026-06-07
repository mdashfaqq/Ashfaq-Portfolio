export interface CaseStudy {
  projectId: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  keyFeatures: string[];
  challenges: string[];
  results: string[];
  lessonsLearned: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  coredine: {
    projectId: "coredine",
    overview:
      "CoreDine is a full-stack restaurant management system built for real-world dining operations — covering POS billing, kitchen order tickets, inventory, and role-based staff workflows.",
    problem:
      "Restaurants needed a unified system to replace fragmented billing tools, manual KOT processes, and disconnected inventory tracking that slowed service and caused order errors.",
    solution:
      "Designed and built a Flutter mobile POS with PHP REST APIs and MySQL — enabling real-time order flow from table to kitchen, automated billing, thermal receipt printing, and per-role access control.",
    architecture: [
      "Flutter cross-platform client for front-of-house and kitchen staff",
      "PHP REST API layer with JWT authentication",
      "MySQL relational schema for orders, inventory, and users",
      "Role-based access control across admin, cashier, and kitchen roles",
      "Deployed on Hostinger with production-ready configuration",
    ],
    techStack: ["Flutter", "PHP", "MySQL", "REST API", "JWT", "Thermal Printing"],
    keyFeatures: [
      "Real-time order processing and KOT management",
      "Inventory tracking with low-stock awareness",
      "Thermal receipt and invoice generation",
      "Table management and billing workflows",
      "Multi-role authentication and permissions",
    ],
    challenges: [
      "Synchronizing order state between POS terminals and kitchen displays in real time",
      "Designing a flexible menu and inventory schema for varying restaurant layouts",
      "Integrating thermal printer workflows reliably across devices",
    ],
    results: [
      "Complete end-to-end restaurant workflow in a single application",
      "Reduced manual order handoff between front desk and kitchen",
      "Production deployment used for live restaurant operations",
    ],
    lessonsLearned: [
      "Domain-driven API design matters — restaurant workflows map directly to backend models",
      "Offline-tolerant UX patterns improve reliability during network instability",
      "Role-based UI reduces complexity for non-technical staff",
    ],
  },
  edutenant: {
    projectId: "edutenant",
    overview:
      "EduTenant is a multi-tenant Learning Management System enabling educational institutions to manage attendance, scheduling, assignments, and announcements from one platform.",
    problem:
      "Schools and training centers lacked a scalable system to manage multiple tenants, track student attendance digitally, and coordinate academic workflows across staff and students.",
    solution:
      "Built a Flutter mobile application backed by PHP APIs with tenant isolation — giving each institution its own environment while sharing a common platform architecture.",
    architecture: [
      "Multi-tenant data model with institution-level isolation",
      "Flutter mobile client for students and educators",
      "PHP REST APIs for academic entities and workflows",
      "MySQL database with tenant-scoped queries",
      "JWT-based authentication per tenant user",
    ],
    techStack: ["Flutter", "PHP", "MySQL", "REST API", "JWT", "Multi-tenant"],
    keyFeatures: [
      "Multi-tenant institution management",
      "Digital attendance tracking",
      "Academic scheduling and calendar views",
      "Assignments and announcements module",
      "Role-based dashboards for staff and students",
    ],
    challenges: [
      "Ensuring strict data isolation between tenants on a shared database",
      "Designing flexible academic scheduling across different institution types",
      "Balancing mobile performance with feature-rich LMS screens",
    ],
    results: [
      "Unified LMS replacing manual attendance and announcement processes",
      "Scalable architecture supporting multiple institutions",
      "Complete mobile-first academic workflow",
    ],
    lessonsLearned: [
      "Tenant isolation should be enforced at the API layer, not just the UI",
      "Start with core academic workflows before expanding feature surface",
      "Consistent API contracts simplify Flutter state management",
    ],
  },
  "rental-utility": {
    projectId: "rental-utility",
    overview:
      "Rental Utility POS is a web-based business management platform for utility and rental companies — handling quotations, inventory, invoicing, customer ledgers, and analytics.",
    problem:
      "Utility businesses relied on spreadsheets and disconnected tools for quotations, inventory, and invoicing — leading to errors, slow billing cycles, and poor visibility into business performance.",
    solution:
      "Developed a React + TypeScript web application with PHP backend APIs — centralizing quotation generation, inventory management, customer records, and financial ledgers in one production system.",
    architecture: [
      "React + TypeScript SPA with component-driven UI",
      "PHP REST APIs for business logic and data access",
      "MySQL database for customers, inventory, and transactions",
      "Analytics layer for business performance insights",
      "JWT-secured API endpoints",
    ],
    techStack: ["React", "TypeScript", "PHP", "MySQL", "REST API", "JWT"],
    keyFeatures: [
      "Quotation generation and management",
      "Inventory tracking with stock levels",
      "Invoicing and customer ledger system",
      "Customer relationship management",
      "Analytics dashboard for business insights",
    ],
    challenges: [
      "Modeling complex quotation-to-invoice workflows with accurate pricing",
      "Building responsive dashboards that remain usable with large datasets",
      "Designing ledger calculations that stay consistent across modules",
    ],
    results: [
      "Single platform replacing multiple manual business tools",
      "Faster quotation-to-invoice cycle for utility operations",
      "Real-time visibility into inventory and customer accounts",
    ],
    lessonsLearned: [
      "Business software UX should mirror existing workflows to reduce adoption friction",
      "TypeScript on the frontend catches integration errors early with typed API contracts",
      "Modular backend services simplify adding new business modules",
    ],
  },
};

export function hasCaseStudy(projectId: string): boolean {
  return projectId in caseStudies;
}

export function getCaseStudy(projectId: string): CaseStudy | undefined {
  return caseStudies[projectId];
}
