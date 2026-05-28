"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "WhatsApp", href: "#" },
    { label: "X", href: "#" },
  ];

  return (
    <footer className="w-full bg-[#FFFFFF]">

      {/* ── Top contact bar ── */}
      <div
        className="w-full bg-[#111111] text-white"
        style={{ height: "60px" }}
      >
        <div className="h-full flex items-center justify-between px-8 md:px-16">
          {/* Email */}
          <a
            href="mailto:hello@arsv.com"
            className="text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors duration-300 font-sans"
          >
            hello@arsv.com
          </a>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => e.preventDefault()}
                className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all duration-300 font-sans"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giant brand name ── */}
      <div className="w-full px-8 md:px-16 py-8 md:py-12 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="font-serif font-normal text-[#111111] leading-none select-none text-center"
          style={{
            fontSize: "clamp(120px, 22vw, 320px)",
            letterSpacing: "0.04em",
          }}
        >
          ARSV
        </motion.h2>

        {/* Tagline below giant name */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="mt-6 text-[11px] uppercase tracking-[0.3em] text-[#B8975A] font-sans text-center"
        >
          Vastu Inspired Architecture &middot; Mumbai, India
        </motion.p>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="w-full border-t border-[#E8E8E8] px-8 md:px-16 py-6">
        <p className="text-[10px] tracking-[0.15em] text-[#6B6B6B] font-sans">
          &copy;2026 ARSV Architecture Studio. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
