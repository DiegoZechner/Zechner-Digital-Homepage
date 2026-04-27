"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { name: "Startseite", href: "#" },
  { name: "Leistungen", href: "#" },
  { name: "Branchen", href: "#" },
  { name: "Projekte", href: "#" },
  { name: "Preise", href: "#" },
  { name: "Kontakt", href: "#" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // The hero is very tall (400vh). We might want the header to change style 
      // after the user has scrolled past the hero, or just when they start scrolling.
      // Let's just make it adapt when scrolled past a certain point.
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between ${
        isScrolled 
          ? "glass border-b border-border/50 bg-background/80 backdrop-blur-md" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="font-bold text-xl tracking-wider">
        <span className="text-primary">ZECHNER</span>{" "}
        <span className="text-foreground">DIGITAL</span>
      </div>
      
      <nav className="hidden md:flex gap-8 text-sm font-medium relative">
        {NAV_LINKS.map((link, index) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="relative px-2 py-1 transition-colors"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className={`relative z-10 hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-foreground/80"}`}>
              {link.name}
            </span>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-primary"
                  layoutId="nav-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </AnimatePresence>
          </a>
        ))}
      </nav>
      
      <div className="flex items-center gap-4">
        {isScrolled && <ThemeToggle />}
        <Button 
          variant={isScrolled ? "default" : "outline"} 
          size="sm" 
          className="hidden md:flex shadow-sm"
        >
          Kostenlos beraten lassen
        </Button>
      </div>
    </header>
  );
}
