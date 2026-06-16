"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CinematicSequence from "@/components/CinematicSequence";

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  triggerOnScroll = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}) => (
  <span className={className} style={{ display: "inline" }}>
    {text.split(" ").map((word, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "bottom",
          paddingBottom: "0.25em",
          marginBottom: "-0.25em",
        }}
      >
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          {...(triggerOnScroll
            ? {
                whileInView: { y: "0%", opacity: 1 },
                viewport: { once: true, margin: "-60px" },
              }
            : { animate: { y: "0%", opacity: 1 } })}
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

export default function InteriorPage() {
  const [heroReady, setHeroReady] = useState(false);
  const faqRef = React.useRef(null);
  const { scrollYProgress: faqScrollProgress } = useScroll({
    target: faqRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(faqScrollProgress, [0, 1], ["-15%", "15%"]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    // Small delay so white screen is visible first
    const timer = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const works = [
    {
      name: "The Ivory Residence",
      image: "/images/portfolio_1.png",
      desc: "Hand-selected Italian marble, warm timber accents, and bespoke lighting define this ultra-modern living space.",
    },
    {
      name: "Horizon Penthouse",
      image: "/images/portfolio_2.png",
      desc: "Panoramic spatial flow with custom walnut paneling, layered ambient lighting, and imported furnishings.",
    },
    {
      name: "The Oakwood Villa",
      image: "/images/portfolio_3.png",
      desc: "Organic wood tones meet sleek minimalism — custom joinery, stone countertops, and curated art installations.",
    },
    {
      name: "Serene Loft",
      image: "/images/portfolio_4.png",
      desc: "A transformed urban loft with double-height ceilings, sculptural pendant lights, and neutral luxury finishes.",
    },
    {
      name: "The Marble Residence",
      image: "/images/about_architecture.png",
      desc: "Timeless Statuario marble floors, backlit onyx feature walls, and precision-crafted bespoke cabinetry.",
    },
  ];

  const designProcess = [
    {
      step: "01",
      title: "Discovery & Consultation",
      desc: "We begin with an in-depth understanding of your lifestyle, aesthetic preferences, spatial requirements, and project budget.",
    },
    {
      step: "02",
      title: "Concept Development",
      desc: "Mood boards, material palettes, 3D renders, and spatial layouts are crafted to visualise your dream environment.",
    },
    {
      step: "03",
      title: "Material Curation",
      desc: "We source premium materials — imported marbles, exotic veneers, bespoke fabrics, and artisan hardware from around the world.",
    },
    {
      step: "04",
      title: "Precision Execution",
      desc: "Our in-house team manages every detail from civil work to furniture installation, ensuring flawless quality at every milestone.",
    },
    {
      step: "05",
      title: "Final Styling & Handover",
      desc: "Art placement, soft furnishing, lighting calibration, and a thorough walkthrough — delivering a space that exceeds expectations.",
    },
  ];

  const materials = [
    { name: "Statuario Marble", origin: "Carrara, Italy", image: "/images/portfolio_1.png" },
    { name: "Engineered Oak", origin: "Scandinavian Forests", image: "/images/portfolio_2.png" },
    { name: "Brushed Brass", origin: "Custom Foundries", image: "/images/portfolio_3.png" },
    { name: "Onyx Backlit Panels", origin: "Turkish Quarries", image: "/images/portfolio_4.png" },
  ];

  const faqs = [
    {
      q: "What interior design services do you offer?",
      a: "We provide end-to-end interior design — from concept and space planning to material selection, custom furniture design, lighting engineering, and turnkey project execution for residences, offices, and hospitality spaces.",
      image: "/images/portfolio_2.png",
    },
    {
      q: "How does the design process work?",
      a: "We follow a five-phase approach: Discovery consultation, Concept development with 3D renders, Material curation from global sources, Precision execution with in-house teams, and Final styling with handover.",
      image: "/images/portfolio_3.png",
    },
    {
      q: "Can you work with my existing furniture?",
      a: "Absolutely. We blend your cherished pieces with new elements to create a cohesive, refreshed design that honours your personal style.",
      image: "/images/portfolio_4.png",
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines vary by scope — a single room refresh takes 4–6 weeks, while a full residence interior typically requires 3–6 months for design through execution.",
      image: "/images/portfolio_1.png",
    },
    {
      q: "What styles do you specialise in?",
      a: "We specialise in modern luxury, contemporary minimalism, warm organic modernism, and neo-classical elegance — always tailored to your unique vision.",
      image: "/images/about_architecture.png",
    },
    {
      q: "Do you handle procurement and installation?",
      a: "Yes. We manage the entire procurement chain — from sourcing imported materials and custom furniture to on-site installation and quality control.",
      image: "/images/portfolio_2.png",
    },
  ];

  const carouselItems = [
    { image: "/images/portfolio_3.png", label: "Imported Italian Basin — Horizon Penthouse" },
    { image: "/images/portfolio_4.png", label: "Hand-Sculpted Ceramic Accent — The Oakwood Villa" },
    { image: "/images/about_architecture.png", label: "Curved Lounge Chair — Serene Loft" },
  ];

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#111111] overflow-x-clip w-full relative selection:bg-[#111111] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        html { overflow-x: clip; }
        ::-webkit-scrollbar { width: 0px; }
        .service-img { transition: transform 0.6s ease; }
        .service-card:hover .service-img { transform: scale(1.04); }
      `}} />

      {/* SECTION 1 — NAVIGATION */}
      <Header isReady={heroReady} transparentOnTop />

      {/* SECTION 2 — HERO */}
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* This is the expanding image container, using clip-path for smooth Framer-like animation */}
        <motion.div
          initial={{
            clipPath: "inset(50vh 50vw round 4px)",
            opacity: 0,
          }}
          animate={
            heroReady
              ? {
                  clipPath: "inset(0vh 0vw round 0px)",
                  opacity: 1,
                }
              : {
                  clipPath: "inset(50vh 50vw round 4px)",
                  opacity: 0,
                }
          }
          transition={{
            clipPath: { duration: 1.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
            opacity: { duration: 0.1 },
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          }}
        >
          <Image
            src="/images/hero_beige.jpg"
            alt="ARSV Interior"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
          />

          {/* Subtle gradient overlay to make text readable while keeping image clear */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 1 : 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at bottom left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)",
            }}
          />


          {/* Bottom-left: logo + headline */}
          <div
            style={{
              position: "absolute",
              bottom: "48px",
              left: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: heroReady ? 1 : 0, x: heroReady ? 0 : -20 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                color: "#FFFFFF",
              }}
            >
              ARSV
            </motion.div>

            {/* Headline line 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 40 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.2rem, 2.8vw, 2.8rem)",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1.05,
              }}
            >
              Elevate Every Space with Design
            </motion.div>

            {/* Headline line 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 40 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.2rem, 2.8vw, 2.8rem)",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1.05,
              }}
            >
              That Breathes Life
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CINEMATIC SCROLL SEQUENCE — Interior themed */}
      <CinematicSequence
        title="Where Luxury Meets Living"
        description="Immerse yourself in spaces crafted with rare materials, bespoke furniture, and precision lighting — every detail considered, every corner intentional."
      />

      {/* SECTION 3 — DESIGN PHILOSOPHY */}
      <section className="relative bg-[#111111] py-24 md:py-40 px-6 md:px-20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-[#B8975A]/5 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#B8975A] font-semibold font-sans">
              Our Design Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white leading-[1.1]">
              Every Space Tells<br />
              <em className="not-italic text-[#B8975A]">A Story</em>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed font-light max-w-lg">
              We believe interiors should be deeply personal — a reflection of your identity, your rituals, your aspirations. Our approach fuses global luxury sourcing with meticulous Indian craftsmanship, creating environments that are as functional as they are breathtaking.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <span className="font-serif text-3xl md:text-4xl text-white font-light">200+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8975A]/70 font-semibold block font-sans">Interiors Delivered</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl md:text-4xl text-white font-light">15+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8975A]/70 font-semibold block font-sans">Years Experience</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl md:text-4xl text-white font-light">50+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8975A]/70 font-semibold block font-sans">Global Material Sources</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl md:text-4xl text-white font-light">98%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8975A]/70 font-semibold block font-sans">Client Satisfaction</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Stacked images */}
          <div className="relative h-[500px] md:h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-[65%] h-[65%] z-10"
            >
              <Image src="/images/portfolio_1.png" alt="Luxury Interior 1" fill className="object-cover" />
              <div className="absolute inset-0 border border-white/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 w-[65%] h-[65%] z-20"
            >
              <Image src="/images/portfolio_2.png" alt="Luxury Interior 2" fill className="object-cover" />
              <div className="absolute inset-0 border border-white/10" />
            </motion.div>
            {/* Gold accent frame */}
            <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] border border-[#B8975A]/20 z-0" />
          </div>
        </div>
      </section>

      {/* SECTION 3B — STATEMENT QUOTE */}
      <section className="relative bg-white py-20 md:py-[140px] px-6 md:px-20 text-center flex flex-col items-center justify-center">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <span className="text-[#B8975A] font-serif text-6xl md:text-8xl leading-none select-none">&ldquo;</span>
            <p className="font-serif text-[clamp(1.6rem,3.5vw,3.5rem)] font-light text-[#111111] leading-[1.3] -mt-6">
              We don&apos;t just design rooms —<br />
              we craft atmospheres that stir the soul,<br />
              calm the mind, and elevate daily life.
            </p>
            <div className="h-[1px] w-20 bg-[#B8975A] mx-auto" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#B8975A] font-semibold font-sans">
              ARSV Interior Studio
            </span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3C — DESIGN PROCESS */}
      <section className="relative bg-[#FAF8F5] py-24 md:py-36 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#B8975A] font-semibold font-sans block mb-4">
              How We Work
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-[#111111] leading-[1.1]">
              <AnimatedText text="Our Design Process" triggerOnScroll />
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-[1px] bg-[#E8E8E8]" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
              {designProcess.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col"
                >
                  {/* Step number circle */}
                  <div className="w-16 h-16 rounded-full border border-[#B8975A] flex items-center justify-center mb-6 bg-[#FAF8F5] relative z-10">
                    <span className="font-serif text-lg text-[#B8975A] font-light">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-[#111111] font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[13px] text-[#6B6B6B] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3D — MATERIALS SHOWCASE */}
      <section className="relative bg-[#111111] py-24 md:py-36 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#B8975A] font-semibold font-sans block mb-4">
                Premium Materials
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-white leading-[1.1]">
                <AnimatedText text="Sourced Globally, Crafted Locally" triggerOnScroll />
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="font-sans text-sm text-white/50 leading-relaxed font-light">
                Every material is hand-selected from the finest quarries, mills, and ateliers worldwide — then precision-installed by our master craftsmen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((mat, i) => (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: i * 0.12 }}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={mat.image} alt={mat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-lg text-white font-light mb-1">{mat.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8975A] font-semibold font-sans">{mat.origin}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — IMAGE + TEXT ALTERNATING GRID */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 w-full">
        {/* Row 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative w-full aspect-square overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image src="/images/portfolio_2.png" alt="Grid Image 1" fill className="object-cover" />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="w-full aspect-square bg-white flex items-center justify-center p-10 font-serif text-[clamp(1rem,1.6vw,1.4rem)] font-light text-[#111111] text-center"
        >
          We don&apos;t just design interiors.
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative w-full aspect-square overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image src="/images/portfolio_3.png" alt="Grid Image 2" fill className="object-cover" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="w-full aspect-square bg-white flex items-center justify-center p-10 font-serif text-[clamp(1rem,1.6vw,1.4rem)] font-light text-[#111111] text-center"
        >
          We design experiences.
        </motion.div>

        {/* Row 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="w-full aspect-square bg-white flex items-end justify-end p-6 font-serif text-[clamp(1rem,1.6vw,1.4rem)] font-light text-[#111111] order-6 lg:order-none"
        >
          Spaces that reflect who you are
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full aspect-square overflow-hidden order-5 lg:order-none"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image src="/images/portfolio_4.png" alt="Grid Image 3" fill className="object-cover" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="w-full aspect-square bg-white flex items-end justify-end p-6 font-serif text-[clamp(1rem,1.6vw,1.4rem)] font-light text-[#111111] order-8 lg:order-none"
        >
          Environments that elevate how you live.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative w-full aspect-square overflow-hidden order-7 lg:order-none"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image src="/images/about_architecture.png" alt="Grid Image 4" fill className="object-cover" />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 5 — OUR INTERIOR SERVICES */}
      <section className="bg-white pt-20 px-10 pb-0">
        <div className="relative mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#B8975A] font-semibold font-sans block mb-4 text-center">
            What We Offer
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-light text-[#111111] text-center">
            <AnimatedText text="Interior Design Services" triggerOnScroll />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { image: "/images/portfolio_1.png", title: "Living & Bedroom Design", desc: "Bespoke layouts, premium finishes, and curated lighting for ultimate comfort." },
            { image: "/images/portfolio_2.png", title: "Kitchen & Vanity", desc: "Modular precision engineering with imported countertops and smart storage." },
            { image: "/images/portfolio_3.png", title: "Custom Furniture", desc: "Handcrafted, made-to-measure furniture designed exclusively for your space." },
            { image: "/images/portfolio_4.png", title: "Lighting Design", desc: "Layered ambient, task, and accent lighting to create mood and depth." },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12 }}
              className="service-card group relative h-[55vh] overflow-hidden cursor-pointer"
            >
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={service.image} alt={service.title} fill className="service-img object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-[clamp(1.1rem,1.8vw,1.6rem)] font-light text-white mb-2">
                  {service.title}
                </h3>
                <p className="font-sans text-[12px] text-white/70 leading-relaxed font-light max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — SELECTED WORKS */}
      <section className="bg-white py-20 px-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] font-light text-[#111111]">
            <AnimatedText text="Selected Works" triggerOnScroll />
          </h2>
          <Link href="/#portfolio" className="font-sans text-[13px] text-[#111111] underline mb-4">
            View All
          </Link>
        </div>

        <div className="flex flex-col w-full">
          {works.map((work, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <div key={index} className="flex flex-col lg:flex-row w-full mb-16 lg:mb-32 h-[120vh] lg:h-[80vh]">
                {isImageLeft ? (
                  <>
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-10 py-10 lg:py-0 h-1/2 lg:h-full">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.9 }}
                        className="w-[70%] relative aspect-[4/3] overflow-hidden"
                      >
                        <motion.div
                          initial={{ scale: 1.1 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0"
                        >
                          <Image src={work.image} alt={work.name} fill className="object-cover" />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="w-[70%] mt-8"
                      >
                        <p className="font-sans text-[14px] text-[#6B6B6B] leading-[1.7] text-left">
                          {work.desc}
                        </p>
                      </motion.div>
                    </div>
                    
                    <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full min-h-[40vh]">
                      <Image src={work.image} alt={`${work.name} Background`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/5" />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute inset-0 m-auto bg-white p-10 shadow-[0_4px_40px_rgba(0,0,0,0.08)] w-[320px] h-fit z-10 flex flex-col items-center"
                      >
                        <h3 className="font-serif text-[clamp(1.4rem,2.2vw,2rem)] font-light text-[#111111] mb-6 text-center leading-[1.2]">
                          {work.name}
                        </h3>
                        <div className="relative w-full aspect-[4/3] mb-6">
                          <Image src={work.image} alt={`${work.name} Thumbnail`} fill className="object-cover" />
                        </div>
                        <div className="font-serif text-[15px] font-light text-[#111111]">ARSV</div>
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full min-h-[40vh]">
                      <Image src={work.image} alt={`${work.name} Background`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/5" />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute inset-0 m-auto bg-white p-10 shadow-[0_4px_40px_rgba(0,0,0,0.08)] w-[320px] h-fit z-10 flex flex-col items-center"
                      >
                        <h3 className="font-serif text-[clamp(1.4rem,2.2vw,2rem)] font-light text-[#111111] mb-6 text-center leading-[1.2]">
                          {work.name}
                        </h3>
                        <div className="relative w-full aspect-[4/3] mb-6">
                          <Image src={work.image} alt={`${work.name} Thumbnail`} fill className="object-cover" />
                        </div>
                        <div className="font-serif text-[15px] font-light text-[#111111]">ARSV</div>
                      </motion.div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-10 py-10 lg:py-0 h-1/2 lg:h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="w-[70%] relative aspect-[4/3]"
                      >
                        <Image src={work.image} alt={work.name} fill className="object-cover" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="w-[70%] mt-8"
                      >
                        <p className="font-sans text-[14px] text-[#6B6B6B] leading-[1.7] text-left">
                          {work.desc}
                        </p>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7 — DESIGN OBJECTS */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="bg-white py-20 px-10"
      >
        <div className="relative mb-12">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-light text-[#111111] text-center">
            <AnimatedText text="Curated Selections" triggerOnScroll />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] gap-8 md:gap-0">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="w-full">
              <div className="relative w-full aspect-square">
                <Image src="/images/portfolio_1.png" alt="Hand-Selected Teak Console" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Hand-Selected Teak Console — The Ivory Residence
              </div>
            </div>
            <div className="w-full mt-4">
              <div className="relative w-full aspect-square">
                <Image src="/images/portfolio_2.png" alt="Blown Glass Pendant Cluster" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Blown Glass Pendant Cluster — Aura Residence
              </div>
            </div>
          </div>

          {/* Center Column (Carousel) */}
          <div className="relative flex flex-col px-4">
            <div className="relative w-full aspect-[2/3] overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image src={carouselItems[carouselIndex].image} alt={carouselItems[carouselIndex].label} fill className="object-cover" />
                </motion.div>
              </AnimatePresence>
              
              <button 
                onClick={prevCarousel}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[28px] text-[#111111] bg-transparent border-none cursor-pointer hover:opacity-60 transition-opacity z-10"
              >
                ‹
              </button>
              <button 
                onClick={nextCarousel}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[28px] text-[#111111] bg-transparent border-none cursor-pointer hover:opacity-60 transition-opacity z-10"
              >
                ›
              </button>
            </div>
            <div className="font-serif text-[14px] text-[#111111] text-center py-4">
              {carouselItems[carouselIndex].label}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <div className="w-full">
              <div className="relative w-full aspect-square">
                <Image src="/images/portfolio_4.png" alt="Bespoke Curved Armchair" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Bespoke Curved Armchair — Prana Retreat
              </div>
            </div>
            <div className="w-full mt-4">
              <div className="relative w-full aspect-square">
                <Image src="/images/about_architecture.png" alt="Sculptural Live-Edge Table" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Sculptural Live-Edge Table — Soma Atrium
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 8 — FAQ */}
      <section ref={faqRef} className="bg-[#FAF8F5] min-h-screen flex flex-col justify-center px-6 md:px-10 py-20">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column: Accordion */}
          <div className="flex flex-col">
            <div className="mb-12">
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#111111]/50 font-medium block mb-4">
                Everything You Need to Know
              </span>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-[1.1] text-[#111111]">
                <AnimatedText text="Frequently Asked Questions" triggerOnScroll />
              </h2>
            </div>
            
            <div className="border-t border-[#E0E0E0]/60">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#E0E0E0]/60">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center py-6 cursor-pointer bg-transparent border-none text-left hover:opacity-70 transition-opacity"
                  >
                    <span className="font-sans text-[18px] md:text-[22px] tracking-tight text-[#111111]">
                      {faq.q}
                    </span>
                    <span 
                      className="text-[20px] font-light text-[#111111] transition-transform duration-300 ease-in-out"
                      style={{ transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="font-sans text-[14px] text-[#111111]/70 leading-[1.8] pb-6 max-w-[85%]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Animated Image Revealer */}
          <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden lg:h-[80vh] bg-[#f0f0f0]">
            <AnimatePresence mode="wait">
              <motion.div
                key={openFaq ?? 0}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="absolute inset-0"
              >
                <motion.div style={{ y: parallaxY, height: "130%", width: "100%", position: "absolute", top: "-15%" }}>
                  <Image 
                    src={faqs[openFaq ?? 0].image} 
                    alt={faqs[openFaq ?? 0].q} 
                    fill 
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FOOTER (custom) */}
      <footer className="w-full">
        {/* Row 1 — contact + social */}
        <div className="flex justify-between items-center px-10 py-8 border-b border-[#E0E0E0] bg-white">
          <a href="mailto:hello@arsv.com" className="font-sans text-[14px] text-[#111111] no-underline hover:underline">
            hello@arsv.com
          </a>
          <div className="flex gap-8">
            <a href="#" className="font-sans text-[14px] text-[#111111] no-underline hover:underline">Instagram</a>
            <a href="#" className="font-sans text-[14px] text-[#111111] no-underline hover:underline">WhatsApp</a>
            <a href="#" className="font-sans text-[14px] text-[#111111] no-underline hover:underline">X</a>
          </div>
        </div>
        
        {/* Row 2 — black bar */}
        <div className="w-full h-12 bg-[#111111]"></div>

        {/* Row 3 — giant brand name */}
        <div className="w-full bg-white px-6">
          <div 
            className="font-serif font-normal text-[#111111] text-center w-full"
            style={{ fontSize: "23vw", letterSpacing: "-0.02em", lineHeight: 0.85 }}
          >
            ARSV
          </div>
        </div>

        {/* Row 4 — copyright */}
        <div className="w-full bg-white px-10 pt-4 pb-8">
          <div className="font-sans text-[12px] text-[#6B6B6B]">
            ©2026 ARSV. All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
