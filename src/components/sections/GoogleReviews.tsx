"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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

  // Auto-advance reviews
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
    <section className="py-24 bg-card text-foreground relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-primary mb-6">
              <Star className="h-3 w-3 fill-current" />
              <span>Google Reviews</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient">
              Stimmen von Kunden
            </h2>
            <p className="text-muted-grey text-lg md:text-xl mb-8">
              Vertrauen entsteht durch Ergebnisse. Hier ist Platz für echte Bewertungen und Feedback zu unseren Projekten.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Auf Google ansehen
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Bewertung schreiben
                </a>
              </Button>
            </div>
          </div>

          {/* Review Carousel */}
          <div className="relative min-h-[350px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass p-8 md:p-10 rounded-2xl relative"
              >
                <div className="absolute top-8 right-8 text-primary/20">
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

                <div className="flex gap-1 mb-6">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary fill-primary"
                    />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-foreground">
                  &quot;{reviews[currentIndex].content}&quot;
                </blockquote>

                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-primary/30">
                    <AvatarFallback className="bg-muted text-primary text-lg">
                      {reviews[currentIndex].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {reviews[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-grey">
                      {reviews[currentIndex].role}, {reviews[currentIndex].company}
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
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted hover:bg-muted-foreground"
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
