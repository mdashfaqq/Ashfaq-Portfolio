import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileSplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only show for initial load, automatically finish after short duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="mobile-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09090b] text-[#f4f1ea] px-6 select-none overflow-hidden touch-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[320px] h-[320px] rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute w-[260px] h-[260px] rounded-full bg-[#d8c5a3]/10 blur-[80px] pointer-events-none" />

          {/* Center Brand Monogram / App Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center mb-6"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] p-[1px] shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
              <div className="w-full h-full rounded-2xl bg-[#121215] flex items-center justify-center overflow-hidden relative">
                <img
                  src="/faviconn.png"
                  alt="App Icon"
                  className="w-14 h-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Pulsing Aura Ring */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 -m-1 rounded-2xl border border-emerald-400/25 pointer-events-none"
            />
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase font-sans text-[#f4f1ea]">
              MOHAMED ASHFAQ
            </h1>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#8e8677] font-medium">
                FULL-STACK & APPSEC
              </span>
            </div>
          </motion.div>

          {/* Minimal Bottom Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="absolute bottom-12 w-36 h-[2px] bg-white/[0.08] rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-emerald-400 to-[#d8c5a3] rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
