"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layout, Sparkles, CheckCircle2 } from "lucide-react";

export function BusinessHeroScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up scroll tracking for the entire 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress slightly for premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- TRANSFORMS ---

  // 1. Mockup Scale: Starts small (0.4/0.6), scales up to full screen (1.0), then slightly larger (1.1) to immerse
  const mockupScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 1],
    [isMobile ? 0.8 : 0.5, isMobile ? 0.9 : 0.6, 1, 1.05]
  );
  
  // 2. Mockup Border Radius: Sharpens as it fills screen
  const mockupRadius = useTransform(
    smoothProgress,
    [0.4, 0.6],
    ["24px", "0px"]
  );

  // 3. Initial Headline Text: Fades out as we scroll into the mockup
  const headlineOpacity = useTransform(
    smoothProgress,
    [0, 0.15],
    [1, 0]
  );
  const headlineY = useTransform(
    smoothProgress,
    [0, 0.15],
    [0, -50]
  );

  // 4. Background Color: Transitions
  const bgGradientOpacity = useTransform(
    smoothProgress,
    [0.5, 0.8],
    [0, 1]
  );

  // 5. Old UI vs New UI Fading inside the mockup
  const oldUIOpacity = useTransform(
    smoothProgress,
    [0.3, 0.5],
    [1, 0]
  );
  const newUIOpacity = useTransform(
    smoothProgress,
    [0.45, 0.7],
    [0, 1]
  );
  const newUIY = useTransform(
    smoothProgress,
    [0.45, 0.7],
    [40, 0]
  );

  // 6. Final CTA appearing inside the immersed mockup
  const finalCTAOpacity = useTransform(
    smoothProgress,
    [0.75, 0.9],
    [0, 1]
  );
  const finalCTAY = useTransform(
    smoothProgress,
    [0.75, 0.9],
    [30, 0]
  );

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background"
      style={{ height: isMobile ? "250vh" : "400vh" }}
    >
      {/* Sticky Container - exactly 100vh tall */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Deep Petrol Gradient Overlay that fades in */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background pointer-events-none"
          style={{ opacity: bgGradientOpacity }}
        />

        {/* Initial Hero Text (Visible only at start) */}
        <motion.div 
          className="absolute top-[15%] md:top-[20%] w-full px-4 text-center z-10 pointer-events-none"
          style={{ opacity: headlineOpacity, y: headlineY }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-xs font-medium text-primary mb-6 md:mb-8 pointer-events-auto">
            <Sparkles className="h-3 w-3" />
            <span>Digitale Exzellenz</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 text-gradient max-w-5xl mx-auto leading-tight">
            Digitale Auftritte,<br className="hidden md:block"/> die Eindruck machen.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Zechner Digital entwickelt Websites, Redesigns und digitale Lösungen, die professionell wirken, Prozesse vereinfachen und Kunden schneller überzeugen.
          </p>
        </motion.div>

        {/* The Digital Mockup Window */}
        <motion.div 
          className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video bg-card border border-border shadow-2xl flex flex-col overflow-hidden z-20 mt-32 md:mt-48"
          style={{ 
            scale: mockupScale, 
            borderRadius: mockupRadius,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0,0,0,0.05)"
          }}
        >
          {/* Fake Browser/App Header */}
          <div className="h-10 md:h-12 border-b border-border bg-muted/30 backdrop-blur-sm flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
            </div>
            <div className="mx-auto h-5 md:h-6 w-1/2 md:w-1/3 bg-muted rounded-md"></div>
          </div>

          {/* Mockup Content Area */}
          <div className="relative flex-1 bg-background w-full h-full overflow-hidden">
            
            {/* OLD UI (Wireframe/Outdated state) */}
            <motion.div 
              className="absolute inset-0 p-6 md:p-12 flex flex-col gap-6 md:gap-8"
              style={{ opacity: oldUIOpacity }}
            >
              {/* Wireframe Header */}
              <div className="flex justify-between items-center pb-6 border-b border-foreground/5">
                <div className="w-32 h-8 bg-foreground/5 rounded"></div>
                <div className="hidden md:flex gap-4">
                  <div className="w-16 h-4 bg-foreground/5 rounded"></div>
                  <div className="w-16 h-4 bg-foreground/5 rounded"></div>
                  <div className="w-16 h-4 bg-foreground/5 rounded"></div>
                </div>
              </div>
              
              {/* Wireframe Hero */}
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1 space-y-4 w-full">
                  <div className="w-3/4 h-12 bg-foreground/5 rounded"></div>
                  <div className="w-1/2 h-12 bg-foreground/5 rounded"></div>
                  <div className="w-full h-4 bg-foreground/5 rounded mt-8"></div>
                  <div className="w-5/6 h-4 bg-foreground/5 rounded"></div>
                  <div className="w-32 h-10 bg-foreground/10 rounded mt-6"></div>
                </div>
                <div className="flex-1 w-full h-48 md:h-full bg-foreground/5 rounded-xl flex items-center justify-center">
                  <Code className="w-12 h-12 text-foreground/10" />
                </div>
              </div>
            </motion.div>

            {/* NEW UI (Premium state) */}
            <motion.div 
              className="absolute inset-0 p-6 md:p-12 flex flex-col gap-6 md:gap-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
              style={{ opacity: newUIOpacity, y: newUIY }}
            >
              {/* Modern Dashboard/Website Mockup Layout */}
              <div className="flex justify-between items-center pb-6 border-b border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-destructive"></div>
                  <div className="w-24 h-6 bg-foreground/10 rounded"></div>
                </div>
                <div className="hidden md:flex gap-6 items-center">
                  <div className="w-16 h-2 bg-foreground/20 rounded-full"></div>
                  <div className="w-16 h-2 bg-foreground/20 rounded-full"></div>
                  <div className="w-8 h-8 rounded-full bg-muted border border-primary/20"></div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 h-full">
                {/* Modern Content Left */}
                <div className="flex-[0.6] flex flex-col justify-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary w-fit">
                    <CheckCircle2 className="w-3 h-3" /> System Active
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 md:h-14 w-full bg-gradient-to-r from-foreground/80 to-muted-foreground/40 rounded-lg"></div>
                    <div className="h-10 md:h-14 w-3/4 bg-gradient-to-r from-foreground/80 to-muted-foreground/40 rounded-lg"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="glass p-4 rounded-xl border border-primary/10">
                      <Layout className="w-6 h-6 text-primary mb-3" />
                      <div className="h-3 w-1/2 bg-foreground/20 rounded mb-2"></div>
                      <div className="h-2 w-full bg-foreground/10 rounded"></div>
                    </div>
                    <div className="glass p-4 rounded-xl border border-primary/10">
                      <Sparkles className="w-6 h-6 text-primary mb-3" />
                      <div className="h-3 w-1/2 bg-foreground/20 rounded mb-2"></div>
                      <div className="h-2 w-full bg-foreground/10 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Modern Content Right (Chart/Graphic) */}
                <div className="flex-[0.4] h-48 md:h-full relative flex items-center justify-center">
                  <div className="absolute inset-0 glass rounded-2xl border border-primary/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-background via-card to-muted"></div>
                    {/* Abstract modern UI elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-primary/20 to-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-[8px] border-primary/30 border-t-primary animate-spin" style={{ animationDuration: '4s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Final CTA Overlay (Appears when fully immersed) */}
            <motion.div 
              className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-30"
              style={{ opacity: finalCTAOpacity, y: finalCTAY, pointerEvents: finalCTAOpacity.get() > 0.5 ? 'auto' : 'none' }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                Zeit für ein Upgrade?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Verwandeln Sie Ihren digitalen Auftritt in ein performantes Werkzeug für Ihr Unternehmen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 md:h-14 px-8 pointer-events-auto">
                  Angebot anfragen
                </Button>
                <Button size="lg" variant="outline" className="h-12 md:h-14 px-8 group pointer-events-auto">
                  Leistungen ansehen
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
