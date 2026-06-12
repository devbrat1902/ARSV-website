"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

export default function PortfolioSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll details for the entire horizontal scroll height
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Track translation: maps [0, 1] scroll progress to move the panels
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Inner-window image parallax: maps [0, 1] scroll to move images in the opposite direction
  const imageParallaxX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Softened slide-specific lighting transitions
  const glow1 = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.28], [0.06, 0.08, 0.02, 0]);
  const glow2 = useTransform(scrollYProgress, [0.15, 0.28, 0.38, 0.48, 0.58], [0, 0.04, 0.05, 0.01, 0]);
  const glow3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75, 0.85], [0, 0.02, 0.04, 0.02, 0]);
  const glow4 = useTransform(scrollYProgress, [0.7, 0.78, 0.88, 0.98, 1.0], [0, 0.02, 0.04, 0.06, 0.04]);

  const projects = [
    {
      id: "01",
      title: "Villa Surya",
      tagline: "The Alignment of Sunlight",
      location: "Alibaug, Maharashtra",
      area: "8,500 sq ft",
      description: "An elite coastal villa featuring a double-height morning atrium and teak screen facades. Designed with a strict East entrance to channel positive solar radiation (Surya energy) directly into the heart of the residence.",
      image: "/images/portfolio_1.png",
      vastuKey: "East Surya Vector",
      details: ["72° Morning Atrium", "Bespoke Teak Screening", "Local Khadappa Stone Plinth"],
    },
    {
      id: "02",
      title: "Aura Residence",
      tagline: "Flow of the Northwest Wind",
      location: "Worli, Mumbai",
      area: "5,200 sq ft",
      description: "A soft-minimalist sky penthouse prioritizing open-plan fluidity. By aligning the terrace openings with Northwest wind currents (Vayu), we established continuous cross-ventilation, creating an atmosphere of mental clarity.",
      image: "/images/portfolio_2.png",
      vastuKey: "Northwest Vayu Vector",
      details: ["Travertine Stone Walls", "Circulating Air Paths", "Walnut Panel Curation"],
    },
    {
      id: "03",
      title: "Soma Atrium",
      tagline: "Centering the Cosmic Grid",
      location: "Gurugram, Haryana",
      area: "22,000 sq ft",
      description: "A commercial headquarters lobby utilizing structural curves to optimize space. The architecture centers around a grand double-height skylight (Brahmasthan), maintaining energetic balance and geometric harmony.",
      image: "/images/portfolio_3.png",
      vastuKey: "Brahmasthan Equilibrium",
      details: ["Curved White Concrete", "Cosmic Skylight Grid", "Indoor Oxygen Biome"],
    },
    {
      id: "04",
      title: "Prana Retreat",
      tagline: "Rooted in Earth Energy",
      location: "Mandrem, Goa",
      area: "12,000 sq ft",
      description: "A tropical eco-luxury wellness escape. The structural footprint aligns with the Southwest earth energy vectors, anchoring the resort into its surrounding terrain while providing premium indoor-outdoor living.",
      image: "/images/portfolio_4.png",
      vastuKey: "Southwest Earth Vector",
      details: ["Laterite Stone Foundations", "Goan Teak Frameworks", "Natural Spring Water Boundary"],
    },
  ];

  return (
    <section ref={targetRef} id="portfolio" className="relative h-auto md:h-[400vh] bg-[#FFFFFF]">
      {/* Sticky Fullscreen Wrapper on Desktop, Normal flow on Mobile */}
      <div className="relative md:sticky md:top-0 h-auto md:h-screen md:overflow-hidden flex flex-col md:flex-row md:items-center">
        
        {/* Horizontal Track on Desktop, Vertical stack on Mobile */}
        <motion.div style={{ x }} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[400vw] max-md:!transform-none">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative w-full md:w-[100vw] h-auto md:h-full flex flex-col justify-between pt-20 pb-16 md:pt-24 md:pb-8 lg:py-32 px-6 md:px-16 bg-[#FFFFFF] border-b md:border-b-0 md:border-r border-[#E8E8E8] overflow-hidden"
            >
              {/* Subtle ambient lighting contrast overlay per slide */}
              {index === 0 && (
                <motion.div
                  style={{ opacity: glow1 }}
                  className="absolute inset-0 bg-gradient-to-tr from-[#B8975A]/15 via-transparent to-transparent pointer-events-none mix-blend-color-burn z-0"
                />
              )}
              {index === 1 && (
                <motion.div
                  style={{ opacity: glow2 }}
                  className="absolute inset-0 bg-gradient-to-b from-[#7B8FA1]/10 via-transparent to-transparent pointer-events-none mix-blend-multiply z-0"
                />
              )}
              {index === 2 && (
                <motion.div
                  style={{ opacity: glow3 }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,151,90,0.06)_0%,transparent_75%)] pointer-events-none mix-blend-overlay z-0"
                />
              )}
              {index === 3 && (
                <motion.div
                  style={{ opacity: glow4 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#B8975A]/10 via-transparent to-transparent pointer-events-none mix-blend-multiply z-0"
                />
              )}

              {/* Massive background watermark number */}
              <div className="absolute right-4 top-12 md:right-12 md:top-24 hidden md:block font-serif text-[8rem] md:text-[25rem] text-[#B8975A]/3 select-none pointer-events-none font-light leading-none z-0">
                {project.id}
              </div>

              {/* Panel Header */}
              <div className="flex justify-between items-baseline border-b border-[#E8E8E8] pb-5 z-10">
                <div className="flex items-center space-x-4">
                  <span className="font-serif text-sm text-[#B8975A] font-light tracking-[0.1em]">
                    ARSV Portfolio
                  </span>
                  <span className="text-[10px] text-[#6B6B6B] uppercase tracking-widest font-sans">
                    / 0{index + 1}
                  </span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold">
                  {project.vastuKey}
                </div>
              </div>

              {/* Main Content Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-20 items-center my-auto z-10">
                
                {/* Left Side: Staggered Content Reveals */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 space-y-6 md:space-y-8"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#B8975A] font-semibold block">
                      {project.location}
                    </span>
                    <h3 className="font-serif text-5xl md:text-7xl font-light text-[#111111] leading-tight tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs italic tracking-widest text-[#B8975A] uppercase font-semibold pl-1">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="font-sans text-[15px] text-[#6B6B6B] leading-relaxed max-w-lg font-light">
                    {project.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="pt-4 md:pt-8 border-t border-[#E8E8E8] grid grid-cols-3 gap-2 md:gap-6">
                    {project.details.map((detail, idx) => (
                      <motion.div 
                        key={detail}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 0.9, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                        className="space-y-1.5"
                      >
                        <span className="text-[9px] uppercase tracking-[0.15em] text-[#B8975A] font-semibold block">
                          Blueprint Detail
                        </span>
                        <span className="text-xs text-[#111111] font-sans block leading-normal font-light">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Side: Parallax Image Showcase */}
                <div className="lg:col-span-7 h-[30vh] md:h-[60vh] relative group overflow-hidden border border-[#E8E8E8] bg-[#FFFFFF]">
                  
                  {/* Outer parallax container */}
                  <motion.div
                    className="absolute top-0 -left-[10%] w-[120%] h-full"
                    style={{ x: imageParallaxX }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} Architecture Design`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    
                    {/* Soft shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/25 via-transparent to-[#111111]/5 pointer-events-none" />
                  </motion.div>

                  {/* Luxury Inner Frame Border */}
                  <div className="absolute inset-5 border border-[#FFFFFF]/10 pointer-events-none z-10" />

                  {/* Info Hover Reveal with Premium Motion */}
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center bg-[#FFFFFF]/95 backdrop-blur-md p-5 border border-[#E8E8E8] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1] z-20">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#6B6B6B] block mb-0.5">
                        Area footprint
                      </span>
                      <span className="text-sm font-serif text-[#111111] font-light">
                        {project.area}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold">
                      Explore Blueprint &rarr;
                    </span>
                  </div>
                </div>

              </div>

              {/* Panel Footer */}
              <div className="flex justify-between items-center text-[9px] text-[#6B6B6B] tracking-[0.25em] uppercase border-t border-[#E8E8E8] pt-5 z-10">
                <span>ARSV Studio &bull; All Rights Reserved</span>
                <span className="font-semibold text-[#B8975A]">{project.location.split(",")[1]}</span>
              </div>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
