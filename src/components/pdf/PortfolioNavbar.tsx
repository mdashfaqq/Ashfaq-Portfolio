import React from "react";
import { HiArrowLeft, HiDownload, HiExternalLink, HiMenuAlt3, HiX } from "react-icons/hi";
import { profile } from "@/data/profile";
import { navigateWithTransition } from "./PageTransitionOverlay";

interface PortfolioNavbarProps {
  onOpenMobileMenu?: () => void;
  mobileMenuOpen?: boolean;
}

export function PortfolioNavbar({
  onOpenMobileMenu,
  mobileMenuOpen,
}: PortfolioNavbarProps) {
  const resumePdfUrl = "/resume.pdf";
  const externalDriveUrl = profile.resume;

  const handleBackToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWithTransition("/", "PORTFOLIO");
  };

  const handleDriveView = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWithTransition(() => {
      window.open(externalDriveUrl, "_blank", "noopener,noreferrer");
    }, "DRIVE VIEW");
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWithTransition(() => {
      const link = document.createElement("a");
      link.href = resumePdfUrl;
      link.download = "Mohamed_Ashfaq_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, "DOWNLOADING");
  };

  return (
    <header className="sticky top-0 z-40 h-[72px] sm:h-[80px] bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* LEFT: Back to Portfolio & Title */}
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
        <a
          href="/"
          onClick={handleBackToPortfolio}
          className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[var(--foreground)] hover:text-white hover:bg-white/[0.06] transition-all touch-manipulation"
          aria-label="Back to Portfolio"
        >
          <HiArrowLeft
            size={18}
            className="text-[var(--foreground)] group-hover:-translate-x-0.5 group-hover:text-white transition-transform"
          />
          <span className="hidden sm:inline font-mono uppercase tracking-wider text-xs">
            Portfolio
          </span>
        </a>

        <div className="h-4 w-[1px] bg-white/[0.12] hidden sm:block" />

        {/* Brand/Document Title */}
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base tracking-wide truncate">
            <span className="font-bold text-white font-sans">Mohamed Ashfaq</span>{" "}
            <span className="text-white/40 font-normal font-sans">· Resume</span>
          </h1>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Drive View Button */}
        <a
          href={externalDriveUrl}
          onClick={handleDriveView}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-[var(--foreground)] hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors touch-manipulation"
          title="Open in Google Drive"
        >
          <HiExternalLink size={16} />
          <span>Drive View</span>
        </a>

        {/* Prominent Download PDF Button */}
        <a
          href={resumePdfUrl}
          onClick={handleDownload}
          download="Mohamed_Ashfaq_Resume.pdf"
          className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#D62F27] text-white hover:bg-[#b91c1c] shadow-[0_4px_20px_rgba(214,47,39,0.3)] transition-all touch-manipulation"
        >
          <HiDownload size={16} />
          <span>Download PDF</span>
        </a>

        {/* Mobile Hamburger Button */}
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors touch-manipulation ml-1"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        )}
      </div>
    </header>
  );
}
