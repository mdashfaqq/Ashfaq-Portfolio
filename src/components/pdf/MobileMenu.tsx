import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HiX } from "react-icons/hi";
import { navigateWithTransition } from "./PageTransitionOverlay";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { num: "01", label: "Portfolio", href: "/" },
  { num: "02", label: "Work", href: "/#projects" },
  { num: "03", label: "Experience", href: "/#experience" },
  { num: "04", label: "About", href: "/#about" },
  { num: "05", label: "Credentials", href: "/#certifications" },
  { num: "06", label: "Contact", href: "/#contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      const validItems = itemsRef.current.filter(Boolean);

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        validItems,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleItemClick = (href: string, label: string) => {
    onClose();
    navigateWithTransition(href, label.toUpperCase());
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#0C0C0C] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D62F27]" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/60">
            Navigation Menu
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close menu"
        >
          <HiX size={24} />
        </button>
      </div>

      {/* Center Links List */}
      <nav className="my-auto py-8">
        <ul className="flex flex-col gap-4 sm:gap-6">
          {MENU_ITEMS.map((item, index) => (
            <li key={item.href}>
              <a
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.href, item.label);
                }}
                className="group flex items-baseline gap-4 text-white hover:text-[#D62F27] transition-colors py-1"
              >
                <span className="text-xs sm:text-sm font-mono text-white/30 group-hover:text-[#D62F27] transition-colors font-bold">
                  {item.num}
                </span>
                <span
                  className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans transition-transform group-hover:translate-x-2 inline-block duration-200"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Footer */}
      <div className="border-t border-white/[0.08] pt-4 flex justify-between items-center text-xs font-mono text-white/40">
        <span>Mohamed Ashfaq Portfolio</span>
        <span className="text-[#D62F27] font-bold">2026</span>
      </div>
    </div>
  );
}
