import { useEffect, useRef, useState } from "react";

interface PDFPageCanvasProps {
  pdfDoc: any;
  pageNum: number;
  scale: number;
  rotation: number;
  onVisible?: (pageNum: number) => void;
}

export function PDFPageCanvas({
  pdfDoc,
  pageNum,
  scale,
  rotation,
  onVisible,
}: PDFPageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);
  const [rendering, setRendering] = useState(true);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 600,
    height: 840,
  });

  // Render page when scale, rotation, or doc changes
  useEffect(() => {
    let isMounted = true;

    async function renderPage() {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        setRendering(true);
        const page = await pdfDoc.getPage(pageNum);
        if (!isMounted || !canvasRef.current) return;

        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";

        setDimensions({
          width: Math.floor(viewport.width),
          height: Math.floor(viewport.height),
        });

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

        if (isMounted) {
          setRendering(false);
        }
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.warn(`Render error on page ${pageNum}:`, err);
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
  }, [pdfDoc, pageNum, scale, rotation]);

  // IntersectionObserver to update active page on natural document scroll
  useEffect(() => {
    if (!containerRef.current || !onVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            onVisible(pageNum);
          }
        });
      },
      { threshold: [0.4, 0.7] }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [pageNum, onVisible]);

  return (
    <div
      ref={containerRef}
      id={`pdf-page-${pageNum}`}
      className="relative flex flex-col items-center my-3 sm:my-8 transition-all max-w-full"
    >
      {/* Page Sheet Container */}
      <div
        className="relative bg-white rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/[0.08] overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] max-w-full"
        style={{
          width: dimensions.width ? `${dimensions.width}px` : "auto",
          minHeight: dimensions.height ? `${dimensions.height}px` : "600px",
        }}
      >
        {/* Skeleton loading shine while rendering page */}
        {rendering && (
          <div className="absolute inset-0 bg-[#FAFAFA] flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D62F27] animate-ping" />
              <span className="text-[10px] font-mono text-black/40 font-bold uppercase tracking-wider">
                Rendering Page {pageNum}
              </span>
            </div>
          </div>
        )}

        {/* The PDF.js Canvas */}
        <canvas ref={canvasRef} className="block w-full h-auto" />
      </div>

      {/* Floating Subtle Page Number Pill */}
      <div className="mt-3 px-3 py-1 rounded-full bg-[#18181b]/80 border border-white/[0.06] text-[10px] font-mono text-white/40 tracking-wider">
        PAGE {pageNum}
      </div>
    </div>
  );
}
