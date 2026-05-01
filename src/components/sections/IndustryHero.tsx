"use client";

import React, { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Reads the prefers-reduced-motion media query reactively.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
    () => false
  );
}

export function IndustryHero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden bg-background">
      {/* ===== VIDEO BACKGROUND ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/hero/Background-landingpage.mp4" type="video/mp4" />
        </video>

        {/* Premium Gradient Overlay — soft and sophisticated */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background z-[1]" />
        <div className="absolute inset-0 bg-black/5 z-[2]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 md:px-12 pb-16 md:pb-24 pt-40 md:pt-48 flex flex-col justify-end min-h-[100svh]">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-lg border border-border bg-card/40 backdrop-blur-md font-mono-label text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2.5" />
            Digital Experiences
          </span>
        </motion.div>

        {/* Headline — oversized editorial */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-[clamp(2.2rem,6vw,5.5rem)] leading-[1.05] font-bold tracking-tight text-foreground max-w-5xl mb-8"
        >
          First impressions
          <br className="hidden sm:block" />
          {" "}are <span className="text-accent-strong">digital.</span>
        </motion.h1>

        {/* Subline + CTAs row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Zechner Digital creates modern websites and brand identities
            that feel professional from the first click — clear, refined,
            and to the point.
          </p>

          {/* CTAs — IntegratedBio style */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Primary CTA */}
            <a
              href="#"
              className="inline-flex items-center h-12 px-7 rounded-lg bg-foreground text-background font-mono-label hover:opacity-90 transition-opacity"
            >
              Start a project
            </a>

            {/* Secondary CTA */}
            <a
              href="#"
              className="group flex items-center gap-3 font-mono-label text-foreground hover:text-accent-strong transition-colors"
            >
              <span className="hidden sm:inline">View work</span>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent group-hover:bg-accent-strong transition-colors">
                <ArrowRight className="w-5 h-5 text-accent-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>
        </motion.div>

        {/* Bottom ticker / stats line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-border flex flex-wrap gap-x-12 gap-y-4"
        >
          {[
            { label: "Projects", value: "30+" },
            { label: "Happy Clients", value: "100%" },
            { label: "Since", value: "2023" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono-label text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
