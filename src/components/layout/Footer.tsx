import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 px-5 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-xs font-bold text-[#020617]">
            MA
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{profile.name}</p>
            <p className="text-xs text-[var(--muted)]">{profile.role}</p>
          </div>
        </div>

        <p className="text-sm text-[var(--muted)] text-center">
          © {year} Mohamed Ashfaq. Crafted with React & TypeScript.
        </p>

        <div className="flex gap-6 text-sm">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
