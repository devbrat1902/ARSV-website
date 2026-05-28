"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  MotionValue,
  Variants,
} from "framer-motion";
import { getImageCache } from "@/lib/imageCache";

/* -------------------------------------------------------------
   Configuration
------------------------------------------------------------- */

/* -------------------------------------------------------------
   Animated Text Component (Staggered Word Reveal / Exit)
------------------------------------------------------------- */
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  progress: MotionValue<number>;
  exitStart?: number;
  exitEnd?: number;
}

/** Single word component that safely calls useTransform at the top level */
const AnimatedWord = ({
  word,
  index,
  delay,
  progress,
  startScroll,
  endScroll,
}: {
  word: string;
  index: number;
  delay: number;
  progress: MotionValue<number>;
  startScroll: number;
  endScroll: number;
}) => {
  const y = useTransform(progress, [0, startScroll, endScroll], ["0%", "0%", "-100%"]);
  const opacity = useTransform(progress, [0, startScroll, endScroll], [1, 1, 0]);
  const filter = useTransform(progress, [0, startScroll, endScroll], ["blur(0px)", "blur(0px)", "blur(4px)"]);

  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <motion.span style={{ display: "inline-block", y, opacity, filter }}>
        <motion.span
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + index * 0.08,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{ display: "inline-block" }}
        >
          {word}&nbsp;
        </motion.span>
      </motion.span>
    </span>
  );
};

const AnimatedText = ({
  text,
  className,
  delay = 0,
  progress,
  exitStart = 0.05,
  exitEnd = 0.2,
}: AnimatedTextProps) => {
  const words = text.split(" ");
  const rangeWidth = exitEnd - exitStart;
  const wordStep = rangeWidth / Math.max(words.length, 1);

  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => {
        const startScroll = exitStart + i * (wordStep * 0.5);
        const endScroll = Math.min(startScroll + wordStep * 1.5, exitEnd);
        return (
          <AnimatedWord
            key={i}
            word={word}
            index={i}
            delay={delay}
            progress={progress}
            startScroll={startScroll}
            endScroll={endScroll}
          />
        );
      })}
    </span>
  );
};

/* -------------------------------------------------------------
   Props
------------------------------------------------------------- */
interface HeroCanvasProps {
  /** Show the cinematic overlay only after the pre‑loader finishes. */
  isPreloaded: boolean;
}

/* -------------------------------------------------------------
   Component
------------------------------------------------------------- */
export default function HeroCanvas({ isPreloaded }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);

  /* ---------------------------------------------------------
     Scroll‑linked progress (tied to container scroll)
  --------------------------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Vignette fades away with the scroll progression
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0.55, 0.3, 0]);

  // Overall wrapper fade out as a fallback
  const fadeOut = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 0.6, 0]);

  /* ---------------------------------------------------------
     Canvas / scroll logic (unchanged)
  --------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const images = getImageCache();
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d")!;
    let lastDrawnIndex = -1;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawnIndex = -1; // force redraw on resize
    };
    resize();
    window.addEventListener("resize", resize);

    const drawImg = (img: HTMLImageElement, alpha: number) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const nw = img.naturalWidth * scale;
      const nh = img.naturalHeight * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - nw) / 2, (ch - nh) / 2, nw, nh);
    };

    const drawFrame = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawImg(img, 1);
    };

    const draw = () => {
      const total = images.length;
      if (total > 0) {
        const containerTop = container.offsetTop;
        const scrollable = container.offsetHeight - window.innerHeight;
        const progress =
          scrollable > 0
            ? Math.max(0, Math.min(1, (window.scrollY - containerTop) / scrollable))
            : 0;
        const targetFrame = progress * (total - 1);
        const current = currentFrameRef.current;
        const next = current + (targetFrame - current) * 0.12;
        currentFrameRef.current = next;
        const frameIndex = Math.round(next);
        if (frameIndex !== lastDrawnIndex) {
          drawFrame(frameIndex);
          lastDrawnIndex = frameIndex;
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ---------------------------------------------------------
     Overlay entrance stagger (initial load)
  --------------------------------------------------------- */
  const overlayStagger: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 1,
        ease: "easeInOut",
      },
    }),
  };

  /* ---------------------------------------------------------
     Render
  --------------------------------------------------------- */
  return (
    <div
      ref={containerRef}
      style={{ position: "relative", height: "250vh", background: "#000" }}
    >
      {/* -------- Sticky canvas container -------- */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* -------- Dark vignette for text legibility -------- */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 15,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.45) 100%)",
            opacity: vignetteOpacity,
          }}
        />

        {/* -------- Cinematic Text Overlay -------- */}
        <AnimatePresence>
          {isPreloaded && (
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 20,
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "3rem 2rem 2rem 2rem",
                opacity: fadeOut,
              }}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {/* Line 1 – Small label, top left */}
              <motion.div
                custom={0}
                variants={overlayStagger}
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  color: "#B8975A",
                  fontWeight: 600,
                  textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                }}
              >
                <AnimatedText 
                  text="VASTU INSPIRED ARCHITECTURE" 
                  delay={0} 
                  progress={scrollYProgress}
                  exitStart={0.02}
                  exitEnd={0.12}
                />
              </motion.div>

              {/* Center‑left headline — scroll‑linked clarity */}
              <motion.div
                custom={1}
                variants={overlayStagger}
                style={{
                  alignSelf: "flex-start",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    color: "#FFFFFF",
                    letterSpacing: "0.06em",
                    textShadow:
                      "0 2px 20px rgba(0,0,0,0.4), 0 0px 60px rgba(0,0,0,0.2)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(3rem, 8vw, 7.5rem)",
                    }}
                  >
                    <AnimatedText 
                      text="Designing Spaces" 
                      delay={0.3} 
                      progress={scrollYProgress}
                      exitStart={0.05}
                      exitEnd={0.20}
                    />
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "clamp(3rem, 8vw, 7.5rem)",
                    }}
                  >
                    <AnimatedText 
                      text="That Breathe Life" 
                      delay={0.6} 
                      progress={scrollYProgress}
                      exitStart={0.08}
                      exitEnd={0.23}
                    />
                  </span>
                </div>
              </motion.div>

              {/* Sub‑text — also scroll‑linked */}
              <motion.div
                custom={2}
                variants={overlayStagger}
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "40ch",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  lineHeight: 1.45,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  textShadow: "0 1px 10px rgba(0,0,0,0.4)",
                }}
              >
                <p>
                  <AnimatedText 
                    text="We craft timeless architecture rooted in Vastu Shastra —" 
                    delay={0.9} 
                    progress={scrollYProgress}
                    exitStart={0.12}
                    exitEnd={0.28}
                  />
                </p>
                <p className="hidden md:block">
                  <AnimatedText 
                    text="where space, light, and consciousness align." 
                    delay={1.1} 
                    progress={scrollYProgress}
                    exitStart={0.14}
                    exitEnd={0.30}
                  />
                </p>
              </motion.div>

              {/* Bottom‑right scroll hint */}
              <motion.div
                custom={3}
                variants={overlayStagger}
                style={{
                  alignSelf: "flex-end",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#B8975A",
                  animation: "pulse 2s infinite",
                  fontWeight: 600,
                  textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                }}
              >
                <AnimatedText 
                  text="SCROLL TO EXPLORE ↓" 
                  delay={1.3} 
                  progress={scrollYProgress}
                  exitStart={0.05}
                  exitEnd={0.15}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
