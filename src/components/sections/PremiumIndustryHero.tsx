"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lightbulb, Sun, Stethoscope, TreePine, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Helper to map an icon to each industry for the floating labels
const getIndustryIcon = (id: string) => {
  switch (id) {
    case "auto": return <Lightbulb className="w-5 h-5 text-primary" />;
    case "solar": return <Sun className="w-5 h-5 text-primary" />;
    case "dentist": return <Stethoscope className="w-5 h-5 text-primary" />;
    case "landscaping": return <TreePine className="w-5 h-5 text-primary" />;
    case "bathroom-heating": return <Droplet className="w-5 h-5 text-primary" />;
    default: return <Lightbulb className="w-5 h-5 text-primary" />;
  }
};

const industries = [
  {
    id: "auto",
    image: "/hero/industries/bugatti-red.png",
    eyebrow: "Auto & Werkstatt",
    headline: "Du bist Mechaniker oder Autohändler?",
    subheadline: "Wir erstellen deine Website, die perfekt zu deinem Betrieb passt.",
    description: "Professionell, modern und individuell – wir bauen dir eine Website, die dein Unternehmen hochwertig präsentiert und neue Kunden überzeugt.",
    benefits: ["Individuelles Design", "Für alle Geräte optimiert", "Mehr Kunden gewinnen"]
  },
  {
    id: "solar",
    image: "/hero/industries/Solar.png",
    eyebrow: "Solarenergie Experten",
    headline: "Du montierst oder verkaufst Solaranlagen?",
    subheadline: "Wir erstellen deine Website, die perfekt zu deinem Angebot passt.",
    description: "Wir bauen Websites, die komplexe Leistungen klar erklären und qualifizierte Anfragen bringen.",
    benefits: ["Individuelles Design", "Für alle Geräte optimiert", "Mehr Kunden gewinnen"]
  },
  {
    id: "dentist",
    image: "/hero/industries/Zahnarzt.png",
    eyebrow: "Zahnarztpraxis",
    headline: "Du führst eine Zahnarztpraxis?",
    subheadline: "Wir entwickeln eine Website, die Vertrauen aufbaut und professionell wirkt.",
    description: "Modern, seriös und patientenfreundlich – damit deine Praxis online genauso hochwertig wirkt wie vor Ort.",
    benefits: ["Vertrauensvoller Auftritt", "Für alle Geräte optimiert", "Mehr Patientenanfragen"]
  },
  {
    id: "landscaping",
    image: "/hero/industries/Garten.png",
    eyebrow: "Garten- & Landschaftsbau",
    headline: "Du gestaltest Gärten und Außenanlagen?",
    subheadline: "Wir zeigen deine Arbeit online so hochwertig, wie sie in echt ist.",
    description: "Mit einer modernen Website präsentierst du Projekte, Leistungen und Referenzen überzeugend und professionell.",
    benefits: ["Individuelles Design", "Starker Projektauftritt", "Mehr Anfragen"]
  },
  {
    id: "bathroom-heating",
    image: "/hero/industries/bad-weiss.png",
    eyebrow: "Bad & Haustechnik",
    headline: "Du planst Bäder oder installierst Heizsysteme?",
    subheadline: "Wir machen deine Leistungen online verständlich und hochwertig sichtbar.",
    description: "Ideal für Sanitär-, Bad- und Heizungsbetriebe, die modern auftreten und mehr Kunden gewinnen wollen.",
    benefits: ["Hochwertiger Auftritt", "Für alle Geräte optimiert", "Mehr Anfragen"]
  }
];

const AUTOPLAY_INTERVAL = 4000;

