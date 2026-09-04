export type ProjectCategory = "mobile" | "web" | "fullstack" | "business";

export interface Project {
  id: string;
  title: string;
  description: string;
  highlight: string;
  impact?: string;
  category: ProjectCategory;
  /** Display label for platform type — overrides category default when set */
  platformLabel?: string;
  tech: string[];
  features: string[];
  architecture?: string[];
  outcomes?: string[];
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "coredine",
    title: "CoreDine",
    highlight: "Restaurant POS & kitchen order management",
    impact: "End-to-end restaurant operations — billing, inventory, KOT, and thermal printing",
    description:
      "A complete Restaurant POS and Kitchen Order Ticket Management System with billing, inventory management, order tracking, role-based access control, table management, invoice generation, and real-time restaurant workflows.",
    category: "mobile",
    platformLabel: "Mobile Application",
    tech: ["Flutter", "PHP", "MySQL", "REST API"],
    features: [
      "Role Based Access",
      "Inventory Management",
      "Real-Time Order Processing",
      "Thermal Receipt Printing",
      "KOT Management",
      "Billing System",
    ],
    architecture: [
      "Flutter Frontend",
      "PHP REST APIs",
      "MySQL Database",
      "JWT Authentication",
      "Hostinger Deployment",
    ],
    outcomes: [
      "Unified POS, KOT, and billing in one system",
      "Real-time kitchen order flow",
      "Deployed for live restaurant use",
    ],
    github: "https://github.com/mdashfaqq/CoreDine-Restaurant-POS",
    featured: true,
    image: "/coredine.webp",
  },
  {
    id: "edutenant",
    title: "EduTenant LMS",
    highlight: "Multi-tenant learning management platform",
    impact: "Attendance, scheduling, assignments, and announcements for educational institutions",
    description:
      "Multi-tenant Learning Management System supporting attendance tracking, academic scheduling, assignments, announcements, and educational workflows.",
    category: "fullstack",
    platformLabel: "Mobile Application",
    tech: ["Flutter", "PHP", "MySQL", "REST API"],
    features: [
      "Multi-tenant Architecture",
      "Attendance Tracking",
      "Academic Scheduling",
      "Assignments & Announcements",
    ],
    outcomes: [
      "Multi-tenant LMS architecture",
      "Digital attendance and scheduling",
      "Mobile-first academic workflows",
    ],
    github: "https://github.com/mdashfaqq/EduTenant-LMS",
    image: "/lms.webp",
    featured: true,
  },
  {
    id: "rental-utility",
    title: "Rental Utility POS",
    highlight: "Business utility management platform",
    impact: "Quotations, invoicing, ledgers, and analytics for utility businesses",
    description:
      "Business utility management platform supporting quotation generation, inventory tracking, invoicing, customer management, ledgers, and analytics.",
    category: "web",
    platformLabel: "Web Application",
    tech: ["React", "TypeScript", "PHP", "MySQL"],
    features: [
      "Quotation Generation",
      "Inventory Tracking",
      "Invoicing & Ledgers",
      "Customer Management",
      "Analytics Dashboard",
    ],
    outcomes: [
      "End-to-end quotation-to-invoice flow",
      "Inventory and ledger management",
      "Business analytics dashboard",
    ],
    github: "https://github.com/mdashfaqq/Rental-Utility-System",
    image: "/rentalpos.webp",
    featured: true,
  },
  {
    id: "bismi",
    title: "Bismi Furniture",
    highlight: "Production eCommerce platform",
    impact: "Live at bismibedmart.com — full product catalog, orders, and secure checkout",
    description:
      "Online furniture store platform with authentication, product management, order workflows, and backend API integration.",
    category: "web",
    platformLabel: "Web Application",
    tech: ["React", "PHP", "MySQL", "JWT"],
    features: [
      "Product Management",
      "Secure Authentication",
      "Order Workflows",
      "API Integration",
    ],
    outcomes: [
      "Live production eCommerce store",
      "Secure checkout and order management",
      "Full product catalog system",
    ],
    github: "https://github.com/mdashfaqq/BismiFurniture---Online-Furnstore",
    live: "https://bismibedmart.com/",
    image: "/bismi.webp",
    featured: true,
  },
  {
    id: "offlinedocs",
    title: "OfflineDocs",
    highlight: "Privacy-first document vault",
    impact: "100% offline — no cloud, no servers, full user data control",
    description:
      "A privacy-focused document vault for users and families to securely store and manage important documents—PDFs, certificates, IDs, licenses, and notes—completely offline.",
    category: "mobile",
    platformLabel: "Mobile Application",
    tech: ["Flutter", "SQLite", "Local Storage", "File Management"],
    features: [
      "100% Offline Operation",
      "Document Categorization",
      "Secure Local Storage",
      "PDF Viewer",
      "Family Document Management",
      "No Cloud Dependency",
    ],
    outcomes: [
      "100% offline document storage",
      "Privacy-first, no cloud dependency",
      "Family document organization",
    ],
    architecture: [
      "Flutter Mobile App",
      "SQLite Database",
      "Local File System",
      "Offline-Only — No Cloud",
    ],
    image: "/Offlinedocs.webp",
    github: "https://github.com/mdashfaqq/OfflineDocs-Offline-Document-Oraganizer-",
    featured: true,
  },
  {
    id: "unreadymades",
    title: "UnReadymades",
    highlight: "Garment eCommerce platform",
    impact: "Live at unreadymades.com — digitized traditional garment business online",
    description:
      "An eCommerce platform for a readymade garment business—customers browse products, manage accounts, place orders, and shop through a responsive experience.",
    category: "web",
    platformLabel: "Web Application",
    tech: ["React", "PHP", "MySQL", "REST API"],
    features: [
      "Product Catalog Management",
      "User Authentication",
      "Shopping Cart",
      "Order Management",
      "Responsive Design",
      "Admin Product Control",
    ],
    outcomes: [
      "Live garment eCommerce platform",
      "Digitized traditional retail business",
      "Full shopping and admin workflow",
    ],
    architecture: [
      "React Frontend",
      "PHP REST APIs",
      "MySQL Database",
      "Production Deployment",
    ],
    live: "https://unreadymades.com/",
    image: "/unreadymades.webp",
    github: "https://github.com/mdashfaqq/UNReadymades-Online-Fabric-Shopping",
    featured: true,
  },
  {
    id: "awardx",
    title: "AwardX",
    highlight: "Global award management platform",
    impact: "Launched SaaS platform seeking investment for market expansion",
    description:
      "Founded and built a multi-tenant platform for program creation, public submissions, evaluation, certification, analytics, and administration across the complete award lifecycle.",
    category: "fullstack",
    platformLabel: "SaaS Platform",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Supabase", "PostgreSQL", "REST APIs"],
    features: [
      "Award Lifecycle Management",
      "Configurable Forms and Workflows",
      "Multi-Tenant Architecture",
      "RBAC",
      "PostgreSQL Row Level Security",
      "Certification and Analytics",
    ],
    outcomes: [
      "Deployed for market validation",
      "Ongoing commercial development",
      "Strict organizational data isolation",
    ],
    live: "https://awardx.one/",
    image: "/awardx.png",
  },
  {
    id: "acmh-ids",
    title: "ACMH-IDS",
    highlight: "UAV CAN intrusion detection system",
    impact: "Machine-learning cybersecurity system for detecting UAV CAN network attacks",
    description:
      "Developed a hybrid machine-learning intrusion detection system using temporal and payload-aware CAN features to detect DoS, Fuzzing, Replay, and Masquerade attacks.",
    category: "web",
    platformLabel: "Machine Learning & Cybersecurity",
    tech: ["Python", "PyTorch", "Scikit-learn", "Optuna", "Isolation Forest", "Autoencoder", "LSTM", "XGBoost"],
    features: [
      "Hybrid ML Model Fusion",
      "Temporal and Payload-Aware Features",
      "Optuna Hyperparameter Optimization",
      "Probability Calibration",
      "Time-Series Cross-Validation",
      "Resource Profiling",
    ],
    outcomes: [
      "Attack-wise and calibration evaluation",
      "Detection coverage for four CAN attack types",
      "Validation-driven model fusion",
    ],
    github: "https://github.com/mdashfaqq/ACMH-IDS",
    image: "/achms.png",
  },
