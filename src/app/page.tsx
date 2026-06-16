"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import GrainOverlay from "@/components/GrainOverlay";
import Header from "@/components/Header";
import HeroCanvas from "@/components/HeroCanvas";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import { motion, AnimatePresence } from "framer-motion";
import AtmosphericLighting from "@/components/AtmosphericLighting";
import FloatingParticles from "@/components/FloatingParticles";
import SceneTransition from "@/components/SceneTransition";
import Footer from "@/components/Footer";
import Lenis from "lenis";



export default function Home() {
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Prevent browser scroll restoration from fighting the preloader
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Initialise Lenis smooth scroll after preload completes
  useEffect(() => {
    if (!isPreloaded) return;

    // Reset scroll position cleanly after preloader exits
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,            // Standard smooth pacing
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,     // Standard wheel multiplier
      touchMultiplier: 1.5,
    });

    // Connect Lenis RAF loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isPreloaded]);

  return (
    <>
      {/* Luxury Brand Intro & Sequence Preloader */}
      <Preloader onComplete={() => setIsPreloaded(true)} />

      <AnimatePresence>
        {isPreloaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen w-full"
          >
            {/* Fixed Film Grain Overlay */}
            <div style={{ opacity: 0, pointerEvents: 'none' }}><GrainOverlay /></div>

            {/* Fixed Atmospheric Lighting Layer */}
            <div style={{ opacity: 0, pointerEvents: 'none' }}><AtmosphericLighting /></div>

            {/* Floating Particles for continuous cinematic dust flow */}
            <div style={{ opacity: 0, pointerEvents: 'none' }}><FloatingParticles /></div>

            {/* Scroll-aware Premium Header */}
            <Header />

            {/* Cinematic Journey */}
            <main className="relative z-10 w-full">
              {/* Section 1: Canvas Scrollytelling Hero */}
              <HeroCanvas isPreloaded={isPreloaded} />

              {/* Transition 1: Hero to About */}
              <SceneTransition
                quote="Architecture is the learned game, correct and magnificent, of forms assembled in the light."
                author="Le Corbusier"
                stats={[
                  { value: "15+", label: "Years of Excellence" },
                  { value: "320+", label: "Projects Delivered" },
                  { value: "18", label: "Design Awards" },
                  { value: "4", label: "Studio Locations" },
                ]}
              />

              {/* Section 2: Vastu Philosophy */}
              <AboutSection />

              {/* Transition 2: About to Portfolio */}
              <SceneTransition
                quote="Space and light and order. Those are the things that men need just as much as they need bread or a place to sleep."
                author="Le Corbusier"
              />

              {/* Section 3: Horizontal Portfolio */}
              <PortfolioSection />

              {/* Transition 3: Portfolio to Services */}
              <SceneTransition
                quote="The details are not the details. They make the design."
                author="Charles Eames"
                stats={[
                  { value: "₹500Cr+", label: "Projects Value" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "40+", label: "Expert Architects" },
                  { value: "12", label: "Cities Served" },
                ]}
              />

              {/* Section 4: Services Accordion */}
              <ServicesSection />

              {/* Transition 4: Services to Contact */}
              <SceneTransition
                quote="A great building must begin with the unmeasurable, must go through measurable means when it is being designed, and in the end must be unmeasurable."
                author="Louis Kahn"
              />

              {/* Section 5: Private Consultation Booking */}
              <ContactSection />
            </main>

            {/* Dark Editorial Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
