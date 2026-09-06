import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

const PDFJS_SCRIPT_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

export interface PDFDocumentState {
  pdfDoc: any | null;
  numPages: number;
  loading: boolean;
  error: string | null;
  progress: number;
}

let pdfJsScriptPromise: Promise<void> | null = null;

function loadPdfJsScript(): Promise<void> {
  if (typeof window !== "undefined" && window.pdfjsLib) {
    return Promise.resolve();
  }
  if (pdfJsScriptPromise) {
    return pdfJsScriptPromise;
  }

  pdfJsScriptPromise = new Promise<void>((resolve, reject) => {
    if (typeof window !== "undefined" && window.pdfjsLib) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${PDFJS_SCRIPT_URL}"]`
    );
    if (existingScript) {
      if (window.pdfjsLib) {
        resolve();
        return;
      }
      existingScript.addEventListener("load", () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        }
        resolve();
      });
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.src = PDFJS_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      }
      resolve();
    };
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });

  return pdfJsScriptPromise;
}

export function usePdfDocument(url: string) {
  const [state, setState] = useState<PDFDocumentState>({
    pdfDoc: null,
    numPages: 0,
    loading: true,
    error: null,
    progress: 10,
  });

  const loadingTaskRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndInitPdf() {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null, progress: 25 }));
        await loadPdfJsScript();

        if (!isMounted) return;

        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        }

        setState((prev) => ({ ...prev, progress: 55 }));

        const loadingTask = window.pdfjsLib.getDocument({
          url,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
          cMapPacked: true,
        });
        loadingTaskRef.current = loadingTask;

        loadingTask.onProgress = (progressData: { loaded: number; total: number }) => {
          if (progressData.total > 0 && isMounted) {
            const pct = Math.min(
              90,
              Math.round((progressData.loaded / progressData.total) * 100)
            );
            setState((prev) => ({ ...prev, progress: Math.max(prev.progress, pct) }));
          }
        };

        const doc = await loadingTask.promise;
        if (!isMounted) return;

        setState({
          pdfDoc: doc,
          numPages: doc.numPages,
          loading: false,
          error: null,
          progress: 100,
        });
      } catch (err: any) {
        if (!isMounted) return;
        console.error("PDF.js loading error:", err);
        setState({
          pdfDoc: null,
          numPages: 0,
          loading: false,
          error: err?.message || "Failed to load PDF document.",
          progress: 0,
        });
      }
    }

    fetchAndInitPdf();

    return () => {
      isMounted = false;
      if (loadingTaskRef.current) {
        try {
          loadingTaskRef.current.destroy();
        } catch (_) {}
      }
    };
  }, [url]);

  return state;
}
