import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  HiX,
  HiExternalLink,
  HiDownload,
  HiMinus,
  HiPlus,
  HiRefresh,
  HiChevronLeft,
  HiChevronRight,
  HiShieldCheck,
  HiDocumentText,
  HiPhotograph,
  HiOutlineArrowsExpand,
} from "react-icons/hi";
import { usePdfDocument } from "@/components/pdf/usePdfDocument";

export interface DocumentViewerProps {
  url: string;
  externalUrl?: string;
  title: string;
  documentType?: "PDF" | "Image";
  issuer?: string;
  year?: string;
  skills?: string[];
  verificationLabel?: string;
  onClose: () => void;
}

function isPdf(url: string) {
  return url.toLowerCase().endsWith(".pdf");
}

export function DocumentViewer({
  url,
  externalUrl,
  title,
  documentType,
  issuer,
  year,
  skills,
  verificationLabel,
  onClose,
}: DocumentViewerProps) {
  const isPdfDoc = documentType === "PDF" || isPdf(url);

  // PDF Engine
  const { pdfDoc, numPages, loading, error, progress } = usePdfDocument(
    isPdfDoc ? url : ""
  );

  // Viewer controls
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [pageRendering, setPageRendering] = useState<boolean>(true);
  const [hasAutoFitted, setHasAutoFitted] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        setScale((s) => Math.min(2.8, parseFloat((s + 0.15).toFixed(2))));
      } else if (e.key === "-") {
        setScale((s) => Math.max(0.35, parseFloat((s - 0.15).toFixed(2))));
      } else if (e.key === "0") {
        handleFitView();
      } else if (e.key.toLowerCase() === "r") {
        setRotation((r) => (r + 90) % 360);
      } else if (e.key === "ArrowRight" && numPages > 1) {
        setCurrentPage((p) => Math.min(numPages, p + 1));
      } else if (e.key === "ArrowLeft" && numPages > 1) {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, numPages]);

  // Reset page when URL changes
  useEffect(() => {
    setCurrentPage(1);
    setHasAutoFitted(false);
    setImgLoaded(false);
  }, [url]);

  // Auto-fit helper: fits whole certificate inside viewer without horizontal or vertical clipping
  const calculateFitScale = useCallback(
    async (doc: any, pageNumber: number, currentRotation: number) => {
      if (!doc || !scrollContainerRef.current) return;
      try {
        const page = await doc.getPage(pageNumber);
        const unscaledViewport = page.getViewport({
          scale: 1.0,
          rotation: currentRotation,
        });

        const container = scrollContainerRef.current;
        const padX = window.innerWidth < 640 ? 20 : 48;
        const padY = window.innerWidth < 640 ? 28 : 56;

        const availableW = Math.max(160, container.clientWidth - padX);
        const availableH = Math.max(160, container.clientHeight - padY);

        const scaleW = availableW / unscaledViewport.width;
        const scaleH = availableH / unscaledViewport.height;

        // Auto-fit to fully display the certificate
        const optimalScale = Math.max(
          0.38,
          Math.min(1.5, Math.min(scaleW, scaleH))
        );

        setScale(parseFloat(optimalScale.toFixed(2)));
        setHasAutoFitted(true);
      } catch (e) {
        console.warn("Could not calculate fit scale:", e);
      }
    },
    []
  );

  // Initial Auto-Fit when PDF is loaded
  useEffect(() => {
    if (isPdfDoc && pdfDoc && !hasAutoFitted) {
      calculateFitScale(pdfDoc, currentPage, rotation);
    }
  }, [isPdfDoc, pdfDoc, currentPage, rotation, hasAutoFitted, calculateFitScale]);

  // Handle Window Resize Auto-Fit
  useEffect(() => {
    function handleResize() {
      if (isPdfDoc && pdfDoc) {
        calculateFitScale(pdfDoc, currentPage, rotation);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isPdfDoc, pdfDoc, currentPage, rotation, calculateFitScale]);

  // Render current PDF page to canvas
  useEffect(() => {
    if (!isPdfDoc || !pdfDoc || !canvasRef.current) return;

    let isMounted = true;

    async function renderPage() {
      try {
        setPageRendering(true);
        const page = await pdfDoc.getPage(currentPage);
        if (!isMounted || !canvasRef.current) return;

        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch (_) {}
        }

        const renderContext = {
          canvasContext: context,
          transform,
          viewport,
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;

        if (isMounted) {
          setPageRendering(false);
        }
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.warn(`Render error on certificate page ${currentPage}:`, err);
          if (isMounted) setPageRendering(false);
        }
      }
    }

    renderPage();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (_) {}
      }
    };
  }, [isPdfDoc, pdfDoc, currentPage, scale, rotation]);

  // Actions
  const handleZoomIn = () => {
    setScale((s) => Math.min(2.8, parseFloat((s + 0.15).toFixed(2))));
  };

  const handleZoomOut = () => {
    setScale((s) => Math.max(0.35, parseFloat((s - 0.15).toFixed(2))));
  };

  const handleFitView = () => {
    if (isPdfDoc && pdfDoc) {
      calculateFitScale(pdfDoc, currentPage, rotation);
    } else {
      setScale(1.0);
    }
  };

  const handleRotate = () => {
    setRotation((r) => (r + 90) % 360);
  };

  const handleDownload = () => {
    const cleanIssuer = (issuer || "Mohamed_Ashfaq").replace(/[^a-zA-Z0-9]/g, "_");
    const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, "_");
    const ext = isPdfDoc ? "pdf" : "png";
    const downloadName = `${cleanIssuer}_${cleanTitle}.${ext}`;

    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const percentDisplay = Math.round(scale * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Verified credential certificate: ${title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl h-[94dvh] sm:h-[90vh] flex flex-col rounded-2xl border border-white/[0.1] bg-[#0d0d10] shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden min-w-0 relative"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#121216]/90 backdrop-blur-md shrink-0 min-w-0 z-20">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {verificationLabel || "Verified Credential"}
              </span>

              {issuer && (
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60 border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 rounded-full">
                  {issuer}
                </span>
              )}

              {year && (
                <span className="text-xs sm:text-sm font-semibold font-mono text-white/85 border border-white/[0.12] bg-white/[0.06] px-2.5 py-0.5 rounded-full inline-flex items-center">
                  {year}
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-2xl">
              {title}
            </h3>

            {skills && skills.length > 0 && (
              <div className="hidden sm:flex flex-wrap items-center gap-1.5 mt-1">
                {skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] font-medium text-white/40 bg-white/[0.03] border border-white/[0.04] px-1.5 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-all touch-manipulation flex items-center gap-1.5 text-xs font-medium border border-transparent hover:border-white/[0.08]"
              title="Download Certificate"
              aria-label="Download Certificate"
            >
              <HiDownload size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <a
              href={externalUrl || url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-all touch-manipulation flex items-center gap-1.5 text-xs font-medium border border-transparent hover:border-white/[0.08]"
              title="Open Original Document in New Tab"
              aria-label="Open in new tab"
            >
              <HiExternalLink size={16} />
              <span className="hidden sm:inline">Open</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center ml-1"
              title="Close (Esc)"
              aria-label="Close"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>

        {/* Certificate Viewport Area */}
        <div
          ref={scrollContainerRef}
          className="relative flex-1 min-h-0 bg-[#08080a] overflow-auto flex flex-col"
        >
          {/* Subtle Canvas Backdrop Grid Accent */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Loading Skeleton */}
          {isPdfDoc && loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30 bg-[#08080a]">
              <div className="relative flex items-center justify-center">
                <span className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                <HiShieldCheck
                  size={20}
                  className="absolute text-emerald-400/80"
                />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-sm font-medium text-white/80">
                  Rendering Verified Certificate
                </p>
                <p className="text-xs text-white/40 font-mono">
                  Loading high-resolution vector canvas… ({progress}%)
                </p>
              </div>
            </div>
          )}

          {/* Error Screen */}
          {isPdfDoc && error && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-30 p-6 text-center">
              <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                <HiDocumentText size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Unable to render preview directly
                </p>
                <p className="text-xs text-white/40 mt-1 max-w-sm">
                  The certificate is securely stored on file and available for direct review.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-medium transition-all"
                >
                  Open in New Tab
                </a>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-medium transition-all"
                >
                  Download Certificate
                </button>
              </div>
            </div>
          )}

          {/* Main Rendering Canvas (margin-auto keeps it centered when small and scrollable when zoomed) */}
          <div className="min-h-full min-w-full flex items-center justify-center m-auto p-4 sm:p-8 w-fit">
            {isPdfDoc ? (
              <div className="relative flex flex-col items-center">
                {/* Canvas Container with subtle elevation */}
                <div
                  className="relative bg-white rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/[0.1] overflow-hidden transition-shadow duration-300"
                  style={{
                    display: loading || error ? "none" : "block",
                  }}
                >
                  {/* Shimmer while re-rendering zoom */}
                  {pageRendering && !loading && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                      <span className="w-5 h-5 rounded-full border-2 border-black/20 border-t-black/80 animate-spin" />
                    </div>
                  )}
                  <canvas ref={canvasRef} className="block max-w-none" />
                </div>
              </div>
            ) : (
              /* Image Certificate Viewer */
              <div className="relative flex items-center justify-center">
                {!imgLoaded && (
                  <div className="flex items-center gap-2 text-white/40 text-xs py-10">
                    <HiPhotograph size={20} className="animate-pulse" />
                    <span>Loading certificate image…</span>
                  </div>
                )}
                <img
                  src={url}
                  alt={title}
                  onLoad={() => setImgLoaded(true)}
                  className={`rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/[0.1] object-contain transition-all duration-200 ${
                    imgLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transformOrigin: "center center",
                    maxHeight: scale === 1.0 ? "calc(90vh - 12rem)" : "none",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Floating Interactive Toolbar Controls */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center z-30 pointer-events-none px-3">
          <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-full bg-[#121216]/95 backdrop-blur-2xl border border-white/[0.14] shadow-[0_12px_40px_rgba(0,0,0,0.7)] text-white select-none transition-all max-w-[calc(100vw-32px)]">
            {/* Multi-page controls if applicable */}
            {isPdfDoc && numPages > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-1 sm:p-1.5 rounded-full hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white/80 hover:text-white"
                  title="Previous Page (←)"
                  aria-label="Previous Page"
                >
                  <HiChevronLeft size={16} />
                </button>

                <span className="text-[11px] font-mono text-white/60 px-1">
                  {currentPage}/{numPages}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                  disabled={currentPage >= numPages}
                  className="p-1 sm:p-1.5 rounded-full hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white/80 hover:text-white"
                  title="Next Page (→)"
                  aria-label="Next Page"
                >
                  <HiChevronRight size={16} />
                </button>

                <div className="h-3.5 w-[1px] bg-white/[0.12]" />
              </>
            )}

            {/* Zoom Out */}
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= 0.4}
              className="p-1.5 rounded-full hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white/80 hover:text-white touch-manipulation"
              title="Zoom Out (−)"
              aria-label="Zoom out"
            >
              <HiMinus size={14} />
            </button>

            {/* Percentage Display / Reset */}
            <button
              type="button"
              onClick={handleFitView}
              className="px-2 py-0.5 rounded-full hover:bg-white/[0.08] active:scale-95 text-[11px] font-mono font-medium text-white/90 hover:text-white transition-all min-w-[44px] text-center touch-manipulation"
              title="Click to Fit to Screen (0)"
            >
              {percentDisplay}%
            </button>

            {/* Zoom In */}
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={scale >= 2.6}
              className="p-1.5 rounded-full hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white/80 hover:text-white touch-manipulation"
              title="Zoom In (+)"
              aria-label="Zoom in"
            >
              <HiPlus size={14} />
            </button>

            <div className="h-3.5 w-[1px] bg-white/[0.12]" />

            {/* Fit to View */}
            <button
              type="button"
              onClick={handleFitView}
              className="p-1.5 rounded-full hover:bg-white/[0.08] active:scale-95 transition-all text-white/80 hover:text-white touch-manipulation"
              title="Fit to Window"
              aria-label="Fit to window"
            >
              <HiOutlineArrowsExpand size={14} />
            </button>

            {/* Rotate */}
            <button
              type="button"
              onClick={handleRotate}
              className="p-1.5 rounded-full hover:bg-white/[0.08] active:scale-95 transition-all text-white/80 hover:text-white touch-manipulation"
              title="Rotate 90° (R)"
              aria-label="Rotate 90°"
            >
              <HiRefresh size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
