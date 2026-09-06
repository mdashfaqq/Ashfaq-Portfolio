import { useState, useRef, useEffect, useCallback } from "react";
import { usePdfDocument } from "@/components/pdf/usePdfDocument";
import { Navbar } from "@/components/layout/Navbar";
import { PDFThumbnailSidebar } from "@/components/pdf/PDFThumbnailSidebar";
import { PDFPageCanvas } from "@/components/pdf/PDFPageCanvas";
import { PDFToolbar } from "@/components/pdf/PDFToolbar";
import { PDFPageDrawer } from "@/components/pdf/PDFPageDrawer";
import { PDFLoadingScreen } from "@/components/pdf/PDFLoadingScreen";
import { navigateToSection } from "@/components/navigation/CinematicTransition";
import { profile } from "@/data/profile";
import {
  HiDownload,
  HiExternalLink,
  HiMail,
  HiArrowRight,
  HiArrowLeft,
} from "react-icons/hi";

export function ResumePage() {
  const resumePdfUrl = "/resume.pdf";
  const { pdfDoc, numPages, loading, error, progress } =
    usePdfDocument(resumePdfUrl);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isPagesDrawerOpen, setIsPagesDrawerOpen] = useState<boolean>(false);

  const viewerContainerRef = useRef<HTMLDivElement>(null);

  // Auto-fit scale to screen width on first load and window resize
  useEffect(() => {
    function calculateFitWidth() {
      const containerWidth =
        viewerContainerRef.current?.clientWidth || window.innerWidth;
      const isMobile = window.innerWidth < 768;
      const availableWidth = isMobile
        ? Math.min(containerWidth, window.innerWidth) - 24
        : containerWidth - (window.innerWidth < 1024 ? 240 : 280);

      // Standard A4 PDF width is ~600px at scale 1.0.
      // On mobile (e.g. 360px), availableWidth is ~336px -> targetScale ~0.56.
      // Minimum scale 0.38 guarantees zero horizontal clipping on small screens.
      const targetScale = Math.max(0.38, Math.min(1.5, availableWidth / 600));
      setScale(parseFloat(targetScale.toFixed(2)));
    }

    if (!loading && pdfDoc) {
      calculateFitWidth();
    }

    window.addEventListener("resize", calculateFitWidth);
    return () => window.removeEventListener("resize", calculateFitWidth);
  }, [loading, pdfDoc]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["input", "textarea"].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key === "+" || e.key === "=") {
        setScale((s) => Math.min(2.5, parseFloat((s + 0.15).toFixed(2))));
      } else if (e.key === "-") {
        setScale((s) => Math.max(0.4, parseFloat((s - 0.15).toFixed(2))));
      } else if (e.key === "0") {
        setScale(1.0);
      } else if (e.key.toLowerCase() === "r") {
        setRotation((r) => (r + 90) % 360);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleZoomIn = () => {
    setScale((s) => Math.min(2.5, parseFloat((s + 0.15).toFixed(2))));
  };

  const handleZoomOut = () => {
    setScale((s) => Math.max(0.4, parseFloat((s - 0.15).toFixed(2))));
  };

  const handleResetZoom = () => {
    setScale(1.0);
  };

  const handleFitWidth = () => {
    const containerWidth =
      viewerContainerRef.current?.clientWidth || window.innerWidth;
    const isMobile = window.innerWidth < 768;
    const availableWidth = isMobile
      ? Math.min(containerWidth, window.innerWidth) - 24
      : containerWidth - (window.innerWidth < 1024 ? 240 : 280);
    const targetScale = Math.max(0.38, Math.min(1.6, availableWidth / 600));
    setScale(parseFloat(targetScale.toFixed(2)));
  };

  const handleRotate = () => {
    setRotation((r) => (r + 90) % 360);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdfUrl;
    link.download = "Mohamed_Ashfaq_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectPage = useCallback((pageNum: number) => {
    setCurrentPage(pageNum);
    const targetEl = document.getElementById(`pdf-page-${pageNum}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#FAFAFA] flex flex-col font-sans selection:bg-[#D62F27]/30 selection:text-white">
      {/* 1. Default Portfolio Navbar */}
      <Navbar />

      {/* 2. Sleek, Architectural Editorial Masthead */}
      <header className="pt-20 sm:pt-28 md:pt-32 pb-4 sm:pb-6 px-3 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-white/[0.08]">
          <div className="space-y-1.5 sm:space-y-2">
            {/* Top metadata line */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#d8c5a3] uppercase font-bold">
                DOCUMENT ARCHIVE // 2026
              </span>
              <span className="text-white/20 text-xs">|</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Editorial Title */}
            <h1
              className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              Curriculum Vitae
            </h1>

            {/* Clean Subtitle */}
            <p className="text-[11px] sm:text-sm text-white/60 font-mono">
              Mohamed Ashfaq · Full-Stack & Application Security Specialist
            </p>
          </div>

          {/* Minimal Action Controls (Responsive 3-Column on Mobile, Flex on Desktop) */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto pt-1 sm:pt-0">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-2.5 rounded-xl bg-[#D62F27] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(214,47,39,0.3)] transition-all touch-manipulation"
            >
              <HiDownload size={15} />
              <span className="truncate">Download</span>
            </button>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 rounded-xl border border-white/[0.12] hover:bg-white/[0.06] text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors touch-manipulation"
            >
              <HiExternalLink size={15} />
              <span className="truncate">Drive</span>
            </a>

            <button
              type="button"
              onClick={() => navigateToSection("#contact", "GET IN TOUCH")}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs sm:text-sm font-medium text-[#d8c5a3] transition-colors border border-white/[0.06] touch-manipulation"
            >
              <HiMail size={15} />
              <span className="truncate">Contact</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main PDF Document Viewer (PDF.js Canvas Engine) */}
      <div
        ref={viewerContainerRef}
        className="flex-1 flex flex-row relative w-full overflow-x-hidden min-h-[calc(100vh-220px)] border-b border-white/[0.08]"
      >
        {loading || error ? (
          <PDFLoadingScreen progress={progress} error={error} />
        ) : (
          <>
            {/* Desktop Left Thumbnail Sidebar */}
            <PDFThumbnailSidebar
              pdfDoc={pdfDoc}
              numPages={numPages}
              currentPage={currentPage}
              onSelectPage={handleSelectPage}
            />

            {/* Center Natural PDF Canvas Area */}
            <main className="flex-1 flex flex-col items-center px-2 sm:px-8 py-4 sm:py-12 overflow-y-auto pb-24 sm:pb-28 max-w-full">
              <div className="flex items-center gap-2 mb-3 sm:mb-4 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62F27] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-white/40 uppercase font-semibold">
                  PAGE {currentPage} OF {numPages} · VECTOR RENDER
                </span>
              </div>

              {/* PDF Pages */}
              <div className="w-full flex flex-col items-center max-w-full">
                {pages.map((pageNum) => (
                  <PDFPageCanvas
                    key={pageNum}
                    pdfDoc={pdfDoc}
                    pageNum={pageNum}
                    scale={scale}
                    rotation={rotation}
                    onVisible={(p) => setCurrentPage(p)}
                  />
                ))}
              </div>

              {/* End of Document Stamp */}
              <div className="flex items-center gap-3 mt-8 sm:mt-10 text-white/20 select-none">
                <div className="w-10 sm:w-12 h-[1px] bg-white/10" />
                <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase">
                  END OF DOCUMENT
                </span>
                <div className="w-10 sm:w-12 h-[1px] bg-white/10" />
              </div>
            </main>

            {/* Mobile Slide-Over Pages Drawer */}
            <PDFPageDrawer
              isOpen={isPagesDrawerOpen}
              onClose={() => setIsPagesDrawerOpen(false)}
              numPages={numPages}
              currentPage={currentPage}
              onSelectPage={handleSelectPage}
            />

            {/* Floating Bottom Toolbar */}
            <PDFToolbar
              scale={scale}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
              onFitWidth={handleFitWidth}
              onRotate={handleRotate}
              onDownload={handleDownload}
              onTogglePagesDrawer={() => setIsPagesDrawerOpen(true)}
              currentPage={currentPage}
              numPages={numPages}
            />
          </>
        )}
      </div>

      {/* 4. Unique Minimal Document Colophon & Verification Footer */}
      <footer className="px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-6 sm:py-8 border-b border-white/[0.08] text-xs font-mono">
          {/* Col 1: Integrity */}
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-[#d8c5a3] uppercase font-bold block mb-1">
              AUTHENTICITY & ARCHIVE
            </span>
            <p className="text-white/60">
              Format: High-Resolution Vector PDF (A4)
            </p>
            <p className="text-white/40">
              Renderer: Custom HTML5 Canvas Engine
            </p>
            <p className="text-white/40">
              Document ID: MA-CV-2026.03 // VERIFIED
            </p>
          </div>

          {/* Col 2: Direct Channels */}
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-[#d8c5a3] uppercase font-bold block mb-1">
              DIRECT COORDINATES
            </span>
            <p className="text-white/60">
              Email: <a href={`mailto:${profile.email}`} className="text-white hover:text-[#D62F27] transition-colors">{profile.email}</a>
            </p>
            <p className="text-white/40">
              Location: Chennai, India (Open to Relocation)
            </p>
            <p className="text-white/40">
              Credentials: RHCSA Certified · OWASP / DevSecOps
            </p>
          </div>

          {/* Col 3: Cross-Navigation */}
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-[#d8c5a3] uppercase font-bold block mb-1">
              PORTFOLIO NAVIGATION
            </span>
            <div>
              <button
                type="button"
                onClick={() => navigateToSection("#projects", "SELECTED WORK")}
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors touch-manipulation"
              >
                <HiArrowLeft size={13} className="text-[#D62F27]" />
                <span>Return to Selected Work</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigateToSection("#contact", "GET IN TOUCH")}
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#d8c5a3] transition-colors touch-manipulation"
              >
                <HiArrowRight size={13} className="text-[#d8c5a3]" />
                <span>Initiate Transmission / Contact</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom micro-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-5 sm:pt-6 text-[10px] font-mono text-white/30 text-center sm:text-left">
          <span>© 2026 MOHAMED ASHFAQ · ALL RIGHTS RESERVED</span>
          <span>TYPESET FOR PHYSICAL PRINT & DIGITAL AUDIT</span>
        </div>
      </footer>
    </div>
  );
}
