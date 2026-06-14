import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { profile } from "@/data/profile";
import { DocumentViewer } from "@/components/ui/DocumentViewer";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
        scrolled || mobileOpen
          ? "border-b border-white/[0.06] bg-[#09090b]/85 backdrop-blur-xl py-3"
          : "py-4 sm:py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 flex items-center justify-between gap-4 mt-5">
        <a href="#" className="flex items-center gap-2.5 group min-w-0">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-white flex items-center justify-center text-xs font-semibold text-[#09090b]">
            MA
          </div>
          <span className="font-medium text-white/90 hidden sm:block text-sm group-hover:text-white transition-colors truncate">


          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3.5 py-2 text-sm text-[var(--muted)] hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--muted)] hover:text-white transition-colors"
          >
            GitHub
          </a>
<button
  onClick={() => {
    setShowResume(true);
  }}
  className="btn-primary text-xs py-2 px-4"
>
  Resume
</button>
        </div>

        <button
          className="lg:hidden p-2.5 -mr-1 text-white rounded-lg hover:bg-white/[0.06] transition-colors touch-manipulation"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </nav>

     <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed inset-0 top-[57px] bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden relative border-t border-white/[0.06] bg-[#09090b]/98 backdrop-blur-xl"
              >
                {/* mobile menu content */}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
  
      {/* OUTSIDE THE HEADER */}
      <AnimatePresence>
        {showResume && (
          <DocumentViewer
            url="/resume.pdf"
            title="My Resume"
            onClose={() => setShowResume(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
  
}
