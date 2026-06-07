import { HiOutlineDocumentText, HiPhotograph } from "react-icons/hi";

interface CertificatePreviewProps {
  url: string;
  title: string;
  documentType: "PDF" | "Image";
  thumbnailUrl?: string;
  className?: string;
}

export function CertificatePreview({
  url,
  title,
  documentType,
  thumbnailUrl,
  className = "",
}: CertificatePreviewProps) {
  const isPdf = documentType === "PDF";
  const Icon = isPdf ? HiOutlineDocumentText : HiPhotograph;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 min-h-[40px] ${className}`}
      aria-hidden="true"
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt=""
          className="h-7 w-10 shrink-0 rounded object-cover object-top border border-white/[0.06]"
          loading="lazy"
        />
      ) : (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/[0.08] bg-white/[0.04]">
          <Icon size={14} className="text-white/40" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-white/45 truncate leading-tight">
          {isPdf ? "PDF certificate" : "Image certificate"}
        </p>
        <p className="text-[9px] text-white/28 truncate leading-tight mt-0.5">
          On file · {documentType}
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
        tabIndex={-1}
      >
        {title} certificate
      </a>
    </div>
  );
}
