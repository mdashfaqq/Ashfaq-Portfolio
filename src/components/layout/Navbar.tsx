import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { navigateToSection } from "@/components/navigation/CinematicTransition";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Accessibility: Close mobile menu when ESC is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    if (mobileOpen) setMobileOpen(false);

    const onResumePage =
      window.location.pathname === "/resume" ||
      window.location.pathname === "/resume/" ||
      window.location.hash.includes("resume");

    if (href === "/resume") {
      if (onResumePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      navigateToSection("/resume", "RESUME");
      return;
    }

    navigateToSection(href, label);
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
        scrolled || mobileOpen
          ? "border-b border-white/[0.06] bg-[#0C0C0C]/90 backdrop-blur-xl py-2.5 sm:py-3"
          : "py-3 sm:py-4 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-2 sm:pt-4 md:pt-6 flex justify-between items-center">
        <ul className="hidden lg:flex items-center justify-between w-full gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.label)}
                style={{ fontFamily: "'M PLUS Rounded 1c', 'Nunito', sans-serif" }}
                className="text-[#d8c5a3] font-extrabold uppercase tracking-[0.12em] text-sm sm:text-base md:text-lg lg:text-[1.3rem] xl:text-[1.4rem] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume"
              onClick={(e) => handleNavClick(e, "/resume", "Resume")}
              style={{ fontFamily: "'M PLUS Rounded 1c', 'Nunito', sans-serif" }}
              className="text-[#d8c5a3] font-extrabold uppercase tracking-[0.12em] text-sm sm:text-base md:text-lg lg:text-[1.3rem] xl:text-[1.4rem] hover:text-white transition-colors duration-200"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2.5 -mr-1 text-[#d8c5a3] rounded-lg hover:bg-white/[0.06] transition-colors touch-manipulation"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
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
                className="lg:hidden relative border-t border-white/[0.06] bg-[#0C0C0C]/98 backdrop-blur-xl"
              >
                <nav className="max-w-7xl mx-auto px-6 py-8">
                  <ul className="flex flex-col gap-6">
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          style={{ fontFamily: "'M PLUS Rounded 1c', 'Nunito', sans-serif" }}
                          className="text-[#d8c5a3] font-extrabold uppercase tracking-[0.12em] text-2xl sm:text-3xl hover:text-white transition-colors duration-200"
                          onClick={(e) => handleNavClick(e, link.href, link.label)}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href="/resume"
                        style={{ fontFamily: "'M PLUS Rounded 1c', 'Nunito', sans-serif" }}
                        className="text-[#d8c5a3] font-extrabold uppercase tracking-[0.12em] text-2xl sm:text-3xl hover:text-white transition-colors duration-200"
                        onClick={(e) => handleNavClick(e, "/resume", "Resume")}
                      >
                        Resume
                      </a>
                    </li>
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}