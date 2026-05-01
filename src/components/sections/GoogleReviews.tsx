"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "M. Meyer",
    role: "Geschäftsleitung",
    company: "Haus Genie",
    content:
      "Die Zusammenarbeit war klar, schnell und professionell. Besonders stark war, wie aus einer groben Idee ein moderner digitaler Auftritt entstanden ist.",
    rating: 5,
  },
  {
    id: 2,
    name: "B. Micic",
    role: "Projektpartner",
    company: "Haus Genie",
    content:
      "Zechner Digital hat nicht nur das Design betrachtet, sondern auch die Nutzerführung und den geschäftlichen Zweck dahinter.",
    rating: 5,
  },
  {
    id: 3,
    name: "Autohaus Team",
    role: "Interne Nutzer",
    company: "T&A Autoshop",
    content:
      "Die digitale Lösung hilft dabei, Aufgaben, Fahrzeuge und Prozesse übersichtlicher zu steuern.",
    rating: 5,
  },
];

export function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 md:py-32 bg-foreground-secondary text-primary-foreground relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="font-mono-label text-primary-foreground/50 mb-4 block">
              Client Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-primary-foreground leading-[1.1]">
              Trusted by
              <br />
              our clients.
            </h2>
            <p className="text-primary-foreground/60 text-lg leading-relaxed mb-10 max-w-md">
              Trust is built on results. Genuine feedback on our work
              and collaboration.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-12 px-7 rounded-lg bg-primary-foreground text-foreground-secondary font-mono-label hover:opacity-90 transition-opacity"
              >
                View on Google
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-12 px-7 rounded-lg border border-primary-foreground/20 text-primary-foreground font-mono-label hover:bg-primary-foreground/5 transition-colors"
              >
                Write a review
              </a>
            </div>
          </div>

          {/* Right: Review Card */}
          <div className="relative min-h-[350px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] backdrop-blur-md p-8 md:p-10 relative"
              >
                {/* Decorative quote */}
                <div className="absolute top-8 right-8 text-accent/20">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-accent fill-accent"
                    />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-primary-foreground">
                  &quot;{reviews[currentIndex].content}&quot;
                </blockquote>

                <div className="flex items-center gap-4">
                  <Avatar className="h-11 w-11 border border-primary-foreground/10">
                    <AvatarFallback className="bg-accent/10 text-accent text-sm font-bold">
                      {reviews[currentIndex].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-primary-foreground">
                      {reviews[currentIndex].name}
                    </div>
                    <div className="font-mono-label text-primary-foreground/50">
                      {reviews[currentIndex].role},{" "}
                      {reviews[currentIndex].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-accent"
                      : "w-2 bg-primary-foreground/20 hover:bg-primary-foreground/40"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
