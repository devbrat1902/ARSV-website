"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
      desc: "A refined residential project blending Vastu alignment with warm luxury materials.",
    },
    {
      name: "Horizon Penthouse",
      image: "/images/portfolio_2.png",
      desc: "A contemporary penthouse designed with clean lines and panoramic spatial flow.",
    },
    {
      name: "The Oakwood Villa",
      image: "/images/portfolio_3.png",
      desc: "A modern villa combining natural wood tones with Vastu-inspired architecture.",
    },
    {
      name: "Serene Loft",
      image: "/images/portfolio_4.png",
      desc: "An urban loft transformed into a calm, light-filled sanctuary.",
    },
    {
      name: "The Marble Residence",
      image: "/images/about_architecture.png",
      desc: "A refined residence defined by timeless marble and sacred geometry.",
    },
  ];

  const faqs = [
    {
      q: "What services do you offer?",
      a: "We provide interior design services for residential and commercial spaces, including space planning, material selection, furniture curation, and Vastu alignment.",
    },
    {
      q: "How does the design process work?",
      a: "We begin with a Vastu consultation, followed by concept development, mood boards, material selection, and full project execution.",
    },
    {
      q: "Can you work with my existing furniture?",
      a: "Absolutely. We incorporate existing pieces and Vastu principles into a cohesive, refreshed space.",
    },
    {
      q: "How long does a project usually take?",
      a: "Most residential projects take 3 to 6 months depending on scope and scale.",
    },
    {
      q: "What styles do you specialize in?",
      a: "We blend modern luxury with Vastu Shastra principles — creating spaces that are both beautiful and energetically harmonious.",
    },
    {
      q: "How much does interior design cost?",
      a: "Pricing depends on the size and complexity of the project. Contact us for a customised quote.",
    },
  ];

  const carouselItems = [
    { image: "/images/portfolio_3.png", label: "Elegant Ceramic Sink" },
    { image: "/images/portfolio_4.png", label: "Artistic Ceramic Vase" },
    { image: "/images/about_architecture.png", label: "Modern Curved Armchair" },
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
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: heroReady ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-6 md:px-8 md:py-6 bg-transparent"
      >
        {/* Left — Logo that links back to main page */}
        <Link href="/" className="group flex flex-col items-start cursor-pointer no-underline">
          <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.2em] text-[#FFFFFF] transition-colors duration-500 group-hover:text-[#B8975A]">
            ARSV
          </span>
          <span className="text-[7px] tracking-[0.45em] text-[#B8975A] uppercase -mt-0.5 font-sans font-semibold">
            Architecture Studio
          </span>
        </Link>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            href="/#contact"
            style={{
              fontFamily: "sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "#FFFFFF",
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              padding: "10px 20px",
              textDecoration: "none",
              transition: "background 0.3s, border-color 0.3s",
              borderRadius: "25%",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)";
            }}
          >
            Get in touch
          </Link>

          {/* Hamburger */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: "22px",
                  height: "1.5px",
                  background: "#FFFFFF",
                }}
              />
            ))}
          </div>
        </div>
      </motion.header>

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

      {/* NEW CINEMATIC SEQUENCE */}
      <CinematicSequence />

      {/* SECTION 3 — STATEMENT */}
      <section className="relative bg-white py-20 md:py-[160px] px-6 md:px-20 text-center flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh]">
        <div className="max-w-[1200px] mx-auto font-serif text-[clamp(1.8rem,3.8vw,4rem)] font-light text-[#111111] leading-[1.4]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            We design spaces that reflect who you are,<br />
            redefining luxury through precision,<br />
            creativity, and world-class<br />
            experience.
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — IMAGE + TEXT ALTERNATING GRID */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 w-full">
        {/* Row 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative w-full aspect-square"
        >
          <Image src="/images/portfolio_2.png" alt="Grid Image 1" fill className="object-cover" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative w-full aspect-square"
        >
          <Image src="/images/portfolio_3.png" alt="Grid Image 2" fill className="object-cover" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative w-full aspect-square order-5 lg:order-none"
        >
          <Image src="/images/portfolio_4.png" alt="Grid Image 3" fill className="object-cover" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative w-full aspect-square order-7 lg:order-none"
        >
          <Image src="/images/about_architecture.png" alt="Grid Image 4" fill className="object-cover" />
        </motion.div>
      </section>

      {/* SECTION 5 — OUR SERVICES */}
      <section className="bg-white pt-20 px-10 pb-0">
        <div className="relative mb-12">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-light text-[#111111] text-center">
            <AnimatedText text="Our Services" triggerOnScroll />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="service-card relative h-[60vh] overflow-hidden cursor-pointer"
          >
            <Image src="/images/portfolio_2.png" alt="Interior Design" fill className="service-img object-cover" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 left-0 p-6 font-serif text-[clamp(1.2rem,2vw,1.8rem)] font-light text-white">
              Interior Design
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="service-card relative h-[60vh] overflow-hidden cursor-pointer"
          >
            <Image src="/images/portfolio_3.png" alt="Space Planning" fill className="service-img object-cover" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(1.2rem,2vw,1.8rem)] font-light text-white whitespace-nowrap text-center">
              Space Planning
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="service-card relative h-[60vh] overflow-hidden cursor-pointer"
          >
            <Image src="/images/portfolio_4.png" alt="Vastu Consultation" fill className="service-img object-cover" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 left-0 p-6 font-serif text-[clamp(1.2rem,2vw,1.8rem)] font-light text-white">
              Vastu Consultation
            </div>
          </motion.div>
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
            <AnimatedText text="Design Objects" triggerOnScroll />
          </h2>
          <Link
            href="/#contact"
            className="absolute top-0 right-0 font-sans text-[13px] font-normal text-[#111111] bg-white px-5 py-[10px] hover:bg-[#f0f0f0] transition-colors duration-200"
          >
            Get in touch
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] gap-8 md:gap-0">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="w-full">
              <div className="relative w-full aspect-square">
                <Image src="/images/portfolio_1.png" alt="Artisan Wooden Table" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Artisan Wooden Table
              </div>
            </div>
            <div className="w-full mt-4">
              <div className="relative w-full aspect-square">
                <Image src="/images/portfolio_2.png" alt="Glass Bulb Chandelier" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Glass Bulb Chandelier
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
                <Image src="/images/portfolio_4.png" alt="Modern Curved Armchair" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Modern Curved Armchair
              </div>
            </div>
            <div className="w-full mt-4">
              <div className="relative w-full aspect-square">
                <Image src="/images/about_architecture.png" alt="Sculptural Wooden Table" fill className="object-cover" />
              </div>
              <div className="font-serif text-[13px] text-[#111111] text-center py-3">
                Sculptural Wooden Table
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-white min-h-screen flex flex-col justify-center px-10 py-20">
        <div className="w-full max-w-[1200px] mx-auto">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-center mb-14">
            <AnimatedText text="Everything You Need to Know" triggerOnScroll />
          </h2>
          
          <div className="border-t border-[#E0E0E0]">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#E0E0E0]">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center py-[22px] cursor-pointer bg-transparent border-none text-left"
                >
                  <span className="font-serif text-[17px] font-light text-[#111111]">
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
                      <div className="font-sans text-[14px] text-[#6B6B6B] leading-[1.8] pb-[22px]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — FOOTER (custom) */}
      <footer className="w-full">
        {/* Row 1 — contact + social */}
        <div className="flex justify-between items-center px-10 py-8 border-b border-[#E0E0E0] bg-white">
          <a href="mailto:hello@ansv.in" className="font-sans text-[14px] text-[#111111] no-underline hover:underline">
            hello@ansv.in
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
