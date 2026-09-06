import { useEffect } from "react";
import { HiX } from "react-icons/hi";

interface PDFPageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  numPages: number;
  currentPage: number;
  onSelectPage: (page: number) => void;
}

export function PDFPageDrawer({
  isOpen,
  onClose,
  numPages,
  currentPage,
  onSelectPage,
}: PDFPageDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-[#0C0C0C] border-r border-white/[0.1] h-full p-5 flex flex-col z-10 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
          <div>
            <h2 className="text-sm font-bold text-white font-sans uppercase tracking-wider">
              Document Pages
            </h2>
            <p className="text-[11px] font-mono text-white/40">
              {numPages} Total Pages
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close drawer"
          >
            <HiX size={20} />
          </button>
        </div>

        {/* Page List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
          {pages.map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => {
                onSelectPage(pageNum);
                onClose();
              }}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                currentPage === pageNum
                  ? "border-[#D62F27] bg-[#D62F27]/10 text-white shadow-md"
                  : "border-white/[0.08] bg-[#141416] text-white/70 hover:border-white/[0.2]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center font-mono text-xs font-bold">
                  {pageNum}
                </span>
                <span className="text-xs font-mono font-medium">
                  PAGE {pageNum < 10 ? `0${pageNum}` : pageNum}
                </span>
              </div>
              {currentPage === pageNum && (
                <span className="w-2 h-2 rounded-full bg-[#D62F27] animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
