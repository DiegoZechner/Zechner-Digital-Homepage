"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IndustrySlide {
  id: string;
  industry: string;
  headline: string;
  subheadline: string;
  description: string;
  benefits: string[];
  ctaText: string;
  imagePath: string;
}

const INDUSTRIES: IndustrySlide[] = [
  {
    id: "auto",
    industry: "Autohandel & Werkstatt",
    headline: "Du bist Autohändler oder Mechaniker?",
    subheadline: "Wir bauen Websites, die deinen Betrieb professionell präsentieren.",
    description: "Ob Werkstatt, Autohaus oder Fahrzeugverkauf – Zechner Digital erstellt dir einen modernen Online-Auftritt, der Vertrauen schafft und neue Kunden überzeugt.",
    benefits: [
      "Fahrzeugangebote klar präsentieren",
      "Vertrauen bei neuen Kunden schaffen",
      "Mehr Anfragen online gewinnen"
    ],
    ctaText: "Kostenlos beraten lassen",
    imagePath: "/hero/industries/car_dealer.png"
  },
  {
    id: "carpenter",
    industry: "Schreiner & Tischler",
    headline: "Du bist Schreiner oder Tischler?",
    subheadline: "Zeig deine Arbeit online so hochwertig, wie du sie in echt umsetzt.",
    description: "Wir erstellen Websites, die deine Projekte, Materialien und Handwerksqualität modern präsentieren.",
    benefits: [
      "Projekte hochwertig zeigen",
      "Lokale Kunden überzeugen",
      "Handwerk professionell präsentieren"
    ],
    ctaText: "Website für Schreiner anfragen",
    imagePath: "/hero/industries/carpenter.png"
  },
  {
    id: "dentist",
    industry: "Zahnarztpraxis",
    headline: "Du führst eine Zahnarztpraxis?",
    subheadline: "Wir gestalten Websites, die Vertrauen schaffen und neue Patienten ansprechen.",
    description: "Eine moderne Praxis-Website hilft Patienten, sich schnell zu informieren, Vertrauen aufzubauen und Kontakt aufzunehmen.",
    benefits: [
      "Vertrauen vor dem ersten Termin",
      "Leistungen klar erklären",
      "Mehr Termin-Anfragen erhalten"
    ],
    ctaText: "Praxis-Website planen",
    imagePath: "/hero/industries/dentist.png"
  },
  {
    id: "solar",
    industry: "Photovoltaik & Solar",
    headline: "Du montierst oder verkaufst Solaranlagen?",
    subheadline: "Wir bauen Websites, die deine Energie-Lösungen verständlich verkaufen.",
    description: "Präsentiere deine Projekte, Leistungen und Vorteile so, dass Kunden schneller Vertrauen fassen und eine Anfrage stellen.",
    benefits: [
      "Leistungen einfach erklären",
      "Projekte sichtbar machen",
      "Qualifizierte Anfragen gewinnen"
    ],
    ctaText: "Solar-Website anfragen",
    imagePath: "/hero/industries/solar.png"
  },
  {
    id: "electrician",
    industry: "Elektroinstallation",
    headline: "Du bist Elektriker?",
    subheadline: "Wir erstellen Websites, die Kompetenz und Zuverlässigkeit ausstrahlen.",
    description: "Von Installationen bis Smart Home – deine Website soll zeigen, dass Kunden bei dir in sicheren Händen sind.",
    benefits: [
      "Leistungen klar strukturieren",
      "Lokale Sichtbarkeit verbessern",
      "Mehr Aufträge generieren"
    ],
    ctaText: "Elektriker-Website starten",
    imagePath: "/hero/industries/electrician.png"
  },
  {
    id: "plumbing",
    industry: "Sanitär, Heizung, Klima",
    headline: "Du bist im Bereich Sanitär oder Heizung tätig?",
    subheadline: "Wir bauen Websites, die professionell wirken und Anfragen bringen.",
    description: "Ob Badumbau, Heizung oder Reparaturservice – wir präsentieren deine Leistungen sauber, modern und verständlich.",
    benefits: [
      "Notfall- und Serviceleistungen sichtbar machen",
      "Vertrauen bei Hausbesitzern schaffen",
      "Mehr regionale Anfragen erhalten"
    ],
    ctaText: "Website für SHK anfragen",
    imagePath: "/hero/industries/plumbing.png"
  },
  {
    id: "realestate",
    industry: "Immobilienmakler",
    headline: "Du bist Immobilienmakler?",
    subheadline: "Wir gestalten Websites, die Immobilien und Vertrauen verkaufen.",
    description: "Eine starke Website hilft dir, Objekte hochwertig zu präsentieren und Eigentümer sowie Käufer professionell anzusprechen.",
    benefits: [
      "Immobilien hochwertig präsentieren",
      "Vertrauen bei Eigentümern schaffen",
      "Mehr Kontaktanfragen erhalten"
    ],
    ctaText: "Makler-Website anfragen",
    imagePath: "/hero/industries/real_estate.png"
  },
  {
    id: "landscaping",
    industry: "Garten- & Landschaftsbau",
    headline: "Du bist im Garten- oder Landschaftsbau tätig?",
    subheadline: "Wir zeigen deine Projekte so, dass Kunden sofort begeistert sind.",
    description: "Deine Website soll deine Arbeit sichtbar machen, Emotion auslösen und neue regionale Aufträge bringen.",
    benefits: [
      "Vorher-Nachher-Projekte zeigen",
      "Emotionale Bildsprache nutzen",
      "Mehr lokale Kunden gewinnen"
    ],
    ctaText: "Gartenbau-Website planen",
    imagePath: "/hero/industries/landscaping.png"
  }
];

