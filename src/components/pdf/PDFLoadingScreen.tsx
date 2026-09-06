import React from "react";
import { HiDownload, HiRefresh } from "react-icons/hi";

interface PDFLoadingScreenProps {
  progress: number;
  error?: string | null;
  onRetry?: () => void;
}

export function PDFLoadingScreen({
  progress,
  error,
  onRetry,
}: PDFLoadingScreenProps) {
  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-2xl bg-[#D62F27]/10 border border-[#D62F27]/30 flex items-center justify-center mb-5 text-[#D62F27]">
          <span className="text-2xl font-black">!</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white font-sans uppercase tracking-tight mb-2">
          Unable to Load Document
        </h2>
        <p className="text-sm text-white/50 max-w-md mb-6 leading-relaxed">
          {error}. You can still download the complete resume file directly below.
        </p>
        <div className="flex items-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium text-white transition-all"
            >
              <HiRefresh size={16} />
              <span>Retry</span>
            </button>
          )}
          <a
            href="/resume.pdf"
            download="Mohamed_Ashfaq_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D62F27] hover:bg-[#b91c1c] text-white text-sm font-semibold shadow-lg transition-all"
          >
            <HiDownload size={16} />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[65vh]">
      <div className="relative mb-6">
        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#D62F27] font-bold block mb-2 animate-pulse">
          INITIALIZING PDF.JS ENGINE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white font-sans">
          RESUME
        </h2>
        <p className="text-xs font-mono text-white/40 tracking-widest mt-1">
          PAGE 01 / 02
        </p>
      </div>

      {/* Editorial Progress Bar */}
      <div className="w-48 sm:w-64 h-[3px] bg-white/[0.08] rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#D62F27] via-[#ef4444] to-[#D62F27] transition-all duration-300 rounded-full"
          style={{ width: `${Math.max(15, progress)}%` }}
        />
      </div>

      <span className="text-[10px] font-mono text-white/30 tracking-widest mt-3">
        {progress}% LOADED
      </span>
    </div>
  );
}
