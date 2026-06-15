"use client";

import { useLayoutEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function QuantumBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const colors = useRef(["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]);

  // Resize canvas with DPR scaling
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // Create initial particles with stronger base opacity
  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.3,    // range [0.3…0.9]
      color: colors.current[Math.floor(Math.random() * colors.current.length)],
    }));
  }, []);

  // Main animation loop with visibility tweaks
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Darker, thicker field lines
    ctx.save();
    ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
    ctx.lineWidth = 2;
    const t = timestamp * 0.001;
    for (let x = 0; x < canvas.width; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + Math.sin(t) * 20, canvas.height);
      ctx.stroke();
    }
    ctx.restore();

    // Animate particles and draw connections
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x = (p.x + p.vx + canvas.clientWidth) % canvas.clientWidth;
      p.y = (p.y + p.vy + canvas.clientHeight) % canvas.clientHeight;

      // Stronger glow on particles
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 20;                    // doubled glow radius
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Brighter connections between particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = ((100 - dist) / 100) * 0.4; // doubled connection opacity
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Setup & cleanup
  useLayoutEffect(() => {
    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas, createParticles, animate]);

  return (
  <canvas
    ref={canvasRef}
    className="fixed inset-0 pointer-events-none z-0 canvas-boost"
    style={{ background: "transparent" }}
  />
);
}
