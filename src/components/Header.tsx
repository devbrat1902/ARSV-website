"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track global scroll progress for the gold progress bar
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Determine if the user has scrolled past the first viewport
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      {/* ── Gold page-progress ticker ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#9A7C46] via-[#EADCC6] to-[#B8975A] origin-left"
          style={{ width: progressWidth }}
        />
      </div>

      {/* ── Main Header ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-750 bg-[#FFFFFF] border-b ${
          scrolled
            ? "border-[#E8E8E8] shadow-[0_2px_15px_rgba(0,0,0,0.015)]"
            : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-5 flex items-center justify-between">

          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex flex-col items-start cursor-pointer"
          >
            <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.2em] text-[#111111] transition-colors duration-500 group-hover:text-[#B8975A]">
              ARSV
            </span>
            <span className="text-[7px] tracking-[0.45em] text-[#B8975A] uppercase -mt-0.5 font-sans font-semibold">
              Architecture Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            {[
              { label: "about", href: "/#about" },
              { label: "portfolio", href: "/#portfolio" },
              { label: "interior", href: "/interior" },
              { label: "contact", href: "/#contact" }
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-[10px] uppercase tracking-[0.25em] text-[#111111]/50 hover:text-[#111111] transition-colors duration-400 font-sans font-semibold group"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#111111] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="group relative overflow-hidden inline-flex items-center px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#FFFFFF] bg-[#111111] transition-colors duration-500"
            >
              {/* Hover shimmer fill */}
              <span className="absolute inset-0 bg-[#B8975A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              <span className="relative">Book Consultation</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-end space-y-1.5 w-8 h-8 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 9 : 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="block h-px w-7 bg-[#111111] origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="block h-px w-5 bg-[#B8975A]"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -9 : 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="block h-px w-7 bg-[#111111] origin-center"
            />
          </button>

        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#FFFFFF] flex flex-col items-center justify-center space-y-2 md:hidden"
          >
            {[
              { label: "about", href: "/#about" },
              { label: "portfolio", href: "/#portfolio" },
              { label: "interior", href: "/interior" },
              { label: "contact", href: "/#contact" }
            ].map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-serif text-4xl font-light text-[#111111] hover:text-[#B8975A] transition-colors duration-300 tracking-[0.1em] capitalize px-8 py-3"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-8"
            >
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B8975A] border-b border-[#B8975A] pb-1 inline-block"
              >
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