// {
//   id: "ai-appointment-system",
//   title: "AI Appointment System",
//   highlight: "WhatsApp-based AI Scheduling Platform",
//   impact: "Automates appointment booking, rescheduling, and cancellations through natural language conversations on WhatsApp",
//   description:
//     "An AI-powered appointment management platform that enables customers to book, reschedule, and cancel appointments directly through WhatsApp. The system understands natural language, checks real-time availability, prevents double bookings, and manages appointments automatically through an admin dashboard.",

//   category: "web",
//   platformLabel: "AI SaaS Platform",

//   tech: [
//     "Node.js",
//     "Express.js",
//     "MySQL",
//     "Groq API",
//     "Llama 3.3 70B",
//     "Twilio WhatsApp API",
//     "REST API"
//   ],

//   features: [
//     "AI-Powered Natural Language Booking",
//     "WhatsApp Appointment Scheduling",
//     "Appointment Rescheduling",
//     "Appointment Cancellation",
//     "Real-Time Slot Availability",
//     "Double Booking Prevention",
//     "Session-Based Conversations",
//     "Admin Dashboard",
//     "Service Management",
//     "Staff Management",
//     "Schedule Management",
//     "Automated Reminder System"
//   ],

//   outcomes: [
//     "Eliminated manual appointment handling",
//     "Enabled booking directly through WhatsApp",
//     "Reduced scheduling conflicts through overlap detection",
//     "Automated customer appointment workflows",
//     "Improved operational efficiency for service businesses"
//   ],

//   architecture: [
//     "WhatsApp Customer Interface",
//     "Twilio Webhook Integration",
//     "Groq LLM Intent Extraction",
//     "Node.js Booking Engine",
//     "MySQL Appointment Database",
//     "Admin Management Dashboard",
//     "Automated Reminder Service"
//   ],

//   live: "",
//   image: "/ai-appointment-system.webp",
//   github: "https://github.com/yourusername/ai-appointment-system",

//   featured: true
// }

];

export const categoryLabels: Record<ProjectCategory, string> = {
  mobile: "Mobile Application",
  web: "Web Application",
  fullstack: "Mobile + Web Platform",
  business: "Business Software",
};

export function getPlatformLabel(project: Pick<Project, "category" | "platformLabel">): string {
  return project.platformLabel ?? categoryLabels[project.category];
}
