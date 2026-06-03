"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FRAME_COUNT = 60;

/** Preload all 60 frame images and return them as an array of HTMLImageElement */
function preloadFrames(): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame-${i.toString().padStart(3, "0")}.webp`;
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_COUNT) {
          resolve(images);
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`);
        loaded++;
        if (loaded === FRAME_COUNT) {
          resolve(images);
        }
      };
      images.push(img);
    }
  });
}

export default function CinematicSequence() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Draw a specific image onto the canvas with object-fit: cover behavior
  function drawFrame(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
  ) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Set canvas resolution to match the screen
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    ctx.scale(dpr, dpr);

    // Compute object-fit: cover dimensions
    const canvasRatio = displayWidth / displayHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
    } else {
      drawHeight = displayWidth / imgRatio;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  // Phase 1: Preload all images
  useEffect(() => {
    preloadFrames().then((frames) => {
      imagesRef.current = frames;
      setIsLoaded(true);
    });
  }, []);

  // Phase 2: Start the scroll-driven animation loop once images are ready
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const track = trackRef.current;
    const overlay = overlayRef.current;
    const images = imagesRef.current;

    if (!canvas || !ctx || !track || !overlay || images.length === 0) return;

    // Draw the first frame immediately
    drawFrame(canvas, ctx, images[0]);

    let animationFrameId: number;
    let lastFrameIndex = -1;

    const tick = () => {
      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollDistance = -rect.top;
      const maxScroll = trackHeight - viewportHeight;

      let progress = scrollDistance / maxScroll;
      progress = Math.max(0, Math.min(1, progress));

      // 1. Canvas Animation (0% to 70%)
      const canvasProgress = Math.min(progress / 0.7, 1);
      const frameIndex = Math.min(
        Math.floor(canvasProgress * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1
      );

      // Only redraw if the frame has actually changed (performance optimization)
      if (frameIndex !== lastFrameIndex && images[frameIndex]) {
        drawFrame(canvas, ctx, images[frameIndex]);
        lastFrameIndex = frameIndex;
      }

      // 1.5 Intro Text Fade Out (0% to 15%)
      if (introTextRef.current) {
        const introOpacity = Math.max(0, 1 - (progress / 0.15));
        introTextRef.current.style.opacity = introOpacity.toString();
        introTextRef.current.style.transform = `translateY(-${progress * 20}vh)`;
      }

      // 2. Glass Slide-Up (70% to 100%)
      const overlayProgress = Math.max(0, (progress - 0.7) / 0.3);
      const yPos = 100 - overlayProgress * 100;
      overlay.style.transform = `translateY(${yPos}vh)`;

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Initial positioning
    overlay.style.transform = `translateY(100vh)`;

    const handleResize = () => {
      if (images[lastFrameIndex >= 0 ? lastFrameIndex : 0]) {
        drawFrame(canvas, ctx, images[lastFrameIndex >= 0 ? lastFrameIndex : 0]);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  return (
    <div id="animation-track" className="relative h-[350vh] w-full" ref={trackRef}>
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden bg-[#111111]">

        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#111111]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/60">
                Loading sequence...
              </span>
            </motion.div>
          </div>
        )}

        {/* Canvas Layer */}
        <canvas
          id="hero-canvas"
          ref={canvasRef}
          className="absolute inset-0"
        />

        {/* Intro Text Overlay */}
        <div
          ref={introTextRef}
          className="absolute inset-0 z-10 flex items-start pt-[15vh] justify-center pointer-events-none px-6"
        >
          <h1 className="font-serif text-5xl md:text-[8rem] font-light tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-center leading-[1.1]">
            STEP INSIDE<br />
            <span className="italic font-light text-white/90">THE SANCTUARY</span>
          </h1>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-4 z-10 opacity-70 pointer-events-none">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white">
            Scroll to enter
          </span>
          <div className="w-[1px] h-12 bg-white/40 overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-white"
            />
          </div>
        </div>

        {/* Glass Morphism Overlay Section */}
        <div
          id="info-section"
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center pointer-events-none"
          style={{ transform: "translateY(100vh)" }}
        >
          {/* Glass Panel */}
          <div className="bg-white/5 backdrop-blur-[24px] border border-white/10 shadow-2xl p-10 md:p-16 max-w-2xl text-center rounded-sm pointer-events-auto mx-6">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6">
              A Symphony of Structure
            </h2>
            <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed font-light">
              Experience the breathtaking progression of a luxury facade taking shape.
              We align modern architectural engineering with timeless structural elegance.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
