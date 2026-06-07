import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-10 px-5 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-[10px] font-semibold text-[#09090b]">
            MA
          </div>
          <div>
            <p className="font-medium text-white text-sm">{profile.name}</p>
            <p className="text-xs text-[var(--muted)]">{profile.role}</p>
          </div>
        </div>

        <p className="text-xs text-[var(--muted)] text-center">
          © {year} {profile.name}. Built with React & TypeScript.
        </p>

        <div className="flex gap-5 text-xs">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-[var(--muted)] hover:text-white transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
