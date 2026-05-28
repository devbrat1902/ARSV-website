"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface SceneTransitionProps {
  direction: string;     // e.g. "EAST (PURVA)"
  element: string;       // e.g. "SURYA // LIGHT"
  coordinates: string;   // e.g. "28° 37' 0\" N, 77° 12' 0\" E"
  quote: string;         // e.g. "The sun rises to illuminate the outer vessel, as consciousness illuminates the inner."
  vastuSymbol?: string;  // e.g. "✦" or "❂"
}

export default function SceneTransition({
  direction,
  element,
  coordinates,
  quote,
  vastuSymbol = "❂",
}: SceneTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade and scale transforms for cinematic entrance and exit
  const opacity = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [40, 0, 0, -40]);
  
  // Golden rule line expansion from center
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["0%", "100%", "0%"]);
  
  // Rotating Vastu mandala symbol
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-center items-center bg-[#FFFFFF] overflow-hidden px-6 border-y border-[#E8E8E8]"
    >
      {/* Grid Pattern overlay for spatial structure, but made extremely faint for the light design */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(184,151,90,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,151,90,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <motion.div
        style={{ opacity, y: textY }}
        className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 relative z-10"
      >
        {/* Subtle decorative coordinates & direction */}
        <div className="flex flex-col items-center space-y-3">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B8975A] font-semibold font-sans">
            {coordinates}
          </span>
          <div className="flex items-center space-x-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]/30" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#111111] font-serif font-light">
              {direction}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]/30" />
          </div>
        </div>

        {/* Ambient gold line sweeping outwards */}
        <div className="w-48 h-[1px] bg-[#E8E8E8] relative overflow-hidden flex justify-center">
          <motion.div
            style={{ width: lineWidth }}
            className="h-full bg-gradient-to-r from-transparent via-[#B8975A] to-transparent"
          />
        </div>

        {/* Cinematic Symbol */}
        <motion.div 
          style={{ rotate }} 
          className="text-2xl text-[#B8975A]/60 select-none font-serif leading-none h-8 flex items-center justify-center"
        >
          {vastuSymbol}
        </motion.div>

        {/* Minimal Concept Title */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg md:text-xl tracking-[0.25em] text-[#111111] uppercase font-light">
            {element}
          </h3>
        </div>

        {/* Editorial Poetic Quote (Resting/Breathing Moment) */}
        <p className="font-serif text-sm md:text-lg text-[#6B6B6B] italic max-w-xl leading-relaxed font-light font-sans">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Bottom micro-copy */}
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8975A]/60 font-semibold">
          ANSV &bull; SPATIAL ALIGNMENT CHRONICLES
        </span>
      </motion.div>
    </div>
  );
}
