export interface Certification {
  title: string;
  issuer: string;
  year: string;
  certificateUrl: string;
}

export const certifications: Certification[] = [
  { title: "RHCSA", issuer: "Red Hat Certified System Administrator", year: "2024" ,certificateUrl:"/certificates/Redhat_certificate.pdf" },
  { title: "C++ Essentials", issuer: "Scaler", year: "2024" ,certificateUrl:"/certificates/C++.png" },
];
