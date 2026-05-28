"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Compass, PenTool, Layout, Landmark } from "lucide-react";
import React, { useState } from "react";

const services = [
  {
    icon: Landmark,
    num: "01",
    title: "Architecture Design",
    tagline: "Form, Function & Nature",
    description:
      "Crafting modern luxury villas and premium residences grounded in timeless proportion. We focus on clean geometries, large glazing facades, and organic materials — raw stone, timber, exposed concrete — structured to create iconic architectural facades.",
    details: [
      "Modern luxury villa blueprints",
      "Sustainable material curation",
      "Facade engineering & glazing",
      "Landscaping integration",
    ],
  },
  {
    icon: PenTool,
    num: "02",
    title: "Interior Design",
    tagline: "Sensory Bespoke Curation",
    description:
      "Developing refined indoor atmospheres matched precisely to your lifestyle. We curate bespoke wall paneling, custom-cut imported marbles, premium Italian furniture fittings, and layered lighting that evoke emotional warmth and spatial depth.",
    details: [
      "Ultra-modern living layouts",
      "Kitchen & vanity engineering",
      "Bespoke custom furniture",
      "Luxurious material specification",
    ],
  },
  {
    icon: Compass,
    num: "03",
    title: "Vastu Consultation",
    tagline: "Energetic Spatial Intelligence",
    description:
      "Integrating traditional Indian spatial science into global luxury architecture. We analyze directional vectors to optimize Prana flow, aligning entrance thresholds, master suites, and kitchens for prosperity, serenity, and long-term vitality.",
    details: [
      "Directional grid analysis",
      "Eight-vector energy maps",
      "Remedial micro-space solutions",
      "Pre-acquisition site assessments",
    ],
  },
  {
    icon: Layout,
    num: "04",
    title: "Luxury Space Planning",
    tagline: "Fluid Circulation Geometry",
    description:
      "Optimizing volumetric transition zones with editorial precision. We design double-height voids, internal skylights, and expansive corridors that let spaces breathe — enabling clean transitions and grand vistas between functional zones.",
    details: [
      "Micro-spatial efficiency",
      "Double-height volume zoning",
      "Optimized hallway flow maps",
      "Privacy screening layouts",
    ],
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative min-h-screen w-full bg-[#FFFFFF] py-28 md:py-40 px-6 md:px-16 border-t border-[#E8E8E8] overflow-hidden"
    >
      {/* Rotating Vastu Compass SVG — ambient background element */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -right-64 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.025] pointer-events-none select-none"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="98" stroke="#B8975A" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#B8975A" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" stroke="#B8975A" strokeWidth="0.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 40 * Math.cos(rad);
            const y1 = 100 + 40 * Math.sin(rad);
            const x2 = 100 + 98 * Math.cos(rad);
            const y2 = 100 + 98 * Math.sin(rad);
            return (
              <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B8975A" strokeWidth="0.5" />
            );
          })}
          <polygon points="100,2 103,97 100,92 97,97" fill="#B8975A" />
          <polygon points="100,198 103,103 100,108 97,103" fill="#B8975A" opacity="0.4" />
          <circle cx="100" cy="100" r="4" fill="#B8975A" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col space-y-20 relative z-10">

        {/* Section Header — asymmetric editorial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8 space-y-5">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B8975A] font-semibold">
              Bespoke Services
            </span>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-[#111111] leading-[1.05] tracking-tight">
              Spatial Intelligence <br />
              <em className="not-italic text-[#B8975A]">Tailored</em> for Luxury Living.
            </h2>
          </div>
          <div className="md:col-span-4 pb-2 space-y-4">
            <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed font-light">
              A holistic spectrum of architecture and design consulting — ensuring visual grandeur operates in absolute harmony with natural cosmic forces.
            </p>
          </div>
        </div>

        {/* Services Accordion List */}
        <div className="flex flex-col divide-y divide-[#E8E8E8] border-t border-[#E8E8E8]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <motion.div
                key={service.title}
                animate={{ opacity: isDimmed ? 0.25 : 1 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                className="group relative cursor-default"
              >
                {/* Gold sweep line on hover */}
                <motion.div
                  className="absolute left-0 top-0 h-full w-[2px] bg-[#B8975A] origin-top"
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Row Header — always visible */}
                <div className="flex items-center py-8 md:py-10 pl-6 md:pl-10 pr-4">
                  {/* Number */}
                  <span className="font-serif text-sm text-[#B8975A]/60 w-12 shrink-0 font-light tracking-wider">
                    {service.num}
                  </span>

                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotate: isActive ? 15 : 0,
                      color: isActive ? "#B8975A" : "#B8975A",
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mr-6 shrink-0"
                    style={{ opacity: isActive ? 1 : 0.6 }}
                  >
                    <Icon className="w-5 h-5 stroke-[1.25px]" />
                  </motion.div>

                  {/* Title & Tagline */}
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      animate={{ x: isActive ? 8 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="font-serif text-2xl md:text-4xl font-light text-[#111111]"
                    >
                      {service.title}
                    </motion.h3>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold mt-1 block font-sans">
                      {service.tagline}
                    </span>
                  </div>

                  {/* Expand indicator */}
                  <motion.span
                    animate={{ rotate: isActive ? 45 : 0, opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="font-serif text-2xl text-[#B8975A] ml-4 shrink-0 select-none"
                  >
                    +
                  </motion.span>
                </div>

                {/* Expandable Detail Panel */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 pl-6 md:pl-28 pr-4">
                        {/* Description */}
                        <div className="md:col-span-6">
                          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed font-light">
                            {service.description}
                          </p>
                        </div>

                        {/* Capabilities list */}
                        <div className="md:col-span-6">
                          <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold block mb-4">
                            Capabilities & Deliverables
                          </span>
                          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {service.details.map((detail) => (
                              <motion.li
                                key={detail}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="flex items-center space-x-2 text-xs text-[#111111]/80 font-sans"
                              >
                                <span className="w-1 h-1 bg-[#B8975A] rounded-full shrink-0" />
                                <span className="font-light">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => {
                              const el = document.getElementById("contact");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="mt-8 inline-flex items-center space-x-3 text-[10px] uppercase tracking-[0.25em] text-[#B8975A] font-semibold group/btn cursor-pointer"
                          >
                            <span>Request Consultation</span>
                            <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                              &rarr;
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