export function PremiumIndustryHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      
      setProgress(currentProgress);

      if (elapsed >= AUTOPLAY_INTERVAL) {
        setActiveIndex((prev) => (prev + 1) % industries.length);
        startTime = Date.now();
        setProgress(0);
      }
      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animationFrameId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const activeSlide = industries[activeIndex];

  const getPosition = (index: number) => {
    const total = industries.length;
    const diff = (index - activeIndex + total) % total;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === total - 1) return "left";
    return "hidden";
  };

  const imageVariants = {
    center: { x: "0%", y: "0%", scale: 1, opacity: 1, zIndex: 10 },
    right: { x: "55%", y: "5%", scale: 0.75, opacity: 0.6, zIndex: 5 },
    left: { x: "-55%", y: "5%", scale: 0.75, opacity: 0.6, zIndex: 5 },
    hidden: { x: "0%", y: "10%", scale: 0.5, opacity: 0, zIndex: 0 }
  };

  return (
    <section className="relative w-full min-h-[100svh] pt-24 pb-8 flex flex-col justify-center bg-background overflow-hidden">
      
      {/* Background Organic Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#C6A15B]/20 dark:bg-[#C6A15B]/10 rounded-full filter blur-[80px] md:blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-[#0A5C66]/20 dark:bg-[#0A5C66]/15 rounded-full filter blur-[80px] md:blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] bg-[#E3E8DF]/40 dark:bg-[#2E4638]/30 rounded-full filter blur-[100px] md:blur-[140px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1600px] relative z-10 flex flex-col lg:flex-row items-center justify-between h-full gap-8 lg:gap-16">
        
        {/* =========================================
            LEFT COLUMN: SHOWCASE STAGE (58%)
        ========================================= */}
        <div className="w-full lg:w-[58%] relative flex justify-center items-center aspect-[4/3] md:aspect-auto md:h-[650px] lg:h-[800px] mt-8 md:mt-0">
          
          {/* Top-left Index */}
          <div className="absolute top-4 left-0 flex flex-col gap-4 z-20 hidden md:flex">
            <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-border/80 bg-white/80 backdrop-blur-md shadow-sm w-fit font-medium text-sm">
              <span className="text-primary mr-1.5 font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-muted-foreground">/ {String(industries.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* --- STATIC SHOWCASE STAGE (IMAGE-BASED) --- */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[850px] h-full pointer-events-none flex flex-col items-center justify-center">
            
            {/* Soft Radial Glow behind the objects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[85%] h-[85%] rounded-full bg-white/60 blur-[80px]"></div>
            
            {/* The Static White Display Plate Asset */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[20%] w-[95%] aspect-[2/1] max-w-[800px]">
              <Image
                src="/hero/industries/white-display-plate.png"
                alt="Premium Display Plate"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

          </div>

          {/* --- ANIMATED OBJECTS (Transparent PNGs) --- */}
          {industries.map((item, index) => {
            const position = getPosition(index);
            const isLeft = position === "left";
            const isRight = position === "right";
            
            return (
              <motion.div
                key={item.id}
                variants={imageVariants}
                initial="hidden"
                animate={position}
                transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                className="absolute inset-0 flex justify-center items-center pointer-events-none"
              >
                {/* Object Image */}
                <div className="relative w-[95%] h-[95%] max-w-[700px] max-h-[700px] flex items-center justify-center -translate-y-[5%]">
                  <Image
                    src={item.image}
                    alt={item.eyebrow}
                    fill
                    className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
                    priority={position === "center"}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />

                  {/* High-End Floating Label for Upcoming Branches */}
                  <AnimatePresence>
                    {(isLeft || isRight) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.1 }}
                        className={`absolute bottom-[25%] ${isLeft ? "left-[5%]" : "right-[5%]"} bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-full px-5 py-3.5 flex items-center gap-4 z-20 pointer-events-auto`}
                      >
                        <div className="bg-primary/10 p-2.5 rounded-full shrink-0">
                          {getIndustryIcon(item.id)}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[15px] font-semibold text-foreground leading-[1.2] whitespace-pre-line">
                            {item.eyebrow.replace('& ', '&\n')}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================
            RIGHT COLUMN: TEXT CONTENT (42%)
        ========================================= */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center relative pl-0 lg:pl-4">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Eyebrow Label */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide uppercase">
                  {activeSlide.eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-foreground mb-6 leading-[1.15] max-w-[580px]">
                {activeSlide.headline}
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-foreground font-medium mb-4 max-w-[500px]">
                {activeSlide.subheadline}
              </p>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-[500px]">
                {activeSlide.description}
              </p>
              
              {/* Benefits */}
              <div className="flex flex-col gap-4 mb-12">
                {activeSlide.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary stroke-[3]" />
                    </div>
                    <span className="text-foreground/90 text-lg font-medium tracking-wide">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-foreground hover:bg-foreground/90 text-background rounded-full shadow-lg transition-all">
                  Jetzt kostenlos beraten lassen
                </Button>
                <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-6 text-base text-foreground hover:bg-black/5 rounded-full transition-all">
                  Projekte ansehen
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* =========================================
          GLOBAL PROGRESS BAR (BOTTOM CENTER)
      ========================================= */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[180px] z-30">
        <div className="h-1.5 w-full bg-border/60 overflow-hidden rounded-full shadow-inner">
          <div 
            className="h-full bg-primary transition-none rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </section>
  );
}
