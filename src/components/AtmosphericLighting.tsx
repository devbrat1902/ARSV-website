"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * AtmosphericLighting
 *
 * A fixed fullscreen overlay that shifts the page's color temperature
 * based on global scroll progress — simulating a cinematic golden-hour
 * to twilight to warm amber progression.
 *
 * Scroll map:
 *   0%–20%   → Warm golden-hour wash (hero sequence)
 *   20%–40%  → Neutral clarity (about philosophy)
 *   40%–65%  → Cool twilight depth (portfolio journey)
 *   65%–85%  → Neutral return (services)
 *   85%–100% → Warm amber glow (contact/footer)
 */
export default function AtmosphericLighting() {
  const { scrollYProgress } = useScroll();

  // Golden-hour warm overlay (top and bottom)
  const warmOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.4, 0.65, 0.82, 1.0],
    [0.06, 0.04, 0.0, 0.0, 0.0, 0.03, 0.05]
  );

  // Cool twilight overlay (middle portfolio section)
  const coolOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.6, 0.75, 1.0],
    [0.0, 0.0, 0.035, 0.04, 0.0, 0.0]
  );

  // Subtle vignette that intensifies during dramatic moments
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.0],
    [0.3, 0.15, 0.25, 0.35, 0.25, 0.2, 0.3]
  );

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none" aria-hidden="true">
      {/* Warm golden-hour wash */}
      <motion.div
        style={{ opacity: warmOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#D4A55A]/30 via-[#C5A880]/10 to-transparent mix-blend-multiply"
      />

      {/* Cool twilight undertone */}
      <motion.div
        style={{ opacity: coolOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#7B8FA1]/20 via-[#9BAAB5]/10 to-transparent mix-blend-multiply"
      />

      {/* Cinematic vignette — darkens edges for focus */}
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,26,26,0.12)_100%)]" />
      </motion.div>

      {/* Subtle directional light beam (Vastu: from East / left) */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0.08, 0.05, 0.03, 0]),
        }}
        className="absolute inset-0 bg-gradient-to-r from-[#DFCEB7]/20 via-transparent to-transparent"
      />
    </div>
  );
}
