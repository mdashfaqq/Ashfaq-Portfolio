import { useEffect, useRef } from "react";

interface ThumbnailItemProps {
  pdfDoc: any;
  pageNum: number;
  isActive: boolean;
  onSelect: (pageNum: number) => void;
}

function ThumbnailItem({ pdfDoc, pageNum, isActive, onSelect }: ThumbnailItemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderThumbnail() {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        if (!isMounted || !canvasRef.current) return;

        const viewport = page.getViewport({ scale: 0.22 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          transform,
          viewport,
        };

        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch (_) {}
        }

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.warn("Thumbnail render warning:", err);
        }
      }
    }

    renderThumbnail();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (_) {}
      }
    };
  }, [pdfDoc, pageNum]);

  return (
    <button
      type="button"
      onClick={() => onSelect(pageNum)}
      className={`group w-full flex flex-col items-center p-2 rounded-xl border transition-all text-left cursor-pointer select-none ${
        isActive
          ? "border-[#D62F27] bg-[#D62F27]/10 shadow-[0_0_20px_rgba(214,47,39,0.2)]"
          : "border-white/[0.06] bg-[#141416] hover:border-white/[0.2] hover:bg-[#18181b]"
      }`}
    >
      <div className="relative bg-white rounded-md shadow-md overflow-hidden flex items-center justify-center min-w-[80px] min-h-[110px]">
        <canvas ref={canvasRef} className="block pointer-events-none" />
      </div>

      <div className="w-full flex items-center justify-between mt-2 px-1">
        <span
          className={`text-[10px] font-mono tracking-wider uppercase font-semibold transition-colors ${
            isActive ? "text-[#D62F27]" : "text-white/40 group-hover:text-white/80"
          }`}
        >
          PAGE {pageNum < 10 ? `0${pageNum}` : pageNum}
        </span>
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#D62F27] animate-pulse" />
        )}
      </div>
    </button>
  );
}

interface PDFThumbnailSidebarProps {
  pdfDoc: any;
  numPages: number;
  currentPage: number;
  onSelectPage: (page: number) => void;
}

export function PDFThumbnailSidebar({
  pdfDoc,
  numPages,
  currentPage,
  onSelectPage,
}: PDFThumbnailSidebarProps) {
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <aside className="hidden md:flex flex-col w-48 lg:w-56 shrink-0 border-r border-white/[0.08] bg-[#0C0C0C] p-4 overflow-y-auto h-[calc(100vh-76px)] sticky top-[76px]">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FAFAFA]/70 font-semibold">
          Pages ({numPages})
        </span>
        <span className="text-[10px] font-mono text-white/30 uppercase">
          Thumbnails
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {pages.map((pageNum) => (
          <ThumbnailItem
            key={pageNum}
            pdfDoc={pdfDoc}
            pageNum={pageNum}
            isActive={currentPage === pageNum}
            onSelect={onSelectPage}
          />
        ))}
      </div>
    </aside>
  );
}
