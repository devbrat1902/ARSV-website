"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

/* -------------------------------------------------------------
   Reusable Helper Component for Staggered Word Reveal
------------------------------------------------------------- */
const AnimatedText = ({ text, className, delay = 0 }: { 
  text: string; 
  className?: string; 
  delay?: number 
}) => {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.25em", marginBottom: "-0.25em" }}>
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            style={{ display: "inline-block" }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll details specifically for the About section to run parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax shifts for clean editorial layering
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  // Shifting ambient shadows (simulating solar light angle movement)
  const shadowX = useTransform(scrollYProgress, [0.2, 0.8], [-5, 10]);
  const shadowY = useTransform(scrollYProgress, [0.2, 0.8], [10, 20]);
  const shadowBlur = useTransform(scrollYProgress, [0.2, 0.8], [15, 30]);
  const shadowOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0.03, 0.08]);
  const ambientShadow = useMotionTemplate`rgba(184, 151, 90, ${shadowOpacity}) ${shadowX}px ${shadowY}px ${shadowBlur}px`;

  const vastuElements = [
    {
      name: "Surya",
      translation: "The Sun / Light",
      description: "Orienting primary living spaces to capture morning golden-hour light, maximizing positive solar energy and establishing a healthy natural circadian rhythm.",
      direction: "East & Northeast",
      symbol: "✦",
    },
    {
      name: "Vayu",
      translation: "The Wind / Breath",
      description: "Carefully designed cross-ventilation pathways that enable continuous refreshing air currents, sweeping away stagnant energies for mental clarity.",
      direction: "Northwest",
      symbol: "✥",
    },
    {
      name: "Prana",
      translation: "Vital Energy / Flow",
      description: "Spatial flow choreography that allows life-force energy to glide unimpeded through open corridors, avoiding sharp angles and cramped transitions.",
      direction: "Core Layout",
      symbol: "❖",
    },
    {
      name: "Akasha",
      translation: "Space / Ether",
      description: "Centering the home around double-height ceilings or grand skylit courtyards, maintaining structural lightness and a sense of infinite room.",
      direction: "Brahmasthan (Center)",
      symbol: "❂",
    },
  ];

  // Diagonal slide shutter transition variants
  const imageMaskVariants = {
    hidden: { clipPath: "polygon(0% 100%, 100% 85%, 100% 100%, 0% 100%)", scale: 1.08 },
    visible: { 
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative min-h-screen w-full bg-[#FFFFFF] py-28 md:py-40 px-6 md:px-16 overflow-hidden border-t border-[#E8E8E8]"
    >
      {/* Soft environmental carry-over: dark to light gradient fade at top */}
      <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-[#111111] to-transparent pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto flex flex-col space-y-20 md:space-y-32">
        
        {/* Section Heading with Staggered Parallax Effect */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
          <div className="md:col-span-9 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B8975A] font-semibold block">
              The Philosophy
            </span>
            <h2 className="font-serif text-5xl md:text-8xl font-light text-[#111111] leading-[1.05] tracking-tight">
              <AnimatedText 
                text="Where Modern Luxury Meets Spatial Harmony." 
                className="font-serif text-5xl md:text-8xl font-light text-[#111111] leading-[1.05] tracking-tight block"
              />
            </h2>
          </div>
          <div className="md:col-span-3 pb-2">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#B8975A] font-semibold border-b border-[#E8E8E8] pb-4">
              ARSV ARCHITECTURE &bull; EST. 2018
            </p>
          </div>
        </div>

        {/* Asymmetrical Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative z-10">
          
          {/* Left Block: Narrative & Vastu Elements */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-7 space-y-16"
          >
            {/* Editorial Lead Copy */}
            <p className="font-serif text-2xl md:text-3xl text-[#111111] leading-relaxed font-light">
              At ARSV, we believe a home is more than an aesthetic arrangement; it is a sacred container for human consciousness. We blend the structural geometries of global modernism with the cosmic alignments of Vastu Shastra.
            </p>

            <p className="font-sans text-[15px] text-[#6B6B6B] leading-relaxed max-w-2xl font-light">
              Our designs leverage directional intelligence to optimize natural daylight, air dynamics, and energetic fields. The result is an environment of refined luxury that nurtures prosperity, emotional peace, and physical well-being.
            </p>

            {/* Vastu Elements Accordion/Grid */}
            <div className="pt-12 border-t border-[#E8E8E8] space-y-8">
              <h3 className="font-serif text-2xl md:text-3xl text-[#111111] font-light tracking-wide">
                Elements of Spatial Alignment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {vastuElements.map((elem, idx) => (
                  <motion.div
                    key={elem.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group border border-[#E8E8E8] p-6 bg-[#FFFFFF] hover:border-[#B8975A] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.015)] cursor-default relative overflow-hidden"
                  >
                    {/* Tiny rotating vector background */}
                    <div className="absolute right-4 top-4 font-serif text-2xl text-[#B8975A]/20 group-hover:text-[#B8975A]/40 transition-all duration-500 group-hover:rotate-45 select-none pointer-events-none">
                      {elem.symbol}
                    </div>

                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="font-serif text-xl text-[#111111] group-hover:text-[#B8975A] transition-colors duration-300">
                        {elem.name}
                      </h4>
                      <span className="text-[9px] tracking-wider uppercase text-[#B8975A] font-sans font-semibold">
                        {elem.direction}
                      </span>
                    </div>
                    
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#B8975A] block mb-3 font-semibold">
                      {elem.translation}
                    </span>
                    
                    <p className="text-[13px] text-[#6B6B6B] leading-relaxed font-light">
                      {elem.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Block: Parallax-Zoom Shutter Mask Image */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={imageMaskVariants}
              style={{ boxShadow: ambientShadow }}
              className="relative w-full aspect-[3/4] overflow-hidden border border-[#E8E8E8] bg-[#FFFFFF]"
            >
              <motion.div 
                style={{ y: imageY }}
                className="absolute -inset-y-16 inset-x-0 w-full h-[calc(100%+128px)]"
              >
                <Image
                  src="/images/about_architecture.png"
                  alt="ARSV Architectural Facade Design"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              
              {/* Luxury Frame border */}
              <div className="absolute inset-5 border border-[#FFFFFF]/10 pointer-events-none" />
            </motion.div>

            {/* Float badge */}
            <div className="absolute -bottom-6 -left-6 hidden xl:flex flex-col p-6 bg-[#111111] text-[#FFFFFF] max-w-xs shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#E8E8E8]/10">
              <span className="font-serif text-2xl mb-1 text-[#B8975A] font-light">
                Vastu Shastra
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-80 leading-relaxed font-sans font-semibold">
                Architectural intelligence guiding luxury living spaces.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
