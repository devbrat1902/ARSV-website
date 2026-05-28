"use client";

import { useEffect, useRef } from "react";

/**
 * FloatingParticles
 *
 * Renders ambient luminous dust motes on a fixed canvas overlay.
 * These particles drift slowly upward with gentle horizontal
 * oscillation, simulating golden-hour light particles suspended
 * in architectural space. They provide visual continuity across
 * all sections — the single thread that ties the cinematic
 * experience into one continuous film.
 */
export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      oscillationAmplitude: number;
      oscillationSpeed: number;
      phase: number;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.floor(window.innerWidth / 40); // ~35-50 on desktop
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.4,
        speedY: -(Math.random() * 0.15 + 0.05), // Drift upward
        speedX: 0,
        opacity: Math.random() * 0.25 + 0.05,
        oscillationAmplitude: Math.random() * 25 + 10,
        oscillationSpeed: Math.random() * 0.0008 + 0.0003,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Horizontal oscillation
        const offsetX = Math.sin(time * p.oscillationSpeed + p.phase) * p.oscillationAmplitude;
        const drawX = p.x + offsetX;
        const drawY = p.y;

        // Soft radial gradient for each particle
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size * 2);
        gradient.addColorStop(0, `rgba(197, 168, 128, ${p.opacity})`); // gold core
        gradient.addColorStop(0.5, `rgba(223, 206, 183, ${p.opacity * 0.4})`); // warm halo
        gradient.addColorStop(1, `rgba(197, 168, 128, 0)`);

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Update position
        p.y += p.speedY;

        // Wrap particles that drift off the top
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    animationId = requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[48] pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    />
  );
}
