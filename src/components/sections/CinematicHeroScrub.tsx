"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function CinematicHeroScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // If reduced motion is preferred, we use a much smaller scale
  const normalProgress = smoothProgress;
  const reducedProgress = useTransform(smoothProgress, [0, 1], [0, 0.5]);
  const effectiveProgress = shouldReduceMotion ? reducedProgress : normalProgress;

  // --- ADJUST THESE TO MATCH THE LAPTOP SCREEN IN THE GENERATED IMAGE ---
  // The origin point to zoom into. If the laptop screen is centered but slightly higher, use 50% 45%.
  const transformOrigin = "50% 40%";
  
  // The bounding box of the laptop screen relative to the 1:1 image.
  // E.g., if the screen is 40% wide and 25% tall, centered slightly above middle:
  const screenLeft = "25%";
  const screenRight = "25%";
  const screenTop = "25%";
  const screenBottom = "45%";
  // ----------------------------------------------------------------------

  // 1. Scene Scale
  // Zoom heavily into the laptop screen.
  const sceneScale = useTransform(
    effectiveProgress,
    [0, 0.8, 1],
    [1, 15, 25] // Huge scale to fill the viewport
  );

  // 2. Loading Text Opacity
  // The "Website is loading" text inside the laptop fades out as we get very close
  const contentOpacity = useTransform(
    effectiveProgress,
    [0.5, 0.7],
    [1, 0]
  );

  // 3. Scroll Indicator Opacity
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
  
  // 4. Global Dark Overlay
  // At the very end of the scroll, we might want to fade out the entire hero to reveal the background,
  // but since our screen overlay will have bg-background, we can just let it become the background.
  // However, we want to hide the rest of the room as we zoom in so it doesn't look pixelated.
  const roomBrightness = useTransform(
    effectiveProgress,
    [0.4, 0.8],
    [1, 0] // darken the room behind the screen as we zoom
  );

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#050505]" // Dark elegant background
      style={{ height: isMobile ? "300vh" : "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* Aspect Square Wrapper that acts like object-cover */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] aspect-square"
          style={{ 
            scale: sceneScale,
            transformOrigin: transformOrigin
          }}
        >
          {/* The Realistic Laptop Image */}
          <motion.img
            src="/hero/realistic_laptop_hero.png"
            alt="Cinematic Laptop Desk"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: useTransform(roomBrightness, b => `brightness(${b})`) }}
          />

          {/* The Screen Overlay */}
          <div 
            className="absolute bg-background overflow-hidden flex flex-col items-center justify-center shadow-2xl"
            style={{
              left: screenLeft,
              right: screenRight,
              top: screenTop,
              bottom: screenBottom,
              // Subtle border to blend with the laptop bezel
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "2%", // laptop screens usually have tiny rounded corners
            }}
          >
            {/* The content inside the laptop screen */}
            <motion.div 
              className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full h-full p-4"
              style={{ opacity: contentOpacity }}
            >
              <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="text-center">
                <h3 className="text-foreground font-semibold text-[1vw] md:text-[0.6vw] tracking-wider mb-1 uppercase">
                  Zechner Digital
                </h3>
                <p className="text-muted-foreground text-[0.8vw] md:text-[0.4vw]">
                  Launching experience...
                </p>
              </div>
              
              {/* Subtle animated progress bar */}
              <div className="w-1/2 h-[2px] bg-muted overflow-hidden mt-2 rounded-full">
                <motion.div 
                  className="h-full bg-primary origin-left"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
            
            {/* A subtle reflection / glare effect on the screen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Global vignette / dark gradient for the room (fixed over the image) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#050505_100%)] pointer-events-none" />

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2 text-white z-30"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium drop-shadow-md opacity-80">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 opacity-70 drop-shadow-md" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

