export type VerificationLevel = "industry" | "verified" | "professional";

export interface Certification {
  id: string;
  title: string;
  fullTitle: string;
  summary: string;
  issuer: string;
  issuerCategory: string;
  year: string;
  certificateUrl: string;
  thumbnailUrl?: string;
  credentialType: string;
  verificationLabel: string;
  verificationLevel: VerificationLevel;
  documentType: "PDF" | "Image";
  skills: string[];
  featured?: boolean;
}

export const certifications: Certification[] = [
  {
    id: "rhcsa",
    title: "RHCSA",
    fullTitle: "Red Hat Certified System Administrator",
    summary:
      "Industry-recognized certification covering Linux administration, system configuration, troubleshooting, and enterprise infrastructure.",
    issuer: "Red Hat",
    issuerCategory: "Enterprise Linux Certification",
    year: "2024",
    certificateUrl: "/certificates/Redhat_certificate.pdf",
    credentialType: "Industry Certification",
    verificationLabel: "Industry Recognized",
    verificationLevel: "industry",
    documentType: "PDF",
    skills: ["Linux", "System Administration", "Enterprise Infrastructure"],
    featured: true,
  },
  {
    id: "cpp-essentials",
    title: "C++ Essentials",
    fullTitle: "C++ Essentials Professional Certificate",
    summary:
      "Professional certification validating programming fundamentals, problem-solving, and software development concepts.",
    issuer: "Scaler",
    issuerCategory: "Professional Development Certification",
    year: "2024",
    certificateUrl: "/certificates/Scaler_C++.pdf",
    credentialType: "Professional Certificate",
    verificationLabel: "Verified Credential",
    verificationLevel: "verified",
    documentType: "PDF",
    skills: ["C++", "Programming", "Problem Solving"],
  },
];