const AUTOPLAY_INTERVAL = 6000;

export function IndustryHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % INDUSTRIES.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + INDUSTRIES.length) % INDUSTRIES.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    pauseAutoplay();
  };

  const pauseAutoplay = () => {
    setIsPaused(true);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(slideNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, slideNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        pauseAutoplay();
        slidePrev();
      } else if (e.key === "ArrowRight") {
        pauseAutoplay();
        slideNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideNext, slidePrev]);

  const activeSlide = INDUSTRIES[currentIndex];

  // Framer Motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 bg-background overflow-hidden flex items-center">
      {/* Background Glows for premium look */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-70"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[150px] pointer-events-none mix-blend-multiply opacity-50"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Top Tag / Pre-title */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-background/50 text-sm font-medium text-muted-foreground"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Websites, die zu deiner Branche passen.
        </motion.div>

        <div className="flex flex-col md:flex-row items-center w-full gap-12 md:gap-8 lg:gap-16">
          
          {/* Left: Showcase Visual */}
          <div className="w-full md:w-1/2 lg:w-[55%] relative flex justify-center items-center min-h-[350px] md:min-h-[500px] lg:min-h-[600px]">
            {/* Soft decorative background circle to anchor the showcase */}
            <div className="absolute inset-0 m-auto w-[80%] pt-[80%] rounded-full bg-gradient-to-tr from-white/40 to-white/10 shadow-[0_0_80px_rgba(0,0,0,0.03)] border border-white/50 blur-[2px]"></div>
            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 flex justify-center items-center p-4"
              >
                <div className="relative w-full h-full max-w-[500px] max-h-[500px] lg:max-w-[600px] lg:max-h-[600px]">
                  <Image
                    src={activeSlide.imagePath}
                    alt={activeSlide.industry}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls (Desktop: attached to visual area) */}
            <div className="absolute bottom-0 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 glass px-4 py-2 rounded-full bg-white/70 shadow-lg border-white/50">
              <button 
                onClick={() => { pauseAutoplay(); slidePrev(); }}
                className="p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Vorherige Branche"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="flex items-center gap-2">
                {INDUSTRIES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Gehe zu Slide ${idx + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-6 bg-primary" : "bg-muted-foreground/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={() => { pauseAutoplay(); slideNext(); }}
                className="p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Nächste Branche"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Right: Dynamic Text Content */}
          <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="flex flex-col"
              >
                <div className="inline-block text-primary font-semibold tracking-wider text-sm uppercase mb-3">
                  {activeSlide.industry}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
                  {activeSlide.headline}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
                  {activeSlide.subheadline}
                </p>
                <p className="text-base md:text-lg text-muted-foreground/80 mb-8 max-w-lg leading-relaxed">
                  {activeSlide.description}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {activeSlide.benefits.map((benefit, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx + 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span className="text-foreground font-medium">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <div>
                  <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    {activeSlide.ctaText}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
