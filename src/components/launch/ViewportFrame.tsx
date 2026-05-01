"use client";

import { useEffect, useState } from "react";

export function ViewportFrame() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-40 pointer-events-none transition-all duration-700 ease-in-out ${
        isScrolled ? "opacity-0" : "opacity-100"
      }`}
    >
      {/*
        Single element that creates the rounded frame effect.
        The inner area is transparent (the "window"), and a massive box-shadow
        covers everything outside the rounded rectangle.
      */}
      <div
        className="absolute inset-[8px] md:inset-[16px] rounded-[20px] md:rounded-[28px]"
        style={{
          boxShadow: "0 0 0 100vmax var(--frame-color)",
          border: "1px solid var(--color-glass-border)",
        }}
      />
    </div>
  );
}
