export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  architecture?: string[];
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "coredine",
    title: "CoreDine",
    description:
      "A complete Restaurant POS and Kitchen Order Ticket Management System with billing, inventory management, order tracking, role-based access control, table management, invoice generation, and real-time restaurant workflows.",
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
    github: "https://github.com/mdashfaqq/CoreDine-Restaurant-POS",
    featured: true,
    image: "/coredine.png",
  },
  {
    id: "edutenant",
    title: "EduTenant LMS",
    description:
      "Multi-tenant Learning Management System supporting attendance tracking, academic scheduling, assignments, announcements, and educational workflows.",
    tech: ["Flutter", "PHP", "MySQL", "REST API"],
    features: [
      "Multi-tenant Architecture",
      "Attendance Tracking",
      "Academic Scheduling",
      "Assignments & Announcements",
    ],
    github: "https://github.com/mdashfaqq/EduTenant-LMS",
    image: "/lms.png",
    featured: true,
  },
  {
    id: "rental-utility",
    title: "Rental Utility POS System",
    description:
      "Business utility management platform supporting quotation generation, inventory tracking, invoicing, customer management, ledgers, and analytics.",
    tech: ["React", "TypeScript", "PHP", "MySQL"],
    features: [
      "Quotation Generation",
      "Inventory Tracking",
      "Invoicing & Ledgers",
      "Customer Management",
      "Analytics Dashboard",
    ],
    github: "https://github.com/mdashfaqq/Rental-Utility-System",
    image:"/rentalpos.png",
    featured: true,
  },
  {
    id: "bismi",
    title: "Bismi Furniture eCommerce",
    description:
      "Online furniture store platform with authentication, product management, order workflows, and backend API integration.",
    tech: ["React", "PHP", "MySQL", "JWT"],
    features: [
      "Product Management",
      "Secure Authentication",
      "Order Workflows",
      "API Integration",
    ],
    github: "https://github.com/mdashfaqq/BismiFurniture---Online-Furnstore",
    live: "https://bismibedmart.com/",
    image: "/bismi.png",
    featured: true,
  },
  {
    id: "offlinedocs",
    title: "OfflineDocs",
    description:
      "A privacy-focused document vault for users and families to securely store and manage important documents—PDFs, certificates, IDs, licenses, and notes—completely offline. Designed for users who want full control over personal data without third-party servers or cloud services.",
    tech: ["Flutter", "SQLite", "Local Storage", "File Management"],
    features: [
      "100% Offline Operation",
      "Document Categorization",
      "Secure Local Storage",
      "PDF Viewer",
      "Family Document Management",
      "No Cloud Dependency",
      "Privacy-First Architecture",
    ],
    architecture: [
      "Flutter Mobile App",
      "SQLite Database",
      "Local File System",
      "Offline-Only — No Cloud",
    ],
    image: "/Offlinedocs.png",
    github: "https://github.com/mdashfaqq/OfflineDocs-Offline-Document-Oraganizer-",
    featured: true,
  },
  {
    id: "unreadymades",
    title: "UnReadymades",
    description:
      "An eCommerce platform for a readymade garment business—customers browse products, manage accounts, place orders, and shop through a responsive experience. Digitized a traditional garment business with an online sales platform and improved customer accessibility.",
    tech: ["React", "PHP", "MySQL", "REST API"],
    features: [
      "Product Catalog Management",
      "User Authentication",
      "Shopping Cart",
      "Order Management",
      "Responsive Design",
      "Admin Product Control",
      "Backend API Integration",
    ],
    architecture: [
      "React Frontend",
      "PHP REST APIs",
      "MySQL Database",
      "Production Deployment",
    ],
    live: "https://unreadymades.com/",
    image:"/unreadymades.png",
    github: "https://github.com/mdashfaqq/UNReadymades-Online-Fabric-Shopping",
    featured: true,
  },
];
