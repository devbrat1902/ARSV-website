"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface Stat {
  value: string;
  label: string;
}

interface SceneTransitionProps {
  quote: string;
  author: string;
  stats?: Stat[];
}

export default function SceneTransition({
  quote,
  author,
  stats,
}: SceneTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [50, 0, 0, -50]);
  const lineScaleX = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative w-full bg-[#111111] overflow-hidden py-20 md:py-28 px-6 md:px-16"
    >
      {/* Subtle diagonal texture lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #B8975A 0px, #B8975A 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* Ambient gold glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B8975A]/5 blur-[120px] pointer-events-none" />

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Opening quote mark */}
        <div className="text-[#B8975A]/20 font-serif text-[9rem] leading-none select-none mb-[-2rem] ml-[-1rem]">
          &ldquo;
        </div>

        {/* Quote */}
        <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-white font-light leading-[1.2] tracking-tight max-w-4xl">
          {quote}
        </p>

        {/* Gold rule */}
        <div className="mt-10 mb-8 h-[1px] bg-[#E8E8E8]/10 max-w-4xl overflow-hidden">
          <motion.div
            style={{ scaleX: lineScaleX }}
            className="h-full bg-gradient-to-r from-[#B8975A] to-[#B8975A]/30 origin-left"
          />
        </div>

        {/* Author */}
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#B8975A] font-semibold font-sans">
          — {author}
        </span>

        {/* Stats row */}
        {stats && stats.length > 0 && (
          <div className="mt-14 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col space-y-2"
              >
                <span className="font-serif text-4xl md:text-5xl text-white font-light tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8975A]/70 font-semibold font-sans">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
