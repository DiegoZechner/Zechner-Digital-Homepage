"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Services", href: "#" },
  { name: "Work", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "pt-3 px-4 md:px-6" : "pt-5 px-5 md:px-10"
        }`}
      >
        <header className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo — plain at top, glass widget on scroll */}
          <div
            className={`flex items-center transition-all duration-500 ${
              isScrolled
                ? "px-5 py-2.5 rounded-lg glass shadow-sm"
                : ""
            }`}
          >
            <span className="font-bold text-lg tracking-[0.12em] text-foreground font-mono-label !text-base">
              ZECHNER
            </span>
            <span className="font-bold text-lg tracking-[0.12em] text-accent-strong ml-1 font-mono-label !text-base">
              DIGITAL
            </span>
          </div>

          {/* Desktop Nav Widget */}
          <nav
            className={`hidden md:flex items-center rounded-lg transition-all duration-500 ${
              isScrolled
                ? "px-2 py-1.5 glass shadow-sm gap-0"
                : "px-3 py-2 glass gap-0"
            }`}
          >
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 rounded-md transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="relative z-10 font-mono-label !text-[0.7rem] text-foreground/70 hover:text-foreground transition-colors">
                  {link.name}
                </span>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-foreground/[0.04]"
                      layoutId="nav-hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </a>
            ))}

            {/* Separator */}
            <div className="w-px h-5 bg-border mx-2" />

            <ThemeToggle />

            {/* CTA Button */}
            <a
              href="#"
              className="ml-2 px-5 py-2 rounded-lg bg-foreground text-background font-mono-label !text-[0.7rem] hover:opacity-90 transition-opacity"
            >
              Start a project
            </a>
          </nav>

          {/* Mobile: ThemeToggle + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg glass"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden mt-3 mx-auto max-w-7xl rounded-xl glass p-5 shadow-lg"
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg font-mono-label !text-[0.7rem] text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="border-t border-border my-2" />
                <a
                  href="#"
                  className="px-4 py-3 rounded-lg bg-foreground text-background font-mono-label !text-[0.7rem] text-center hover:opacity-90 transition-opacity"
                >
                  Start a project
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
