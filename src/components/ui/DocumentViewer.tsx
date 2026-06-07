import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiX, HiExternalLink, HiDownload, HiDocumentText } from "react-icons/hi";

interface DocumentViewerProps {
  url: string;
  title: string;
  documentType?: "PDF" | "Image";
  issuer?: string;
  year?: string;
  onClose: () => void;
}

function isPdf(url: string) {
  return url.toLowerCase().endsWith(".pdf");
}

export function DocumentViewer({
  url,
  title,
  documentType,
  issuer,
  year,
  onClose,
}: DocumentViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const type = documentType ?? (isPdf(url) ? "PDF" : "Image");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    setLoaded(false);
  }, [url]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`View ${title} credential`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="surface-elevated w-full sm:max-w-4xl max-h-[96dvh] sm:max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden min-w-0"
      >
        <div className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/[0.08] shrink-0 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400 border border-emerald-500/20 bg-emerald-500/8 px-2 py-0.5 rounded">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                Verified
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/45 border border-white/[0.08] px-2 py-0.5 rounded">
                {type} Document
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-white break-words leading-snug">
              {title}
            </p>
            {(issuer || year) && (
              <p className="text-[11px] text-[var(--muted)] mt-0.5">
                {issuer && `Issued by ${issuer}`}
                {issuer && year && " · "}
                {year && `Earned ${year}`}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open in new tab"
            >
              <HiExternalLink size={18} />
            </a>
            <a
              href={url}
              download
              className="p-2.5 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation min-w-[44px] min-h-[44px] hidden sm:flex items-center justify-center"
              aria-label="Download"
            >
              <HiDownload size={18} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>

        <div className="relative flex-1 min-h-0 bg-[#0a0a0c]">
          {!loaded && type === "PDF" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--muted)]">
              <HiDocumentText size={32} className="opacity-40 animate-pulse" />
              <p className="text-xs">Loading credential document…</p>
            </div>
          )}

          {type === "PDF" || isPdf(url) ? (
            <iframe
              src={`${url}#view=FitH`}
              title={title}
              onLoad={() => setLoaded(true)}
              className={`w-full h-[calc(96dvh-5.5rem)] sm:h-[calc(92vh-5rem)] border-0 transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="flex items-center justify-center p-4 h-[calc(96dvh-5.5rem)] sm:h-[calc(92vh-5rem)] overflow-auto">
              <img
                src={url}
                alt={title}
                onLoad={() => setLoaded(true)}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
