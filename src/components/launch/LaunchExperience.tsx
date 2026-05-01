"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Reads the prefers-reduced-motion media query reactively via useSyncExternalStore.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function LaunchExperience() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Lock scroll during launch
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
    }, 2200);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/*
            Expanding rounded window that reveals the site.
            box-shadow covers everything outside the window.
          */}
          <motion.div
            initial={{
              width: "0px",
              height: "0px",
              borderRadius: "100px",
            }}
            animate={{
              width: "calc(100vw - var(--frame-offset))",
              height: "calc(100vh - var(--frame-offset))",
              borderRadius: "24px",
            }}
            transition={{
              duration: 1.6,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.15,
            }}
            className="border border-accent/30"
            style={{
              boxShadow: "0 0 0 100vmax var(--background)",
              backgroundColor: "transparent",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
