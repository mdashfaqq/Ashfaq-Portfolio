import {
  HiMinus,
  HiPlus,
  HiRefresh,
  HiDownload,
  HiOutlineArrowsExpand,
  HiViewList,
} from "react-icons/hi";

interface PDFToolbarProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitWidth: () => void;
  onRotate: () => void;
  onDownload: () => void;
  onTogglePagesDrawer?: () => void;
  currentPage: number;
  numPages: number;
}

export function PDFToolbar({
  scale,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitWidth,
  onRotate,
  onDownload,
  onTogglePagesDrawer,
  currentPage,
  numPages,
}: PDFToolbarProps) {
  const percentDisplay = Math.round(scale * 100);

  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 flex justify-center z-30 pointer-events-none px-2 sm:px-4 safe-bottom">
      <div className="pointer-events-auto flex items-center gap-0.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-[#141416]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-white select-none transition-all max-w-[calc(100vw-16px)]">
        {/* Mobile Pages Drawer Trigger */}
        {onTogglePagesDrawer && (
          <>
            <button
              type="button"
              onClick={onTogglePagesDrawer}
              className="md:hidden flex items-center gap-1 px-2 py-1.5 rounded-full hover:bg-white/[0.08] active:bg-white/[0.12] text-[11px] font-mono font-medium text-[var(--foreground)] touch-manipulation"
              aria-label="Open page thumbnails"
            >
              <HiViewList size={15} />
              <span>
                {currentPage}/{numPages}
              </span>
            </button>
            <div className="h-3.5 w-[1px] bg-white/[0.12] md:hidden" />
          </>
        )}

        {/* Page indicator on desktop */}
        <div className="hidden md:flex items-center gap-1 px-2 text-xs font-mono text-white/50 tracking-wider">
          <span className="text-white font-semibold">{currentPage}</span>
          <span>/</span>
          <span>{numPages}</span>
        </div>

        <div className="hidden md:block h-4 w-[1px] bg-white/[0.12]" />

        {/* Zoom Out */}
        <button
          type="button"
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white/80 hover:text-white"
          title="Zoom Out (−)"
          aria-label="Zoom out"
        >
          <HiMinus size={15} />
        </button>

        {/* Reset / Percent button */}
        <button
          type="button"
          onClick={onResetZoom}
          className="px-1.5 sm:px-2.5 py-1 rounded-full hover:bg-white/[0.08] active:scale-95 text-[11px] sm:text-xs font-mono font-medium text-[var(--foreground)] hover:text-white transition-all min-w-[44px] sm:min-w-[52px] text-center touch-manipulation"
          title="Reset Zoom to 100%"
        >
          {percentDisplay}%
        </button>

        {/* Zoom In */}
        <button
          type="button"
          onClick={onZoomIn}
          disabled={scale >= 2.5}
          className="p-1 sm:p-2 rounded-full hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-white/80 hover:text-white touch-manipulation"
          title="Zoom In (+)"
          aria-label="Zoom in"
        >
          <HiPlus size={14} className="sm:text-[15px]" />
        </button>

        <div className="h-3.5 sm:h-4 w-[1px] bg-white/[0.12]" />

        {/* Fit Width */}
        <button
          type="button"
          onClick={onFitWidth}
          className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-full hover:bg-white/[0.08] active:scale-95 transition-all text-white/80 hover:text-white touch-manipulation"
          title="Fit to Width"
          aria-label="Fit to width"
        >
          <HiOutlineArrowsExpand size={15} />
        </button>

        {/* Rotate */}
        <button
          type="button"
          onClick={onRotate}
          className="p-1 sm:p-2 rounded-full hover:bg-white/[0.08] active:scale-95 transition-all text-white/80 hover:text-white touch-manipulation"
          title="Rotate 90°"
          aria-label="Rotate"
        >
          <HiRefresh size={14} className="sm:text-[15px]" />
        </button>

        <div className="h-3.5 sm:h-4 w-[1px] bg-white/[0.12]" />

        {/* Download Quick Button */}
        <button
          type="button"
          onClick={onDownload}
          className="p-1 sm:p-2 rounded-full bg-[#D62F27]/20 hover:bg-[#D62F27]/35 text-[#D62F27] hover:text-white active:scale-95 transition-all touch-manipulation"
          title="Download PDF"
          aria-label="Download PDF"
        >
          <HiDownload size={14} className="sm:text-[15px]" />
        </button>
      </div>
    </div>
  );
}
