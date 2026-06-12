"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { setImageCache } from "@/lib/imageCache";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const totalFrames = 192;

    const padNumber = (num: number, size: number) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };

      // Preload sequence
      const preloadImages = async () => {
        const loadedImages: HTMLImageElement[] = [];
        const initialLoadThreshold = 10;

        const promises = Array.from({ length: totalFrames }, (_, i) => {
          const img = new Image();
          loadedImages[i] = img; // Store the reference immediately!

          return new Promise<void>((resolve) => {
            const frameNum = padNumber(i + 1, 3);
            img.src = `/sequence-1/ezgif-frame-${frameNum}.jpg`;

            img.onload = () => {
              resolve();
            };
            img.onerror = () => {
              resolve();
            };
          });
        });

        // Wait only for the first few critical frames to load to drastically improve load time
        await Promise.all(promises.slice(0, initialLoadThreshold));

        // Store all loaded images in global cache for HeroCanvas to use
        // HeroCanvas already checks for img.complete before rendering, so background loading is safe
        setImageCache(loadedImages);

      // Delay for premium visual pacing
      setTimeout(() => {
        setIsLoaded(true);
        setTimeout(() => {
          onComplete();
        }, 1200); // Allow fade and scale animation to fully resolve
      }, 800);
    };

    preloadImages();
  }, [onComplete]);

  const logoLetters = ["A", "R", "S", "V"];

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-30vh",
            scale: 0.98,
            filter: "blur(8px)",
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#FFFFFF] p-12 text-[#111111]"
        >
          {/* Top Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.35em] text-[#B8975A] text-center mt-8 font-sans font-semibold"
          >
            Creative Intelligence &bull; Vastu Shastra Architecture
          </motion.div>

          {/* Staggered Logo Reveal */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex overflow-hidden py-2">
              {logoLetters.map((letter, idx) => (
                <div key={idx} className="overflow-hidden inline-block px-1">
                  <motion.span
                    initial={{ y: "110%", rotate: 5 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.1 + idx * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-serif text-7xl md:text-9xl tracking-[0.05em] text-[#111111] block font-light"
                  >
                    {letter}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Sub-label */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[9px] text-[#B8975A] uppercase pl-[0.45em]"
            >
              Modern Luxury Studio
            </motion.div>
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
