import { HiCalendar, HiOfficeBuilding, HiCheckCircle } from "react-icons/hi";

interface CredentialMetaProps {
  issuer: string;
  category: string;
  year: string;
  credentialType: string;
  className?: string;
}

export function CredentialMeta({
  issuer,
  category,
  year,
  credentialType,
  className = "",
}: CredentialMetaProps) {
  const details = [
    { icon: HiCalendar, text: `Earned ${year}` },
    { icon: HiOfficeBuilding, text: credentialType },
    { icon: HiCheckCircle, text: "Verification available" },
  ];

  return (
    <div className={`min-w-0 ${className}`}>
      <p className="text-sm font-medium text-white/80 leading-snug break-words">
        {issuer}
      </p>
      <p className="mt-0.5 text-xs text-white/45 leading-relaxed break-words">
        {category}
      </p>
      <ul className="mt-2.5 flex flex-col gap-1.5">
        {details.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-2 text-xs text-white/50 min-w-0"
          >
            <Icon size={13} className="shrink-0 text-white/30" aria-hidden="true" />
            <span className="leading-snug break-words">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
